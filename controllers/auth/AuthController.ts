import {validateLogin} from "@/lib/validation/auth-validation";
import {WEB_URL} from "@/lib/constants";
import {validateCode, validateEmail, validatePassword} from "@/lib/validation/general";
import {axios} from "@/lib/axios";

export class AuthController {

  static async login(loginDto: LoginDto) {
    const validationResult = await validateLogin(loginDto);
    if (validationResult.error) {
      return validationResult;
    }

    try {
      const data = await fetch(`${WEB_URL}/api/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(loginDto),
      })
        .then(res => res.json())
        .catch(err => {
          console.error(err);
          return {
            error: true,
            message: err.message
          }
        });
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
    }
  }

  static async sendCodeToEmail({
    email
  }: SendCodeDto) {
    const validationEmailResult = await validateEmail(email, {
      required: true,
    });

    if (validationEmailResult.error) {
      return validationEmailResult;
    }

    try {
      const { data } = await axios.post(`/send-code`, {
        email
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
    }
  }

  static async verifyCode({
    code,
    email
  }: VerifyCodeDto) {
    const validationCodeResult = await validateCode(code, {
      required: true,
    });

    if (validationCodeResult.error) {
      return validationCodeResult;
    }

    const validationEmailResult = await validateEmail(email, {
      required: true,
    });

    if (validationEmailResult.error) {
      return validationEmailResult;
    }

    try {
      const { data } = await axios.post(`/verify-code`, {
        code,
        email
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
    }
  }

  static async recoverPassword({
    newPassword,
    confirmPassword,
  }: SetNewPasswordDto) {
    const validationResult = await validatePassword(newPassword, {
      required: true,
    });

    if (validationResult.error) {
      return validationResult;
    } else if (newPassword !== confirmPassword) {
      return {
        message: 'Passwords do not match',
        error: true
      };
    }

    try {
      const { data } = await axios.post(`/recover-password`, {
        password: newPassword,
      });
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
    }
  }

}