import { useAuthState } from "@/contexts/auth";
import { ISignUpFormValues } from "@/queries/type";
import { useCallback, useState } from "react";

interface IProps {
}

export const useSignUpFormHooks = () => {
  const { signUpWithEmail } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inititalValues: ISignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    policy: false,
  };
  
  const onSubmitForm = async (values: ISignUpFormValues) => {
    try {
      signUpWithEmail(values);
    } catch (error) {
      //@ts-ignore
      toastError(error.message);
    }
  }

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return {
    inititalValues,
    showPassword,
    onSubmitForm,
    onToggleShowPassword,
  }
}