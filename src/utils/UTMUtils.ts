// =====================================================
// UTM PARAMETER PRESERVATION UTILITIES
// =====================================================
// Purpose: Preserve UTM parameters during navigation
// =====================================================

// Get current UTM parameters from localStorage
export const getCurrentUTMParams = (): string => {
  const utmSource = localStorage.getItem('utm_source');
  const utmMedium = localStorage.getItem('utm_medium');
  const utmCampaign = localStorage.getItem('utm_campaign');
  const utmContent = localStorage.getItem('utm_content');
  const utmTerm = localStorage.getItem('utm_term');
  
  const params = new URLSearchParams();
  
  if (utmSource) params.set('utm_source', utmSource);
  if (utmMedium) params.set('utm_medium', utmMedium);
  if (utmCampaign) params.set('utm_campaign', utmCampaign);
  if (utmContent) params.set('utm_content', utmContent);
  if (utmTerm) params.set('utm_term', utmTerm);
  
  return params.toString();
};

// Navigate to a path while preserving UTM parameters
export const navigateWithUTM = (path: string, navigate: (path: string) => void): void => {
  const utmParams = getCurrentUTMParams();
  const separator = path.includes('?') ? '&' : '?';
  const finalPath = utmParams ? `${path}${separator}${utmParams}` : path;
  
  console.log(`UTM Navigation - Original path: ${path}`);
  console.log(`UTM Navigation - UTM params: ${utmParams}`);
  console.log(`UTM Navigation - Final path: ${finalPath}`);
  navigate(finalPath);
};

// Create a Link component path with UTM parameters preserved
export const createLinkWithUTM = (path: string): string => {
  const utmParams = getCurrentUTMParams();
  const separator = path.includes('?') ? '&' : '?';
  const finalPath = utmParams ? `${path}${separator}${utmParams}` : path;
  
  console.log(`UTM Link - Original path: ${path}`);
  console.log(`UTM Link - UTM params: ${utmParams}`);
  console.log(`UTM Link - Final path: ${finalPath}`);
  return finalPath;
};

// Check if UTM parameters exist in localStorage
export const hasUTMParams = (): boolean => {
  return !!(localStorage.getItem('utm_source') || localStorage.getItem('utm_medium'));
};

// Get UTM source for display/logging
export const getUTMSource = (): string => {
  return localStorage.getItem('utm_source') || 'direct';
};

// Get UTM medium for display/logging  
export const getUTMMedium = (): string => {
  return localStorage.getItem('utm_medium') || 'website';
};

// Debug function to log current UTM state
export const debugUTMState = (): void => {
  console.log('=== UTM State Debug ===');
  console.log('utm_source:', localStorage.getItem('utm_source'));
  console.log('utm_medium:', localStorage.getItem('utm_medium'));
  console.log('utm_campaign:', localStorage.getItem('utm_campaign'));
  console.log('utm_content:', localStorage.getItem('utm_content'));
  console.log('utm_term:', localStorage.getItem('utm_term'));
  console.log('ref-code:', localStorage.getItem('ref-code'));
  console.log('Current URL:', window.location.href);
  console.log('========================');
};
