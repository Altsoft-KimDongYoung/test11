import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/ondaji/types/common';
import {
  DeleteProjectParams,
  EditProjectRequestBody,
  RegisterProjectRequestBody,
} from '@/ondaji/types/domain/signages/project';

import { deleteProject, postRegisterProject, putEditProject } from './api';

/** @SIGNAGE 사이니지 프로젝트를 등록하는 훅 */
export const useMutationRegisterProject = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, RegisterProjectRequestBody>
) => {
  return useMutation({
    mutationFn: (body) => postRegisterProject(body),
    ...options,
  });
};

/** @SIGNAGE 사이니지 프로젝트를 삭제하는 훅 */
export const useMutationDeleteProject = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, DeleteProjectParams>
) => {
  return useMutation({
    mutationFn: (params) => deleteProject(params),
    ...options,
  });
};

/** @SIGNAGE 사이니지 프로젝트를 수정하는 훅 */
export const useMutationEditProject = (
  options?: UseMutationOptions<ApiResponse<boolean>, unknown, EditProjectRequestBody>
) => {
  return useMutation({
    mutationFn: (body) => putEditProject(body),
    ...options,
  });
};
