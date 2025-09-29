# PostHog Analytics Guide for FlashFire Website

## Overview
This guide shows you how to use PostHog analytics to understand user behavior, track button clicks, analyze conversion funnels, and optimize your FlashFire website performance.

---

## 🔥 **Heatmap Analysis**

### **Creating Heatmaps in PostHog**

1. **Navigate to Heatmaps**
   - Go to PostHog Dashboard → Insights → Heatmaps
   - Click "Create Heatmap"

2. **Configure Heatmap Settings**
   ```
   Page URL: Contains "flashfire" (or your domain)
   Event: page_view
   Time Range: Last 30 days
   ```

3. **Key Heatmaps to Create**
   - **Homepage Heatmap**: `page_url = "/"`
   - **Signup Page Heatmap**: `page_url = "/signup"`
   - **Blog Page Heatmap**: `page_url = "/blogs"`

### **What to Look For in Heatmaps**
- **Hot Spots**: Areas with high click density
- **Cold Spots**: Areas users ignore
- **Button Performance**: Which CTAs get the most attention
- **Scroll Behavior**: How far users scroll on each page

---

##  **Button Click Analytics**

### **Daily Button Click Analysis**

#### **Query 1: Most Clicked Buttons (Daily)**
- change `toIntervalDay(1)` with any number of days
```sql
SELECT 
  properties.button_text,
  properties.button_location,
  COUNT(*) as click_count,
  toDate(timestamp) as click_date
FROM events 
WHERE event = 'button_click' 
  AND timestamp >= now() - toIntervalDay(1)
GROUP BY properties.button_text, properties.button_location, toDate(timestamp)
ORDER BY click_count DESC
```

#### **Query 2: Button Performance by Location**
```sql
SELECT 
  properties.button_location,
  properties.button_text,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_users,
  ROUND(COUNT(*) / COUNT(DISTINCT person_id), 2) as clicks_per_user
FROM events 
WHERE event = 'button_click'
  AND timestamp >= now() - interval '7 days'
GROUP BY properties.button_location, properties.button_text
ORDER BY total_clicks DESC
```

### **Monthly Button Analytics**

#### **Query 3: Monthly Button Trends**
```sql
SELECT 
  properties.button_text,
  properties.button_location,
  dateTrunc('month', timestamp) as month,
  COUNT(*) as monthly_clicks,
  COUNT(DISTINCT person_id) as unique_users
FROM events 
WHERE event = 'button_click'
  AND timestamp >= now() - toIntervalMonth(3)
GROUP BY properties.button_text, properties.button_location, dateTrunc('month', timestamp)
ORDER BY month DESC, monthly_clicks DESC
```
- compare previous months and this months data for insights 
```
WITH monthly_clicks AS (
  SELECT 
    properties.button_text,
    dateTrunc('month', timestamp) as month,
    COUNT(*) as clicks
  FROM events 
  WHERE event = 'button_click'
    AND timestamp >= now() - toIntervalMonth(6)
  GROUP BY properties.button_text, dateTrunc('month', timestamp)
)
SELECT 
  button_text,
  month,
  clicks,
  lag(clicks) OVER (PARTITION BY button_text ORDER BY month) as previous_month_clicks,
  ROUND(
    (clicks - lag(clicks) OVER (PARTITION BY button_text ORDER BY month)) * 100.0 / 
    lag(clicks) OVER (PARTITION BY button_text ORDER BY month), 2
  ) as growth_rate_percent
FROM monthly_clicks
ORDER BY button_text, month
```


#### **Query 4: Button Click Growth Rate**
```sql
WITH monthly_clicks AS (
  SELECT 
    properties.button_text,
    DATE_TRUNC('month', timestamp) as month,
    COUNT(*) as clicks
  FROM events 
  WHERE event = 'button_click'
    AND timestamp >= now() - interval '6 months'
  GROUP BY properties.button_text, DATE_TRUNC('month', timestamp)
)
SELECT 
  button_text,
  month,
  clicks,
  LAG(clicks) OVER (PARTITION BY button_text ORDER BY month) as previous_month_clicks,
  ROUND(
    (clicks - LAG(clicks) OVER (PARTITION BY button_text ORDER BY month)) * 100.0 / 
    LAG(clicks) OVER (PARTITION BY button_text ORDER BY month), 2
  ) as growth_rate_percent
FROM monthly_clicks
ORDER BY button_text, month
```

---

## 🎯 **Conversion Funnel Analysis**

### **Signup Funnel Tracking**

#### **Query 5: Complete Signup Funnel**
```sql
WITH funnel_steps AS (
  SELECT 
    person_id,
    MIN(CASE WHEN event = 'page_view' AND properties.page_name = 'home' THEN timestamp ELSE NULL END) as home_view,
    MIN(CASE WHEN event = 'button_click' AND properties.button_text LIKE '%Start%' THEN timestamp ELSE NULL END) as cta_click,
    MIN(CASE WHEN event = 'form_start' THEN timestamp ELSE NULL END) as form_start,
    MIN(CASE WHEN event = 'form_submit' THEN timestamp ELSE NULL END) as form_submit,
    MIN(CASE WHEN event = 'conversion' THEN timestamp ELSE NULL END) as conversion
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
  GROUP BY person_id
)
SELECT 
  COUNT(*) as total_users,
  COUNT(home_view) as home_views,
  COUNT(cta_click) as cta_clicks,
  COUNT(form_start) as form_starts,
  COUNT(form_submit) as form_submits,
  COUNT(conversion) as conversions,
  ROUND(COUNT(cta_click) * 100.0 / COUNT(home_view), 2) as cta_conversion_rate,
  ROUND(COUNT(form_start) * 100.0 / COUNT(cta_click), 2) as form_start_rate,
  ROUND(COUNT(form_submit) * 100.0 / COUNT(form_start), 2) as form_completion_rate,
  ROUND(COUNT(conversion) * 100.0 / COUNT(form_submit), 2) as final_conversion_rate
FROM funnel_steps
```

### **User Journey Analysis**

