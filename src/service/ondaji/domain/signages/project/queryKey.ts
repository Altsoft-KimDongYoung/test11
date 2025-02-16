import {
  ListOfContentBelongProjectParams,
  ProjectListParams,
} from '@/ondaji/types/domain/signages/project';

// https://tkdodo.eu/blog/effective-react-query-keys
export const projectKeys = {
  all: ['project'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: Omit<ProjectListParams, 'page'>) =>
    [...projectKeys.lists(), { ...params }] as const,
  content_lists_can_register: () => [...projectKeys.all, 'content_lists_can_register'] as const,
  content_list_can_register: (params: Omit<ProjectListParams, 'page'>) =>
    [...projectKeys.content_lists_can_register(), { ...params }] as const,
  signage_content_preview: (contentId: string) =>
    [...projectKeys.all, 'signage_content_preview', contentId] as const,
  paid_group_count: () => [...projectKeys.all, 'paid_group_count'] as const,
  list_of_group_execute_project: (projectId: number) =>
    [...projectKeys.all, 'list_of_group_execute_project', projectId] as const,
  detail: (projectId: string) => [...projectKeys.all, 'detail', projectId] as const,
  list_of_content_belong_project: (params: Omit<ListOfContentBelongProjectParams, 'page'>) =>
    [...projectKeys.all, 'list_of_content_belong_project', { ...params }] as const,
  is_unique_content: () => [...projectKeys.all, 'is_unique_content'] as const,
};
