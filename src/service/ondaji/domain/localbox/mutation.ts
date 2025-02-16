import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse, PreviousDataContext } from '@/ondaji/types/common';
import { ContentPostingBody, LocalboxFollowBody, SubscribeBody } from '@/ondaji/types/domain';

import {
  deleteContentPosting,
  deleteLocalboxRecentVisitTown,
  deleteLocalboxTopGroupContent,
  patchLocalboxInfo,
  postContentPosting,
  postLocalboxFollow,
  postLocalboxSubscription,
  postLocalboxTopGroupContent,
} from './api';

/** ❌ 제거 예정 */
/** @LOCALBOX 로컬박스 구독  */
export const useMutationsLocalboxSubscription = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SubscribeBody>
) => {
  return useMutation({
    mutationFn: postLocalboxSubscription,
    ...options,
  });
};

/** @LOCALBOX 내 로컬박스 기본 정보 수정 */
export const useMutationLocalboxInfo = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: patchLocalboxInfo,
    ...options,
  });
};

/** @LOCALBOX 콘텐츠 포스팅 mutation */
export const useMutationContentPosting = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, ContentPostingBody>
) => {
  return useMutation({
    mutationFn: (body: ContentPostingBody) => postContentPosting(body),
    ...options,
  });
};

/** @LOCALBOX 콘텐츠 포스팅 삭제 mutation */
export const useMutationDeleteContentPosting = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (contentId: number) => deleteContentPosting(contentId),
    ...options,
  });
};

/** @LOCALBOX 상단 고정 콘텐츠 등록 mutation */
export const useMutationLocalboxTopGroupContent = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (contentId: number) => postLocalboxTopGroupContent(contentId),
    ...options,
  });
};

/** @LOCALBOX 상단 고정 콘텐츠 해제 mutation */
export const useMutationDeleteLocalboxTopGroupContent = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (contentId: number) => deleteLocalboxTopGroupContent(contentId),
    ...options,
  });
};

/** @LOCALBOX 로컬박스 팔로우  */
export const useMutationLocalboxFollow = <T>(
  options?: UseMutationOptions<
    ApiResponse<boolean>,
    AxiosError,
    LocalboxFollowBody,
    PreviousDataContext<T>
  >
) => {
  return useMutation<ApiResponse<boolean>, AxiosError, LocalboxFollowBody, PreviousDataContext<T>>({
    mutationFn: postLocalboxFollow,
    ...options,
  });
};

/** @LOCALBOX 최근 방문한 동네 이력 삭제 mutation */
export const useMutationLocalboxRecentVisitTownDelete = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (visitTownId: number) => deleteLocalboxRecentVisitTown(visitTownId),
    ...options,
  });
};
