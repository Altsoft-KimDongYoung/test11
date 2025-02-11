import { ContentBoxListParams } from '@/ondaji/types/domain';

export const contentboxKeys = {
  all: ['contentbox'] as const,
  lists: () => [...contentboxKeys.all, 'list'] as const,
  list: (params: ContentBoxListParams) => [...contentboxKeys.lists(), { ...params }] as const,
};