#### **Query 6: User Journey Paths**
```sql
SELECT 
  person_id,
  array_agg(
    CASE 
      WHEN event = 'page_view' THEN concat('Page: ', properties.page_name)
      WHEN event = 'button_click' THEN concat('Button: ', properties.button_text)
      WHEN event = 'form_submit' THEN concat('Form: ', properties.form_name)
      ELSE event
    END
  ) as user_journey
FROM events 
WHERE timestamp >= now() - toIntervalDay(7)
  AND person_id IS NOT NULL
GROUP BY person_id
HAVING COUNT(*) > 1
ORDER BY person_id
LIMIT 20
```

---

## 📊 **Device & Traffic Analysis**

### **Device Performance**

#### **Query 7: Button Clicks by Device**
```sql
SELECT 
  properties.device_type,
  properties.button_text,
  COUNT(*) as clicks,
  COUNT(DISTINCT person_id) as unique_users,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage_of_total
FROM events 
WHERE event = 'button_click'
  AND timestamp >= now() - interval '30 days'
GROUP BY properties.device_type, properties.button_text
ORDER BY clicks DESC
```

### **Traffic Source Analysis**

#### **Query 8: UTM Source Performance**
```sql
SELECT 
  properties.utm_source,
  properties.utm_medium,
  properties.utm_campaign,
  COUNT(*) as total_events,
  COUNT(DISTINCT person_id) as unique_users,
  COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions,
  ROUND(COUNT(CASE WHEN event = 'conversion' THEN 1 END) * 100.0 / COUNT(DISTINCT person_id), 2) as conversion_rate
FROM events 
WHERE timestamp >= now() - interval '30 days'
  AND properties.utm_source IS NOT NULL
GROUP BY properties.utm_source, properties.utm_medium, properties.utm_campaign
ORDER BY conversions DESC
```

---

## 🎨 **Creating PostHog Dashboards**

### **Dashboard 1: Button Performance**
1. **Create New Dashboard**: "Button Analytics"
2. **Add Charts**:
   - **Bar Chart**: Most clicked buttons (last 30 days)
   - **Line Chart**: Button click trends over time
   - **Table**: Button performance by location
   - **Funnel**: Button click → Form start → Conversion

### **Dashboard 2: User Journey**
1. **Create New Dashboard**: "User Journey Analysis"
2. **Add Charts**:
   - **Funnel**: Complete signup funnel
   - **Path Analysis**: Most common user paths
   - **Heatmap**: Page interaction patterns
   - **Retention**: User return behavior

### **Dashboard 3: Conversion Optimization**
1. **Create New Dashboard**: "Conversion Optimization"
2. **Add Charts**:
   - **Conversion Rate**: By traffic source
   - **Form Analytics**: Field completion rates
   - **A/B Test Results**: Button performance comparison
   - **Revenue Impact**: Conversion value tracking

---

## 🎯 **Button-Specific Analytics**

### **Universal Button Analysis Query**

#### **Query: Comprehensive Button Performance Analysis**
```sql
-- Universal button analysis with customizable input
-- Usage: Replace 'Sign Up For Free' with any button text you want to analyze
-- Default: 'Sign Up For Free'

WITH button_analysis AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    properties.device_type,
    properties.utm_source,
    timestamp,
    person_id,
    DATE(timestamp) as click_date,
    dateTrunc('month', timestamp) as click_month,
    EXTRACT(hour FROM timestamp) as hour_of_day,
    EXTRACT(dow FROM timestamp) as day_of_week
  FROM events 
  WHERE event = 'button_click'
    AND properties.button_text = 'Sign Up For Free'  -- 🔧 CHANGE THIS BUTTON TEXT
    AND timestamp >= now() - toIntervalMonth(6)
),
daily_stats AS (
  SELECT 
    button_text,
    click_date,
    COUNT(*) as daily_clicks,
    COUNT(DISTINCT person_id) as daily_unique_clicks,
    COUNT(DISTINCT button_location) as locations_clicked
  FROM button_analysis
  GROUP BY button_text, click_date
),
monthly_stats AS (
  SELECT 
    button_text,
    click_month,
    COUNT(*) as monthly_clicks,
    COUNT(DISTINCT person_id) as monthly_unique_clicks,
    COUNT(DISTINCT button_location) as locations_clicked
  FROM button_analysis
  GROUP BY button_text, click_month
)
SELECT 
  'TODAY' as period,
  button_text,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  ROUND(AVG(daily_clicks), 2) as avg_daily_clicks,
  MIN(click_date) as first_click,
  MAX(click_date) as last_click
FROM button_analysis ba
LEFT JOIN daily_stats ds ON ba.button_text = ds.button_text AND ba.click_date = ds.click_date
WHERE DATE(timestamp) = CURDATE()

UNION ALL

SELECT 
  'LAST 7 DAYS' as period,
  button_text,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  ROUND(COUNT(*) / 7.0, 2) as avg_daily_clicks,
  MIN(click_date) as first_click,
  MAX(click_date) as last_click
FROM button_analysis
WHERE timestamp >= now() - toIntervalDay(7)

UNION ALL

SELECT 
  'LAST 30 DAYS' as period,
  button_text,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  ROUND(COUNT(*) / 30.0, 2) as avg_daily_clicks,
  MIN(click_date) as first_click,
  MAX(click_date) as last_click
FROM button_analysis
WHERE timestamp >= now() - toIntervalDay(30)

UNION ALL

SELECT 
  'LAST 3 MONTHS' as period,
  button_text,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  ROUND(COUNT(*) / 90.0, 2) as avg_daily_clicks,
  MIN(click_date) as first_click,
  MAX(click_date) as last_click
FROM button_analysis
WHERE timestamp >= now() - toIntervalMonth(3)

ORDER BY period, total_clicks DESC;
```

### **Button Performance Deep Dive**

