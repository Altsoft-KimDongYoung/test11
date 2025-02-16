import { Post } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import { LoginBody, LoginResponse } from '@/ondaji/types/domain';

/** @AUTH 로그인 */
export const postLogin = async (body: LoginBody) => {
  const { data } = await Post<LoginResponse>(API_URL.AUTH.LOGIN, body);

  return data;
};
