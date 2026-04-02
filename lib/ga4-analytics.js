/**
 * Google Analytics 4 Event Tracking Utility
 * Helper functions for GA4 event tracking across the application
 */

/**
 * Track page view event
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {object} eventData - Event parameters
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track CTA button clicks
 * @param {string} buttonText - Text or identifier of the button clicked
 * @param {string} location - Location/section where button was clicked
 */
export const trackCTAClick = (buttonText, location) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: buttonText,
    button_location: location,
  });
};

/**
 * Track form submission
 * @param {string} formName - Name/type of form
 * @param {string} service - Service selected (if applicable)
 */
export const trackFormSubmission = (formName, service = '') => {
  trackEvent('form_submission', {
    event_category: 'conversion',
    event_label: formName,
    service: service,
  });
};

/**
 * Track portfolio card view
 * @param {string} cardTitle - Title of portfolio card
 * @param {string} cardCategory - Category of the portfolio item
 */
export const trackPortfolioCardView = (cardTitle, cardCategory) => {
  trackEvent('portfolio_card_view', {
    event_category: 'engagement',
    event_label: cardTitle,
    card_category: cardCategory,
  });
};

/**
 * Track service section view
 * @param {string} serviceType - Type of service
 */
export const trackServiceView = (serviceType) => {
  trackEvent('service_view', {
    event_category: 'engagement',
    event_label: serviceType,
  });
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage (0-100)
 */
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_depth: Math.round(depth),
  });
};

/**
 * Track external link clicks
 * @param {string} url - External URL clicked
 * @param {string} linkText - Text of the link
 */
export const trackExternalLinkClick = (url, linkText) => {
  trackEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkText,
    url: url,
  });
};

/**
 * Track error events
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export const trackError = (errorType, errorMessage) => {
  trackEvent('error_event', {
    event_category: 'error',
    event_label: errorType,
    error_message: errorMessage,
  });
};

export default {
  trackPageView,
  trackEvent,
  trackCTAClick,
  trackFormSubmission,
  trackPortfolioCardView,
  trackServiceView,
  trackScrollDepth,
  trackExternalLinkClick,
  trackError,
};
