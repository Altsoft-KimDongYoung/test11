import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ApartmentContent,
  CheckBusinessBody,
  CheckBusinessParams,
  CheckBusinessResponse,
  CheckOrganizationManagerParams,
  CheckOrganizationManagerResponse,
  GvmtContent,
  JoinConfirmEmailBody,
  JoinConfirmMobileBody,
  OrganizationParams,
  OrganizationParentHierarchyListParams,
  OrganizationParentHierarchyListResponse,
  OrganizationResponse,
  SendJoinEmailBody,
  SendJoinMobileBody,
  UserCheckDuplicateLoginIdParams,
} from '@/ondaji/types/domain/auth';

import { Fetch, Post } from '../../../common/method';

/**
 * @AUTH 회원가입용 SMS 전송
 * @Description 회원가입할 때, 휴대폰 본인인증을 위해서 사용자한테 인증번호 전송 API
 * */
export const postSendJoinMobile = async (body: SendJoinMobileBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_JOIN_MOBILE, body);

  return data;
};

/**
 * @AUTH 회원가입용 SMS 인증
 * @Description 회원가입 할 때, 휴대폰 인증번호를 인증하는 API
 * */
export const postJoinConfirmMobile = async (body: JoinConfirmMobileBody) => {
  const { data } = await Post<boolean>(API_URL.USER.JOIN_CONFIRM_MOBILE, body);

  return data;
};

/**
 * @AUTH PinCode Email 전송 (회원가입용)
 * @Description 회원가입할 때, 이메일로 인증번호를 전송하는 API
 * */
export const postSendJoinEmail = async (body: SendJoinEmailBody) => {
  const { data } = await Post<boolean>(API_URL.USER.SEND_JOIN_EMAIL, body);

  return data;
};

/**
 * @AUTH PinCode Email 인증 (회원가입용)
 * @Description 회원가입, 이메일 인증번호 인증하는 API
 * */
export const postJoinConfirmEmail = async (body: JoinConfirmEmailBody) => {
  const { data } = await Post<boolean>(API_URL.USER.JOIN_CONFIRM_EMAIL, body);

  return data;
};

/** @AUTH 아이디 중복 체크 */
export const fetchUserCheckDuplicateLoginId = async (params: UserCheckDuplicateLoginIdParams) => {
  const { data } = await Fetch<boolean>(API_URL.USER.CHECK_DUPLICATE_LOGIN_ID, {
    params,
  });

  return data;
};

/**
 * @AUTH 회원가입 (모든 회원)
 * @TODO: 4.0 기준 API 입니다. 4.1버전 회원가입 개발이 완료되면 삭제 되어야합니다.
 * */
export const postUserSignup = async (body: FormData) => {
  const { data } = await Post<boolean>(API_URL.USER.SIGNUP, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @AUTH 회원가입 - 일반회원 */
export const postSignupMember = async (body: FormData) => {
  const { data } = await Post<boolean>(API_URL.USER.SIGNUP_MEMBER, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const postSignupBusiness = async (body: FormData) => {
  const { data } = await Post<boolean>(API_URL.USER.SIGNUP_BUSINESS, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

/** @AUTH 부모 행정기관 조회(By 좌표) */
export const fetchOrganizationParentHierarchyList = async (
  params: OrganizationParentHierarchyListParams
) => {
  const { data } = await Fetch<OrganizationParentHierarchyListResponse>(
    API_URL.ORGANIZATION.PARENT_HIERARCHY_LIST,
    { params }
  );

  return data;
};

/** @AUTH 아파트명으로 검색하는 리스트 페이지 조회 */
export const fetchOrganizationApartment = async (params: OrganizationParams) => {
  const { data } = await Fetch<OrganizationResponse<ApartmentContent>>(
    API_URL.ORGANIZATION.APARTMENT,
    { params }
  );

  return data;
};

/** @AUTH 관공서명으로 검색하는 리스트 페이지 조회 */
export const fetchOrganizationGvmt = async (params: OrganizationParams) => {
  const { data } = await Fetch<OrganizationResponse<GvmtContent>>(API_URL.ORGANIZATION.GVMT, {
    params,
  });

  return data;
};

/**
 * @AUTH 사업자 유효성 체크 (기업회원 가입시 입력한 사업장의 유효성 체크)
 * @TODO: AUTH 해당 API가 필요없을 경우, 삭제가 필요합니다.
 * 4.0 -> 4.1 버전 마이그레이션으로 인한 삭제 대상
 * */
export const fetchCheckBusiness = async (params: CheckBusinessParams) => {
  const { data } = await Fetch<CheckBusinessResponse>(API_URL.LOCALBOX.CHECK_BUSINESS, { params });

  return data;
};

/** @AUTH 사업자 유효성 체크 (기업회원 가입시 입력한 사업장의 유효성 체크) */
export const postCheckBusiness = async (body: CheckBusinessBody) => {
  const { data } = await Post<CheckBusinessResponse>(API_URL.LOCALBOX.CHECK_BUSINESS, body);

  return data;
};

/** @AUTH 특정 기관 관리자 존재 여부 체크 (특정 기관 관리자(회원)가 이미 존재하는 지를 확인하는 API) */
export const fetchCheckOrganizationManager = async (params: CheckOrganizationManagerParams) => {
  const { data } = await Fetch<CheckOrganizationManagerResponse>(
    API_URL.LOCALBOX.EXIST_ORGANIZATION_MANAGER,
    { params }
  );

  return data;
};

/** @AUTH 랜덤 닉네임 조회 */
export const fetchRandomNickname = async () => {
  const { data } = await Fetch<string>(API_URL.USER.RANDOM_NICKNAME);

  return data;
};
