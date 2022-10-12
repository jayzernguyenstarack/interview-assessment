export type UserState = {
  isLoading: boolean;
  error: Error | string | null;
  user: Record<string, unknown> | null;
};
