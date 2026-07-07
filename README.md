# CRM Pro Mobile Prototype v2

## Quick Start
Open `login.html` in any modern browser (Chrome/Edge/Firefox).
All data is stored in localStorage — no server needed.

## Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@crm.com | admin123 |
| Manager | manager@crm.com | mgr123 |
| Team Leader | rohit.desai@crm.com | pass123 |
| Coordinator | coord@crm.com | coord123 |
| Employee | emp@crm.com | emp123 |

## What's New in v2
- **Full Filter Panel** on Leads: Status, Category (Hot/Warm/Solo/Cold), Payment Status,
  Rating %, Call Status, Product, Business Category, Group, Team, Assigned To, State
- **Action Buttons** on every lead card: Call, WhatsApp, Email, View, Edit
- **Lead Category** field: Hot / Warm / Solo / Cold
- **Rating %** field: 40% to 95% with visual progress bar
- **Payment Status**: Pay Today, Pay Tomorrow, Pay This Week, Pay Next Week, Pay Ignoring, Pay Lost
- **Extended Lead Status**: includes Close (Won), Hot, Warm, Solo
- **Meeting/Followup fields**: Meeting Type, Agenda Type, Meeting Date/Time, Meeting Initiated By, Created By
- **Detailed Insights Page**:
  - Today Followup | Upcoming Followup
  - Today Meeting  | Upcoming Meeting
  - Missed Followup | Missed Meeting
  - Each shows: Business Category, Agenda Type, Date/Time, Client, City, Assigned To, Initiated By, Created By
  - "View all" links open full lists

## Pages (17 HTML files)
- login.html
- dashboard.html (Insights with 6 activity sections)
- insight-list.html (Full detail view)
- leads.html (with filter panel + action buttons)
- lead-details.html
- lead-add.html
- lead-edit.html
- lead-assign.html
- lead-comm.html
- calendar.html
- reports.html
- users.html
- user-details.html
- user-add.html
- user-edit.html
- css/style.css
- js/app.js