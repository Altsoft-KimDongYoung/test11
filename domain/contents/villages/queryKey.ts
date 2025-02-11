import { ContentDisplayAreaParams, ContentListParams } from '@/ondaji/types/domain';

export const villageKeys = {
  all: ['villages'] as const,
  multiPolygon: () => [...villageKeys.all, 'multiPolygon'] as const,
  contentExpose: (params: ContentDisplayAreaParams) =>
    [...villageKeys.all, 'contentExpose', { ...params }] as const,
  lists: () => [...villageKeys.all, 'villageLists'] as const,
  list: (params: ContentListParams) => [...villageKeys.lists(), { ...params }] as const,
  detail: (contentId: number) => [...villageKeys.lists(), contentId] as const,
  complain: (contentId: number) => [...villageKeys.detail(contentId), contentId] as const,
  contentLike: (contentId: number) => [...villageKeys.lists(), 'like', contentId] as const,
} as const;
