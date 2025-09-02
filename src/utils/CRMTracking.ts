// Freshworks CRM Tracking Utility
// This file contains functions to track contacts and events in Freshworks CRM
// 
// ENHANCED FEATURES:
// ✅ Basic contact creation/update
// ✅ Meeting details tracking (URL, time, booking date)
// ✅ Form to meeting conversion tracking
// ✅ Comprehensive event logging
// 
// CRM FIELDS THAT WILL BE POPULATED:
// - First name, Last name, Email, Phone, Company
// - Work Authorization, Current Role, Message, Source
// - Last Meeting URL, Last Meeting Time, Meeting Booked At
// - Event Type, Meeting Duration, Meeting Location
// - Meeting Source

declare global {
  interface Window {
    fwcrm: {
      identify: (identifier: string, contact: any) => void;
      set: (properties: any) => void;
    };
    FM: {
      trackCustomEvent: (eventName: string, properties: any) => void;
    };
  }
}

// Interface for contact data
export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  workAuthorization?: string;
  currentRole?: string;
  message?: string;
  source?: string;
}

// Interface for Calendly meeting data
export interface CalendlyMeetingData {
  inviteeName: string;
  inviteeEmail: string;
  meetingUrl: string;
  eventStartTime: string;
  bookedAt: string;
  eventType?: string;
  duration?: number;
  location?: string;
}

// Interface for enhanced contact data with meeting details
export interface ContactDataWithMeeting extends ContactData {
  meetingUrl?: string;
  eventStartTime?: string;
  bookedAt?: string;
  meetingSource?: string;
}

// Interface for event properties
export interface EventProperties {
  email: string;
  [key: string]: any;
}

// Create or update contact in CRM
export const createOrUpdateContact = (contactData: ContactData) => {
  if (!window.fwcrm) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    const newContact = {
      "First name": contactData.firstName,
      "Last name": contactData.lastName,
      "Email": contactData.email,
      "Mobile": contactData.phone || "",
      "Work Authorization": contactData.workAuthorization || "",
      "Current Role": contactData.currentRole || "",
      "Message": contactData.message || "",
      "Source": contactData.source || "Website",
      "company": {
        "Name": contactData.company || "",
        "Website": contactData.website || ""
      }
    };

    const identifier = contactData.email;
    window.fwcrm.identify(identifier, newContact);
    
    console.log('Contact created/updated in CRM:', contactData.email);
  } catch (error) {
    console.error('Error creating/updating contact in CRM:', error);
  }
};

// Create or update contact in CRM with meeting details
export const createOrUpdateContactWithMeeting = (contactData: ContactDataWithMeeting) => {
  if (!window.fwcrm) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    const newContact = {
      "First name": contactData.firstName,
      "Last name": contactData.lastName,
      "Email": contactData.email,
      "Mobile": contactData.phone || "",
      "Work Authorization": contactData.workAuthorization || "",
      "Current Role": contactData.currentRole || "",
      "Message": contactData.message || "",
      "Source": contactData.source || "Website",
      "Last Meeting URL": contactData.meetingUrl || "",
      "Last Meeting Time": contactData.eventStartTime || "",
      "Meeting Booked At": contactData.bookedAt || "",
      "Meeting Source": contactData.meetingSource || "",
      "company": {
        "Name": contactData.company || "",
        "Website": contactData.website || ""
      }
    };

    const identifier = contactData.email;
    window.fwcrm.identify(identifier, newContact);
    
    console.log('Contact with meeting details created/updated in CRM:', contactData.email);
  } catch (error) {
    console.error('Error creating/updating contact with meeting details in CRM:', error);
  }
};

// Update existing contact properties
export const updateContactProperties = (properties: Record<string, any>) => {
  if (!window.fwcrm) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    window.fwcrm.set(properties);
    console.log('Contact properties updated in CRM');
  } catch (error) {
    console.error('Error updating contact properties in CRM:', error);
  }
};