#### **Query: Button Click Rage Analysis (High-Frequency Users)**
```sql
-- Analyze users who click the same button multiple times (potential rage clicks)
-- Helps identify frustrated users or technical issues

WITH button_rage_analysis AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    person_id,
    DATE(timestamp) as click_date,
    COUNT(*) as clicks_per_day,
    MIN(timestamp) as first_click_time,
    MAX(timestamp) as last_click_time,
    EXTRACT(epoch FROM (MAX(timestamp) - MIN(timestamp))) as session_duration_seconds,
    arraySort(groupArray(timestamp)) as click_times
  FROM events 
  WHERE event = 'button_click'
    AND properties.button_text = 'Sign Up For Free'  -- 🔧 CHANGE THIS BUTTON TEXT
    AND timestamp >= now() - toIntervalDay(30)
  GROUP BY properties.button_text, properties.button_location, person_id, DATE(timestamp)
  HAVING COUNT(*) > 3  -- Users who clicked more than 3 times in a day
),
rage_patterns AS (
  SELECT 
    button_text,
    button_location,
    person_id,
    click_date,
    clicks_per_day,
    session_duration_seconds,
    click_times,
    CASE 
      WHEN clicks_per_day >= 10 THEN 'HIGH_RAGE'
      WHEN clicks_per_day >= 5 THEN 'MEDIUM_RAGE'
      ELSE 'LOW_RAGE'
    END as rage_level,
    CASE 
      WHEN session_duration_seconds < 60 AND clicks_per_day > 5 THEN 'QUICK_SPAM'
      WHEN session_duration_seconds > 3600 THEN 'LONG_SESSION'
      ELSE 'NORMAL_SESSION'
    END as click_pattern
  FROM button_rage_analysis
)
SELECT 
  rage_level,
  click_pattern,
  COUNT(*) as users_count,
  AVG(clicks_per_day) as avg_clicks_per_day,
  AVG(session_duration_seconds) as avg_session_duration,
  COUNT(DISTINCT button_location) as locations_affected,
  arrayJoin(click_times) as sample_click_times
FROM rage_patterns
GROUP BY rage_level, click_pattern
ORDER BY users_count DESC;
```

#### **Query: Button Conversion Analysis**
```sql
-- Analyze what happens after button clicks (conversions, form starts, etc.)

WITH button_click_outcomes AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    person_id,
    timestamp as click_time,
    LEAD(event) OVER (PARTITION BY person_id ORDER BY timestamp) as next_event,
    LEAD(timestamp) OVER (PARTITION BY person_id ORDER BY timestamp) as next_event_time,
    LEAD(properties.form_name) OVER (PARTITION BY person_id ORDER BY timestamp) as next_form_name,
    LEAD(properties.conversion_type) OVER (PARTITION BY person_id ORDER BY timestamp) as next_conversion_type
  FROM events 
  WHERE event = 'button_click'
    AND properties.button_text = 'Sign Up For Free'  -- 🔧 CHANGE THIS BUTTON TEXT
    AND timestamp >= now() - toIntervalDay(30)
)
SELECT 
  button_text,
  button_location,
  COUNT(*) as total_clicks,
  COUNT(CASE WHEN next_event = 'form_start' THEN 1 END) as led_to_form_start,
  COUNT(CASE WHEN next_event = 'form_submit' THEN 1 END) as led_to_form_submit,
  COUNT(CASE WHEN next_event = 'conversion' THEN 1 END) as led_to_conversion,
  COUNT(CASE WHEN next_event = 'modal_open' THEN 1 END) as led_to_modal_open,
  ROUND(COUNT(CASE WHEN next_event = 'form_start' THEN 1 END) * 100.0 / COUNT(*), 2) as form_start_rate,
  ROUND(COUNT(CASE WHEN next_event = 'conversion' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate,
  ROUND(AVG(EXTRACT(epoch FROM (next_event_time - click_time))), 2) as avg_time_to_next_action_seconds
FROM button_click_outcomes
WHERE next_event IS NOT NULL
GROUP BY button_text, button_location
ORDER BY total_clicks DESC;
```

### **Button A/B Testing Analysis**

#### **Query: Button Performance Comparison**
```sql
-- Compare performance of different buttons or button variations

WITH button_comparison AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    properties.device_type,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT person_id) as unique_users,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'form_start' THEN 1 END) as form_starts,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions
  FROM events 
  WHERE event IN ('button_click', 'form_start', 'conversion')
    AND properties.button_text IN ('Sign Up For Free', 'Start My 7-Day Free Trial', 'Get Started')  -- 🔧 ADD YOUR BUTTONS
    AND timestamp >= now() - toIntervalDay(30)
  GROUP BY properties.button_text, properties.button_location, properties.device_type
)
SELECT 
  button_text,
  button_location,
  device_type,
  total_clicks,
  unique_users,
  ROUND(total_clicks * 100.0 / unique_users, 2) as clicks_per_user,
  ROUND(form_starts * 100.0 / total_clicks, 2) as form_start_rate,
  ROUND(conversions * 100.0 / total_clicks, 2) as conversion_rate,
  ROUND(conversions * 100.0 / form_starts, 2) as form_to_conversion_rate
FROM button_comparison
ORDER BY total_clicks DESC, conversion_rate DESC;
```

---

## 🔍 **Advanced Analytics Queries**

### **Button Click Patterns**

#### **Query 9: Peak Click Times**
```sql
SELECT 
  EXTRACT(hour FROM timestamp) as hour_of_day,
  properties.button_text,
  COUNT(*) as clicks,
  ROUND(AVG(EXTRACT(epoch FROM (timestamp - LAG(timestamp) OVER (ORDER BY timestamp)))), 2) as avg_time_between_clicks
FROM events 
WHERE event = 'button_click'
  AND timestamp >= now() - interval '7 days'
GROUP BY EXTRACT(hour FROM timestamp), properties.button_text
ORDER BY hour_of_day, clicks DESC
```

#### **Query 10: Button Abandonment Analysis**
```sql
WITH user_actions AS (
  SELECT 
    person_id,
    properties.button_text,
    timestamp,
    LAG(timestamp) OVER (PARTITION BY person_id ORDER BY timestamp) as prev_action_time
  FROM events 
  WHERE event = 'button_click'
    AND timestamp >= now() - interval '30 days'
)
SELECT 
  button_text,
  COUNT(*) as total_clicks,
  COUNT(CASE WHEN prev_action_time IS NULL OR EXTRACT(epoch FROM (timestamp - prev_action_time)) > 3600 THEN 1 END) as new_sessions,
  ROUND(AVG(EXTRACT(epoch FROM (timestamp - prev_action_time))), 2) as avg_time_between_clicks_seconds
FROM user_actions
GROUP BY button_text
ORDER BY total_clicks DESC
```

### **Form Analytics**

#### **Query 11: Form Field Completion Rates**
```sql
SELECT 
  properties.form_name,
  properties.field_name,
  COUNT(*) as focus_events,
  COUNT(DISTINCT person_id) as unique_users,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as avg_focuses_per_user
FROM events 
WHERE event = 'form_field_focus'
  AND timestamp >= now() - interval '30 days'
GROUP BY properties.form_name, properties.field_name
ORDER BY focus_events DESC
```

