import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ApartmentMemberProfileDTO,
  BusinessMemberProfileDTO,
  CheckPasswordBody,
  ConfirmEmailChangeEmailBody,
  ConfirmSMSChangeMobileBody,
  FetchMyProfileResponse,
  GVMTMemberProfileDTO,
  MemberProfileDTO,
  PutPasswordBody,
  SendMailChangeEmailBody,
  SendSMSChangeMobileBody,
} from '@/ondaji/types/domain';
import { convertURLtoFile } from '@/ondaji/utils/convertURLtoFile';

import { Fetch, Patch, Post, Put } from '../../../common/method';

/** @MY 마이 페이지 */
export const fetchMyPage = async () => {
  const { data } = await Fetch<FetchMyProfileResponse<MemberProfileDTO>>(API_URL.USER.MY_PROFILE);

  return data;
};

/** @MY 마이 프로필 상세 조회 - 일반 */
export const fetchMemberProfile = async () => {
  const { data } = await Fetch<FetchMyProfileResponse<MemberProfileDTO>>(API_URL.USER.MY_PROFILE);

  const profileImgUrl = data.result?.localboxProfileImgUrl;
  const profileImg = profileImgUrl ? await convertURLtoFile(profileImgUrl) : null;

  return {
    ...data,
    result: {
      ...data.result,
      profileImg,
    },
  };
};

/** @MY 마이 프로필 상세 조회 - 기업 */
export const fetchBusinessMemberProfile = async () => {
  const { data } = await Fetch<FetchMyProfileResponse<BusinessMemberProfileDTO>>(
    API_URL.USER.MY_PROFILE
  );

  const { url: licenseFileUrl, originalName: licenseFileName } =
    data.result.businessLicenseFileInfo;
  const profileImgUrl = data.result?.localboxProfileImgUrl;
  const profileImg = profileImgUrl ? await convertURLtoFile(profileImgUrl) : null;

  return {
    ...data,
    result: {
      ...data.result,
      profileImg,
      licenseFile: await convertURLtoFile(licenseFileUrl, licenseFileName),
    },
  };
};

/** @MY 마이 프로필 상세 조회 - 아파트 */
export const fetchApartmentMemberProfile = async () => {
  const { data } = await Fetch<FetchMyProfileResponse<ApartmentMemberProfileDTO>>(
    API_URL.USER.MY_PROFILE
  );

  const { url: employmentFileUrl, originalName: employmentFileName } =
    data.result.employmentFileInfo;
  const profileImgUrl = data.result?.localboxProfileImgUrl;
  const profileImg = profileImgUrl ? await convertURLtoFile(profileImgUrl) : null;

  return {
    ...data,
    result: {
      ...data.result,
      profileImg,
      employmentFile: await convertURLtoFile(employmentFileUrl, employmentFileName),
    },
  };
};

/** @MY 마이 프로필 상세 조회 - 관공서 */
export const fetchGVMTMemberProfile = async () => {
  const { data } = await Fetch<FetchMyProfileResponse<GVMTMemberProfileDTO>>(
    API_URL.USER.MY_PROFILE
  );

  const { url: employmentFileUrl, originalName: employmentFileName } =
    data.result.employmentFileInfo;
  const profileImgUrl = data.result?.localboxProfileImgUrl;
  const profileImg = profileImgUrl ? await convertURLtoFile(profileImgUrl) : null;

  return {
    ...data,
    result: {
      ...data.result,
      profileImg,
      employmentFile: await convertURLtoFile(employmentFileUrl, employmentFileName),
    },
  };
};

/** @MY 마이 프로필 수정 */
export const patchMyProfile = async (body: FormData) => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await Patch<boolean>(API_URL.USER.MY_PROFILE, body, {
    ...headers,
  });

  return data;
};

/** @MY [핸드폰번호 변경] - SMS 전송 */
export const postSendSMSChangeMobile = async (body: SendSMSChangeMobileBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_SMS_CHANGE_MOBILE, body);

  return data;
};

/** @MY [비밀번호 변경] - SMS 인증번호 전송 */

export const postConfirmSMSChangeMobile = async (body: ConfirmSMSChangeMobileBody) => {
  const { data } = await Post<boolean>(API_URL.USER.CONFIRM_SMS_CHANGE_MOBILE, body);

  return data;
};

/** @MY [이메일 변경] - Email 인증번호 전송 */
export const postSendMailChangeEmail = async (body: SendMailChangeEmailBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_MAIL_CHANGE_EMAIL, body);

  return data;
};

/** @MY [이메일 변경] - Email 인증번호 인증 */
export const postConfirmEmailChangeEmail = async (body: ConfirmEmailChangeEmailBody) => {
  const { data } = await Post<boolean>(API_URL.USER.CONFIRM_EMAIL_CHANGE_EMAIL, body);

  return data;
};

/** @MY 사용자 비밀번호 확인 */
export const postCheckPassword = async (body: CheckPasswordBody) => {
  const { data } = await Post<boolean>(API_URL.USER.CHECK_PASSWORD, body);

  return data;
};

/** @MY 사용자 비밀번호 변경 */
export const putPassword = async (body: PutPasswordBody) => {
  const { data } = await Put<boolean>(API_URL.USER.PASSWORD, body);

  return data;
};
