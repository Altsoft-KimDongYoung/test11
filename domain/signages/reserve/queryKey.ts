import { ReservationDateListParams, ReservationListParams } from '@/ondaji/types/domain';

export const reserveKeys = {
  all: ['reserve'] as const,
  date_lists: () => [...reserveKeys.all, 'date_list'] as const,
  date_list: (params: ReservationDateListParams) =>
    [...reserveKeys.date_lists(), { ...params }] as const,
  lists: () => [...reserveKeys.all, 'list'] as const,
  list: (params: ReservationListParams) => [...reserveKeys.lists(), { ...params }] as const,
  detail: (reservationId: number) => [...reserveKeys.all, 'detail', reservationId] as const,
};
