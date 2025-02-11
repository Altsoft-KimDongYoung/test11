import { AxiosError } from 'axios';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  Banner,
  BannerBody,
  ComplainContentBody,
  ComplainContentReplyBody,
  ContentRegisterResponse,
  ContentReplyBody,
  ContentReplyEditBody,
  ContentReplyLikeBody,
  SetYnBody,
} from '@/ondaji/types/domain';

import {
  deleteContent,
  deleteContentReply,
  deleteContentTemp,
  deleteRecentSearchKeyword,
  patchBanner,
  patchContentDisplayYn,
  postComplainContent,
  postComplainContentReply,
  postContentBookmark,
  postContentDislike,
  postContentLike,
  postContentReply,
  postContentReplyLike,
  putContentMobileToMixed,
  putContentReply,
  putContentSignageToMixed,
} from './api';

/** @CONTENT 콘텐츠 임시저장 삭제 mutaion */
export const useMutationContentTempDelete = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (contentTempIds: string) => deleteContentTemp(contentTempIds),
    ...options,
  });
};

/** @CONTENT 콘텐츠 좋아요 mutation */
export const useMutationContentLike = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SetYnBody>
) => {
  return useMutation({
    mutationFn: (body: SetYnBody) => postContentLike(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 싫어요 mutation */
export const useMutationContentDisLike = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SetYnBody>
) => {
  return useMutation({
    mutationFn: (body: SetYnBody) => postContentDislike(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 북마크 mutation */
export const useMutationContentBookmark = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SetYnBody>
) => {
  return useMutation({
    mutationFn: (body: SetYnBody) => postContentBookmark(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 목록에 보여지는 배너 클릭 시 클릭수 카운팅하는 mutation */
export const useMutationBanner = (
  options?: UseMutationOptions<ApiResponse<Banner[]>, Error, BannerBody>
) => {
  return useMutation({
    mutationFn: (id: BannerBody) => patchBanner(id),
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 등록 mutation */
export const useMutationContentReply = (
  options?: UseMutationOptions<ApiResponse<boolean>, Error, ContentReplyBody>
) => {
  return useMutation({
    mutationFn: (body: ContentReplyBody) => postContentReply(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 삭제 mutation */
export const useMutationContentReplyDelete = (
  options?: UseMutationOptions<ApiResponse<string>, Error, number>
) => {
  return useMutation({
    mutationFn: (contentsReplyId: number) => deleteContentReply(contentsReplyId),
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 좋아요 mutation */
export const useMutationContentReplyLike = (
  options?: UseMutationOptions<ApiResponse<boolean>, Error, ContentReplyLikeBody>
) => {
  return useMutation({
    mutationFn: (body: ContentReplyLikeBody) => postContentReplyLike(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 삭제 mutation */
export const useMutationContentDelete = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (contentId: number) => deleteContent(contentId),
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 신고 mutation */
export const useMutationComplainContentReply = (
  options?: UseMutationOptions<ApiResponse<boolean>, Error, ComplainContentReplyBody>
) => {
  return useMutation({
    mutationFn: (body: ComplainContentReplyBody) => postComplainContentReply(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 수정 mutation */
export const useMutationContentReplyEdit = (
  options?: UseMutationOptions<ApiResponse<boolean>, Error, ContentReplyEditBody>
) => {
  return useMutation({
    mutationFn: (body: ContentReplyEditBody) => putContentReply(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 신고 mutation */
export const useMutationComplainContent = (
  options?: UseMutationOptions<ApiResponse<boolean>, Error, ComplainContentBody>
) => {
  return useMutation({
    mutationFn: (body: ComplainContentBody) => postComplainContent(body),
    ...options,
  });
};

/** @CONTENT 메인콘텐츠 추가제작 mutation */
export const useMutationSignageToMixed = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentSignageToMixed(body),
    ...options,
  });
};

/** @CONTENT 사이니지콘텐츠 추가제작 mutation */
export const useMutationMobileToMixed = (
  options?: UseMutationOptions<ContentRegisterResponse, AxiosError, FormData>
) => {
  return useMutation({
    mutationFn: (body: FormData) => putContentMobileToMixed(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 노출 설정 및 해제 mutation */
export const useMutationContentDisplay = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, SetYnBody>
) => {
  return useMutation({
    mutationFn: (body: SetYnBody) => patchContentDisplayYn(body),
    ...options,
  });
};

/** @CONTENT 콘텐츠 최근 검색어 삭제 mutation */
export const useMutationRecentWearchKeywordDelete = (
  options?: UseMutationOptions<ApiResponse<boolean>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: (recentSearchKeywordId: number) => deleteRecentSearchKeyword(recentSearchKeywordId),
    ...options,
  });
};