#### **Query 12: Form Drop-off Analysis**
```sql
WITH form_progress AS (
  SELECT 
    person_id,
    MIN(CASE WHEN event = 'form_start' THEN timestamp END) as form_start_time,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'fullName' THEN timestamp END) as name_focus,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'email' THEN timestamp END) as email_focus,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'phone' THEN timestamp END) as phone_focus,
    MIN(CASE WHEN event = 'form_submit' THEN timestamp END) as form_submit_time
  FROM events 
  WHERE timestamp >= now() - interval '30 days'
  GROUP BY person_id
)
SELECT 
  COUNT(*) as total_form_starts,
  COUNT(name_focus) as reached_name_field,
  COUNT(email_focus) as reached_email_field,
  COUNT(phone_focus) as reached_phone_field,
  COUNT(form_submit_time) as completed_forms,
  ROUND(COUNT(name_focus) * 100.0 / COUNT(*), 2) as name_completion_rate,
  ROUND(COUNT(email_focus) * 100.0 / COUNT(name_focus), 2) as email_completion_rate,
  ROUND(COUNT(phone_focus) * 100.0 / COUNT(email_focus), 2) as phone_completion_rate,
  ROUND(COUNT(form_submit_time) * 100.0 / COUNT(phone_focus), 2) as final_submission_rate
FROM form_progress
WHERE form_start_time IS NOT NULL
```

---

## 📱 **Mobile vs Desktop Analysis**

#### **Query 13: Device-Specific Button Performance**
```sql
SELECT 
  properties.device_type,
  properties.button_location,
  properties.button_text,
  COUNT(*) as clicks,
  COUNT(DISTINCT person_id) as unique_users,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY properties.device_type), 2) as device_percentage
FROM events 
WHERE event = 'button_click'
  AND timestamp >= now() - interval '30 days'
GROUP BY properties.device_type, properties.button_location, properties.button_text
ORDER BY properties.device_type, clicks DESC
```

---

## 🎯 **Actionable Insights**

### **Key Metrics to Track Daily**
1. **Button Click Volume**: Total clicks per day
2. **Conversion Rate**: Signup form completion rate
3. **Top Performing Buttons**: Which CTAs work best
4. **Traffic Source Performance**: Which channels convert best
5. **Device Performance**: Mobile vs desktop behavior

### **Weekly Analysis**
1. **Button Performance Trends**: Week-over-week changes
2. **User Journey Patterns**: Most common paths to conversion
3. **Form Optimization**: Field completion rates
4. **Content Engagement**: Which sections get most attention

### **Monthly Reports**
1. **Conversion Funnel Analysis**: Complete user journey
2. **Traffic Source ROI**: Which channels drive best results
3. **Button A/B Testing**: Performance comparison
4. **User Behavior Insights**: Peak times, device preferences

---

# Analytics Queries - FlashFire Website

## 📊 **Executive Summary Queries**

### **1. Universal Button Performance Query**
**Purpose**: Comprehensive button analysis with customizable input
**Usage**: Replace button text to analyze any button
**Default**: 'Sign Up For Free'

```sql
-- 🔧 CONFIGURATION: Change button text here
WITH button_config AS (
  SELECT 'Sign Up For Free' as target_button  -- CHANGE THIS
),
button_metrics AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    properties.device_type,
    properties.utm_source,
    timestamp,
    person_id,
    DATE(timestamp) as click_date,
    dateTrunc('month', timestamp) as click_month,
    EXTRACT(hour FROM timestamp) as hour_of_day
  FROM events, button_config
  WHERE event = 'button_click'
    AND properties.button_text = button_config.target_button
    AND timestamp >= now() - toIntervalMonth(6)
)
SELECT 
  'TODAY' as period,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT properties.button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  MIN(DATE(timestamp)) as first_click,
  MAX(DATE(timestamp)) as last_click
FROM button_metrics
WHERE DATE(timestamp) = CURDATE()

UNION ALL

SELECT 
  'LAST 7 DAYS' as period,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT properties.button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  MIN(DATE(timestamp)) as first_click,
  MAX(DATE(timestamp)) as last_click
FROM button_metrics
WHERE timestamp >= now() - toIntervalDay(7)

UNION ALL

SELECT 
  'LAST 30 DAYS' as period,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT properties.button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  MIN(DATE(timestamp)) as first_click,
  MAX(DATE(timestamp)) as last_click
FROM button_metrics
WHERE timestamp >= now() - toIntervalDay(30)

UNION ALL

SELECT 
  'LAST 3 MONTHS' as period,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT person_id) as unique_clicks,
  COUNT(DISTINCT properties.button_location) as locations,
  ROUND(COUNT(*) * 100.0 / COUNT(DISTINCT person_id), 2) as clicks_per_user,
  MIN(DATE(timestamp)) as first_click,
  MAX(DATE(timestamp)) as last_click
FROM button_metrics
WHERE timestamp >= now() - toIntervalMonth(3)

ORDER BY 
  CASE period 
    WHEN 'TODAY' THEN 1 
    WHEN 'LAST 7 DAYS' THEN 2 
    WHEN 'LAST 30 DAYS' THEN 3 
    WHEN 'LAST 3 MONTHS' THEN 4 
  END;
```

---

## 🚨 **Critical Performance Queries**

### **2. Button Rage Click Analysis**
**Purpose**: Identify frustrated users and technical issues
**Business Impact**: High - affects user experience and conversion

