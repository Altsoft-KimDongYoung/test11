import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { AdministrativeDistrictPercentage, ApiResponse } from '@/ondaji/types/common';
import type {
  LocalboxContentDTO,
  LocalboxContentResponse,
  LocalboxDetailResponse,
  LocalboxFollowersDTO,
  LocalboxFollowersParams,
  LocalboxFollowersResponse,
  LocalboxFollowingDTO,
  LocalboxFollowingResponse,
  LocalboxInfoResponse,
  LocalboxIntroResponse,
  LocalboxListDTO,
  LocalboxListParams,
  LocalboxListResponse,
  LocalboxMyContentParams,
  LocalboxOtherContentParams,
  LocalboxOverviewReponse,
  LocalboxTopPinnedContentDTO,
  VisitTownDTO,
} from '@/ondaji/types/domain';

import {
  fetchLocalboxContentBeopPercentage,
  fetchLocalboxDetail,
  fetchLocalboxFollowers,
  fetchLocalboxFollowing,
  fetchLocalboxInfo,
  fetchLocalboxIntro,
  fetchLocalboxList,
  fetchLocalboxMyContent,
  fetchLocalboxOtherContent,
  fetchLocalboxOverview,
  fetchLocalboxRecentVisitTown,
  fetchLocalboxTopPinnedContent,
} from './api';
import { localboxKeys } from './queryKey';

/** @LOCALBOX 최근 동네 방문 이력 조회 */
export const useQueryRecentVisitTownList = (
  options?: UseQueryOptions<
    ApiResponse<VisitTownDTO[]>,
    AxiosError,
    VisitTownDTO[],
    ReturnType<typeof localboxKeys.visitTown>
  >
) => {
  return useQuery({
    queryKey: localboxKeys.visitTown(),
    queryFn: () => fetchLocalboxRecentVisitTown(),
    select: ({ result }) => result,
    ...options,
  });
};

/** @LOCALBOX 내 로컬박스 기본 정보 조회 */
export const useQueryLocalboxInfo = (
  options?: UseQueryOptions<
    ApiResponse<LocalboxInfoResponse>,
    AxiosError,
    LocalboxInfoResponse,
    ReturnType<typeof localboxKeys.myElement>
  >
) => {
  return useQuery({
    queryKey: localboxKeys.myElement(),
    queryFn: () => fetchLocalboxInfo(),
    select: ({ result }) => result,
    ...options,
  });
};

/**
 * @LOCALBOX
 * @Params localboxId
 * @Return localboxCreatorType, organizationId
 * @로컬박스_상세_조회_API와 현재 중복 사용중
 * TODO: 추후 API 분리 필요 (백엔드측에 요청)
 * */
export const useQueryLocalboxCreatorTypeAndOrgId = (
  localboxId: number,
  options?: UseQueryOptions<
    ApiResponse<LocalboxDetailResponse>,
    AxiosError,
    Pick<LocalboxDetailResponse, 'localboxCreatorType' | 'organizationId'>,
    ReturnType<typeof localboxKeys.detail>
  >
) => {
  return useQuery({
    queryKey: localboxKeys.detail(localboxId),
    queryFn: () => fetchLocalboxDetail(localboxId),
    select: ({ result }) => {
      return {
        localboxCreatorType: result.localboxCreatorType,
        organizationId: result.organizationId,
      };
    },
    ...options,
  });
};

/** @LOCALBOX 로컬박스 상세 조회 */
export const useQueryLocalboxDetail = (
  localboxId: number,
  options?: UseQueryOptions<
    ApiResponse<LocalboxDetailResponse>,
    AxiosError,
    LocalboxDetailResponse,
    ReturnType<typeof localboxKeys.detail>
  >
) => {
  return useQuery({
    queryKey: localboxKeys.detail(localboxId),
    queryFn: () => fetchLocalboxDetail(localboxId),
    select: ({ result }) => result,
    ...options,
  });
};

/** @LOCALBOX 로컬박스 법정동별 백분율 */
export const useQueryLocalboxContentBeopPercentage = (
  localboxId: number,
  options?: UseQueryOptions<
    ApiResponse<AdministrativeDistrictPercentage[]>,
    AxiosError,
    AdministrativeDistrictPercentage[],
    ReturnType<typeof localboxKeys.contentBeopPercentage>
  >
) => {
  return useQuery({
    queryKey: localboxKeys.contentBeopPercentage(localboxId),
    queryFn: () => fetchLocalboxContentBeopPercentage(localboxId),
    select: ({ result }) => result,
    ...options,
  });
};

