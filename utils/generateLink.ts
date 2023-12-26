import { v4 as uuidv4 } from 'uuid';
export const generateLink = (
  refId: string,
  subRefId?: boolean
) => {
  if (subRefId) return `${`?refid=${refId}&subRefid=${uuidv4()}`}`;
  return `${`?refid=${refId}`}`;
};