```sql
-- Analyze users clicking the same button multiple times (potential technical issues)
WITH button_rage AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    person_id,
    DATE(timestamp) as click_date,
    COUNT(*) as clicks_per_day,
    MIN(timestamp) as first_click,
    MAX(timestamp) as last_click,
    EXTRACT(epoch FROM (MAX(timestamp) - MIN(timestamp))) as session_duration,
    arraySort(groupArray(timestamp)) as all_click_times
  FROM events 
  WHERE event = 'button_click'
    AND properties.button_text = 'Sign Up For Free'  -- 🔧 CHANGE BUTTON
    AND timestamp >= now() - toIntervalDay(30)
  GROUP BY properties.button_text, properties.button_location, person_id, DATE(timestamp)
  HAVING COUNT(*) >= 3  -- Users with 3+ clicks in one day
),
rage_classification AS (
  SELECT 
    *,
    CASE 
      WHEN clicks_per_day >= 10 THEN 'CRITICAL_RAGE'
      WHEN clicks_per_day >= 7 THEN 'HIGH_RAGE'
      WHEN clicks_per_day >= 5 THEN 'MEDIUM_RAGE'
      ELSE 'LOW_RAGE'
    END as rage_level,
    CASE 
      WHEN session_duration < 30 AND clicks_per_day > 5 THEN 'TECHNICAL_ISSUE'
      WHEN session_duration < 120 AND clicks_per_day > 7 THEN 'USER_FRUSTRATION'
      WHEN session_duration > 3600 THEN 'LONG_SESSION'
      ELSE 'NORMAL_BEHAVIOR'
    END as behavior_type
  FROM button_rage
)
SELECT 
  rage_level,
  behavior_type,
  COUNT(*) as affected_users,
  AVG(clicks_per_day) as avg_clicks_per_day,
  AVG(session_duration) as avg_session_seconds,
  COUNT(DISTINCT button_location) as locations_affected,
  MIN(click_date) as first_occurrence,
  MAX(click_date) as last_occurrence
FROM rage_classification
GROUP BY rage_level, behavior_type
ORDER BY 
  CASE rage_level 
    WHEN 'CRITICAL_RAGE' THEN 1 
    WHEN 'HIGH_RAGE' THEN 2 
    WHEN 'MEDIUM_RAGE' THEN 3 
    ELSE 4 
  END,
  affected_users DESC;
```

### **3. Conversion Funnel Analysis**
**Purpose**: Track complete user journey from button click to conversion
**Business Impact**: Critical - directly affects revenue

```sql
-- Complete conversion funnel analysis
-- Step 1: Get the first timestamp for each relevant event per user-- Step 1: Get the first timestamp for each relevant event per user
WITH user_event_timestamps AS (
  SELECT 
    person_id,
    MIN(CASE WHEN event = 'page_view' AND properties.page_name = 'home' THEN timestamp ELSE NULL END) as home_view_ts,
    MIN(CASE WHEN event = 'button_click' AND properties.button_text LIKE '%Sign Up%' THEN timestamp ELSE NULL END) as cta_click_ts,
    MIN(CASE WHEN event = 'form_start' THEN timestamp ELSE NULL END) as form_start_ts,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'fullName' THEN timestamp ELSE NULL END) as name_focus_ts,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'email' THEN timestamp ELSE NULL END) as email_focus_ts,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'phone' THEN timestamp ELSE NULL END) as phone_focus_ts,
    MIN(CASE WHEN event = 'form_submit' THEN timestamp ELSE NULL END) as form_submit_ts,
    MIN(CASE WHEN event = 'conversion' THEN timestamp ELSE NULL END) as conversion_ts
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
  GROUP BY person_id
),

-- Step 2: Enforce the sequence to create a true funnel journey for each user
sequential_journey AS (
  SELECT 
    person_id,
    home_view_ts AS s1_home_view,
    CASE WHEN cta_click_ts > home_view_ts THEN cta_click_ts ELSE NULL END AS s2_cta_click,
    CASE WHEN form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN form_start_ts ELSE NULL END AS s3_form_start,
    CASE WHEN name_focus_ts > form_start_ts AND form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN name_focus_ts ELSE NULL END AS s4_name_focus,
    CASE WHEN email_focus_ts > name_focus_ts AND name_focus_ts > form_start_ts AND form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN email_focus_ts ELSE NULL END AS s5_email_focus,
    CASE WHEN phone_focus_ts > email_focus_ts AND email_focus_ts > name_focus_ts AND name_focus_ts > form_start_ts AND form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN phone_focus_ts ELSE NULL END AS s6_phone_focus,
    CASE WHEN form_submit_ts > phone_focus_ts AND phone_focus_ts > email_focus_ts AND email_focus_ts > name_focus_ts AND name_focus_ts > form_start_ts AND form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN form_submit_ts ELSE NULL END AS s7_form_submit,
    CASE WHEN conversion_ts > form_submit_ts AND form_submit_ts > phone_focus_ts AND phone_focus_ts > email_focus_ts AND email_focus_ts > name_focus_ts AND name_focus_ts > form_start_ts AND form_start_ts > cta_click_ts AND cta_click_ts > home_view_ts THEN conversion_ts ELSE NULL END AS s8_conversion
  FROM user_event_timestamps
),

-- Step 3: Count the users who successfully completed each sequential step in a single pass
funnel_counts AS (
  SELECT 
    COUNT(s1_home_view) AS u_home_view,
    COUNT(s2_cta_click) AS u_cta_click,
    COUNT(s3_form_start) AS u_form_start,
    COUNT(s4_name_focus) AS u_name_focus,
    COUNT(s5_email_focus) AS u_email_focus,
    COUNT(s6_phone_focus) AS u_phone_focus,
    COUNT(s7_form_submit) AS u_form_submit,
    COUNT(s8_conversion) AS u_conversion
  FROM sequential_journey
)

-- Step 4: Format the single row of counts into the desired multi-row output
SELECT 
  1 as step_order,
  'Home View' as step_name,
  u_home_view as users,
  100.0 as conversion_rate, -- Base step is always 100%
  0.0 as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  2 as step_order,
  'CTA Click' as step_name,
  u_cta_click as users,
  ROUND(u_cta_click * 100.0 / u_home_view, 2) as conversion_rate,
  ROUND((u_home_view - u_cta_click) * 100.0 / u_home_view, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  3 as step_order,
  'Form Start' as step_name,
  u_form_start as users,
  ROUND(u_form_start * 100.0 / u_cta_click, 2) as conversion_rate,
  ROUND((u_cta_click - u_form_start) * 100.0 / u_cta_click, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  4 as step_order,
  'Name Field' as step_name,
  u_name_focus as users,
  ROUND(u_name_focus * 100.0 / u_form_start, 2) as conversion_rate,
  ROUND((u_form_start - u_name_focus) * 100.0 / u_form_start, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  5 as step_order,
  'Email Field' as step_name,
  u_email_focus as users,
  ROUND(u_email_focus * 100.0 / u_name_focus, 2) as conversion_rate,
  ROUND((u_name_focus - u_email_focus) * 100.0 / u_name_focus, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  6 as step_order,
  'Phone Field' as step_name,
  u_phone_focus as users,
  ROUND(u_phone_focus * 100.0 / u_email_focus, 2) as conversion_rate,
  ROUND((u_email_focus - u_phone_focus) * 100.0 / u_email_focus, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  7 as step_order,
  'Form Submit' as step_name,
  u_form_submit as users,
  ROUND(u_form_submit * 100.0 / u_phone_focus, 2) as conversion_rate,
  ROUND((u_phone_focus - u_form_submit) * 100.0 / u_phone_focus, 2) as dropoff_rate
FROM funnel_counts

UNION ALL

SELECT 
  8 as step_order,
  'Final Conversion' as step_name,
  u_conversion as users,
  ROUND(u_conversion * 100.0 / u_form_submit, 2) as conversion_rate,
  ROUND((u_form_submit - u_conversion) * 100.0 / u_form_submit, 2) as dropoff_rate
FROM funnel_counts

ORDER BY step_order
```

