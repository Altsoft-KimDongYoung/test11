import { AxiosError } from 'axios';

import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import {
  ContentBoxItemDto,
  ContentBoxListParams,
  ContentBoxListResponse,
} from '@/ondaji/types/domain';

import { fetchContentBoxList } from './api';
import { contentboxKeys } from './queryKey';

/** @SIGNAGE 승인된 사이니지 기기목록을 불러오는 훅 */
export const useInfiniteQueryContentBoxList = <T = ContentBoxItemDto[]>(
  params: ContentBoxListParams,
  options?: UseInfiniteQueryOptions<
    ApiResponse<ContentBoxListResponse>,
    AxiosError,
    T,
    ApiResponse<ContentBoxListResponse>,
    ReturnType<typeof contentboxKeys.list>
  >
) => {
  return useInfiniteQuery({
    queryKey: contentboxKeys.list({
      ...params,
    }),
    queryFn: ({ pageParam }) =>
      fetchContentBoxList({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.result.last) return lastPage.result.number + 1;
      else return undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.result.content) as T;
    },
    ...options,
  });
};
