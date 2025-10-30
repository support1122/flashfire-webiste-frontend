const STORAGE_KEY = 'ff_country_code_v1';
const CANADA_CODE = 'CA';

function backendBaseUrl(): string | null {
  // Hardcoded backend base as requested
  const base = 'https://flashfire-website-backend.onrender.com';
  console.log('[CountryRedirect] using hardcoded backend base:', base);
  return base;
}

function shouldForceHomeRedirect(pathname: string, countryCode: string): boolean {
  if (countryCode === CANADA_CODE && pathname === '/') return true;
  return false;
}

export function getCachedCountryCode(): string | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    console.log('[CountryRedirect] cached country code:', v);
    return v;
  } catch {
    return null;
  }
}

export function cacheCountryCode(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
}

async function fetchCountryCode(): Promise<string | null> {
  const base = backendBaseUrl();
  if (!base) {
    console.warn('[CountryRedirect] No backend base URL resolved');
    return null;
  }
  try {
    console.log('[CountryRedirect] calling backend /api/geo at', `${base}/api/geo`);
    const res = await fetch(`${base}/api/geo`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!res.ok) {
      console.warn('[CountryRedirect] backend response not ok:', res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    console.log('[CountryRedirect] backend response:', data);
    return (data?.countryCode as string) || null;
  } catch (e) {
    console.error('[CountryRedirect] fetch failed:', e);
    return null;
  }
}

export async function bootstrapCountryRedirectBeforeRender(): Promise<void> {
  const pathname = window.location.pathname;
  console.log('[CountryRedirect] bootstrap start. Path:', pathname);
  let code = getCachedCountryCode();
  if (!code) {
    code = await fetchCountryCode();
    if (code) cacheCountryCode(code);
  }
  console.log('[CountryRedirect] final country code:', code);
  if (code && shouldForceHomeRedirect(pathname, code)) {
    // Hard redirect
    console.log('[CountryRedirect] redirecting to /en-ca');
    window.location.replace('/en-ca');
  } else {
    console.log('[CountryRedirect] no redirect condition met');
  }
}

export function enforceHomeRedirectDuringAppRuntime() {
  const code = getCachedCountryCode();
  if (code && shouldForceHomeRedirect(window.location.pathname, code)) {
    window.location.replace('/en-ca');
  }
}