---

## 📈 **Revenue Impact Queries**

### **4. Traffic Source ROI Analysis**
**Purpose**: Identify most profitable traffic sources
**Business Impact**: High - marketing budget optimization

```sql
-- Traffic source performance and ROI analysis
WITH traffic_performance AS (
  SELECT 
    properties.utm_source,
    properties.utm_medium,
    properties.utm_campaign,
    COUNT(DISTINCT person_id) as total_users,
    COUNT(CASE WHEN event = 'page_view' THEN 1 END) as page_views,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'form_submit' THEN 1 END) as form_submissions,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions,
    AVG(CASE WHEN event = 'conversion' THEN properties.conversion_value END) as avg_conversion_value
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
    AND properties.utm_source IS NOT NULL
  GROUP BY properties.utm_source, properties.utm_medium, properties.utm_campaign
)
SELECT 
  utm_source,
  utm_medium,
  utm_campaign,
  total_users,
  page_views,
  button_clicks,
  form_submissions,
  conversions,
  ROUND(button_clicks * 100.0 / total_users, 2) as click_rate,
  ROUND(form_submissions * 100.0 / button_clicks, 2) as form_conversion_rate,
  ROUND(conversions * 100.0 / form_submissions, 2) as final_conversion_rate,
  ROUND(conversions * 100.0 / total_users, 2) as overall_conversion_rate,
  COALESCE(avg_conversion_value, 0) as avg_conversion_value,
  ROUND(conversions * COALESCE(avg_conversion_value, 0), 2) as estimated_revenue
FROM traffic_performance
ORDER BY estimated_revenue DESC, overall_conversion_rate DESC;
```

### **5. Device Performance Analysis**
**Purpose**: Optimize for highest-converting devices
**Business Impact**: Medium - UX optimization

```sql
-- Device-specific performance analysis
WITH device_metrics AS (
  SELECT 
    properties.device_type,
    properties.screen_size,
    COUNT(DISTINCT person_id) as unique_users,
    COUNT(CASE WHEN event = 'page_view' THEN 1 END) as page_views,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'form_submit' THEN 1 END) as form_submissions,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions,
    AVG(CASE WHEN event = 'button_click' THEN EXTRACT(epoch FROM (timestamp - LAG(timestamp) OVER (ORDER BY timestamp))) END) as avg_time_between_clicks
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
  GROUP BY properties.device_type, properties.screen_size
)
SELECT 
  device_type,
  screen_size,
  unique_users,
  ROUND(button_clicks * 100.0 / unique_users, 2) as clicks_per_user,
  ROUND(form_submissions * 100.0 / button_clicks, 2) as form_conversion_rate,
  ROUND(conversions * 100.0 / form_submissions, 2) as final_conversion_rate,
  ROUND(conversions * 100.0 / unique_users, 2) as overall_conversion_rate,
  ROUND(avg_time_between_clicks, 2) as avg_time_between_clicks_seconds,
  CASE 
    WHEN overall_conversion_rate > 15 THEN 'HIGH_PERFORMER'
    WHEN overall_conversion_rate > 10 THEN 'MEDIUM_PERFORMER'
    WHEN overall_conversion_rate > 5 THEN 'LOW_PERFORMER'
    ELSE 'UNDERPERFORMER'
  END as performance_category
FROM device_metrics
ORDER BY overall_conversion_rate DESC, unique_users DESC;
```

---

## 🎯 **A/B Testing Queries**

### **6. Button Performance Comparison**
**Purpose**: Compare different button variations
**Business Impact**: High - optimization opportunities

```sql
-- Button A/B testing analysis
WITH button_variants AS (
  SELECT 
    properties.button_text,
    properties.button_location,
    properties.device_type,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT person_id) as unique_users,
    COUNT(CASE WHEN LEAD(event) OVER (PARTITION BY person_id ORDER BY timestamp) = 'form_start' THEN 1 END) as led_to_form_start,
    COUNT(CASE WHEN LEAD(event) OVER (PARTITION BY person_id ORDER BY timestamp) = 'conversion' THEN 1 END) as led_to_conversion,
    AVG(EXTRACT(epoch FROM (LEAD(timestamp) OVER (PARTITION BY person_id ORDER BY timestamp) - timestamp))) as avg_time_to_next_action
  FROM events 
  WHERE event = 'button_click'
    AND properties.button_text IN (
      'Sign Up For Free', 
      'Start My 7-Day Free Trial', 
      'Get Started',
      'Book Now',
      'Start Free Trial'
    )
    AND timestamp >= now() - toIntervalDay(30)
  GROUP BY properties.button_text, properties.button_location, properties.device_type
)
SELECT 
  button_text,
  button_location,
  device_type,
  total_clicks,
  unique_users,
  ROUND(total_clicks * 100.0 / unique_users, 2) as clicks_per_user,
  ROUND(led_to_form_start * 100.0 / total_clicks, 2) as form_start_rate,
  ROUND(led_to_conversion * 100.0 / total_clicks, 2) as conversion_rate,
  ROUND(led_to_conversion * 100.0 / led_to_form_start, 2) as form_to_conversion_rate,
  ROUND(avg_time_to_next_action, 2) as avg_time_to_action_seconds,
  CASE 
    WHEN conversion_rate > 20 THEN 'WINNER'
    WHEN conversion_rate > 15 THEN 'GOOD'
    WHEN conversion_rate > 10 THEN 'AVERAGE'
    ELSE 'NEEDS_IMPROVEMENT'
  END as performance_rating
FROM button_variants
ORDER BY conversion_rate DESC, total_clicks DESC;
```

