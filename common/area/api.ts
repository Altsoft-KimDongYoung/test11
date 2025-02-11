import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  AreaPointMyTownParams,
  AreaPointMyTownResponse,
  OrganizationMyTownParams,
} from '@/ondaji/types/common';

import { Fetch } from '../method';

/** @Common 내 동네 영역 조회(Point) */
export const fetchAreaPointMyTown = async (params: AreaPointMyTownParams) => {
  const { data } = await Fetch<AreaPointMyTownResponse>(API_URL.AREA.POINT_MY_TOWN, { params });

  return data;
};

/** @AUTH 내 동네 영역 조회 (OrganizationId) */
export const fetchOrganizationMyTown = async (params: OrganizationMyTownParams) => {
  const { data } = await Fetch<AreaPointMyTownResponse>(API_URL.AREA.ORGANIZATION_MY_TOWN, {
    params,
  });

  return data;
};
