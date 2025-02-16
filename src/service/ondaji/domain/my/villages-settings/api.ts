import { Patch } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import { PatchUserLocationBody } from '@/ondaji/types/domain';

/** @MY 동네 설정 하는 API */
export const patchUserLocation = async (body: PatchUserLocationBody) => {
  const { data } = await Patch<boolean>(API_URL.LOCALBOX.MY_TOWN, body);

  return data;
};
