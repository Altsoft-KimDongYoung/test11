import { ContentListParams } from '@/ondaji/types/domain';

export const residentKeys = {
  all: ['residents'] as const,
  lists: () => [...residentKeys.all, 'residentLists'] as const,
  list: (params: ContentListParams) => [...residentKeys.lists(), { ...params }] as const,
  detail: (contentId: number) => [...residentKeys.lists(), contentId] as const,
  contentLike: (contentId: number) => [...residentKeys.lists(), 'like', contentId] as const,
  childOrganization: () => [...residentKeys.all, 'childOrganization'] as const,
} as const;
