import React, { FC } from 'react';
import ErrorMessageForm from '../ErrorMessageForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  onToggleShowPassword?: any;
  showPassword?: boolean;
  passwordField?: boolean;
}

const Input: FC<IProps> = ({
  name,
  onBlur,
  onChange,
  type,
  placeholder,
  value,
  onToggleShowPassword,
  showPassword,
  passwordField,
}) => {
  return (
    <div className='flex flex-col w-full items-start relative'>
      <input
        className={`w-full h-12 bg-white rounded-lg border border-slate-200 text-[#898989] placeholder:text-slate-500 lg:placeholder:text-accent text-sm font-normal`}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      />
      {passwordField && (
        <FontAwesomeIcon
          onClick={onToggleShowPassword}
          icon={showPassword ? ['far', 'eye'] : ['far', 'eye-slash']}
          className={`text-gray20  absolute right-4 cursor-pointer top-4`}
        />
      )}
      <ErrorMessageForm name={name} />
    </div>
  );
};

export default Input;
