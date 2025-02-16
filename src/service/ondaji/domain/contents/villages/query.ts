import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  ComplainCanContentLocalityResponse,
  ContentDisplayAreaInfo,
  ContentDisplayAreaParams,
  ContentListDto,
  ContentListParams,
  ContentListResponse,
} from '@/ondaji/types/domain';

import {
  fetchComplainCanContentLocality,
  fetchContentDisplayArea,
  fetchContentMainVillage,
  fetchLocalboxMyTown,
} from './api';
import { villageKeys } from './queryKey';

/** @CONTENT 로컬박스 동네영역 조회 쿼리 */
export const useQueryMultipolygonInfoVillages = (
  options?: UseQueryOptions<
    ApiResponse<string>,
    AxiosError,
    string,
    ReturnType<typeof villageKeys.multiPolygon>
  >
) => {
  return useQuery({
    queryKey: villageKeys.multiPolygon(),
    queryFn: () => fetchLocalboxMyTown(),
    select: (data) => JSON.parse(data.result),
    ...options,
  });
};

/** @CONTENT 콘텐츠 노출 지역 조회 쿼리 */
export const useQueryContentExpose = (
  params: ContentDisplayAreaParams,
  options?: UseQueryOptions<
    ApiResponse<ContentDisplayAreaInfo>,
    AxiosError,
    ContentDisplayAreaInfo,
    ReturnType<typeof villageKeys.contentExpose>
  >
) => {
  return useQuery({
    queryKey: villageKeys.contentExpose(params),
    queryFn: () => fetchContentDisplayArea(params),
    select: (data) => data.result,
    ...options,
  });
};

/** @CONTENT 동네소식 목록 조회 쿼리 */
export const useQueryVillageNewsLists = <T = ContentListDto[]>(
  params: ContentListParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ContentListResponse>,
      AxiosError,
      T,
      ApiResponse<ContentListResponse>,
      ReturnType<typeof villageKeys.list>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: villageKeys.list({
      ...params,
    }),
    queryFn: ({ pageParam }) =>
      fetchContentMainVillage({
        ...params,
        page: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      return undefined;
    },
    select: (data) => {
      const uniqueContents: ContentListDto[] = [];
      const contentIdSet = new Set();

      data.pages
        .flatMap((page) => page.result.content)
        .forEach((content) => {
          if (!contentIdSet.has(content.contentId)) {
            contentIdSet.add(content.contentId);
            uniqueContents.push(content);
          }
        });

      return uniqueContents as T;
    },
    ...options,
  });
};

/** @CONTENT 콘텐츠 지역성 신고 가능 여부 쿼리 */
export const useQueryComplainCanContentLocality = (
  contentId: number,
  options?: UseQueryOptions<
    ApiResponse<ComplainCanContentLocalityResponse>,
    Error,
    ComplainCanContentLocalityResponse,
    ReturnType<typeof villageKeys.complain>
  >
) => {
  return useQuery({
    queryKey: villageKeys.complain(contentId),
    queryFn: () => fetchComplainCanContentLocality(contentId),
    select: (data) => data.result,
    ...options,
  });
};
