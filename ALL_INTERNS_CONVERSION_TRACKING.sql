-- =====================================================
-- ALL INTERNS CONVERSION TRACKING QUERY
-- =====================================================
-- Purpose: Track all interns and direct traffic with conversion metrics
-- Shows: Unique visitors, meetings booked, conversion rates by intern
-- Business Impact: HIGH - Complete performance overview for all traffic sources
-- =====================================================

-- Comprehensive tracking for all interns and direct traffic
WITH all_traffic_sources AS (
  SELECT 
    DATE(timestamp) as tracking_date,
    COALESCE(properties.utm_source, 'direct') as intern_name,
    properties.utm_medium,
    
    -- Unique visitors (page views)
    COUNT(DISTINCT person_id) as unique_visitors,
    
    -- All events breakdown
    COUNT(CASE WHEN event = 'page_view' THEN 1 END) as total_page_views,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'form_start' THEN 1 END) as form_starts,
    COUNT(CASE WHEN event = 'form_submit' THEN 1 END) as form_submissions,
    
    -- CALENDLY MEETING BOOKED - KEY CONVERSION EVENT
    COUNT(CASE WHEN event = 'Calendly Meeting Booked' THEN 1 END) as meetings_booked,
    
    -- Other conversions
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as other_conversions,
    
    -- Time metrics
    MIN(timestamp) as first_visit,
    MAX(timestamp) as last_visit,
    COUNT(DISTINCT toDate(timestamp)) as active_days
    
  FROM events 
  WHERE properties.utm_medium = 'website' OR properties.utm_medium IS NULL
    AND timestamp >= now() - toIntervalDay(30)  -- Last 30 days
  GROUP BY 
    DATE(timestamp), 
    COALESCE(properties.utm_source, 'direct'), 
    properties.utm_medium
),

-- Calculate conversion metrics
conversion_metrics AS (
  SELECT 
    *,
    
    -- Conversion rates
    CASE 
      WHEN unique_visitors > 0 THEN ROUND(meetings_booked * 100.0 / unique_visitors, 2)
      ELSE 0 
    END as conversion_rate_percent,
    
    CASE 
      WHEN unique_visitors > 0 THEN ROUND(form_submissions * 100.0 / unique_visitors, 2)
      ELSE 0 
    END as form_submission_rate_percent,
    
    CASE 
      WHEN unique_visitors > 0 THEN ROUND(button_clicks * 100.0 / unique_visitors, 2)
      ELSE 0 
    END as engagement_rate_percent,
    
    -- User categories
    unique_visitors as total_users,
    meetings_booked as converted_users,
    (unique_visitors - meetings_booked) as non_converted_users,
    
    -- Performance indicators
    CASE 
      WHEN unique_visitors >= 50 THEN 'HIGH_TRAFFIC'
      WHEN unique_visitors >= 20 THEN 'MEDIUM_TRAFFIC'
      WHEN unique_visitors >= 10 THEN 'LOW_TRAFFIC'
      ELSE 'MINIMAL_TRAFFIC'
    END as traffic_volume_category,
    
    CASE 
      WHEN meetings_booked * 100.0 / unique_visitors >= 15 THEN 'EXCELLENT'
      WHEN meetings_booked * 100.0 / unique_visitors >= 10 THEN 'GOOD'
      WHEN meetings_booked * 100.0 / unique_visitors >= 5 THEN 'AVERAGE'
      WHEN meetings_booked * 100.0 / unique_visitors > 0 THEN 'NEEDS_IMPROVEMENT'
      ELSE 'NO_CONVERSIONS'
    END as performance_status
    
  FROM all_traffic_sources
)

