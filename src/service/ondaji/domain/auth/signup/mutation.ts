import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  CheckBusinessBody,
  CheckBusinessResponse,
  SendJoinEmailBody,
  SendJoinMobileBody,
} from '@/ondaji/types/domain';

import {
  postCheckBusiness,
  postSendJoinEmail,
  postSendJoinMobile,
  postSignupBusiness,
  postSignupMember,
  postUserSignup,
} from './api';

/**
 * @AUTH 회원가입
 * @TODO: 4.0 기준 API 입니다. 4.1버전 회원가입 개발이 완료되면 삭제 되어야합니다.
 *
 * */
export const useMutationUserSignup = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postUserSignup(body),
    ...options,
  });
};

/** @AUTH 회원가입 - 일반회원 */
export const useMutationSignupMember = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postSignupMember(body),
    ...options,
  });
};

/** @AUTH 회원가입 - 기업회원 */
export const useMutationSignupBusiness = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postSignupBusiness(body),
    ...options,
  });
};

/** @AUTH 회원가입용 SMS 전송  */
export const useMutationSendJoinMobile = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SendJoinMobileBody>
) => {
  return useMutation({
    mutationFn: (body: SendJoinMobileBody) => postSendJoinMobile(body),
    ...options,
  });
};

/** @AUTH 회원가입용 Email 전송 */
export const useMutationSendJoinEmail = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SendJoinEmailBody>
) => {
  return useMutation({
    mutationFn: (body: SendJoinEmailBody) => postSendJoinEmail(body),
    ...options,
  });
};

/** @AUTH 사업자 유효성 체크 (기업회원 가입시 입력한 사업장의 유효성 체크) */
export const useMutationCheckBusiness = (
  options?: UseMutationOptions<ApiResponse<CheckBusinessResponse>, AxiosError, CheckBusinessBody>
) => {
  return useMutation({
    mutationFn: (body: CheckBusinessBody) => postCheckBusiness(body),
    ...options,
  });
};