/** @LOCALBOX 로컬박스 상단 고정 콘텐츠 목록 조회 */
export const useQueryLocalboxTopPinnedContent = (
  localboxId: number,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<LocalboxTopPinnedContentDTO[]>,
      AxiosError,
      LocalboxTopPinnedContentDTO[],
      ReturnType<typeof localboxKeys.topPinnedContent>
    >
  >
) => {
  return useQuery({
    queryKey: localboxKeys.topPinnedContent(localboxId),
    queryFn: () => fetchLocalboxTopPinnedContent(localboxId),
    select: ({ result }) => result,
    ...options,
  });
};

/** @LOCALBOX 타 로컬박스 콘텐츠 목록 조회 */
export const useInfiniteQueryLocalboxOtherContent = (
  params: LocalboxOtherContentParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<LocalboxContentResponse>,
      AxiosError,
      LocalboxContentDTO[],
      ApiResponse<LocalboxContentResponse>,
      ReturnType<typeof localboxKeys.otherList>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: localboxKeys.otherList(params),
    queryFn: ({ pageParam }) => fetchLocalboxOtherContent({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => pages.flatMap(({ result }) => result.content),
    ...options,
  });
};

/** @LOCALBOX 내 로컬박스 콘텐츠 목록 조회 */
export const useInfiniteQueryLocalboxMyContent = (
  params: LocalboxMyContentParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<LocalboxContentResponse>,
      AxiosError,
      LocalboxContentDTO[],
      ApiResponse<LocalboxContentResponse>,
      ReturnType<typeof localboxKeys.ownList>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: localboxKeys.ownList(params),
    queryFn: ({ pageParam }) =>
      fetchLocalboxMyContent({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => pages.flatMap(({ result }) => result.content),
    ...options,
  });
};

/** @LOCALBOX 로컬박스 소개글 조회 쿼리 */
export const useQueryLocalboxIntro = <T = LocalboxIntroResponse>(
  targetLocalboxId: number,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<LocalboxIntroResponse>,
      AxiosError,
      T,
      ReturnType<typeof localboxKeys.intro>
    >
  >
) => {
  return useQuery({
    queryKey: localboxKeys.intro(targetLocalboxId),
    queryFn: () => fetchLocalboxIntro(targetLocalboxId),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @LOCALBOX 로컬박스 팔로워 조회 */
export const useInfiniteQueryLocalboxFollowers = (
  params: LocalboxFollowersParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<LocalboxFollowersResponse>,
      AxiosError,
      LocalboxFollowersDTO,
      ApiResponse<LocalboxFollowersResponse>,
      ReturnType<typeof localboxKeys.followers>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: localboxKeys.followers(params.targetLocalboxId),
    queryFn: ({ pageParam = 0 }) =>
      fetchLocalboxFollowers({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => ({
      totalFollowersCount: pages[0].result.totalFollowersCount,
      content: pages.flatMap(({ result }) => result.content),
    }),
    ...options,
  });
};

/** @LOCALBOX 로컬박스 팔로잉 조회 */
export const useInfiniteQueryLocalboxFollowing = (
  params: LocalboxFollowersParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<LocalboxFollowingResponse>,
      AxiosError,
      LocalboxFollowingDTO,
      ApiResponse<LocalboxFollowingResponse>,
      ReturnType<typeof localboxKeys.following>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: localboxKeys.following(params.targetLocalboxId),
    queryFn: ({ pageParam = 0 }) =>
      fetchLocalboxFollowing({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => ({
      totalFollowingCount: pages[0].result.totalFollowingCount,
      content: pages.flatMap(({ result }) => result.content),
    }),
    ...options,
  });
};

/** @LOCALBOX 로컬박스 목록 조회 */
export const useInfiniteQueryLocalboxList = (
  params: LocalboxListParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<LocalboxListResponse>,
      AxiosError,
      LocalboxListDTO[],
      ApiResponse<LocalboxListResponse>,
      ReturnType<typeof localboxKeys.localboxList>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: localboxKeys.localboxList(params),
    queryFn: ({ pageParam }) => fetchLocalboxList({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: ({ pages }) => pages.flatMap(({ result }) => result.content),
    ...options,
  });
};

/** @LOCALBOX 로컬박스 기본정보 조회 */
export const useQueryLocalboxOverView = (
  targetLocalboxId: number,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<LocalboxOverviewReponse>,
      AxiosError,
      LocalboxOverviewReponse,
      ReturnType<typeof localboxKeys.localboxOverview>
    >
  >
) => {
  return useQuery({
    queryKey: localboxKeys.localboxOverview(),
    queryFn: () => fetchLocalboxOverview(targetLocalboxId),
    select: (data) => data.result,
    ...options,
  });
};