// Update contact with meeting information
export const updateContactWithMeeting = (email: string, meetingData: CalendlyMeetingData) => {
  if (!window.fwcrm) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    const meetingProperties = {
      "Last Meeting URL": meetingData.meetingUrl,
      "Last Meeting Time": meetingData.eventStartTime,
      "Meeting Booked At": meetingData.bookedAt,
      "Event Type": meetingData.eventType || "Consultation",
      "Meeting Duration": meetingData.duration || 30,
      "Meeting Location": meetingData.location || "Google Meet",
      "Last Meeting Source": "Calendly"
    };

    window.fwcrm.set(meetingProperties);
    console.log('Contact meeting details updated in CRM:', email);
  } catch (error) {
    console.error('Error updating contact meeting details in CRM:', error);
  }
};

// Track custom events
export const trackCustomEvent = (eventName: string, properties: EventProperties) => {
  if (!window.FM) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    window.FM.trackCustomEvent(eventName, properties);
    console.log('Event tracked in CRM:', eventName, properties);
  } catch (error) {
    console.error('Error tracking event in CRM:', error);
  }
};

// Predefined event tracking functions
export const trackSignupEvent = (email: string, source: string = 'Website') => {
  trackCustomEvent("User Signup", {
    email,
    source,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
};

export const trackContactFormSubmission = (email: string, formType: string) => {
  trackCustomEvent("Contact Form Submission", {
    email,
    formType,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
};

export const trackCalendlyBooking = (email: string) => {
  trackCustomEvent("Calendly Meeting Booked", {
    email,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
};

// Track when someone books a meeting after form submission
export const trackFormToMeeting = (email: string, formType: string, meetingData?: CalendlyMeetingData) => {
  const eventData: any = {
    email,
    formType,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };

  if (meetingData) {
    eventData.meetingUrl = meetingData.meetingUrl;
    eventData.eventStartTime = meetingData.eventStartTime;
    eventData.bookedAt = meetingData.bookedAt;
  }

  trackCustomEvent("Form to Meeting Conversion", eventData);
};

// Create/update contact from Calendly meeting and track the booking
export const trackCalendlyMeeting = async (meetingData: CalendlyMeetingData) => {
  if (!window.fwcrm) {
    console.warn('Freshworks CRM not loaded yet');
    return;
  }

  try {
    // Wait for CRM to load
    await waitForCRMLoad();
    
    // Parse name into first and last name
    const [firstName, ...lastNameParts] = meetingData.inviteeName.split(' ');
    const lastName = lastNameParts.join(' ') || '';
    
    // Create/update contact in CRM with meeting details
    const newContact = {
      "First name": firstName,
      "Last name": lastName,
      "Email": meetingData.inviteeEmail,
      "Source": "Calendly Meeting",
      "Last Meeting URL": meetingData.meetingUrl,
      "Last Meeting Time": meetingData.eventStartTime,
      "Meeting Booked At": meetingData.bookedAt,
      "Event Type": meetingData.eventType || "Consultation",
      "Meeting Duration": meetingData.duration || 30,
      "Meeting Location": meetingData.location || "Google Meet"
    };

    const identifier = meetingData.inviteeEmail;
    window.fwcrm.identify(identifier, newContact);
    
    // Track the meeting booking event
    trackCustomEvent("Calendly Meeting Booked", {
      email: meetingData.inviteeEmail,
      inviteeName: meetingData.inviteeName,
      meetingUrl: meetingData.meetingUrl,
      eventStartTime: meetingData.eventStartTime,
      eventType: meetingData.eventType || "Consultation",
      duration: meetingData.duration || 30,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
    
    console.log('Calendly meeting tracked in CRM:', meetingData.inviteeEmail);
  } catch (error) {
    console.error('Error tracking Calendly meeting in CRM:', error);
  }
};

export const trackPageView = (email?: string) => {
  if (email) {
    trackCustomEvent("Page View", {
      email,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }
};

// Check if CRM is loaded
export const isCRMLoaded = (): boolean => {
  return !!(window.fwcrm && window.FM);
};

// Wait for CRM to load
export const waitForCRMLoad = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isCRMLoaded()) {
      resolve();
      return;
    }

    const checkInterval = setInterval(() => {
      if (isCRMLoaded()) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      console.warn('CRM failed to load within 10 seconds');
      resolve();
    }, 10000);
  });
};
