import { API_URL } from '@/ondaji/constants/apiUrl';

import { Fetch } from '../../../common/method';

/** @MY 사이니지 핀코드 조회 */
export const fetchSignageAppPinCode = async () => {
  const { data } = await Fetch<string>(API_URL.LOCALBOX.SIGNAGE_PIN_CODE);

  return data;
};
