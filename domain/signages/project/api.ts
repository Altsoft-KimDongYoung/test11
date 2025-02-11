import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  ContentListCanRegisterParams,
  ContentListCanRegisterResponse,
  DeleteProjectParams,
  EditProjectRequestBody,
  GroupCount,
  GroupExecuteProject,
  IsUniqueContentResponse,
  ListOfContentBelongProjectParams,
  ListOfGroupExecuteProjectParams,
  ProjectDetail,
  ProjectDetailParams,
  ProjectListParams,
  ProjectListResponse,
  RegisterProjectRequestBody,
  SignageContentInfo,
} from '@/ondaji/types/domain/signages/project';

import { Delete, Fetch, Post, Put } from '../../../common/method';

/** @SIGNAGE 사이니지 프로젝트 목록 데이터를 가져오는 API */
export const fetchProjectList = async (params: ProjectListParams) => {
  const { data } = await Fetch<ProjectListResponse>(API_URL.SIGNAGES.PROJECT.LIST, {
    params,
  });

  return data;
};

/** @SIGNAGE 사이니지 프로젝트 이름의 중복을 검사하는 API */
export const fetchNameDuplicateCheck = async (params: { projectName: string }) => {
  const { data } = await Fetch<boolean>(API_URL.SIGNAGES.PROJECT.NAME_DUPLICATE_CHECK, {
    params,
  });

  return data;
};

/** @SIGNAGE 사이니지 프로젝트에 등록할 수 있는 컨텐츠의 목록을 가져오는 API */
export const fetchContentListCanRegister = async (params: ContentListCanRegisterParams) => {
  const { data } = await Fetch<ContentListCanRegisterResponse>(
    API_URL.SIGNAGES.PROJECT.CONTENT_CAN_REGISTER,
    {
      params,
    }
  );

  return data;
};

/** @SIGNAGE 사이니지 프로젝트에 등록할 수 있는 컨텐츠를 상세보기 하는 API */
export const fetchSignageContentPreview = async (contentId: string) => {
  const { data } = await Fetch<SignageContentInfo>(
    API_URL.SIGNAGES.PROJECT.SIGNAGE_CONTENT_PREVIEW(contentId)
  );

  return data;
};

/** @SIGNAGE 사이니지 프로젝트를 등록하는 API */
export const postRegisterProject = async (body: RegisterProjectRequestBody) => {
  const { data } = await Post<boolean>(API_URL.SIGNAGES.PROJECT.REGISTER, body);

  return data;
};

/** @SIGNAGE 결제된 사이니지 그룹을 count 하는 API */
export const fetchPaidGroupCount = async () => {
  const { data } = await Fetch<GroupCount[]>(API_URL.SIGNAGES.PROJECT.PAID_GROUP_COUNT);

  return data;
};

/** @SIGNAGE 사이니지 프로젝트를 삭제하는 API */
export const deleteProject = async (params: DeleteProjectParams) => {
  const { projectId } = params;

  const { data } = await Delete<boolean>(API_URL.SIGNAGES.PROJECT.DELETE(projectId));

  return data;
};

/** @SIGNAGE 프로젝트를 사용하는 그룹들 조회 API */
export const fetchListOfGroupExecuteProject = async (params: ListOfGroupExecuteProjectParams) => {
  const { data } = await Fetch<GroupExecuteProject[]>(
    API_URL.SIGNAGES.PROJECT.LIST_OF_GROUP_EXECUTE_PROJECT(params.projectId)
  );

  return data;
};

/** @SIGNAGE 프로젝트의 정보를 상세 조회하는 API */
export const fetchProjectDetail = async (params: ProjectDetailParams) => {
  const { data } = await Fetch<ProjectDetail>(API_URL.SIGNAGES.PROJECT.DETAIL(params.projectId));

  return data;
};

/** @SIGNAGE 사이니지 프로젝트를 수정하는 API */
export const putEditProject = async (body: EditProjectRequestBody) => {
  const { data } = await Put<boolean>(API_URL.SIGNAGES.PROJECT.REGISTER, body);

  return data;
};

/** @SIGNAGE 프프로젝트에 포함된 컨텐츠 조회 API */
export const fetchListOfContentBelongProject = async (params: ListOfContentBelongProjectParams) => {
  const { data } = await Fetch<ContentListCanRegisterResponse>(
    API_URL.SIGNAGES.PROJECT.LIST_OF_CONTENT_BELONG_PROJECT(params.projectId)
  );

  return data;
};

/** @SIGNAGE 프로젝트에 소속된 콘텐츠가 프로젝트에 유일하게 소속되었는지 여부 조회 API */
export const fetchIsUniqueContent = async (contentId: number) => {
  const { data } = await Fetch<IsUniqueContentResponse>(
    API_URL.SIGNAGES.PROJECT.IS_UNIQUE_CONTENT(contentId)
  );

  return data;
};
