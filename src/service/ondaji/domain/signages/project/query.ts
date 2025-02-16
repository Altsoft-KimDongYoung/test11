import { AxiosError } from 'axios';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { ApiResponse } from '@/ondaji/types/common';
import {
  ContentListCanRegisterParams,
  ContentListCanRegisterResponse,
  GroupCount,
  GroupExecuteProject,
  IsUniqueContentResponse,
  ListOfContentBelongProjectParams,
  ListOfGroupExecuteProjectParams,
  Project,
  ProjectCanRegisterContent,
  ProjectDetail,
  ProjectDetailParams,
  ProjectListParams,
  ProjectListResponse,
  SignageContentInfo,
} from '@/ondaji/types/domain/signages/project';

import {
  fetchContentListCanRegister,
  fetchIsUniqueContent,
  fetchListOfContentBelongProject,
  fetchListOfGroupExecuteProject,
  fetchPaidGroupCount,
  fetchProjectDetail,
  fetchProjectList,
  fetchSignageContentPreview,
} from './api';
import { projectKeys } from './queryKey';

/** @SIGNAGE 사이니지 프로젝트 목록 데이터를 가져오는 훅 */
export const useInfiniteQueryProjectList = <T = Project[]>(
  params: Omit<ProjectListParams, 'page' | 'size'>,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ProjectListResponse>,
      AxiosError,
      T,
      ApiResponse<ProjectListResponse>,
      ReturnType<typeof projectKeys.list>
    >
  >
) => {
  const size = 10;

  return useInfiniteQuery({
    queryKey: projectKeys.list({
      size,
      ratioType: params.ratioType,
      sort: params.sort,
    }),
    queryFn: ({ pageParam }) =>
      fetchProjectList({
        page: pageParam as number,
        size,
        ratioType: params.ratioType,
        sort: params.sort,
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

/** @SIGNAGE 사이니지 프로젝트에 등록할 수 있는 컨텐츠의 목록을 가져오는 훅 테스22*/
export const useInfiniteQueryContentListCanRegister = <T = ProjectCanRegisterContent[]>(
  params: Omit<ContentListCanRegisterParams, 'page' | 'size'>,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ContentListCanRegisterResponse>,
      AxiosError,
      T,
      ApiResponse<ContentListCanRegisterResponse>,
      ReturnType<typeof projectKeys.content_list_can_register>
    >
  >
) => {
  const size = 100;

  return useInfiniteQuery({
    queryKey: projectKeys.content_list_can_register({
      size,
      ratioType: params.ratioType,
    }),
    queryFn: ({ pageParam }) =>
      fetchContentListCanRegister({
        page: pageParam as number,
        size,
        ratioType: params.ratioType,
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

/** @SIGNAGE 사이니지 프로젝트에 등록할 수 있는 컨텐츠를 상세보기 하는 훅 */
export const useQuerySignageContentPreview = <T = SignageContentInfo>(
  contentId: string,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<SignageContentInfo>,
      AxiosError,
      T,
      ReturnType<typeof projectKeys.signage_content_preview>
    >
  >
) => {
  return useQuery({
    queryKey: projectKeys.signage_content_preview(contentId),
    queryFn: () => fetchSignageContentPreview(contentId),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE 결제된 사이니지 그룹을 count 하는 훅 */
export const useQueryPaidGroupCount = <T = GroupCount[]>(
  options?: Partial<
    UseQueryOptions<
      ApiResponse<GroupCount[]>,
      AxiosError,
      T,
      ReturnType<typeof projectKeys.paid_group_count>
    >
  >
) => {
  return useQuery({
    queryKey: projectKeys.paid_group_count(),
    queryFn: fetchPaidGroupCount,
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE 프로젝트를 사용하는 그룹들 조회 훅 */
export const useQueryListOfGroupExecuteProject = <T = GroupExecuteProject[]>(
  params: ListOfGroupExecuteProjectParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<GroupExecuteProject[]>,
      AxiosError,
      T,
      ReturnType<typeof projectKeys.list_of_group_execute_project>
    >
  >
) => {
  return useQuery({
    queryKey: projectKeys.list_of_group_execute_project(params.projectId),
    queryFn: () => fetchListOfGroupExecuteProject(params),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE 프로젝트를 사용하는 그룹들 조회 훅 */
export const useQueryProjectDetail = <T = ProjectDetail>(
  params: ProjectDetailParams,
  options?: Partial<
    UseQueryOptions<
      ApiResponse<ProjectDetail>,
      AxiosError,
      T,
      ReturnType<typeof projectKeys.detail>
    >
  >
) => {
  return useQuery({
    queryKey: projectKeys.detail(params.projectId),
    queryFn: () => fetchProjectDetail(params),
    select: (data) => data.result as T,
    ...options,
  });
};

/** @SIGNAGE 사이니지 프로젝트에 등록할 수 있는 컨텐츠의 목록을 가져오는 훅 */
export const useInfiniteQueryListOfContentBelongProject = <T = ProjectCanRegisterContent[]>(
  params: Omit<ListOfContentBelongProjectParams, 'page' | 'size'>,
  options?: Partial<
    UseInfiniteQueryOptions<
      ApiResponse<ContentListCanRegisterResponse>,
      AxiosError,
      T,
      ApiResponse<ContentListCanRegisterResponse>,
      ReturnType<typeof projectKeys.list_of_content_belong_project>
    >
  >
) => {
  const size = 100;

  return useInfiniteQuery({
    queryKey: projectKeys.list_of_content_belong_project({
      projectId: params.projectId,
      size,
    }),
    queryFn: ({ pageParam }) =>
      fetchListOfContentBelongProject({
        projectId: params.projectId,
        size,
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

export const useQueryIsUniqueContent = (
  contentId: number,
  options?: UseQueryOptions<
    ApiResponse<IsUniqueContentResponse>,
    AxiosError,
    IsUniqueContentResponse,
    ReturnType<typeof projectKeys.is_unique_content>
  >
) => {
  return useQuery({
    queryKey: projectKeys.is_unique_content(),
    queryFn: () => fetchIsUniqueContent(contentId),
    select: (data) => data.result,
    ...options,
  });
};
