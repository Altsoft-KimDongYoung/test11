import { AreaPointMyTownParams, OrganizationMyTownParams } from '@/ondaji/types/common';

export const areaKeys = {
  all: ['area'] as const,
  pointMyTown: (params: AreaPointMyTownParams) =>
    [...areaKeys.all, 'pointMyTown', { params }] as const,
  organizationMyTown: (params: OrganizationMyTownParams) =>
    [...areaKeys.all, 'organizationMyTown', { params }] as const,
};