---

## 📊 **Time-Based Analytics**

### **7. Peak Performance Times**
**Purpose**: Optimize content delivery and support hours
**Business Impact**: Medium - operational efficiency

```sql
-- Peak performance analysis by time
WITH hourly_performance AS (
  SELECT 
    EXTRACT(hour FROM timestamp) as hour_of_day,
    EXTRACT(dow FROM timestamp) as day_of_week,
    CASE 
      WHEN EXTRACT(dow FROM timestamp) IN (0, 6) THEN 'Weekend'
      ELSE 'Weekday'
    END as day_type,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions,
    COUNT(DISTINCT person_id) as unique_users
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
  GROUP BY EXTRACT(hour FROM timestamp), EXTRACT(dow FROM timestamp)
)
SELECT 
  hour_of_day,
  day_type,
  SUM(button_clicks) as total_clicks,
  SUM(conversions) as total_conversions,
  SUM(unique_users) as total_users,
  ROUND(SUM(conversions) * 100.0 / SUM(button_clicks), 2) as conversion_rate,
  ROUND(SUM(button_clicks) * 100.0 / SUM(unique_users), 2) as clicks_per_user,
  CASE 
    WHEN SUM(conversions) * 100.0 / SUM(button_clicks) > 15 THEN 'PEAK_TIME'
    WHEN SUM(conversions) * 100.0 / SUM(button_clicks) > 10 THEN 'GOOD_TIME'
    ELSE 'LOW_TIME'
  END as performance_category
FROM hourly_performance
GROUP BY hour_of_day, day_type
ORDER BY conversion_rate DESC, total_clicks DESC;
```

---

## 🔍 **Technical Performance Queries**

### **8. Form Field Drop-off Analysis**
**Purpose**: Identify form optimization opportunities
**Business Impact**: High - direct conversion impact

```sql
-- Form field completion and drop-off analysis
WITH form_progress AS (
  SELECT 
    person_id,
    MIN(CASE WHEN event = 'form_start' THEN timestamp END) as form_start_time,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'fullName' THEN timestamp END) as name_focus,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'email' THEN timestamp END) as email_focus,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'phone' THEN timestamp END) as phone_focus,
    MIN(CASE WHEN event = 'form_field_focus' AND properties.field_name = 'workAuthorization' THEN timestamp END) as work_auth_focus,
    MIN(CASE WHEN event = 'form_submit' THEN timestamp END) as form_submit_time,
    MIN(CASE WHEN event = 'form_error' THEN timestamp END) as form_error_time
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(30)
  GROUP BY person_id
),
field_completion AS (
  SELECT 
    COUNT(*) as total_form_starts,
    COUNT(name_focus) as reached_name,
    COUNT(email_focus) as reached_email,
    COUNT(phone_focus) as reached_phone,
    COUNT(work_auth_focus) as reached_work_auth,
    COUNT(form_submit_time) as completed_forms,
    COUNT(form_error_time) as had_errors
  FROM form_progress
  WHERE form_start_time IS NOT NULL
)
SELECT 
  'FIELD_COMPLETION' as metric_type,
  'Full Name' as field_name,
  reached_name as users_reached,
  ROUND(reached_name * 100.0 / total_form_starts, 2) as completion_rate,
  ROUND((total_form_starts - reached_name) * 100.0 / total_form_starts, 2) as dropoff_rate
FROM field_completion

UNION ALL

SELECT 
  'FIELD_COMPLETION' as metric_type,
  'Email' as field_name,
  reached_email as users_reached,
  ROUND(reached_email * 100.0 / reached_name, 2) as completion_rate,
  ROUND((reached_name - reached_email) * 100.0 / reached_name, 2) as dropoff_rate
FROM field_completion

UNION ALL

SELECT 
  'FIELD_COMPLETION' as metric_type,
  'Phone' as field_name,
  reached_phone as users_reached,
  ROUND(reached_phone * 100.0 / reached_email, 2) as completion_rate,
  ROUND((reached_email - reached_phone) * 100.0 / reached_email, 2) as dropoff_rate
FROM field_completion

UNION ALL

SELECT 
  'FIELD_COMPLETION' as metric_type,
  'Work Authorization' as field_name,
  reached_work_auth as users_reached,
  ROUND(reached_work_auth * 100.0 / reached_phone, 2) as completion_rate,
  ROUND((reached_phone - reached_work_auth) * 100.0 / reached_phone, 2) as dropoff_rate
FROM field_completion

UNION ALL

SELECT 
  'FIELD_COMPLETION' as metric_type,
  'Form Submit' as field_name,
  completed_forms as users_reached,
  ROUND(completed_forms * 100.0 / reached_work_auth, 2) as completion_rate,
  ROUND((reached_work_auth - completed_forms) * 100.0 / reached_work_auth, 2) as dropoff_rate
FROM field_completion

ORDER BY metric_type, field_name;
```

---

## 📋 **Executive Dashboard Queries**

### **9. Daily Executive Summary**
**Purpose**: High-level daily performance overview
**Business Impact**: Critical - daily decision making

```sql
-- Daily executive summary for dashboard
WITH daily_metrics AS (
  SELECT 
    DATE(timestamp) as date,
    COUNT(DISTINCT person_id) as daily_users,
    COUNT(CASE WHEN event = 'page_view' THEN 1 END) as page_views,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as button_clicks,
    COUNT(CASE WHEN event = 'form_submit' THEN 1 END) as form_submissions,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as conversions,
    COUNT(CASE WHEN event = 'form_error' THEN 1 END) as form_errors,
    COUNT(DISTINCT CASE WHEN event = 'button_click' THEN properties.button_text END) as unique_buttons_clicked
  FROM events 
  WHERE timestamp >= now() - toIntervalDay(7)
  GROUP BY DATE(timestamp)
)
SELECT 
  date,
  daily_users,
  page_views,
  button_clicks,
  form_submissions,
  conversions,
  form_errors,
  unique_buttons_clicked,
  ROUND(button_clicks * 100.0 / daily_users, 2) as click_rate,
  ROUND(form_submissions * 100.0 / button_clicks, 2) as form_conversion_rate,
  ROUND(conversions * 100.0 / form_submissions, 2) as final_conversion_rate,
  ROUND(conversions * 100.0 / daily_users, 2) as overall_conversion_rate,
  ROUND(form_errors * 100.0 / form_submissions, 2) as error_rate,
  CASE 
    WHEN overall_conversion_rate > 15 THEN 'EXCELLENT'
    WHEN overall_conversion_rate > 10 THEN 'GOOD'
    WHEN overall_conversion_rate > 5 THEN 'AVERAGE'
    ELSE 'NEEDS_ATTENTION'
  END as performance_status
FROM daily_metrics
ORDER BY date DESC;
```

