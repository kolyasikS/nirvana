import {validateEmailConfirmation, validateLogin} from "@lib/validation/auth-validation";
import {WEB_URL} from "@lib/constants";
import {validateCode, validateEmail, validatePassword} from "@lib/validation/general";
import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {makeResponse} from "@lib/utils";

export class AuthController {

  static async login(loginDto: LoginDto): Promise<IResponse> {
    const validationResult = await validateLogin(loginDto);
    if (validationResult.error) {
      throw new MainError(validationResult.message);
    }

    try {
      const response = await fetch(`${WEB_URL}/api/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(loginDto),
      });

      return makeResponse(response, 'Log in successfully');
    } catch (error: any) {
      throw ResponseError.createResponseError(error, 'Log in failed. Try again later.');
    }
  }

  static async confirmEmail(emailConfirmDto: EmailConfirmDto): Promise<IResponse> {
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

  static async logout(): Promise<IResponse> {
    try {
      const response = await fetch(`${WEB_URL}/api/logout`);

      return makeResponse(response, 'Log out successfully.');
    } catch (error: any) {
      throw ResponseError.createResponseError(error, 'Log out failed. Try again later.');
    }
  }

  static async getUserDetails(): Promise<IResponse> {
      try {
        const { data } = await axios.get(`/users/self`);
        return {
          message: 'Data has been fetched successfully.',
          data,
          error: false,
        };

      } catch (error: any) {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
  }

  static async sendCodeToEmail({
    email
  }: SendCodeDto): Promise<IResponse> {
    const validationEmailResult = await validateEmail(email, {
      required: true,
    });

    if (validationEmailResult.error) {
      throw new MainError(validationEmailResult.message);
    }

    try {
      const { data } = await axios.post(`/send-code`, {
        email
      });

      return {
        message: 'Code was sent successfully.',
        data,
        error: false,
      };
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async verifyCode({
    code,
    email
  }: VerifyCodeDto): Promise<IResponse> {
    const validationCodeResult = await validateCode(code, {
      required: true,
    });

    if (validationCodeResult.error) {
      throw new MainError(validationCodeResult.message);
    }

    const validationEmailResult = await validateEmail(email, {
      required: true,
    });

    if (validationEmailResult.error) {
      throw new MainError(validationEmailResult.message);
    }

    try {
      const { data } = await axios.post(`/verify-code`, {
        code,
        email
      });

      return {
        message: 'Code was verified successfully.',
        data,
        error: false,
      };
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async recoverPassword({
    newPassword,
    confirmPassword,
  }: SetNewPasswordDto): Promise<IResponse> {
    const validationResult = await validatePassword(newPassword, {
      required: true,
    });

    if (validationResult.error) {
      throw new MainError(validationResult.message);
    } else if (newPassword !== confirmPassword) {
      throw new MainError('Passwords do not match');
    }

    try {
      const { data } = await axios.post(`/recover-password`, {
        password: newPassword,
      });

      return {
        message: 'Password was recovered successfully.',
        data,
        error: false,
      };
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

}