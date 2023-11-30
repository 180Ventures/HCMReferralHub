import { ROUTERS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface IProps {
}

interface IResetPasswordValues {
    password: string;
    confirmPassword: string;
}

export const useResetPasswordHooks = () => {
  const { signUpWithEmail } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const route = useRouter();

  const inititalValues: IResetPasswordValues = {
    password: "",
    confirmPassword: "",
  };
  
  const onSubmitForm = async (values: IResetPasswordValues) => {
    //TODO: handle submit form
    console.log(values);
  }

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onGotoSignUp = useCallback(() => {
    route.push(ROUTERS.signup);
  }, []);

  return {
    inititalValues,
    showPassword,
    onSubmitForm,
    onToggleShowPassword,
    onGotoSignUp
  }
}