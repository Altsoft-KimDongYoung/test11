import { API_URL } from '@/ondaji/constants/apiUrl';
import { Pagenation } from '@/ondaji/types/common';
import {
  Banner,
  BannerBody,
  ComplainContentBody,
  ComplainContentReplyBody,
  ContentCommentResponse,
  ContentCountParams,
  ContentDetailDto,
  ContentRegisterResponse,
  ContentReplyBody,
  ContentReplyEditBody,
  ContentReplyLikeBody,
  ContentReplyListParams,
  ContentTempItem,
  ContentTempResponse,
  ContentUpdateableAndDeletableResponse,
  HashTagListParams,
  HashTagListResponse,
  RecentKeywordDTO,
  SetYnBody,
  SubContentPostingCountResponse,
} from '@/ondaji/types/domain';

import { Delete, Fetch, Patch, Post, Put } from '../../common/method';

/** @CONTENT 콘텐츠에 들어가는 대표이미지 등록 api */
export const postContentFile = async (body: FormData) => {
  const { data } = await Post<string>(API_URL.CONTENT.FILE, body, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

  return data;
};

/** @CONTENT 임시저장 목록 조회 api */
export const fetchContentTemp = async (params: Pagenation) => {
  const { data } = await Fetch<ContentTempResponse>(API_URL.CONTENT_TEMP.BASE, {
    params,
  });

  return data;
};

/** @CONTENT 임시저장 상세 조회 api */
export const fetchContentTempId = async (contentTempId: number) => {
  const { data } = await Fetch<ContentTempItem>(API_URL.CONTENT_TEMP.ITEM(contentTempId));

  return data;
};

/** @CONTENT 임시저장 삭제 api */
export const deleteContentTemp = async (contentTempIds: string | number) => {
  const { data } = await Delete<boolean>(API_URL.CONTENT_TEMP.ITEMS(contentTempIds));

  return data;
};

/** @CONTENT 콘텐츠 좋아요 api */
export const postContentLike = async (body: SetYnBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.LIKE, body);

  return data;
};

/** @CONTENT 콘텐츠 싫어요 api */
export const postContentDislike = async (body: SetYnBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.DISLIKE, body);

  return data;
};

/** @CONTENT 콘텐츠 북마크 api */
export const postContentBookmark = async (body: SetYnBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.BOOKMARK, body);

  return data;
};

/** @CONTENT 콘텐츠 목록에 보여지는 배너 조회 api */
export const fetchBanner = async () => {
  const { data } = await Fetch<Banner[]>(API_URL.BANNER);

  return data;
};

/** @CONTENT 콘텐츠 목록에 보여지는 배너 클릭 시 클릭수를 카운팅하는 api */
export const patchBanner = async (body: BannerBody) => {
  const { data } = await Patch<Banner[]>(API_URL.BANNER_CLICK(body.id), {
    body,
  });

  return data;
};

/** @CONTENT 로컬박스의 콘텐츠 개수 조회 api (주민소식 콘텐츠 작성가능 유저의 주민소식 콘텐츠 등록 여부 판단) */
export const fetchContentCount = async (params: ContentCountParams) => {
  const { data } = await Fetch<number>(API_URL.CONTENT.COUNT, { params });

  return data;
};

/** @CONTENT 콘텐츠 상세 조회 api */
export const fetchContents = async (contentId: number) => {
  const { data } = await Fetch<ContentDetailDto>(API_URL.CONTENT.DETAIL(contentId));
  return data;
};

/** @CONTENT 콘텐츠 댓글 조회 api */
export const fetchContentReply = async (params: ContentReplyListParams) => {
  const { data } = await Fetch<ContentCommentResponse>(API_URL.CONTENT.REPLY.BASE, {
    params,
  });
  return data;
};

/** @CONTENT 콘텐츠 댓글 등록 api */
export const postContentReply = async (body: ContentReplyBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.REPLY.BASE, body);

  return data;
};

/** @CONTENT 콘텐츠 댓글 삭제 api */
export const deleteContentReply = async (contentsReplyId: number) => {
  const { data } = await Delete<string>(API_URL.CONTENT.REPLY.ITEM(contentsReplyId));

  return data;
};

/** @CONTENT 콘텐츠 댓글 좋아요 api */
export const postContentReplyLike = async (body: ContentReplyLikeBody) => {
  const { data } = await Post<boolean>(API_URL.CONTENT.REPLY.LIKE, body);

  return data;
};

/** @CONTENT 콘텐츠 댓글 수정 api */
export const putContentReply = async (body: ContentReplyEditBody) => {
  const { data } = await Put<boolean>(API_URL.CONTENT.REPLY.BASE, body);

  return data;
};

/** @CONTENT 콘텐츠 삭제 api */
export const deleteContent = async (contentId: number) => {
  const { data } = await Delete<boolean>(API_URL.CONTENT.DETAIL(contentId));

  return data;
};

/** @CONTENT 콘텐츠 댓글 신고 api */
export const postComplainContentReply = async (body: ComplainContentReplyBody) => {
  const { data } = await Post<boolean>(API_URL.COMPLAIN.CONTENT_REPLY, body);

  return data;
};

/** @CONTENT 콘텐츠 신고 api */
export const postComplainContent = async (body: ComplainContentBody) => {
  const { data } = await Post<boolean>(API_URL.COMPLAIN.CONTENT, body);

  return data;
};

/** @CONTENT 콘텐츠 삭제&수정 가능 여부 조회 api */
export const fetchContentUpdateAndDelete = async (contentId: number) => {
  const { data } = await Fetch<ContentUpdateableAndDeletableResponse>(
    API_URL.CONTENT.UPDATABLE_DELETABLE(contentId)
  );
  return data;
};

/** @CONTENT 메인콘텐츠 추가제작 api */
export const putContentSignageToMixed = async (body: FormData) => {
  const { data } = await Put<ContentRegisterResponse>(API_URL.CONTENT.TO_MIXED.SIGNAGE, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.result;
};

/** @CONTENT 메인콘텐츠 추가제작 api */
export const putContentMobileToMixed = async (body: FormData) => {
  const { data } = await Put<ContentRegisterResponse>(API_URL.CONTENT.TO_MIXED.MOBILE, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.result;
};

/** @CONTENT 최근 검색어 조회 api */
export const fetchRecentSearchKeyword = async () => {
  const { data } = await Fetch<RecentKeywordDTO[]>(API_URL.CONTENT.RECENT_SEARCH_KEYWORD);

  return data;
};

/** @CONTENT 콘텐츠 노출 설정 및 해제 API */
export const patchContentDisplayYn = async (body: SetYnBody) => {
  const { data } = await Patch<boolean>(API_URL.CONTENT.DISPLAY_YN, body);

  return data;
};

/** @CONTENT 서브컨텐츠 포스팅 갯수 조회 api */
export const fetchSubContentPostingCount = async () => {
  const { data } = await Fetch<SubContentPostingCountResponse>(API_URL.CONTENT.POSTING_COUNT);

  return data;
};

/** @CONTENT 콘텐츠 최근 검색어 삭제 API */
export const deleteRecentSearchKeyword = async (recentSearchKeywordId: number) => {
  const { data } = await Delete<boolean>(
    API_URL.CONTENT.RECENT_SEARCH_KEYWORD_ID(recentSearchKeywordId)
  );

  return data;
};

/** @CONTENT 해시태그 목록 조회 API */
export const fetchHashTag = async (params: HashTagListParams) => {
  const { data } = await Fetch<HashTagListResponse>(API_URL.CONTENT.HASH_TAG, { params });

  return data;
};
