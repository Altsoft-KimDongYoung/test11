import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import { ContentRegisterResponse } from '@/ondaji/types/domain';

import {
  postContentResidentNews,
  postContentTempResidentNews,
  putContentResidentNews,
  putContentTempResidentNews,
} from './api';

/** @CONTENT 주민소식 콘텐츠(모바일) 등록 mutation */
export const useMutationResidentNews = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postContentResidentNews(body),
    ...options,
  });
};

/** @CONTENT 임시저장 등록_주민소식 mutation */
export const useMutationContentTempResidentNews = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postContentTempResidentNews(body),
    ...options,
  });
};

/** @CONTENT 임시저장 수정_동네소식 mutation : 임시저장 했던 콘텐츠를 또 임시저장할 때 */
export const useMutationContentTempPutResidentNews = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentTempResidentNews(body),
    ...options,
  });
};

/** @CONTENT 주민소식 콘텐츠(모바일) 수정 mutation */
export const useMutationResidentNewsEdit = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentResidentNews(body),
    ...options,
  });
};
