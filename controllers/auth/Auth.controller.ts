import {validateEmailConfirmation, validateLogin} from "@lib/validation/auth-validation";
import {WEB_URL} from "@lib/constants";
import {validateEmail, validatePassword} from "@lib/validation/general";
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
      const { data } = await axios.put(`/users/recoverPassword`, {
        email
      });

      return {
        message: 'Email with further instructions has been sent successfully.',
        data,
        error: false,
      };
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async setNewPassword({
    code,
    email,
    password,
    confirmPassword
  }: VerifyCodeDto): Promise<IResponse> {
    const validationEmailResult = await validateEmail(email, {
      required: true,
    });

    if (validationEmailResult.error) {
      throw new MainError(validationEmailResult.message);
    }

    const validationResult = await validatePassword(password, {
      required: true,
    });

    if (validationResult.error) {
      throw new MainError(validationResult.message);
    } else if (password !== confirmPassword) {
      throw new MainError('Passwords do not match');
    }

    try {
      const { data } = await axios.put(`/users/confirmPasswordRecovery`, {
        code: 'CfDJ8Eno4aVdvEBEp/BYeHC1Zf1ObuZQLWu2Tjrtfeq+FbaVIv8EiYr8z+pGz+f28NVv+3rRuoVANSeZeyZz7UAODLO5yzB9jW77zpnuKG1DGV8dV+N/gmRbRkts/87qN2Nh3I67w/5xr9KziqztXb1u/7GtJvo4zPEJ4i/kY+KuySEvIoy297+8ViDma36myn3WPmS7J+R0lv46xBCvW1oRolIgFAUDRJ+6UHZEIdVLu/qT',
        email,
        newPassword: password
      });

      return {
        message: 'New password was set successfully.',
        data,
        error: false,
      };
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }
}