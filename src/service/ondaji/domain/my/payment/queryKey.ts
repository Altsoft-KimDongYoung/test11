import { Pagenation } from '@/ondaji/types/common';

export const paymentKeys = {
  all: ['payment'] as const,
  card_list: () => [...paymentKeys.all, 'card_list'] as const,
  history: (params: Pagenation) => [...paymentKeys.all, 'history', { ...params }] as const,
} as const;
