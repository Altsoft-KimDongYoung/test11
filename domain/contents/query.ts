import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { ApiResponse, Pagenation } from '@/ondaji/types/common';
import {
  Banner,
  ContentCommentResponse,
  ContentCountParams,
  ContentDetailDto,
  ContentReplyListParams,
  ContentsType,
  ContentTempContent,
  ContentTempResponse,
  ContentUpdateableAndDeletableResponse,
  HashTagDTO,
  HashTagListParams,
  HashTagListResponse,
  RecentKeywordDTO,
  SubContentPostingCountResponse,
} from '@/ondaji/types/domain';

import { adKeys } from './ads';
import {
  fetchBanner,
  fetchContentCount,
  fetchContentReply,
  fetchContents,
  fetchContentTemp,
  fetchContentUpdateAndDelete,
  fetchHashTag,
  fetchRecentSearchKeyword,
  fetchSubContentPostingCount,
  patchBanner,
} from './api';
import { contentsKeys } from './queryKey';
import { residentKeys } from './residents';
import { villageKeys } from './villages';

/** @CONTENT 임시저장 목록 조회 쿼리 */
export const useQueryTemporaryContents = (
  params?: Pagenation,
  options?: UseQueryOptions<
    ContentTempResponse,
    AxiosError,
    ContentTempContent,
    ReturnType<typeof contentsKeys.temporary>
  >
) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: contentsKeys.temporary(),
    queryFn: ({ pageParam }) =>
      fetchContentTemp({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      return undefined;
    },
    select: (data) => {
      const content = data.pages.flatMap((page) => page.result.content);
      const totalElements = data.pages[0].result.totalElements ?? 0;
      return { content, totalElements };
    },
  });
  return { data, ...rest };
};

/** @CONTENT 콘텐츠 목록에 보여지는 배너 조회 쿼리 */
export const useQueryBannerList = (
  options?: UseQueryOptions<
    ApiResponse<Banner[]>,
    AxiosError,
    Banner[],
    ReturnType<typeof contentsKeys.bannerList>
  >
) => {
  return useQuery({
    queryKey: contentsKeys.bannerList(),
    queryFn: () => fetchBanner(),
    select: (data) => data.result,
    ...options,
  });
};

/** @COTENT 콘텐츠 목록에 보여지는 배너 클릭시 클릭수를 카운팅하는 쿼리 */
export const useQueryBannerCount = (
  id: number,
  options?: UseQueryOptions<
    ApiResponse<Banner[]>,
    AxiosError,
    Banner[],
    ReturnType<typeof contentsKeys.banner>
  >
) => {
  return useQuery({
    queryKey: contentsKeys.banner(id),
    queryFn: () => patchBanner({ id }),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 콘텐츠 상세페이지 조회 쿼리 */
export const useQueryContentDetail = (
  contentId: number,
  contentType: ContentsType,
  options?: UseQueryOptions<
    ApiResponse<ContentDetailDto>,
    Error,
    ContentDetailDto,
    ReturnType<typeof villageKeys.detail | typeof residentKeys.detail | typeof adKeys.detail>
  >
) => {
  return useQuery({
    queryKey:
      contentType === 'VILLAGE_NEWS'
        ? villageKeys.detail(contentId)
        : contentType === 'RESIDENT_NEWS'
        ? residentKeys.detail(contentId)
        : adKeys.detail(contentId),
    queryFn: () => fetchContents(contentId),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 콘텐츠 댓글 목록 조회 쿼리 */
export const useQueryContentComment = (
  params: ContentReplyListParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ContentCommentResponse>,
      AxiosError,
      Pick<ContentCommentResponse, 'content' | 'totalElements'>,
      ApiResponse<ContentCommentResponse>,
      ReturnType<typeof contentsKeys.comment>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: contentsKeys.comment(params),
    queryFn: ({ pageParam }) =>
      fetchContentReply({
        ...params,
        page: pageParam as number,
        sort: params.sort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      return undefined;
    },
    select: (data) => {
      return {
        content: data.pages.flatMap((page) => page.result.content),
        totalElements: data.pages[0].result.totalElements ?? 0,
      };
    },
    refetchOnMount: true,
    ...options,
  });
};

/** @CONTENT 로컬박스의 콘텐츠 개수 조회 쿼리 */
export const useQueryContentCount = (
  params: ContentCountParams,
  options?: UseQueryOptions<
    ApiResponse<number>,
    AxiosError,
    number,
    ReturnType<typeof contentsKeys.contentCount>
  >
) => {
  return useQuery({
    queryKey: contentsKeys.contentCount(),
    queryFn: () => fetchContentCount(params),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 최근 검색어 조회 쿼리 */
export const useQueryRecentSearchKeyword = (
  options?: UseQueryOptions<
    ApiResponse<RecentKeywordDTO[]>,
    AxiosError,
    RecentKeywordDTO[],
    ReturnType<typeof contentsKeys.recentSearchKeyword>
  >
) => {
  return useQuery({
    queryKey: contentsKeys.recentSearchKeyword(),
    queryFn: () => fetchRecentSearchKeyword(),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 콘텐츠 삭제&수정 가능 여부 조회 쿼리 */
export const useQueryContentUpdateAndDelete = (
  contentId: number,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<ContentUpdateableAndDeletableResponse>,
      AxiosError,
      ContentUpdateableAndDeletableResponse,
      ReturnType<typeof contentsKeys.detail>
    >
  >
) => {
  return useQuery({
    queryKey: contentsKeys.detail(contentId),
    queryFn: () => fetchContentUpdateAndDelete(contentId),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 서브컨텐츠 포스팅 갯수 조회 쿼리 */
export const useQuerySubContentPostingCount = (
  options?: UseQueryOptions<
    ApiResponse<SubContentPostingCountResponse>,
    AxiosError,
    SubContentPostingCountResponse,
    ReturnType<typeof contentsKeys.subContentPostingCount>
  >
) => {
  return useQuery({
    queryKey: contentsKeys.subContentPostingCount(),
    queryFn: () => fetchSubContentPostingCount(),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 해시태그 목록 조회 */
export const useInfiniteQueryHashTagList = (
  params: HashTagListParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<HashTagListResponse>,
      AxiosError,
      HashTagDTO[],
      ApiResponse<HashTagListResponse>,
      ReturnType<typeof contentsKeys.hashTag>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: contentsKeys.hashTag(params),
    queryFn: ({ pageParam }) => fetchHashTag({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => pages.flatMap(({ result }) => result.content),
    ...options,
  });
};
