import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  ComplainContentLocalityBody,
  ContentRegisterResponse,
  VillageNewsPutResponse,
} from '@/ondaji/types/domain';

import {
  postComplainContentLocality,
  postContentTempVillageNews,
  postContentVillageNews,
  putContentTempVillageNews,
  putContentVillageNews,
} from './api';

/** @CONTENT 동네소식 등록 mutation */
export const useMutationVillageNews = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (body: string) => postContentVillageNews(body),
    ...options,
  });
};

/** @CONTENT 임시저장 등록_동네소식 mutation */
export const useMutationContentTempVillageNews = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => postContentTempVillageNews(body),
    ...options,
  });
};

/** @CONTENT 임시저장 수정_동네소식 mutation : 임시저장 했던 콘텐츠를 또 임시저장할 때 */
export const useMutationContentTempPutVillageNews = (
  options?: UseMutationOptions<ApiResponse<number>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentTempVillageNews(body),
    ...options,
  });
};

/** @CONTENT 동네소식 수정 mutation */
export const useMutationVillageNewsEdit = (
  options?: UseMutationOptions<VillageNewsPutResponse, Error, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentVillageNews(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 지역성 신고 mutation */
export const useMutationComplainContentLocality = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, ComplainContentLocalityBody>
) => {
  return useMutation({
    mutationFn: (body: ComplainContentLocalityBody) => postComplainContentLocality(body),
    ...options,
  });
};
