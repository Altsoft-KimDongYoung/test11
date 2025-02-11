import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  ChildOrganizationResponse,
  ContentListDto,
  ContentListParams,
  ContentListResponse,
} from '@/ondaji/types/domain';

import { fetchContentMainResident, fetchLocalboxChildOrganization } from './api';
import { residentKeys } from './queryKey';

/** @CONTENT 주민소식 목록 조회 */
export const useQueryResidentNewsLists = <T = ContentListDto[]>(
  params: ContentListParams,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ContentListResponse>,
      AxiosError,
      T,
      ApiResponse<ContentListResponse>,
      ReturnType<typeof residentKeys.list>
    >
  >
) => {
  return useInfiniteQuery({
    queryKey: residentKeys.list({
      ...params,
    }),
    queryFn: ({ pageParam }) =>
      fetchContentMainResident({
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

/** @CONTENT 담당기관의 산하 기관 조회 (주민소식 콘텐츠 등록 시 사용) */
export const useQueryLocalboxChildOrganization = (
  options?: UseQueryOptions<
    ApiResponse<ChildOrganizationResponse>,
    AxiosError,
    ChildOrganizationResponse,
    ReturnType<typeof residentKeys.childOrganization>
  >
) => {
  return useQuery({
    queryKey: residentKeys.childOrganization(),
    queryFn: () => fetchLocalboxChildOrganization(),
    select: (data) => data.result,
    ...options,
  });
};
