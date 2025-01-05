import {validateEmailConfirmation, validateLogin} from "@lib/validation/auth-validation";
import {WEB_URL} from "@lib/constants";
import {validateCode, validateEmail, validatePassword} from "@lib/validation/general";
import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {makeResponse} from "@lib/utils";

export class AuthController {

  static async login(loginDto: LoginDto) {
    const validationResult = await validateLogin(loginDto);
    if (validationResult.error) {
      throw new MainError(validationResult.message);
    }

    const result = await fetch(`${WEB_URL}/api/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginDto),
    }).then((response) => makeResponse(response, 'Log in successfully.'));
    if (result.error) {
      throw new ResponseError(result.data)
    } else {
      return result;
    }
  }

  static async confirmEmail(emailConfirmDto: EmailConfirmDto) {
    const validationResult = await validateEmailConfirmation(emailConfirmDto);
    if (validationResult.error) {
      throw new MainError(validationResult.message);
    }

    try {
      const result = await axios.put(`/users/confirmEmail`, {
        validationCode: emailConfirmDto.code
      });
      return {
        message: 'Email has been confirmed successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      throw ResponseError.createResponseError(error);
    }
  }

  static async logout() {
    const result = await fetch(`${WEB_URL}/api/logout`)
      .then((response) => makeResponse(response, 'Log out successfully.'));
    if (result.error) {
      throw new MainError('Log out failed. Try again later.');
    } else {
      return result;
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