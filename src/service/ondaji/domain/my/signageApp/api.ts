import { Fetch } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';

/** @MY 사이니지 핀코드 조회 */
export const fetchSignageAppPinCode = async () => {
  const { data } = await Fetch<string>(API_URL.LOCALBOX.SIGNAGE_PIN_CODE);

  return data;
};
