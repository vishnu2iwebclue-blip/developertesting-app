import { Api } from './api'

const RAW_USERS = [
  {id:"USR001",empId:"EMP001",name:"Rajesh Kumar",email:"admin@crm.com",password:"admin123",mobile:"9876543210",role:"Admin",groupId:null,teamId:null,status:"Active",joiningDate:"2023-01-01"},
  {id:"USR002",empId:"EMP002",name:"Priya Sharma",email:"priya.sharma@crm.com",password:"pass123",mobile:"9876543211",role:"Manager",groupId:"GRP001",teamId:null,status:"Active",joiningDate:"2023-02-01"},
  {id:"USR003",empId:"EMP003",name:"Amit Patel",email:"amit.patel@crm.com",password:"pass123",mobile:"9876543212",role:"Manager",groupId:"GRP002",teamId:null,status:"Active",joiningDate:"2023-02-05"},
  {id:"USR004",empId:"EMP004",name:"Sunita Verma",email:"sunita.verma@crm.com",password:"pass123",mobile:"9876543213",role:"Manager",groupId:"GRP003",teamId:null,status:"Active",joiningDate:"2023-02-10"},
  {id:"USR005",empId:"EMP005",name:"Vikram Singh",email:"vikram.singh@crm.com",password:"pass123",mobile:"9876543214",role:"Manager",groupId:"GRP004",teamId:null,status:"Active",joiningDate:"2023-02-15"},
  {id:"USR006",empId:"EMP006",name:"Kavitha Reddy",email:"kavitha.reddy@crm.com",password:"pass123",mobile:"9876543215",role:"Manager",groupId:"GRP005",teamId:null,status:"Active",joiningDate:"2023-03-01"},
  {id:"USR012",empId:"EMP012",name:"Rohit Desai",email:"rohit.desai@crm.com",password:"pass123",mobile:"9876543221",role:"Team Leader",groupId:"GRP001",teamId:"TM001",status:"Active",joiningDate:"2023-04-10"},
  {id:"USR013",empId:"EMP013",name:"Anita Kulkarni",email:"anita.kulkarni@crm.com",password:"pass123",mobile:"9876543222",role:"Team Coordinator",groupId:"GRP001",teamId:"TM001",status:"Active",joiningDate:"2023-04-12"},
  {id:"USR014",empId:"EMP014",name:"Sachin Shinde",email:"sachin.shinde@crm.com",password:"pass123",mobile:"9876543223",role:"Team Leader",groupId:"GRP001",teamId:"TM002",status:"Active",joiningDate:"2023-04-15"},
  {id:"USR018",empId:"EMP018",name:"Dhruv Shah",email:"dhruv.shah@crm.com",password:"pass123",mobile:"9876543227",role:"Team Leader",groupId:"GRP002",teamId:"TM004",status:"Active",joiningDate:"2023-05-05"},
  {id:"USR028",empId:"EMP028",name:"Nitin Chauhan",email:"nitin.chauhan@crm.com",password:"pass123",mobile:"9876543237",role:"Team Leader",groupId:"GRP004",teamId:"TM009",status:"Active",joiningDate:"2023-07-01"},
  {id:"USR029",empId:"EMP029",name:"Sonia Arora",email:"sonia.arora@crm.com",password:"pass123",mobile:"9876543238",role:"Team Coordinator",groupId:"GRP004",teamId:"TM009",status:"Active",joiningDate:"2023-07-02"},
  {id:"USR032",empId:"EMP032",name:"Sunil Yadav",email:"coord@crm.com",password:"coord123",mobile:"9876543241",role:"Team Leader",groupId:"GRP004",teamId:"TM011",status:"Active",joiningDate:"2023-07-10"},
  {id:"USR033",empId:"EMP033",name:"Mamta Tiwari",email:"mamta.tiwari@crm.com",password:"pass123",mobile:"9876543242",role:"Team Coordinator",groupId:"GRP004",teamId:"TM011",status:"Active",joiningDate:"2023-07-11"},
  {id:"USR041",empId:"EMP041",name:"Geetha Subramanian",email:"emp@crm.com",password:"emp123",mobile:"9876543250",role:"Employee",groupId:"GRP001",teamId:"TM001",status:"Active",joiningDate:"2023-09-02"},
  {id:"USR042",empId:"EMP042",name:"Sandeep Tomar",email:"sandeep.tomar@crm.com",password:"pass123",mobile:"9876543251",role:"Employee",groupId:"GRP001",teamId:"TM001",status:"Active",joiningDate:"2023-09-05"},
  {id:"USR043",empId:"EMP043",name:"Preeti Dubey",email:"preeti.dubey@crm.com",password:"pass123",mobile:"9876543252",role:"Employee",groupId:"GRP001",teamId:"TM001",status:"Active",joiningDate:"2023-09-10"},
  {id:"USR044",empId:"EMP044",name:"Vivek Pandey",email:"vivek.pandey@crm.com",password:"pass123",mobile:"9876543253",role:"Employee",groupId:"GRP001",teamId:"TM002",status:"Active",joiningDate:"2023-09-15"},
  {id:"USR045",empId:"EMP045",name:"Ritu Srivastava",email:"ritu.srivastava@crm.com",password:"pass123",mobile:"9876543254",role:"Employee",groupId:"GRP002",teamId:"TM004",status:"Active",joiningDate:"2023-10-01"},
  {id:"USR047",empId:"EMP047",name:"Sheetal Rathore",email:"sheetal.rathore@crm.com",password:"pass123",mobile:"9876543256",role:"Employee",groupId:"GRP004",teamId:"TM009",status:"Active",joiningDate:"2023-10-10"},
  {id:"USR048",empId:"EMP048",name:"Tarun Malhotra",email:"tarun.malhotra@crm.com",password:"pass123",mobile:"9876543257",role:"Employee",groupId:"GRP004",teamId:"TM009",status:"Active",joiningDate:"2023-10-15"},
  {id:"USR050",empId:"EMP050",name:"Deepti Chatterjee",email:"manager@crm.com",password:"mgr123",mobile:"9876543259",role:"Manager",groupId:"GRP008",teamId:null,status:"Active",joiningDate:"2023-11-05"},
]

const RAW_GROUPS = [
  {id:"GRP001",name:"Maharashtra",managerId:"USR002"},{id:"GRP002",name:"Gujarat",managerId:"USR003"},
  {id:"GRP003",name:"Rajasthan",managerId:"USR004"},{id:"GRP004",name:"Delhi NCR",managerId:"USR005"},
  {id:"GRP005",name:"Karnataka",managerId:"USR006"},{id:"GRP008",name:"West Bengal",managerId:"USR050"},
]

const RAW_TEAMS = [
  {id:"TM001",name:"Mumbai Team",groupId:"GRP001",leaderId:"USR012",coordinatorId:"USR013"},
  {id:"TM002",name:"Pune Team",groupId:"GRP001",leaderId:"USR014"},
  {id:"TM004",name:"Ahmedabad Team",groupId:"GRP002",leaderId:"USR018"},
  {id:"TM009",name:"Delhi Team",groupId:"GRP004",leaderId:"USR028",coordinatorId:"USR029"},
  {id:"TM011",name:"Gurgaon Team",groupId:"GRP004",leaderId:"USR032",coordinatorId:"USR033"},
]

