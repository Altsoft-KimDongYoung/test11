export const withdrawalKeys = {
  all: ['withdrawal'] as const,
  paidPeriodRemaining: () => [...withdrawalKeys.all, 'userDeletionStatus'] as const,
} as const;
