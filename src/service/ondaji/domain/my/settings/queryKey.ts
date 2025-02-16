export const settingsKeys = {
  all: ['settings'] as const,
  notificationPermission: () => [...settingsKeys.all, 'notificationPermission'] as const,
} as const;