-- Final Results - Today's Performance
SELECT 
  intern_name,
  utm_medium,
  
  -- Core Metrics
  SUM(unique_visitors) as total_unique_visitors,
  SUM(meetings_booked) as total_meetings_booked,
  SUM(form_submissions) as total_form_submissions,
  SUM(button_clicks) as total_button_clicks,
  
  -- Conversion Rates
  CASE 
    WHEN SUM(unique_visitors) > 0 THEN ROUND(SUM(meetings_booked) * 100.0 / SUM(unique_visitors), 2)
    ELSE 0 
  END as overall_conversion_rate_percent,
  
  CASE 
    WHEN SUM(unique_visitors) > 0 THEN ROUND(SUM(form_submissions) * 100.0 / SUM(unique_visitors), 2)
    ELSE 0 
  END as overall_form_rate_percent,
  
  -- User Categories
  SUM(converted_users) as total_converted_users,
  SUM(non_converted_users) as total_non_converted_users,
  
  -- Performance Indicators
  CASE 
    WHEN SUM(unique_visitors) >= 50 THEN 'HIGH_TRAFFIC'
    WHEN SUM(unique_visitors) >= 20 THEN 'MEDIUM_TRAFFIC'
    WHEN SUM(unique_visitors) >= 10 THEN 'LOW_TRAFFIC'
    ELSE 'MINIMAL_TRAFFIC'
  END as traffic_volume_category,
  
  CASE 
    WHEN SUM(meetings_booked) * 100.0 / SUM(unique_visitors) >= 15 THEN 'EXCELLENT'
    WHEN SUM(meetings_booked) * 100.0 / SUM(unique_visitors) >= 10 THEN 'GOOD'
    WHEN SUM(meetings_booked) * 100.0 / SUM(unique_visitors) >= 5 THEN 'AVERAGE'
    WHEN SUM(meetings_booked) * 100.0 / SUM(unique_visitors) > 0 THEN 'NEEDS_IMPROVEMENT'
    ELSE 'NO_CONVERSIONS'
  END as performance_status,
  
  -- Time Context
  MIN(first_visit) as earliest_visit,
  MAX(last_visit) as latest_visit,
  MAX(active_days) as total_active_days

FROM conversion_metrics
GROUP BY intern_name, utm_medium
ORDER BY 
  total_meetings_booked DESC,  -- Sort by conversions first
  overall_conversion_rate_percent DESC,  -- Then by conversion rate
  total_unique_visitors DESC;  -- Then by traffic volume

-- =====================================================
-- TODAY'S PERFORMANCE ONLY (Alternative Query)
-- =====================================================
-- Uncomment below to see only today's performance

/*
WITH today_performance AS (
  SELECT 
    COALESCE(properties.utm_source, 'direct') as intern_name,
    properties.utm_medium,
    COUNT(DISTINCT person_id) as today_unique_visitors,
    COUNT(CASE WHEN event = 'Calendly Meeting Booked' THEN 1 END) as today_meetings_booked,
    COUNT(CASE WHEN event = 'form_submit' THEN 1 END) as today_form_submissions,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as today_button_clicks
  FROM events 
  WHERE (properties.utm_medium = 'website' OR properties.utm_medium IS NULL)
    AND DATE(timestamp) = CURDATE()
  GROUP BY 
    COALESCE(properties.utm_source, 'direct'), 
    properties.utm_medium
)
SELECT 
  intern_name,
  utm_medium,
  today_unique_visitors,
  today_meetings_booked,
  today_form_submissions,
  today_button_clicks,
  CASE 
    WHEN today_unique_visitors > 0 THEN ROUND(today_meetings_booked * 100.0 / today_unique_visitors, 2)
    ELSE 0 
  END as today_conversion_rate_percent
FROM today_performance
ORDER BY today_meetings_booked DESC, today_conversion_rate_percent DESC;
*/

-- =====================================================
-- HOURLY BREAKDOWN FOR TODAY (Alternative Query)
-- =====================================================
-- Uncomment below to see hourly performance

/*
WITH hourly_performance AS (
  SELECT 
    EXTRACT(hour FROM timestamp) as hour_of_day,
    COALESCE(properties.utm_source, 'direct') as intern_name,
    COUNT(DISTINCT person_id) as hourly_unique_visitors,
    COUNT(CASE WHEN event = 'Calendly Meeting Booked' THEN 1 END) as hourly_meetings_booked
  FROM events 
  WHERE (properties.utm_medium = 'website' OR properties.utm_medium IS NULL)
    AND DATE(timestamp) = CURDATE()
  GROUP BY 
    EXTRACT(hour FROM timestamp),
    COALESCE(properties.utm_source, 'direct')
)
SELECT 
  hour_of_day,
  intern_name,
  hourly_unique_visitors,
  hourly_meetings_booked,
  CASE 
    WHEN hourly_unique_visitors > 0 THEN ROUND(hourly_meetings_booked * 100.0 / hourly_unique_visitors, 2)
    ELSE 0 
  END as hourly_conversion_rate_percent
FROM hourly_performance
ORDER BY hour_of_day, hourly_meetings_booked DESC;
*/

-- =====================================================
-- USAGE NOTES:
-- =====================================================
-- 1. This query tracks ALL traffic sources (interns + direct)
-- 2. Shows unique visitors, meetings booked, and conversion rates
-- 3. Includes performance categorization (EXCELLENT, GOOD, AVERAGE, etc.)
-- 4. Traffic volume categorization (HIGH, MEDIUM, LOW, MINIMAL)
-- 5. Uncomment alternative queries for today-only or hourly breakdowns
-- 6. Results sorted by meetings booked, then conversion rate, then traffic volume
-- =====================================================
