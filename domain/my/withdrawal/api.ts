import { API_URL } from '@/ondaji/constants/apiUrl';
import { WithdrawalBody, WithdrawalResponse } from '@/ondaji/types/domain';

import { Delete, Fetch } from '../../../common/method';

/** @MY 회원탈퇴 */
export const deleteUserWithdrawal = async (body: WithdrawalBody) => {
  const { data } = await Delete<WithdrawalResponse>(API_URL.USER.WITHDRAWAL, {
    data: body,
  });

  return data;
};

/** @MY 탈퇴예정인 회원인지 아닌지 조회 */
export const fetchUserDeletionStatus = async () => {
  const { data } = await Fetch<WithdrawalResponse>(API_URL.USER.WITHDRAWAL);

  return data;
};
