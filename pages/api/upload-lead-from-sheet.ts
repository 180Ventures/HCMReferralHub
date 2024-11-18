import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { JWT } from 'google-auth-library';
import path from 'path';
import admin from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';
import { LeadCreateBy, LeadPaymentStatus, Tables } from '@/utils/enums';
const db = admin.firestore();
interface GoogleSheetRow {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

type IAddLeadReq = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  subAdsCampaign: string;
  paymentStatus: string;
  createdBy: string;
  country: string;
  state: string;
  referralId: string;
  referralName: string;
  note: string;
  createdAt: Timestamp;
};

interface DataResponse {
  message: string;
  data?: GoogleSheetRow[];
  error?: string;
}

const credential = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_KEY!, "base64").toString()
);


const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export default async function handler (req: NextApiRequest, res: NextApiResponse<DataResponse>) {
  try {
    const reqBody = JSON.parse(req.body);
    console.log('reqBody: ', reqBody);
    const googleSheetUrl = reqBody.googleSheetUrl as string;
    const referralName = reqBody.referralName as string;
    const referralId = reqBody.referralId as string;
    console.log('googleSheetUrl: ', googleSheetUrl);

    const spreadsheetIds = googleSheetUrl.match(/\/d\/(.+)\//);
    if (spreadsheetIds) {
      const spreadsheetId = spreadsheetIds[1];
      const client = (await auth.getClient()) as JWT;
      const sheets = google.sheets({ version: 'v4', auth: client });
      const range = 'Sheet1!A1:C';
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = response.data.values;
      if (rows && rows.length) {
        const removedFirstRows = rows.splice(1);
        const data: GoogleSheetRow[] = removedFirstRows.map((row: string[]) => ({
          firstName: row[0] || '',
          lastName: row[1] || '',
          phoneNumber: row[2] || '',
        }));

        await Promise.all(
          data.map(async (item) => {
            const timeNow = Timestamp.now();
            const addValues: IAddLeadReq = {
              firstName: item.firstName ?? '',
              lastName: item.lastName ?? '',
              phoneNumber: item.phoneNumber ?? '',
              referralName: referralName,
              referralId: referralId,
              email: '',
              createdAt: timeNow,
              createdBy: LeadCreateBy.referralHub,
              subAdsCampaign: LeadCreateBy.referralHub,
              paymentStatus: LeadPaymentStatus.pending,
              gender: '',
              dateOfBirth: '',
              country: '',
              state: '',
              note: '',
            };
            await db.collection(Tables.portalLeads).add(addValues);
          })
        );
        res.status(200).json({ message: 'Data uploaded successfully' });
      } else {
        res.status(200).json({ message: 'No data found', data: [] });
      }
    } else {
      res.status(200).json({ message: 'No sheet found', data: [] });
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ message: 'Error fetching data', error: (error as Error).message });
  }
}