const RAW_LEADS = [
  {id:"LEAD001",clientName:"Sarah Jenkins",clientCompany:"Acme Corp",clientMobile:"9876500001",clientEmail:"sarah@acme.com",state:"Maharashtra",city:"Mumbai",product:"Digital Business Card (V-Card)",callStatus:"Called - Interested",clientResponse:"Very Interested",regarding:"Client Requirement",status:"Contacted",leadCategory:"Hot",rating:80,paymentStatus:"Pay Today",nextCallDate:"2026-06-16",nextCallTime:"10:00",meetingType:"Followup",meetingAgendaType:"Product Demo",meetingDate:"2026-06-16",meetingTime:"10:00",meetingInitiatedBy:"USR041",assignedTo:"USR041",groupId:"GRP001",teamId:"TM001",businessCategory:"IT Services",notes:"Very interested in digital cards for her team.",createdBy:"USR041",createdAt:"2026-06-10 09:00:00",updatedAt:"2026-06-11 10:00:00",communications:[{type:"Call",date:"2026-06-10 09:00",user:"USR041",notes:"Initial call. Client interested in V-Card."},{type:"Email",date:"2026-06-11 10:00",user:"USR041",notes:"Sent product brochure and pricing."}]},
  {id:"LEAD002",clientName:"Marcus Chen",clientCompany:"TechFlow Solutions",clientMobile:"9876500002",clientEmail:"marcus@techflow.com",state:"Gujarat",city:"Ahmedabad",product:"CRM / ERP / CMS / eCommerce Software",callStatus:"Called - Callback",clientResponse:"Considering",regarding:"Client Demo",status:"Demo Scheduled",leadCategory:"Warm",rating:65,paymentStatus:"Pay This Week",nextCallDate:"2026-06-17",nextCallTime:"14:00",meetingType:"Meeting",meetingAgendaType:"Product Demo",meetingDate:"2026-06-17",meetingTime:"14:00",meetingInitiatedBy:"USR042",assignedTo:"USR042",groupId:"GRP001",teamId:"TM001",businessCategory:"Manufacturing",notes:"Need to send demo link before the meeting.",createdBy:"USR042",createdAt:"2026-06-08 11:00:00",updatedAt:"2026-06-09 09:00:00",communications:[{type:"Call",date:"2026-06-08 11:00",user:"USR042",notes:"Scheduled product demo."},{type:"Email",date:"2026-06-09 09:00",user:"USR042",notes:"Sent demo invite with Google Meet link."}]},
  {id:"LEAD003",clientName:"Elena Rodriguez",clientCompany:"Global Systems",clientMobile:"9876500003",clientEmail:"elena@global.com",state:"Delhi",city:"New Delhi",product:"Custom Website & App",callStatus:"Called - Interested",clientResponse:"Interested",regarding:"Client Meeting",status:"Proposal Sent",leadCategory:"Warm",rating:70,paymentStatus:"Pay Next Week",nextCallDate:"2026-06-20",nextCallTime:"11:30",meetingType:"Meeting",meetingAgendaType:"Requirement Discussion",meetingDate:"2026-06-18",meetingTime:"11:30",meetingInitiatedBy:"USR012",assignedTo:"USR012",groupId:"GRP001",teamId:"TM001",businessCategory:"Healthcare",notes:"Proposal sent via email. Awaiting feedback.",createdBy:"USR012",createdAt:"2026-06-05 09:00:00",updatedAt:"2026-06-06 09:00:00",communications:[{type:"Meeting",date:"2026-06-05 15:00",user:"USR012",notes:"In-person meeting at client office."},{type:"Email",date:"2026-06-06 09:00",user:"USR012",notes:"Sent detailed proposal document."}]},
  {id:"LEAD004",clientName:"David Kim",clientCompany:"Nexus Tech",clientMobile:"9876500004",clientEmail:"david@nexus.com",state:"Karnataka",city:"Bangalore",product:"Digital Marketing",callStatus:"Called - Interested",clientResponse:"Very Interested",regarding:"Client Query",status:"Negotiation",leadCategory:"Hot",rating:85,paymentStatus:"Pay Today",nextCallDate:"2026-06-16",nextCallTime:"16:00",meetingType:"Followup",meetingAgendaType:"Pricing Discussion",meetingDate:"2026-06-16",meetingTime:"16:00",meetingInitiatedBy:"USR041",assignedTo:"USR041",groupId:"GRP001",teamId:"TM001",businessCategory:"IT Services",notes:"Negotiating SEO+Social package price.",createdBy:"USR041",createdAt:"2026-05-20 10:00:00",updatedAt:"2026-05-28 14:00:00",communications:[{type:"Call",date:"2026-05-20 10:00",user:"USR041",notes:"Initial inquiry about digital marketing."},{type:"Call",date:"2026-05-28 14:00",user:"USR041",notes:"Price negotiation call."}]},
  {id:"LEAD005",clientName:"Jessica Smith",clientCompany:"Alpha Retail",clientMobile:"9876500005",clientEmail:"jessica@alpha.com",state:"Maharashtra",city:"Pune",product:"WhatsApp Store",callStatus:"Called - Not Interested",clientResponse:"Not Interested",regarding:"Client Query",status:"Lost",leadCategory:"Cold",rating:20,paymentStatus:"Pay Lost",nextCallDate:"2026-06-10",nextCallTime:"10:00",meetingType:"Followup",meetingAgendaType:"Budget Review",meetingDate:"2026-06-05",meetingTime:"10:00",meetingInitiatedBy:"USR041",assignedTo:"USR041",groupId:"GRP001",teamId:"TM001",businessCategory:"Retail",notes:"Client went with competitor. Budget too low.",createdBy:"USR041",createdAt:"2026-05-10 09:00:00",updatedAt:"2026-05-12 10:00:00",communications:[{type:"Call",date:"2026-05-10 09:00",user:"USR041",notes:"Client not interested. Price concern."}]},
  {id:"LEAD006",clientName:"Priya Kapoor",clientCompany:"Bright Minds",clientMobile:"9876500006",clientEmail:"priya@bright.com",state:"Maharashtra",city:"Nagpur",product:"Digital Business Card (V-Card)",callStatus:"Called - Callback",clientResponse:"Need More Info",regarding:"Client Requirement",status:"Follow-up Scheduled",leadCategory:"Warm",rating:55,paymentStatus:"Pay This Week",nextCallDate:"2026-06-17",nextCallTime:"15:30",meetingType:"Followup",meetingAgendaType:"Feature Discussion",meetingDate:"2026-06-17",meetingTime:"15:30",meetingInitiatedBy:"USR043",assignedTo:"USR043",groupId:"GRP001",teamId:"TM001",businessCategory:"Education",notes:"Asked for more details on V-Card features.",createdBy:"USR043",createdAt:"2026-06-12 11:00:00",updatedAt:"2026-06-12 11:00:00",communications:[{type:"Call",date:"2026-06-12 11:00",user:"USR043",notes:"Initial call. Client wants brochure."}]},
  {id:"LEAD007",clientName:"Rahul Sharma",clientCompany:"Metro Developers",clientMobile:"9876500007",clientEmail:"rahul@metro.com",state:"Gujarat",city:"Surat",product:"Custom Website & App",callStatus:"Called - Interested",clientResponse:"Very Interested",regarding:"Client Demo",status:"Close (Won)",leadCategory:"Hot",rating:95,paymentStatus:"Pay Today",nextCallDate:"2026-06-20",nextCallTime:"10:00",meetingType:"Meeting",meetingAgendaType:"Contract Signing",meetingDate:"2026-06-13",meetingTime:"10:00",meetingInitiatedBy:"USR018",assignedTo:"USR018",groupId:"GRP002",teamId:"TM004",businessCategory:"Real Estate",notes:"Deal closed. Payment received.",createdBy:"USR018",createdAt:"2026-05-01 10:00:00",updatedAt:"2026-05-20 09:00:00",communications:[{type:"Call",date:"2026-05-01 10:00",user:"USR018",notes:"Initial call."},{type:"Meeting",date:"2026-05-15 14:00",user:"USR018",notes:"Demo meeting — client loved the product."},{type:"Email",date:"2026-05-20 09:00",user:"USR018",notes:"Sent invoice. Deal won!"}]},
  {id:"LEAD008",clientName:"Anjali Mehta",clientCompany:"Star Exports",clientMobile:"9876500008",clientEmail:"anjali@star.com",state:"Delhi",city:"Gurgaon",product:"CRM / ERP / CMS / eCommerce Software",callStatus:"Not Called",clientResponse:"",regarding:"Client Meeting",status:"New Lead",leadCategory:"Warm",rating:45,paymentStatus:"Pay Next Week",nextCallDate:"2026-06-19",nextCallTime:"09:00",meetingType:"Meeting",meetingAgendaType:"Initial Discussion",meetingDate:"2026-06-19",meetingTime:"09:00",meetingInitiatedBy:"USR028",assignedTo:"USR028",groupId:"GRP004",teamId:"TM009",businessCategory:"Logistics",notes:"New prospect from reference.",createdBy:"USR028",createdAt:"2026-06-15 09:00:00",updatedAt:"2026-06-15 09:00:00",communications:[]},
  {id:"LEAD009",clientName:"Vikram Gupta",clientCompany:"Nova Industries",clientMobile:"9876500009",clientEmail:"vikram@nova.com",state:"Rajasthan",city:"Jaipur",product:"Digital Marketing",callStatus:"Called - Not Reachable",clientResponse:"Need More Info",regarding:"Others",status:"New Lead",leadCategory:"Solo",rating:40,paymentStatus:"Pay Ignoring",nextCallDate:"2026-06-16",nextCallTime:"11:00",meetingType:"Followup",meetingAgendaType:"Callback",meetingDate:"2026-06-14",meetingTime:"11:00",meetingInitiatedBy:"USR041",assignedTo:"USR041",groupId:"GRP001",teamId:"TM001",businessCategory:"Manufacturing",notes:"Follow-up call needed.",createdBy:"USR041",createdAt:"2026-06-14 09:00:00",updatedAt:"2026-06-14 09:00:00",communications:[]},
  {id:"LEAD010",clientName:"Sneha Reddy",clientCompany:"Pioneer Software",clientMobile:"9876500010",clientEmail:"sneha@pioneer.com",state:"Karnataka",city:"Mysore",product:"WhatsApp Store",callStatus:"Called - Busy",clientResponse:"Interested",regarding:"Client Query",status:"Contacted",leadCategory:"Warm",rating:60,paymentStatus:"Pay Tomorrow",nextCallDate:"2026-06-17",nextCallTime:"13:00",meetingType:"Followup",meetingAgendaType:"Product Walkthrough",meetingDate:"2026-06-17",meetingTime:"13:00",meetingInitiatedBy:"USR041",assignedTo:"USR041",groupId:"GRP001",teamId:"TM001",businessCategory:"IT Services",notes:"Interested in WA store for retail ops.",createdBy:"USR041",createdAt:"2026-06-13 10:00:00",updatedAt:"2026-06-13 10:00:00",communications:[{type:"Call",date:"2026-06-13 10:00",user:"USR041",notes:"Client answered briefly. Will call back."}]},
  {id:"LEAD011",clientName:"Aditya Rao",clientCompany:"Pacific Traders",clientMobile:"9876500011",clientEmail:"aditya@pacific.com",state:"Gujarat",city:"Vadodara",product:"Other Services",callStatus:"Called - Interested",clientResponse:"Considering",regarding:"Client Requirement",status:"Follow-up Scheduled",leadCategory:"Warm",rating:50,paymentStatus:"Pay This Week",nextCallDate:"2026-06-20",nextCallTime:"10:00",meetingType:"Followup",meetingAgendaType:"Custom Requirements",meetingDate:"2026-06-11",meetingTime:"10:00",meetingInitiatedBy:"USR045",assignedTo:"USR045",groupId:"GRP002",teamId:"TM004",businessCategory:"Consulting",notes:"Needs custom solution discussion.",createdBy:"USR045",createdAt:"2026-06-11 09:00:00",updatedAt:"2026-06-11 09:00:00",communications:[{type:"Call",date:"2026-06-11 09:00",user:"USR045",notes:"Discussed requirements. Follow-up next week."}]},
  {id:"LEAD012",clientName:"Meera Joshi",clientCompany:"Sunrise Hotels",clientMobile:"9876500012",clientEmail:"meera@sunrise.com",state:"Delhi",city:"New Delhi",product:"Digital Marketing",callStatus:"Called - Callback",clientResponse:"Very Interested",regarding:"Client Demo",status:"Proposal Sent",leadCategory:"Hot",rating:75,paymentStatus:"Pay Tomorrow",nextCallDate:"2026-06-18",nextCallTime:"15:00",meetingType:"Meeting",meetingAgendaType:"Social Media Proposal",meetingDate:"2026-06-16",meetingTime:"15:00",meetingInitiatedBy:"USR047",assignedTo:"USR047",groupId:"GRP004",teamId:"TM009",businessCategory:"Hospitality",notes:"Hotel chain wants social media management.",createdBy:"USR047",createdAt:"2026-06-09 11:00:00",updatedAt:"2026-06-10 09:00:00",communications:[{type:"Call",date:"2026-06-09 11:00",user:"USR047",notes:"Client very interested."},{type:"Email",date:"2026-06-10 09:00",user:"USR047",notes:"Sent proposal for 6-month package."}]},
  {id:"LEAD013",clientName:"Ramesh Patil",clientCompany:"FreshFarm Exports",clientMobile:"9876500013",clientEmail:"ramesh@freshfarm.com",state:"Maharashtra",city:"Nashik",product:"Custom Website & App",callStatus:"Called - Interested",clientResponse:"Very Interested",regarding:"Client Demo",status:"Hot",leadCategory:"Hot",rating:88,paymentStatus:"Pay Today",nextCallDate:"2026-06-16",nextCallTime:"12:00",meetingType:"Meeting",meetingAgendaType:"Live Demo",meetingDate:"2026-06-16",meetingTime:"12:00",meetingInitiatedBy:"USR012",assignedTo:"USR012",groupId:"GRP001",teamId:"TM001",businessCategory:"Manufacturing",notes:"Urgent requirement. Budget approved.",createdBy:"USR012",createdAt:"2026-06-14 08:00:00",updatedAt:"2026-06-14 08:00:00",communications:[{type:"Call",date:"2026-06-14 08:00",user:"USR012",notes:"Client confirmed budget and timeline."}]},
  {id:"LEAD014",clientName:"Kavita Nair",clientCompany:"BrightKids Academy",clientMobile:"9876500014",clientEmail:"kavita@brightkids.com",state:"Kerala",city:"Kochi",product:"Digital Business Card (V-Card)",callStatus:"Called - Callback",clientResponse:"Considering",regarding:"Client Requirement",status:"Warm",leadCategory:"Warm",rating:52,paymentStatus:"Pay This Week",nextCallDate:"2026-06-18",nextCallTime:"11:00",meetingType:"Followup",meetingAgendaType:"Use Case Review",meetingDate:"2026-06-12",meetingTime:"11:00",meetingInitiatedBy:"USR043",assignedTo:"USR043",groupId:"GRP001",teamId:"TM001",businessCategory:"Education",notes:"School interested in teacher V-Cards.",createdBy:"USR043",createdAt:"2026-06-10 11:00:00",updatedAt:"2026-06-10 11:00:00",communications:[{type:"Call",date:"2026-06-10 11:00",user:"USR043",notes:"Sent brochure. Will decide this week."}]},
]

