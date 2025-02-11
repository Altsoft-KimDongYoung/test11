import { API_URL } from '@/ondaji/constants/apiUrl';
import { Pagenation } from '@/ondaji/types/common';
import {
  CardInfo,
  PaymentHistoryResponse,
  PaymentInfoBody,
} from '@/ondaji/types/domain/my/payment/payment';

import { Delete, Fetch, Post } from '../../../common/method';

/** @PAYMENT 카드 정보 등록 */
export const postPaymentInfo = async (body: PaymentInfoBody) => {
  const { data } = await Post<boolean>(API_URL.MY.PAYMENT.REGISTER, body);
  return data;
};

/** @PAYMENT 카드 정보 조회 */
export const fetchPaymentInfo = async () => {
  const { data } = await Fetch<CardInfo[]>(API_URL.MY.PAYMENT.CARD_LIST);
  return data;
};

/** @PAYMENT 결제 내역 조회 */
export const fetchPaymentHistory = async (params: Pagenation) => {
  const { data } = await Fetch<PaymentHistoryResponse>(API_URL.MY.PAYMENT.HISTORY, { params });
  return data;
};

/** @PAYMENT 카드 정보 삭제 */
export const deletePaymentInfo = async (id: number) => {
  const { data } = await Delete<boolean>(API_URL.MY.PAYMENT.DELETE(id));
  return data;
};
