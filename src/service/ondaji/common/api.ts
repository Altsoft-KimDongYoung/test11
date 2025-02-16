import { Post } from '@/internal/method';
import { API_URL } from '@/ondaji/constants/apiUrl';
import {
  LogoutBody,
  RenewRefreshTokenBody,
  RenewRefreshTokenResponse,
} from '@/ondaji/types/common';

/** @Common 토큰 재발급  */
export const postRenewRefreshToken = async (body: RenewRefreshTokenBody) => {
  const { data } = await Post<RenewRefreshTokenResponse>(API_URL.AUTH.REFRESH_TOKEN, body);
  return data;
};

/** @Common 로그아웃 */
export const postLogout = async (body: LogoutBody) => {
  const { data } = await Post<boolean>(API_URL.AUTH.LOGOUT, body);

  return data;
};
