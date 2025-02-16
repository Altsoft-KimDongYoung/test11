import { Post } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  FindLoginIdResponse,
  FindLoginIdViaMailPinCodeBody,
  FindLoginIdViaSMSPinCodeBody,
  SendMailForFindLoginIdBody,
  SendSMSForFindLoginIdBody,
} from '@/ondaji/types/domain';

/** @AUTH 아이디 찾기, SMS 인증번호 전송 API  */
export const postSendSMSForFindLoginId = async (body: SendSMSForFindLoginIdBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_SMS_FOR_FIND_LOGIN_ID, body);

  return data;
};

/** @AUTH 아이디 찾기, Email 인증번호 전송 API */
export const postSendMailForFindLoginId = async (body: SendMailForFindLoginIdBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_MAIL_FOR_FIND_LOGIN_ID, body);

  return data;
};

/** @AUTH PinCode SMS 인증 (아이디 찾기용) */
export const postFindLoginIdViaSMSPinCode = async (body: FindLoginIdViaSMSPinCodeBody) => {
  const { data } = await Post<FindLoginIdResponse>(
    API_URL.USER.FIND_LOGIN_ID_VIA_SMS_PIN_CODE,
    body
  );

  return data;
};

/** @AUTH PinCode E-Mail 인증 (아이디 찾기용) */
export const postFindLoginIdViaMailPinCode = async (body: FindLoginIdViaMailPinCodeBody) => {
  const { data } = await Post<FindLoginIdResponse>(
    API_URL.USER.FIND_LOGIN_ID_VIA_MAIL_PIN_CODE,
    body
  );

  return data;
};
