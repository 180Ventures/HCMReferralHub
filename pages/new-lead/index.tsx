import { Container, ErrorMessageForm, LoadingPage } from '@/components';
import withAuth from '@/components/AuthHOC';
import Input from '@/components/Input';
import { AddNewLeadIcon, ArrowRight } from '@/icons';
import { Formik } from 'formik';
import { NextPage } from 'next';
import useNewLeadHook, { leadSchema } from './hook';
import { formatPhoneNumberToList } from '@/utils';
import { ChangeEvent } from 'react';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

const NewLead: NextPage = () => {
  const { initialValues, loading, onSubmitForm } = useNewLeadHook();

  return (
    <Container headTitle="Add new lead">
      {loading && <LoadingPage />}
      <div className="flex flex-col">
        <div className="w-full bg-white h-24 flex justify-center items-center">
          <div className="w-auto">
            <span className="text-cyan-800 text-[22px] xl:text-[25px] font-normal font-Poppins">Health</span>
            <span className="text-cyan-800 text-[22px] xl:text-[25px] font-bold font-Poppins">care </span>
            <span className="text-teal-500 text-[22px] xl:text-[25px] font-semibold font-Poppins">Marketplace</span>
          </div>
        </div>
        <div className="bg-bgF6FAFD w-full h-[85vh] flex flex-col justify-center items-center gap-8">
          <AddNewLeadIcon />
          <div>
            <p className="text-center text-[30px] font-normal text-[#35B0A4]">Custom Health Plan Review</p>
            <p className="text-center font-light text-[#9CA3AF]">Please input your information below</p>
          </div>
          <Formik
            validationSchema={leadSchema}
            initialValues={initialValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => {
              return (
                <form className="w-[90%] md:w-[430px]" onSubmit={props.handleSubmit}>
                  <div className="flex mt-4 2xl:mt-8 flex-row justify-center items-center relative">
                    <Input
                      name="firstName"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.firstName}
                      placeholder="What is your first name?"
                    />
                  </div>
                  <div className="flex mt-4 2xl:mt-8 flex-row justify-center items-center relative">
                    <Input
                      name="lastName"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lastName}
                      placeholder="What is your last name?"
                    />
                  </div>
                  <div className="flex mt-4 2xl:mt-8 flex-row justify-center items-center relative">
                    <div className="flex flex-col w-full">
                      <Input
                        name="phoneNumber"
                        type="text"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.value;
                          const formatValue = formatPhoneNumberToList(value);
                          props.setFieldValue('phoneNumber', formatValue);
                        }}
                        onBlur={props.handleBlur}
                        value={props.values.phoneNumber}
                        placeholder="What is a good phone number to reach you?"
                      />
                      {/* <PhoneInput
                        placeholder="What is a good phone number to reach you?"
                        value={props.values.phoneNumber}
                        className="w-full h-11 2xl:h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal"
                        defaultCountry="US"
                        onChange={(value) => props.setFieldValue('phoneNumber', value)}
                      /> */}
                    </div>
                  </div>
                  <div className="flex mt-4 2xl:mt-8 flex-row justify-center items-center relative">
                    <Input
                      name="email"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      placeholder="What is your email?"
                    />
                  </div>
                  <button type="submit" className="mt-6 hover:opacity-75 w-full bg-[#396589] rounded-lg h-10 2xl:h-12">
                    <p className="text-base font-normal text-white flex justify-center items-center gap-1">
                      Submit <ArrowRight />
                    </p>
                  </button>
                  <div className="sm:hidden mt-8 w-[347.56px] text-gray-400 text-[8.12px] font-normal font-['Lexend Deca']">
                    Your privacy is our top priority. The Healthcare Marketplace, ensures that the information you
                    provide is secure and solely used for identification and communication with us. We employ advanced
                    security measures to protect your data and never share it with third parties. Your trust in us as
                    your healthcare partner is highly valued. If you have any questions or concerns, please don't
                    hesitate to reach out to our in-house support team; we are here to assist you.
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default withAuth(NewLead, 'all');
