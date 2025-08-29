// utils/analytics.ts
export const GTagUTM = ({
  eventName = 'click',
  label,
  utmParams,
}: {
  eventName?: string;
  label?: string;
  utmParams?: { [key: string]: string };
}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'CTA',
      event_label: label || eventName,
      ...utmParams, // attach UTM values as custom dimensions
    });
  }

  // Optional: Store UTM for later form submission
  if (utmParams) {
    sessionStorage.setItem('utm_data', JSON.stringify(utmParams));
  }
};
