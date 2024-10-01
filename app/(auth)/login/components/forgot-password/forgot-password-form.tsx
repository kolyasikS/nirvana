import ForgotPasswordStep1 from "@/app/(auth)/login/components/forgot-password/forgot-password-step-1";
import {
  useContext,
  useMemo,
  useState,
  createContext,
  Dispatch,
  SetStateAction
} from "react";
import ForgotPasswordStep2 from "@/app/(auth)/login/components/forgot-password/forgot-password-step-2";
import ForgotPasswordStep3 from "@/app/(auth)/login/components/forgot-password/forgot-password-step-3";

interface IForgotPasswordFormState {
  email: string;
}

interface IForgotPasswordFormContext {
  formState: IForgotPasswordFormState;
  setFormState:  Dispatch<SetStateAction<IForgotPasswordFormState>>;
}

const ForgotPasswordFormContext = createContext<IForgotPasswordFormContext>({
  formState: {} as IForgotPasswordFormState,
  setFormState: () => {},
});
export const useForgotPasswordFormContext = () => useContext(ForgotPasswordFormContext);

type ForgotPasswordFormProps = {
  startLoginFlow: () => void;
}
export function ForgotPasswordForm ({
  startLoginFlow
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<number>(0);
  const [formState, setFormState] = useState<IForgotPasswordFormState>({
    email: '',
  });

  const stepComponent = useMemo(() => {
    switch (step) {
      case 0:
        return <ForgotPasswordStep1
          nextStep={() => setStep(step => step + 1)}
          previousStep={() => startLoginFlow()}
        />;
      case 1:
        return <ForgotPasswordStep2
          nextStep={() => setStep(step => step + 1)}
          previousStep={() => setStep(step => step - 1)}
        />;
      case 2:
        return <ForgotPasswordStep3
          nextStep={() => startLoginFlow()}
          previousStep={() => setStep(step => step - 1)}
        />;
      default:
        return <ForgotPasswordStep1
          nextStep={() => setStep(step => step + 1)}
          previousStep={() => startLoginFlow()}
        />;
    }
  }, [step, startLoginFlow])
  return (
    <ForgotPasswordFormContext.Provider value={{
      formState,
      setFormState,
    }}>
      {stepComponent}
    </ForgotPasswordFormContext.Provider>
  )
}
