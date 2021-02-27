import { useApiAuth } from '../hooks/ApiAuthentication';
import { useI18nextConfig } from '../hooks/i18next/hook';

interface HookResponse {
  loading: boolean;
  error?: Error;
}

export function useAppReady(): HookResponse {
  const { loading: apiAuthLoading, error: apiAuthError } = useApiAuth();
  const { loading: i18nLoading, error: i18nError } = useI18nextConfig();

  const loading = apiAuthLoading || i18nLoading;
  const error = apiAuthError || i18nError;

  return { loading, error };
}
