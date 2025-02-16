import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import { ContentRegisterResponse } from '@/ondaji/types/domain';

import { postContentAd, postContentTempAd, putContentAd, putContentTempAd } from './api';

/** @CONTENT 광고 콘텐츠 등록 mutation */
export const useMutationAd = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postContentAd(body),
    ...options,
  });
};

/** @CONTENT 임시저장 등록_광고 mutation */
export const useMutationContentTempAd = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postContentTempAd(body),
    ...options,
  });
};

/** @CONTENT 임시저장 수정_광고 mutation : 임시저장 했던 콘텐츠를 또 임시저장할 때 */
export const useMutationContentTempPutAd = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentTempAd(body),
    ...options,
  });
};

/** @CONTENT 광고 콘텐츠(모바일) 수정 mutation */
export const useMutationAdEdit = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentAd(body),
    ...options,
  });
};