let syncPromise = null

function normalizeRole(role = '') {
  const value = String(role || '').trim().toLowerCase()
  if (!value) return 'Employee'
  if (value === 'admin') return 'Admin'
  if (value === 'manager') return 'Manager'
  if (value === 'team_leader' || value === 'team leader') return 'Team Leader'
  if (value === 'team_coordinator' || value === 'team coordinator' || value === 'coordinator') return 'Team Coordinator'
  if (value === 'employee') return 'Employee'
  return role
}

function toApiRole(role = '') {
  const value = String(role || '').trim().toLowerCase()
  if (value === 'team leader') return 'team_leader'
  if (value === 'team coordinator' || value === 'coordinator') return 'team_coordinator'
  return value || 'employee'
}

function toApiUserListRole(role = '') {
  const value = String(role || '').trim().toLowerCase()
  if (value === 'team leader') return 'team_leader'
  if (value === 'team coordinator' || value === 'coordinator') return 'team_coordinator'
  return value
}

function extractArray(payload) {
  const candidates = [
    payload?.data?.items,
    payload?.data?.data,
    payload?.data?.users,
    payload?.data?.leads,
    payload?.users,
    payload?.leads,
    payload?.data,
    payload
  ]
  return candidates.find(Array.isArray) || []
}

function extractOne(payload) {
  const candidates = [
    payload?.data?.lead,
    payload?.data?.user,
    payload?.lead,
    payload?.user,
    payload?.data,
    payload
  ]
  return candidates.find(x => x && !Array.isArray(x)) || null
}

