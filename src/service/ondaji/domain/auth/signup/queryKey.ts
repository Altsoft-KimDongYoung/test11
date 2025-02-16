import {
  CheckBusinessParams,
  CheckOrganizationManagerParams,
  OrganizationParams,
  OrganizationParentHierarchyListParams,
  UserCheckDuplicateLoginIdParams,
} from '@/ondaji/types/domain';

export const authKeys = {
  all: ['auth'] as const,
  checkDuplicateLoginId: (params: UserCheckDuplicateLoginIdParams) =>
    [...authKeys.all, 'checkDuplicateLoginId', { params }] as const,
  organizationApartment: (params: OrganizationParams) =>
    [...authKeys.all, 'organizationApartment', { params }] as const,
  organizationGvmt: (params: OrganizationParams) =>
    [...authKeys.all, 'organizationGvmt', { params }] as const,
  organizationParentHierarchyList: (params: OrganizationParentHierarchyListParams) =>
    [...authKeys.all, 'organizationParentHierarchyList', { params }] as const,
  /**
   * @TODO: AUTH 해당 쿼리를 필요로 하는 API가 없어졌을 경우, 삭제가 필요합니다.
   * 4.0 -> 4.1 버전 마이그레이션으로 인한 삭제 대상
   */
  checkBusiness: (params: CheckBusinessParams) =>
    [...authKeys.all, 'checkBusiness', { params }] as const,
  checkOrganizationManager: (params: CheckOrganizationManagerParams) =>
    [...authKeys.all, 'checkOrganizationManager', { params }] as const,
  randomNickname: () => [...authKeys.all, 'randomNickname'] as const,
} as const;