### **10. Weekly Performance Trends**
**Purpose**: Track week-over-week performance changes
**Business Impact**: High - trend analysis and forecasting

```sql
-- Weekly performance trends
WITH weekly_metrics AS (
  SELECT 
    dateTrunc('week', timestamp) as week_start,
    COUNT(DISTINCT person_id) as weekly_users,
    COUNT(CASE WHEN event = 'button_click' THEN 1 END) as weekly_clicks,
    COUNT(CASE WHEN event = 'conversion' THEN 1 END) as weekly_conversions,
    COUNT(DISTINCT properties.utm_source) as traffic_sources,
    COUNT(DISTINCT properties.device_type) as device_types
  FROM events 
  WHERE timestamp >= now() - toIntervalWeek(12)
  GROUP BY dateTrunc('week', timestamp)
),
weekly_trends AS (
  SELECT 
    *,
    LAG(weekly_users) OVER (ORDER BY week_start) as prev_week_users,
    LAG(weekly_conversions) OVER (ORDER BY week_start) as prev_week_conversions,
    LAG(weekly_clicks) OVER (ORDER BY week_start) as prev_week_clicks
  FROM weekly_metrics
)
SELECT 
  week_start,
  weekly_users,
  weekly_clicks,
  weekly_conversions,
  traffic_sources,
  device_types,
  ROUND(weekly_conversions * 100.0 / weekly_users, 2) as conversion_rate,
  ROUND((weekly_users - prev_week_users) * 100.0 / prev_week_users, 2) as user_growth_rate,
  ROUND((weekly_conversions - prev_week_conversions) * 100.0 / prev_week_conversions, 2) as conversion_growth_rate,
  ROUND((weekly_clicks - prev_week_clicks) * 100.0 / prev_week_clicks, 2) as click_growth_rate,
  CASE 
    WHEN (weekly_conversions - prev_week_conversions) > 0 THEN 'IMPROVING'
    WHEN (weekly_conversions - prev_week_conversions) < 0 THEN 'DECLINING'
    ELSE 'STABLE'
  END as trend_direction
FROM weekly_trends
WHERE prev_week_users IS NOT NULL
ORDER BY week_start DESC;
```

---

## 🎯 **Quick Action Queries**

### **11. Immediate Issues Detection**
**Purpose**: Identify urgent problems requiring immediate attention
**Business Impact**: Critical - prevent revenue loss

```sql
-- Detect immediate issues requiring attention
WITH issue_detection AS (
  SELECT 
    'HIGH_ERROR_RATE' as issue_type,
    COUNT(*) as issue_count,
    'Form errors are above 10%' as description,
    'HIGH' as priority
  FROM events 
  WHERE event = 'form_error'
    AND timestamp >= now() - toIntervalDay(1)
  HAVING COUNT(*) > (
    SELECT COUNT(*) * 0.1 
    FROM events 
    WHERE event = 'form_submit' 
      AND timestamp >= now() - toIntervalDay(1)
  )
  
  UNION ALL
  
  SELECT 
    'RAGE_CLICKS' as issue_type,
    COUNT(*) as issue_count,
    'Users clicking same button 5+ times in 1 hour' as description,
    'HIGH' as priority
  FROM (
    SELECT person_id, properties.button_text, COUNT(*) as clicks
    FROM events 
    WHERE event = 'button_click'
      AND timestamp >= now() - toIntervalHour(1)
    GROUP BY person_id, properties.button_text
    HAVING COUNT(*) >= 5
  )
  
  UNION ALL
  
  SELECT 
    'LOW_CONVERSION' as issue_type,
    COUNT(*) as issue_count,
    'Conversion rate below 5% in last 24 hours' as description,
    'MEDIUM' as priority
  FROM events 
  WHERE event = 'button_click'
    AND timestamp >= now() - toIntervalDay(1)
  HAVING COUNT(CASE WHEN event = 'conversion' THEN 1 END) * 100.0 / COUNT(*) < 5
)
SELECT 
  issue_type,
  issue_count,
  description,
  priority,
  CASE 
    WHEN priority = 'HIGH' THEN 'IMMEDIATE_ACTION_REQUIRED'
    WHEN priority = 'MEDIUM' THEN 'INVESTIGATE_THIS_WEEK'
    ELSE 'MONITOR'
  END as recommended_action
FROM issue_detection
ORDER BY 
  CASE priority 
    WHEN 'HIGH' THEN 1 
    WHEN 'MEDIUM' THEN 2 
    ELSE 3 
  END;
```

---

## 📊 **Usage Instructions**

### **How to Use These Queries:**

1. **Copy the SQL query** you need
2. **Replace button text** in the configuration section (marked with 🔧)
3. **Adjust time ranges** as needed (currently set to 30 days)
4. **Run in PostHog SQL editor** or Insights
5. **Export results** to CSV for further analysis

### **Query Categories:**
- **🎯 Executive Summary**: Daily/weekly overviews
- **🚨 Critical Performance**: Issues requiring immediate attention
- **📈 Revenue Impact**: Traffic source and conversion analysis
- **🎯 A/B Testing**: Button and feature comparison
- **📊 Time-Based**: Peak performance analysis
- **🔍 Technical Performance**: Form and UX analysis

### **Recommended Schedule:**
- **Daily**: Executive Summary, Issue Detection
- **Weekly**: Performance Trends, Button Analysis
- **Monthly**: Complete Funnel Analysis, ROI Analysis

---

*These queries provide comprehensive insights into your FlashFire website performance and help make data-driven decisions for optimization and growth.* 🚀