function normalizeUser(user, i = 0) {
  const id = String(user?.id ?? user?.user_id ?? `USR${String(i + 1).padStart(3, '0')}`)
  const statusRaw = String(user?.status ?? '').toLowerCase()
  const status = ['inactive', 'false', '0'].includes(statusRaw) ? 'Inactive' : 'Active'
  const role = normalizeRole(user?.role_name || user?.role || user?.user_role || 'Employee')
  return {
    id,
    empId: user?.emp_id || user?.employee_id || `EMP${id}`,
    name: user?.name || user?.full_name || 'User',
    email: user?.email || '',
    password: user?.password || '',
    mobile: user?.phone || user?.mobile || '',
    role,
    roleName: user?.role_name || role,
    groupId: user?.group_id ? String(user.group_id) : null,
    groupName: user?.group_name ? String(user.group_name) : '',
    teamId: user?.team_id ? String(user.team_id) : null,
    status,
    statusLabel: user?.status_label || status,
    joiningDate: user?.joining_date || user?.created_at?.slice?.(0, 10) || '',
    totalLeads: Number(user?.total_leads || user?.totalLeads || 0),
    totalHotLeads: Number(user?.hot_leads || user?.hot_leads || 0),
    totalWarmLeads: Number(user?.won_leads || user?.won_leads || 0),
    todayCount: Number(user?.today_leads || user?.today_leads || 0)
  }
}

function normalizeLead(lead, i = 0) {
  const id = String(lead?.id ?? lead?.common_lead_id ?? `LEAD${String(i + 1).padStart(3, '0')}`)
  const ratingRaw = lead?.rating
  const ratingValue = String(ratingRaw ?? '').trim().toLowerCase()
  const ratingNum = Number(ratingRaw)
  const rating = Number.isFinite(ratingNum)
    ? ratingNum
    : ratingValue === 'hot'
      ? 85
      : ratingValue === 'warm'
        ? 65
        : ratingValue === 'cold'
          ? 25
          : 50

  const leadCategory =
    lead?.lead_category ||
    (rating >= 80 ? 'Hot' : rating >= 55 ? 'Warm' : rating >= 35 ? 'Solo' : 'Cold')

  const callStatus = lead?.call_status || 'Not Called'
  const leadStatusRaw = String(lead?.leadstatus || '').toLowerCase()
  const mappedLeadStatus = leadStatusRaw === 'new' ? 'New Lead' : lead?.leadstatus || ''
  const status =
    lead?.status_label ||
    lead?.status ||
    mappedLeadStatus ||
    (callStatus.includes('Interested') ? 'Contacted' : 'New Lead')
  const meetingDate = lead?.meeting_date || lead?.next_call_demo_date || ''

  return {
    id,
    yourName: lead?.your_name || lead?.yourName || '',
    yourContact: lead?.your_contact || lead?.yourContact || '',
    yourGroup: lead?.your_group || lead?.yourGroup || '',
    dataListId: Number(lead?.data_list_id || lead?.dataListId || 1),
    clientName: lead?.client_name || lead?.clientName || '',
    clientCompany: lead?.client_business_company_name || lead?.clientCompany || '',
    clientMobile: lead?.client_mobile || lead?.clientMobile || '',
    clientEmail: lead?.client_email || lead?.clientEmail || '',
    state: lead?.client_state || lead?.state || '',
    city: lead?.client_city || lead?.city || '',
    product: lead?.interested_product_service || lead?.product || '',
    callStatus,
    clientResponse: lead?.client_response || lead?.clientResponse || '',
    employeeName: lead?.employee_name || lead?.assigned_to_name || lead?.employeeName || '',
    regarding: lead?.regarding || '',
    status,
    leadCategory,
    rating,
    ratingValue,
    paymentStatus: lead?.payment || lead?.payment_status || lead?.paymentStatus || '',
    nextCallDate: lead?.next_call_demo_date || lead?.nextCallDate || '',
    nextCallTime: lead?.next_call_demo_time || lead?.nextCallTime || '',
    meetingType: lead?.meeting_type || (meetingDate ? 'Followup' : ''),
    meetingAgendaType: lead?.meeting_agenda_type || lead?.meetingAgendaType || '',
    meetingDate,
    meetingTime: lead?.meeting_time || lead?.next_call_demo_time || '',
    meetingInitiatedBy: String(lead?.meeting_initiated_by || lead?.created_by || lead?.meetingInitiatedBy || ''),
    assignedTo: String(
      lead?.assigned_to ||
      lead?.employee_id ||
      lead?.user_id ||
      lead?.assignedTo ||
      ''
    ),
    employeeId: String(lead?.employee_id || lead?.employeeId || ''),
    groupId: lead?.group_id ? String(lead.group_id) : null,
    groupName: lead?.group_name || lead?.groupName || '',
    teamId: lead?.team_id ? String(lead.team_id) : null,
    businessCategory: lead?.client_business_categories || lead?.businessCategory || '',
    clientBusinessServiceName: lead?.client_business_service_name || lead?.clientBusinessServiceName || '',
    statusType: Number(lead?.status_type || lead?.statusType || 1),
    statusLabel: lead?.status_label || lead?.statusLabel || '',
    leadStatus: lead?.leadstatus || lead?.leadStatus || '',
    activityState: lead?.activity_state || lead?.activityState || '',
    comment: lead?.comment || lead?.comment_text || '',
    followUpComment: lead?.follow_up_comment || lead?.followUpComment || '',
    notes: lead?.notes || lead?.comment || '',
    createdBy: String(lead?.created_by || lead?.createdBy || ''),
    createdAt: lead?.created_at || lead?.createdAt || '',
    updatedAt: lead?.updated_at || lead?.updatedAt || '',
    communications: Array.isArray(lead?.communications) ? lead.communications : []
  }
}

