import { API_URL } from '@/ondaji/constants/apiUrl';
import { LoginBody, LoginResponse } from '@/ondaji/types/domain';

import { Post } from '../../../common/method';

/** @AUTH 로그인 */
export const postLogin = async (body: LoginBody) => {
  const { data } = await Post<LoginResponse>(API_URL.AUTH.LOGIN, body);

  return data;
};
