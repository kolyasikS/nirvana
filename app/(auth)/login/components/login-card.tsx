'use client';
import React, {useMemo, useState} from 'react';
import {Card} from "@/components/ui";
import {LoginForm} from "@/app/(auth)/login/components/login-form";
import {ForgotPasswordForm} from "@/app/(auth)/login/components/forgot-password/forgot-password-form";
import {EmailConfirmation} from "@/app/(auth)/login/components/login-email-confirmation";
import {observer} from "mobx-react-lite";

enum LOGIN_FORMS {
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot-password',
  EMAIL_CONFIRMATION = 'email-confirmation',
}

const LoginCard = observer(() => {
  const [currentForm, setCurrentForm] = useState<LOGIN_FORMS>(LOGIN_FORMS.LOGIN);

  const form = useMemo(() => {
    switch (currentForm) {
      case LOGIN_FORMS.LOGIN:
        return <LoginForm
          startForgotPasswordFlow={() => setCurrentForm(LOGIN_FORMS.FORGOT_PASSWORD)}
          moveToEmailConfirmation={() => setCurrentForm(LOGIN_FORMS.EMAIL_CONFIRMATION)}
        />;
      case LOGIN_FORMS.FORGOT_PASSWORD:
        return <ForgotPasswordForm startLoginFlow={() => setCurrentForm(LOGIN_FORMS.LOGIN)}/>;
      case LOGIN_FORMS.EMAIL_CONFIRMATION:
        return <EmailConfirmation
          moveBack={() => setCurrentForm(LOGIN_FORMS.LOGIN)}
        />;
      default:
        return <LoginForm
          startForgotPasswordFlow={() => setCurrentForm(LOGIN_FORMS.FORGOT_PASSWORD)}
          moveToEmailConfirmation={() => setCurrentForm(LOGIN_FORMS.EMAIL_CONFIRMATION)}
        />;
    }
  }, [currentForm])
  return (
    <Card className="mx-auto w-full max-w-sm">
      {form}
    </Card>
  );
});

export default LoginCard;