function toLeadPayload(lead) {
  return {
    your_name: lead.yourName || lead.createdBy || lead.meetingInitiatedBy || lead.assignedTo || 'App User',
    your_contact: lead.yourContact || '',
    your_group: lead.yourGroup || lead.groupId || '',
    data_list_id: Number(lead.dataListId || 1),
    status_type: Number(lead.statusType || 1),
    status_label: lead.statusLabel || '',
    leadstatus: lead.leadStatus || '',
    activity_state: lead.activityState || '',
    regarding: lead.regarding || '',
    next_call_demo_date: lead.nextCallDate || '',
    next_call_demo_time: lead.nextCallTime || '',
    client_business_company_name: lead.clientCompany || '',
    client_name: lead.clientName || '',
    client_mobile: lead.clientMobile || '',
    client_email: lead.clientEmail || '',
    interested_product_service: lead.product || '',
    call_status: lead.callStatus || '',
    client_response: lead.clientResponse || '',
    client_state: lead.state || '',
    client_city: lead.city || '',
    client_business_service_name: lead.clientBusinessServiceName || lead.meetingAgendaType || '',
    client_business_categories: lead.businessCategory || '',
    comment: lead.comment || lead.notes || '',
    follow_up_comment: lead.followUpComment || '',
    rating: String(lead.ratingValue || lead.rating || lead.leadCategory || ''),
    payment: lead.payment || lead.paymentStatus || ''
  }
}

function toUserPayload(user) {
  const payload = {
    name: user.name || '',
    email: user.email || '',
    phone: user.mobile || '',
    role: toApiRole(user.role),
    group_id: user.groupId ? Number(user.groupId) : null,
    status: user.status === 'Active'
  }
  const password = String(user.password || '').trim()
  if (password) {
    payload.password = password
  }
  return payload
}

function asList(payload, ...keys) {
  for (const key of keys) {
    const value = key.split('.').reduce((acc, part) => acc?.[part], payload)
    if (Array.isArray(value)) return value
  }
  return []
}

function asNum(payload, ...keys) {
  for (const key of keys) {
    const value = key.split('.').reduce((acc, part) => acc?.[part], payload)
    if (typeof value === 'number') return value
    if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
      return Number(value)
    }
  }
  return null
}

function normalizeKey(value = '') {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function toCountMap(input) {
  if (!input) return {}
  if (Array.isArray(input)) {
    return input.reduce((acc, item) => {
      const key = item?.name || item?.label || item?.key || item?.title || item?.type || ''
      const count = asNum(item, 'count', 'total', 'value', 'leads', 'n') ?? 0
      if (key) acc[normalizeKey(key)] = Number(count)
      return acc
    }, {})
  }
  if (typeof input === 'object') {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const count = typeof value === 'object' ? asNum(value, 'count', 'total', 'value') : Number(value)
      if (!Number.isNaN(Number(count))) {
        acc[normalizeKey(key)] = Number(count)
      }
      return acc
    }, {})
  }
  return {}
}

function pickCount(map, aliases = []) {
  for (const alias of aliases) {
    const key = normalizeKey(alias)
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      return Number(map[key] || 0)
    }
  }
  return 0
}

function normalizeHistoryItem(item = {}) {
  return {
    at: item?.at || item?.date || item?.created_at || '',
    by: item?.by || item?.user || item?.employee_name || 'System',
    type: String(item?.type || 'activity').toLowerCase(),
    message: item?.message || item?.notes || ''
  }
}

function emptyHistoryGroups() {
  return {
    status: [],
    meeting: [],
    email: [],
    whatsapp: []
  }
}

function normalizeHistoryGroups(groups = {}) {
  const base = emptyHistoryGroups()
  for (const key of Object.keys(base)) {
    base[key] = Array.isArray(groups?.[key]) ? groups[key].map(normalizeHistoryItem) : []
  }
  return base
}

function normalizeDashboardItem(item) {
  return {
    id: String(item?.id ?? ''),
    clientName: item?.client_name || '',
    clientCompany: item?.client_city || '',
    city: item?.client_city || '',
    state: '',
    product: item?.interested_product_service || '',
    regarding: item?.regarding || '',
    businessCategory: item?.regarding || '',
    meetingAgendaType: item?.call_status || '',
    meetingDate: item?.next_followup_date || '',
    meetingTime: item?.next_followup_time || '',
    nextCallDate: item?.next_followup_date || '',
    nextCallTime: item?.next_followup_time || ''
  }
}

