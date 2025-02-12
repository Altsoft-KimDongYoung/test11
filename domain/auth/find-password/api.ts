import { Post, Put } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ConfirmMailCodeForResetPasswordBody,
  ConfirmSMSCodeForResetPasswordBody,
  ResetPasswordBody,
  SendMailResetPasswordBody,
  SendSMSResetPasswordBody,
} from '@/ondaji/types/domain';

/**
 * @AUTH [비밀번호 찾기] - SMS 인증번호 전송
 * @NOTE 4.1버전에서 비밀번호 찾기는 이메일로만 이루어지는 것 같습니다.
 * 실제로 사용되지 않을 API 입니다.
 * */
export const postSendSMSResetPassword = async (body: SendSMSResetPasswordBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_SMS_RESET_PASSWORD, body);

  return data;
};

/** @AUTH [비밀번호 찾기] - Email 인증번호 전송 */
export const postSendMailResetPassword = async (body: SendMailResetPasswordBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_MAIL_RESET_PASSWORD, body);

  return data;
};

/** @AUTH [비밀번호 찾기] - SMS 인증번호 인증 API */
export const postConfirmSMSCodeForResetPassword = async (
  body: ConfirmSMSCodeForResetPasswordBody
) => {
  const { data } = await Post<boolean>(API_URL.USER.CONFIRM_SMS_CODE_FOR_RESET_PASSWORD, body);

  return data;
};

/** @AUTH [비밀번호 찾기] - Email 인증번호 인증 API */
export const postConfirmMailCodeForResetPassword = async (
  body: ConfirmMailCodeForResetPasswordBody
) => {
  const { data } = await Post<boolean>(API_URL.USER.CONFIRM_MAIL_CODE_FOR_RESET_PASSWORD, body);

  return data;
};

//
//
//

/** @AUTH 비밀번호 변경 (SMS 인증 방식) */
export const fetchResetPasswordSMSMethod = async (
  body: Pick<ResetPasswordBody, 'mobile' | 'password'>
) => {
  const { data } = await Put<boolean>(API_URL.USER.RESET_PASSWORD_AT_MOBILE_CERTIFY, body);

  return data;
};

/** @AUTH 비밀번호 변경 (E-Mail 인증 방식) */
export const fetchResetPasswordEmailMethod = async (
  body: Pick<ResetPasswordBody, 'email' | 'password'>
) => {
  const { data } = await Put<boolean>(API_URL.USER.RESET_PASSWORD_AT_MAIL_CERTIFY, body);

  return data;
};
