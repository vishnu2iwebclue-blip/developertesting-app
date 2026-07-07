# CRM Pro Mobile - Vue 3 Edition

A complete Vue 3 conversion of the CRM Pro Mobile application from vanilla JavaScript/HTML to a modern Single Page Application (SPA).

## Project Structure

```
├── public/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── StatusBadge.vue
│   │   ├── CategoryBadge.vue
│   │   ├── PaymentBadge.vue
│   │   ├── RatingBar.vue
│   │   └── RoleBadge.vue
│   ├── services/           # Business logic & data management
│   │   ├── auth.js         # Authentication & permissions
│   │   ├── data.js         # Data service with embedded data
│   │   └── ui.js           # UI utilities (toasts, dialogs, etc)
│   ├── utils/              # Helper functions
│   │   └── helpers.js      # Date formatting, initials, etc
│   ├── views/              # Page components (15 pages)
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── InsightListView.vue
│   │   ├── LeadsView.vue
│   │   ├── LeadDetailsView.vue
│   │   ├── LeadAddView.vue
│   │   ├── LeadEditView.vue
│   │   ├── LeadAssignView.vue
│   │   ├── LeadCommView.vue
│   │   ├── CalendarView.vue
│   │   ├── ReportsView.vue
│   │   ├── UsersView.vue
│   │   ├── UserDetailsView.vue
│   │   ├── UserAddView.vue
│   │   └── UserEditView.vue
│   ├── router/             # Vue Router configuration
│   │   └── index.js
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── css/
│   └── style.css           # Tailored mobile styles
├── index.html
├── vite.config.js          # Vite build configuration
└── package.json
```

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Key Features

### ✅ Full Data Persistence
- All data stored in browser's localStorage
- 22 users, 6 groups, 5 teams, 14 sample leads pre-loaded
- Data persists across page reloads

### ✅ Complete Authentication
- Role-based access control (5 roles: Admin, Manager, Team Leader, Coordinator, Employee)
- Demo credentials for each role:
  - Admin: admin@crm.com / admin123
  - Employee: emp@crm.com / emp123
  - Manager: manager@crm.com / mgr123
  - Coordinator: coord@crm.com / coord123

### ✅ 15 Full-Featured Views
1. **Login** - Secure authentication with demo buttons
2. **Dashboard** - Real-time insights & KPIs
3. **Insight List** - Filtered follow-ups & meetings
4. **Leads** - Complete CRUD with advanced filtering
5. **Lead Details** - Full lead info, communications timeline
6. **Lead Add** - Create new leads
7. **Lead Edit** - Update lead data
8. **Lead Assign** - Reassign leads to team members
9. **Lead Communication** - Log calls, emails, meetings
10. **Calendar** - Visual calendar with event tracking
11. **Reports** - KPI dashboard & analytics
12. **Users** - User management & performance
13. **User Details** - User profile & statistics
14. **User Add** - Create new users (Admin only)
15. **User Edit** - Update user information (Admin only)

### ✅ Advanced Filtering
- Multi-field search across leads
- Status, category, payment, and custom filters
- Real-time filter count badge

### ✅ Responsive Mobile Design
- Faithful reproduction of original mobile mockup
- iPhone-style phone frame with notch
- Touch-friendly controls
- Smooth transitions and animations

### ✅ Role-Based Permissions
- Admin can manage all users and leads
- Managers see group-scoped data
- Team Leaders manage team members' work
- Employees see only their assigned leads
- Transparent permission checks on sensitive operations

## Technologies

- **Vue 3** - Composition API with reactive state management
- **Vue Router** - Client-side routing
- **Vite** - Next-generation build tool
- **LocalStorage** - Client-side data persistence
- **Font Awesome** - Icon library

## API/Data Structure

### Lead Model
```javascript
{
  id, clientName, clientCompany, clientMobile, clientEmail,
  state, city, product, regarding, callStatus, clientResponse,
  status, leadCategory, rating, paymentStatus, nextCallDate,
  nextCallTime, meetingType, meetingAgendaType, meetingDate,
  meetingTime, meetingInitiatedBy, assignedTo, groupId, teamId,
  businessCategory, notes, createdBy, createdAt, updatedAt,
  communications: [{ type, date, user, notes }]
}
```

### User Model
```javascript
{
  id, empId, name, email, password, mobile, role,
  groupId, teamId, status, joiningDate
}
```

### Available Roles
- Admin
- Manager
- Team Leader
- Team Coordinator
- Employee

## Development Notes

### Component Communication
- Global `Auth` service for authentication state
- Global `Data` service for CRUD operations
- Global `UI` service for notifications and dialogs
- Vue Router for navigation

### State Management
- Reactive form state using `reactive()` API
- Data persisted to localStorage
- No external state management needed (small app)

### Styling
- Original CSS preserved and optimized
- Mobile-first responsive design
- CSS variables for theming
- Tailored for 390x844 viewport (iPhone size)

## Demo Test Scenarios

### 1. Admin Access
Login with `admin@crm.com` / `admin123`
- Full access to all leads and users
- Can create, edit, delete users
- View all reports and analytics

### 2. Employee Workflow
Login with `emp@crm.com` / `emp123`
- See assigned leads
- Log communications
- View personal calendar

### 3. Manager Dashboard
Login with `manager@crm.com` / `mgr123`
- See group's leads only
- Advanced reports & analytics
- Cannot manage users (admin feature)

## Performance Optimizations

- Lazy data loading from localStorage
- Efficient Vue component rendering
- Minimal re-renders with reactive state
- CSS optimizations for mobile
- No external API calls (offline-first)

## Future Enhancements

- Backend API integration
- Cloud data sync
- Real-time collaboration
- Push notifications
- Export to CSV/PDF
- Advanced analytics
- Mobile app wrapper (Cordova/Electron)

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**localStorage quota exceeded?**
- Clear browser cache: DevTools > Application > Clear storage

**Styling issues?**
- Ensure CSS file is imported in App.vue
- Check browser console for missing resources

## License

Proprietary - CRM Pro Mobile