export const Data = {
  _init() {
    if (!localStorage.getItem('crm_users')) localStorage.setItem('crm_users', JSON.stringify(RAW_USERS))
    if (!localStorage.getItem('crm_leads')) localStorage.setItem('crm_leads', JSON.stringify(RAW_LEADS))
    if (!localStorage.getItem('crm_groups')) localStorage.setItem('crm_groups', JSON.stringify(RAW_GROUPS))
    if (!localStorage.getItem('crm_teams')) localStorage.setItem('crm_teams', JSON.stringify(RAW_TEAMS))
  },

  loadAll() {
    this._init()
    const rawSession = localStorage.getItem('crm_session') || sessionStorage.getItem('crm_session') || 'null'
    let session = null
    try {
      session = JSON.parse(rawSession)
    } catch {
      session = null
    }
    if (!session?.token) return Promise.resolve()

    if (syncPromise) return syncPromise
    syncPromise = (async () => {
      try {
        const [leadsPayload, usersPayload] = await Promise.all([
          Api.getLeads(20),
          Api.getUsers(20)
        ])
        const leads = extractArray(leadsPayload).map((lead, i) => normalizeLead(lead, i))
        const users = extractArray(usersPayload).map((user, i) => normalizeUser(user, i))
        if (leads.length) this.save('leads', leads)
        if (users.length) this.save('users', users)
      } catch (err) {
        // Keep app usable with local fallback data if API fetch fails.
        console.error('Data sync failed:', err.message || err)
      } finally {
        syncPromise = null
      }
    })()
    return syncPromise
  },

  getAll(k) {
    return JSON.parse(localStorage.getItem('crm_' + k) || '[]')
  },

  save(k, v) {
    localStorage.setItem('crm_' + k, JSON.stringify(v))
  },

  getById(k, id) {
    return this.getAll(k).find(x => String(x.id) === String(id)) || null
  },

  upsert(k, item) {
    const all = this.getAll(k)
    const i = all.findIndex(x => String(x.id) === String(item.id))
    if (i >= 0) all[i] = item
    else all.unshift(item)
    this.save(k, all)

    if (k === 'leads') {
      this._syncLead(item)
    } else if (k === 'users') {
      this._syncUser(item)
    }

    return item
  },

  async createLead(item) {
    const payload = toLeadPayload(item)
    const res = await Api.createLead(payload)
    const saved = extractOne(res)
    if (!saved) return item
    const normalized = normalizeLead(saved)
    const all = this.getAll('leads')
    const i = all.findIndex(x => String(x.id) === String(normalized.id))
    if (i >= 0) all[i] = { ...all[i], ...normalized }
    else all.unshift(normalized)
    this.save('leads', all)
    return normalized
  },

  remove(k, id) {
    this.save(k, this.getAll(k).filter(x => String(x.id) !== String(id)))
  },

  async _syncLead(item) {
    try {
      const payload = toLeadPayload(item)
      const isServerId = /^\d+$/.test(String(item.id || ''))
      const res = isServerId
        ? await Api.updateLead(item.id, payload)
        : await Api.createLead(payload)
      const saved = extractOne(res)
      if (!saved) return
      const normalized = normalizeLead(saved)
      const all = this.getAll('leads')
      const i = all.findIndex(x => String(x.id) === String(item.id))
      if (i >= 0) all[i] = { ...all[i], ...normalized }
      else all.unshift(normalized)
      this.save('leads', all)
    } catch {
      // Save is already applied locally, so keep UX responsive.
    }
  },

  async _syncUser(item) {
    try {
      const payload = toUserPayload(item)
      const isServerId = /^\d+$/.test(String(item.id || ''))
      const res = isServerId
        ? await Api.updateUser(item.id, payload)
        : await Api.createUser(payload)
      const saved = extractOne(res)
      if (!saved) return
      const normalized = normalizeUser(saved)
      const all = this.getAll('users')
      const i = all.findIndex(x => String(x.id) === String(item.id))
      if (i >= 0) all[i] = { ...all[i], ...normalized }
      else all.unshift(normalized)
      this.save('users', all)
    } catch {
      // Keep local state if server rejects request.
    }
  },

  getLeadsForUser(user) {
    const leads = this.getAll('leads')
    if (!user) return leads
    if (user.role === 'Admin') return leads
    if (user.role === 'Manager') return leads.filter(l => l.groupId === user.groupId)
    if (user.role === 'Team Leader' || user.role === 'Team Coordinator') {
      const members = this.getAll('users').filter(u => u.teamId === user.teamId).map(u => u.id)
      return leads.filter(l => members.includes(l.assignedTo) || l.assignedTo === user.userId)
    }
    return leads.filter(l => l.assignedTo === user.userId)
  },

  getUsersForUser(user) {
    const users = this.getAll('users')
    if (user.role === 'Admin') return users
    if (user.role === 'Manager') return users.filter(u => u.groupId === user.groupId)
    return users.filter(u => u.teamId === user.teamId)
  },

  getEmployeesForUser(user) {
    return this.getUsersForUser(user).filter(u => u.status === 'Active')
  },

  getUserName(id) {
    const u = this.getById('users', id)
    return u ? u.name : (id || '—')
  },

  getGroupName(id) {
    const g = this.getById('groups', id)
    return g ? g.name : (id || '—')
  },

  getTeamName(id) {
    const t = this.getById('teams', id)
    return t ? t.name : (id || '—')
  },

  async getDashboardData(user) {
    const leads = this.getLeadsForUser(user)
    const fallback = {
      totalLeads: leads.length,
      wonLeads: leads.filter(l => l.status === 'Won' || l.status === 'Close (Won)').length,
      hotLeads: leads.filter(l => l.leadCategory === 'Hot' || l.status === 'Hot').length,
      todayCount: 0,
      activityOverview: {
        todayFollowup: leads.filter(l => l.meetingType === 'Followup').slice(0, 10),
        upcomingFollowup: [],
        todayMeeting: leads.filter(l => l.meetingType === 'Meeting').slice(0, 10),
        upcomingMeeting: []
      }
    }
    try {
      const payload = await Api.getDashboard()
      const stats = payload?.data?.stats || payload?.stats || payload?.data || payload
      const overview = payload?.data?.activity_overview || payload?.activity_overview || {}
      return {
        totalLeads: asNum(stats, 'total_leads', 'total') ?? fallback.totalLeads,
        wonLeads: asNum(stats, 'won_leads', 'won') ?? fallback.wonLeads,
        hotLeads: asNum(stats, 'hot_leads', 'hot') ?? fallback.hotLeads,
        todayCount: asNum(stats, 'today_leads', 'today_count', 'today') ?? fallback.todayCount,
        activityOverview: {
          todayFollowup: asList(overview, 'today_followup.items', 'today_followup')
            .map(normalizeDashboardItem),
          upcomingFollowup: asList(overview, 'upcoming_followup.items', 'upcoming_followup')
            .map(normalizeDashboardItem),
          todayMeeting: asList(overview, 'today_meeting.items', 'today_meeting')
            .map(normalizeDashboardItem),
          upcomingMeeting: asList(overview, 'upcoming_meeting.items', 'upcoming_meeting')
            .map(normalizeDashboardItem)
        }
      }
    } catch {
      return fallback
    }
  },

  async getCalendarMonthData(month, date) {
    try {
      const payload = await Api.getCalendar({ month, date })
      const days = asList(payload, 'data.days', 'days').map(day => ({
        date: day.date,
        day: Number(day.day || 0),
        weekday: day.weekday || '',
        totalEvents: Number(day.total_events || 0),
        meetings: Number(day.meetings || 0),
        followups: Number(day.followups || 0),
        hasEvents: Boolean(day.has_events),
        isToday: Boolean(day.is_today),
        isSelected: Boolean(day.is_selected)
      }))

      const selectedItemsRaw = asList(
        payload,
        'data.selected_date_items',
        'selected_date_items',
        'data.items',
        'items',
        'data.events',
        'events'
      )
      const selectedDate = payload?.data?.selected_date || date
      const selectedItems = selectedItemsRaw.map((item, i) => {
        const normalized = normalizeLead(item, i)
        return {
          ...normalized,
          nextCallDate: normalized.nextCallDate || selectedDate,
          meetingDate: normalized.meetingDate || selectedDate
        }
      })

      return {
        days,
        selectedItems,
        selectedDate,
        monthLabel: payload?.data?.month_label || ''
      }
    } catch {
      const fallback = this.getAll('leads')
      const [y, m] = String(month).split('-').map(Number)
      const daysCount = new Date(y, m, 0).getDate()
      const fallbackDays = Array.from({ length: daysCount }, (_, i) => {
        const d = i + 1
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        const dayEvents = fallback.filter(l => l.nextCallDate === dateStr || l.meetingDate === dateStr)
        return {
          date: dateStr,
          day: d,
          weekday: '',
          totalEvents: dayEvents.length,
          meetings: dayEvents.filter(e => e.meetingType === 'Meeting').length,
          followups: dayEvents.filter(e => e.meetingType === 'Followup').length,
          hasEvents: dayEvents.length > 0,
          isToday: dateStr === new Date().toISOString().split('T')[0],
          isSelected: dateStr === date
        }
      })

      return {
        days: fallbackDays,
        selectedItems: fallback.filter(l => l.nextCallDate === date || l.meetingDate === date),
        selectedDate: date,
        monthLabel: ''
      }
    }
  },

  async getCalendarDayData(date) {
    try {
      const payload = await Api.getCalendarDay(date)
      const raw = asList(payload, 'data.events', 'events', 'data.data', 'data')
      return raw.map((item, i) => normalizeLead(item, i))
    } catch {
      return this.getAll('leads').filter(l => l.nextCallDate === date || l.meetingDate === date)
    }
  },

  async getReportsData(period) {
    const params = {}
    if (period === 'month') {
      params.period = 'month'
      params.month = new Date().toISOString().slice(0, 7)
    } else if (period === 'quarter') {
      params.period = 'quarter'
      const now = new Date()
      params.year = String(now.getFullYear())
      params.quarter = String(Math.floor(now.getMonth() / 3) + 1)
    }

    try {
      const payload = await Api.getReports(params)
      const analytics = payload?.data?.analytics || {}
      const stats = payload?.data?.stats || analytics || payload?.data || payload
      const categoryTitle =
        analytics?.lead_category?.title ||
        payload?.data?.lead_category?.title ||
        'Lead Category'
      const stageLeadCategory =
        payload?.data?.stage_lead_category ||
        payload?.data?.stge_lead_category ||
        analytics?.stage_lead_category ||
        analytics?.stge_lead_category ||
        {}
      const productRaw =
        payload?.data?.interested_in_product_service?.items ||
        payload?.data?.interested_in_product_service ||
        analytics?.product_breakdown?.items ||
        analytics?.product_breakdown ||
        analytics?.products?.items ||
        analytics?.products ||
        payload?.data?.product_breakdown ||
        payload?.data?.products ||
        stats?.product_breakdown ||
        stats?.products ||
        {}
      const categoryRaw =
        analytics?.lead_category?.items ||
        analytics?.lead_category ||
        analytics?.category_breakdown?.items ||
        analytics?.category_breakdown ||
        analytics?.categories?.items ||
        analytics?.categories ||
        payload?.data?.category_breakdown ||
        payload?.data?.categories ||
        stats?.category_breakdown ||
        stats?.categories ||
        {}
      const paymentRaw =
        analytics?.payment_status?.items ||
        analytics?.payment_status ||
        analytics?.payment_breakdown?.items ||
        analytics?.payment_breakdown ||
        analytics?.payments?.items ||
        analytics?.payments ||
        payload?.data?.payment_breakdown ||
        payload?.data?.payments ||
        stats?.payment_breakdown ||
        stats?.payments ||
        {}

      const productMap = toCountMap(productRaw)
      const categoryMap = toCountMap(categoryRaw)
      const paymentMap = toCountMap(paymentRaw)
      const categoryItems = Array.isArray(categoryRaw) ? categoryRaw : []
      const stageItemsRaw = Array.isArray(stageLeadCategory?.items) ? stageLeadCategory.items : []
      const findCategoryCount = (key, label) => {
        const fromItems = categoryItems.find(
          (x) => normalizeKey(x?.key) === normalizeKey(key) || normalizeKey(x?.label) === normalizeKey(label)
        )
        if (fromItems) return Number(fromItems?.count || 0)
        return categoryMap[normalizeKey(label)] || categoryMap[normalizeKey(key)] || 0
      }
      const hotCount = findCategoryCount('hot', 'Hot')
      const warmCount = findCategoryCount('warm', 'Warm')
      const soloCount = findCategoryCount('solo', 'Solo')
      const coldCount = findCategoryCount('cold', 'Cold')
      const categoryColorMap = {
        hot: '#FF6D00',
        warm: '#E65100',
        solo: '#283593',
        cold: '#0277BD'
      }
      const dynamicCategoryItems = categoryItems.length
        ? categoryItems.map((item) => {
            const key = String(item?.key || item?.label || '').toLowerCase()
            return {
              c: item?.label || item?.key || 'Category',
              col: categoryColorMap[key] || '#607D8B',
              n: Number(item?.count || 0),
              pct: Number(item?.percentage || 0)
            }
          })
        : [
            { c: 'Hot', col: '#FF6D00', n: hotCount, pct: 0 },
            { c: 'Warm', col: '#E65100', n: warmCount, pct: 0 },
            { c: 'Solo', col: '#283593', n: soloCount, pct: 0 },
            { c: 'Cold', col: '#0277BD', n: coldCount, pct: 0 }
          ]
      const leadStatusTitle = stageLeadCategory?.title || 'Lead Status'
      const leadStatusItems = stageItemsRaw.map((item) => ({
        key: item?.key || '',
        label: item?.label || item?.key || 'Status',
        count: Number(item?.count || 0),
        percentage: Number(item?.percentage || 0)
      }))

      return {
        total: asNum(stats, 'total_leads', 'total_lead', 'total') ?? 0,
        won: asNum(stats, 'won_leads', 'won_lead', 'won') ??
          (toCountMap(categoryRaw)[normalizeKey('won')] || 0),
        lost: asNum(stats, 'lost_leads', 'lost_lead', 'lost') ??
          coldCount,
        hot: asNum(stats, 'hot_leads', 'hot_lead', 'hot') ??
          hotCount,
        conv: asNum(stats, 'conversion', 'conversion_rate', 'conv', 'win_percent') ?? 0,
        productBreakdown: {
          'Digital Business Card (V-Card)': pickCount(productMap, [
            'Digital Business Card (V-Card)',
            'Digital Business Card',
            'V-Card',
            'V Card'
          ]),
          'WhatsApp Store': pickCount(productMap, [
            'WhatsApp Store',
            'WhatsApp'
          ]),
          'Custom Website & App': pickCount(productMap, [
            'Custom Website & App',
            'Custom Website App',
            'Custom Website and App'
          ]),
          'CRM / ERP / CMS / eCommerce Software': pickCount(productMap, [
            'CRM / ERP / CMS / eCommerce Software',
            'Customer Software CRM/ ERP, CMS, eCommerce',
            'Customer Software CRM ERP CMS eCommerce',
            'CRM ERP CMS ecommerce'
          ]),
          'Digital Marketing': pickCount(productMap, [
            'Digital Marketing',
            'Digital Marketing - SEO, Social or PPC, Ads',
            'Marketing'
          ]),
          'Other Services': pickCount(productMap, [
            'Other Services',
            'Other'
          ])
        },
        categoryBreakdown: {
          Hot: hotCount,
          Warm: warmCount,
          Solo: soloCount,
          Cold: coldCount
        },
        categoryTitle,
        categoryItems: dynamicCategoryItems,
        leadStatusTitle,
        leadStatusItems,
        paymentBreakdown: {
          'Pay Today': paymentMap[normalizeKey('Pay Today')] || paymentMap[normalizeKey('today')] || 0,
          'Pay Tomorrow': paymentMap[normalizeKey('Pay Tomorrow')] || paymentMap[normalizeKey('tomorrow')] || 0,
          'Pay This Week': paymentMap[normalizeKey('Pay This Week')] || paymentMap[normalizeKey('this week')] || 0,
          'Pay Next Week': paymentMap[normalizeKey('Pay Next Week')] || paymentMap[normalizeKey('next week')] || 0,
          'Pay Ignoring': paymentMap[normalizeKey('Pay Ignoring')] || paymentMap[normalizeKey('ignoring')] || 0,
          'Pay Lost': paymentMap[normalizeKey('Pay Lost')] || paymentMap[normalizeKey('lost')] || 0
        }
      }
    } catch (err) {
      console.error('Reports API failed:', err?.message || err)
      return null
    }
  },

  async fetchLeadById(id) {
    try {
      const payload = await Api.getLeadDetails(id)
      const raw = extractOne(payload)
      if (!raw) return null
      const normalized = normalizeLead(raw)
      const all = this.getAll('leads')
      const i = all.findIndex(x => String(x.id) === String(normalized.id))
      if (i >= 0) all[i] = { ...all[i], ...normalized }
      else all.unshift(normalized)
      this.save('leads', all)
      return normalized
    } catch {
      return this.getById('leads', id)
    }
  },

  async updateQuickFollowup(id, payload) {
    const res = await Api.quickFollowupUpdate(id, payload)
    const rawLead = res?.data?.lead || extractOne(res)
    const history = Array.isArray(res?.data?.comment_history)
      ? res.data.comment_history.map(normalizeHistoryItem)
      : []

    if (!rawLead) {
      return { lead: null, history }
    }

    const normalized = normalizeLead(rawLead)
    const all = this.getAll('leads')
    const i = all.findIndex(x => String(x.id) === String(normalized.id))
    if (i >= 0) all[i] = { ...all[i], ...normalized }
    else all.unshift(normalized)
    this.save('leads', all)

    return { lead: normalized, history }
  },

  async fetchLeadHistory(id) {
    const result = await this.fetchLeadHistoryData(id)
    return result.items
  },

  async fetchLeadHistoryData(id) {
    try {
      const payload = await Api.getLeadHistory(id)
      return {
        items: asList(payload, 'data.items', 'items').map(normalizeHistoryItem),
        groups: normalizeHistoryGroups(payload?.data?.groups)
      }
    } catch {
      const lead = this.getById('leads', id)
      const items = Array.isArray(lead?.communications)
        ? lead.communications.map((c) =>
            normalizeHistoryItem({
            at: c?.date,
            by: this.getUserName(c?.user),
            type: c?.type,
            message: c?.notes
            })
          )
        : []
      const groups = emptyHistoryGroups()
      groups.status = items.filter(x => x.type === 'status')
      groups.meeting = items.filter(x => x.type === 'meeting')
      groups.email = items.filter(x => x.type === 'email')
      groups.whatsapp = items.filter(x => x.type === 'whatsapp')
      return { items, groups }
    }
  },

  async fetchLeadEditById(id) {
    try {
      const payload = await Api.getLeadEditData(id)
      const raw = extractOne(payload)
      if (!raw) return this.getById('leads', id)
      const normalized = normalizeLead(raw)
      const all = this.getAll('leads')
      const i = all.findIndex(x => String(x.id) === String(normalized.id))
      if (i >= 0) all[i] = { ...all[i], ...normalized }
      else all.unshift(normalized)
      this.save('leads', all)
      return normalized
    } catch {
      return this.getById('leads', id)
    }
  },

  async fetchUserById(id) {
    try {
      const payload = await Api.getUser(id)
      const raw = extractOne(payload)
      if (!raw) return null
      const normalized = normalizeUser(raw)
      const all = this.getAll('users')
      const i = all.findIndex(x => String(x.id) === String(normalized.id))
      if (i >= 0) all[i] = { ...all[i], ...normalized }
      else all.unshift(normalized)
      this.save('users', all)
      return normalized
    } catch {
      return this.getById('users', id)
    }
  },

  async fetchUsersPage({ page = 1, perPage = 20, filters = {} } = {}) {
    try {
      const apiFilters = {
        search: String(filters.search || '').trim() || undefined,
        role: toApiUserListRole(filters.role || ''),
        group_id: filters.groupId ? Number(filters.groupId) : undefined,
        status: filters.status
      }
      const payload = await Api.getUsers(perPage, page, apiFilters)
      const rawItems = asList(payload, 'data.items', 'data.users', 'data', 'items')
      const items = rawItems.map((user, i) => normalizeUser(user, i))
      const pg = payload?.data?.pagination || {}
      const pagination = {
        currentPage: Number(pg.current_page || page || 1),
        lastPage: Number(pg.last_page || 1),
        perPage: Number(pg.per_page || perPage || 20),
        total: Number(pg.total || items.length || 0)
      }
      return { items, pagination }
    } catch {
      const all = this.getAll('users')
      const safePage = Math.max(1, Number(page || 1))
      const safePerPage = Math.max(1, Number(perPage || 20))
      const total = all.length
      const lastPage = Math.max(1, Math.ceil(total / safePerPage))
      const start = (safePage - 1) * safePerPage
      const items = all.slice(start, start + safePerPage)
      return {
        items,
        pagination: {
          currentPage: safePage,
          lastPage,
          perPage: safePerPage,
          total
        }
      }
    }
  },

  async fetchLeadsPage({ page = 1, perPage = 20, filters = {} } = {}) {
    try {
      const payload = await Api.getLeads(perPage, page, filters)
      const rawItems = asList(payload, 'data.items', 'data.leads', 'data', 'items')
      const items = rawItems.map((lead, i) => normalizeLead(lead, i))
      const pg = payload?.data?.pagination || {}
      const pagination = {
        currentPage: Number(pg.current_page || page || 1),
        lastPage: Number(pg.last_page || 1),
        perPage: Number(pg.per_page || perPage || 20),
        total: Number(pg.total || items.length || 0)
      }
      return { items, pagination }
    } catch {
      let all = this.getAll('leads')
      const has = (v) => v !== undefined && v !== null && String(v).trim() !== ''
      const norm = (v) => String(v || '').trim().toLowerCase()
      if (has(filters.search)) {
        const q = norm(filters.search)
        all = all.filter((l) =>
          `${l.clientName || ''} ${l.clientCompany || ''} ${l.clientMobile || ''} ${l.city || ''} ${l.state || ''}`
            .toLowerCase()
            .includes(q)
        )
      }
      if (has(filters.status_label)) {
        all = all.filter((l) => norm(l.statusLabel) === norm(filters.status_label))
      }
      if (has(filters.call_status)) {
        all = all.filter((l) => norm(l.callStatus) === norm(filters.call_status))
      }
      if (has(filters.interested_product_service)) {
        all = all.filter((l) => norm(l.product) === norm(filters.interested_product_service))
      }
      if (has(filters.client_business_categories)) {
        all = all.filter((l) => norm(l.businessCategory) === norm(filters.client_business_categories))
      }
      if (has(filters.group_id)) {
        all = all.filter((l) => String(l.groupId || '') === String(filters.group_id))
      }
      if (has(filters.employee_id)) {
        all = all.filter((l) => {
          const id = String(filters.employee_id)
          return [l.assignedTo, l.employeeId, l.createdBy].map((v) => String(v || '')).includes(id)
        })
      }
      if (has(filters.rating)) {
        all = all.filter((l) => String(l.ratingValue || l.rating || '').toLowerCase() === String(filters.rating).toLowerCase())
      }
      const safePage = Math.max(1, Number(page || 1))
      const safePerPage = Math.max(1, Number(perPage || 20))
      const total = all.length
      const lastPage = Math.max(1, Math.ceil(total / safePerPage))
      const start = (safePage - 1) * safePerPage
      const items = all.slice(start, start + safePerPage)
      return {
        items,
        pagination: {
          currentPage: safePage,
          lastPage,
          perPage: safePerPage,
          total
        }
      }
    }
  },

  nextLeadId() {
    const n = Math.max(0, ...this.getAll('leads').map(l => parseInt(l.id.replace('LEAD', '')) || 0))
    return 'LEAD' + String(n + 1).padStart(3, '0')
  },

  nextUserId() {
    const n = Math.max(0, ...this.getAll('users').map(u => parseInt(u.id.replace('USR', '')) || 0))
    return 'USR' + String(n + 1).padStart(3, '0')
  }
}
