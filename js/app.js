/* ============================================================
   CRM Pro Mobile — app.js  v2  (no fetch, all data embedded)
   ============================================================ */
"use strict";

const CRM = (() => {

/* ── EMBEDDED DATA ─────────────────────────────── */
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
];
const RAW_GROUPS = [
  {id:"GRP001",name:"Maharashtra",managerId:"USR002"},{id:"GRP002",name:"Gujarat",managerId:"USR003"},
  {id:"GRP003",name:"Rajasthan",managerId:"USR004"},{id:"GRP004",name:"Delhi NCR",managerId:"USR005"},
  {id:"GRP005",name:"Karnataka",managerId:"USR006"},{id:"GRP008",name:"West Bengal",managerId:"USR050"},
];
const RAW_TEAMS = [
  {id:"TM001",name:"Mumbai Team",groupId:"GRP001",leaderId:"USR012",coordinatorId:"USR013"},
  {id:"TM002",name:"Pune Team",groupId:"GRP001",leaderId:"USR014"},
  {id:"TM004",name:"Ahmedabad Team",groupId:"GRP002",leaderId:"USR018"},
  {id:"TM009",name:"Delhi Team",groupId:"GRP004",leaderId:"USR028",coordinatorId:"USR029"},
  {id:"TM011",name:"Gurgaon Team",groupId:"GRP004",leaderId:"USR032",coordinatorId:"USR033"},
];
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
];

/* ── AUTH ──────────────────────────────────── */
const Auth = {
  KEY: 'crm_session',
  login(email, password) {
    const users = Data.getAll('users');
    const user = users.find(u => u.email===email && u.password===password);
    if (!user) return {ok:false,msg:'Invalid email or password.'};
    if (user.status !== 'Active') return {ok:false,msg:'Account deactivated. Contact admin.'};
    const s={userId:user.id,role:user.role,name:user.name,email:user.email,groupId:user.groupId,teamId:user.teamId};
    sessionStorage.setItem(this.KEY, JSON.stringify(s));
    return {ok:true,user:s};
  },
  logout() { sessionStorage.removeItem(this.KEY); window.location.href='login.html'; },
  me() { const s=sessionStorage.getItem(this.KEY); return s?JSON.parse(s):null; },
  requireAuth() { const u=this.me(); if(!u){window.location.href='login.html';return null;} return u; },
  can(action, role) {
    const p={
      delete_lead:['Admin','Manager'],
      assign_lead:['Admin','Manager','Team Leader','Team Coordinator'],
      create_user:['Admin'],delete_user:['Admin'],edit_user:['Admin'],
      view_reports:['Admin','Manager','Team Leader'],
      manage_users:['Admin'],
    };
    return (p[action]||[]).includes(role||'');
  }
};

/* ── DATA ──────────────────────────────────── */
const Data = {
  _init() {
    if (!localStorage.getItem('crm_users')) localStorage.setItem('crm_users',JSON.stringify(RAW_USERS));
    if (!localStorage.getItem('crm_leads')) localStorage.setItem('crm_leads',JSON.stringify(RAW_LEADS));
    if (!localStorage.getItem('crm_groups')) localStorage.setItem('crm_groups',JSON.stringify(RAW_GROUPS));
    if (!localStorage.getItem('crm_teams')) localStorage.setItem('crm_teams',JSON.stringify(RAW_TEAMS));
  },
  loadAll() { this._init(); return Promise.resolve(); },
  getAll(k) { return JSON.parse(localStorage.getItem('crm_'+k)||'[]'); },
  save(k,v) { localStorage.setItem('crm_'+k,JSON.stringify(v)); },
  getById(k,id) { return this.getAll(k).find(x=>x.id===id)||null; },
  upsert(k,item) { const all=this.getAll(k);const i=all.findIndex(x=>x.id===item.id);if(i>=0)all[i]=item;else all.unshift(item);this.save(k,all);return item; },
  remove(k,id) { this.save(k,this.getAll(k).filter(x=>x.id!==id)); },
  getLeadsForUser(user) {
    const leads=this.getAll('leads');
    if (!user) return leads;
    if (user.role==='Admin') return leads;
    if (user.role==='Manager') return leads.filter(l=>l.groupId===user.groupId);
    if (user.role==='Team Leader'||user.role==='Team Coordinator') {
      const members=this.getAll('users').filter(u=>u.teamId===user.teamId).map(u=>u.id);
      return leads.filter(l=>members.includes(l.assignedTo)||l.assignedTo===user.userId);
    }
    return leads.filter(l=>l.assignedTo===user.userId);
  },
  getUsersForUser(user) {
    const users=this.getAll('users');
    if (user.role==='Admin') return users;
    if (user.role==='Manager') return users.filter(u=>u.groupId===user.groupId);
    return users.filter(u=>u.teamId===user.teamId);
  },
  getEmployeesForUser(user) { return this.getUsersForUser(user).filter(u=>u.status==='Active'); },
  getUserName(id) { const u=this.getById('users',id); return u?u.name:(id||'—'); },
  getGroupName(id) { const g=this.getById('groups',id); return g?g.name:(id||'—'); },
  getTeamName(id) { const t=this.getById('teams',id); return t?t.name:(id||'—'); },
  nextLeadId() { const n=Math.max(0,...this.getAll('leads').map(l=>parseInt(l.id.replace('LEAD',''))||0)); return 'LEAD'+String(n+1).padStart(3,'0'); },
  nextUserId() { const n=Math.max(0,...this.getAll('users').map(u=>parseInt(u.id.replace('USR',''))||0)); return 'USR'+String(n+1).padStart(3,'0'); },
};

/* ── HELPERS ───────────────────────────────── */
function initials(name) { return (name||'').split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(); }
function fmtDate(d) { if(!d) return '—'; try{return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});}catch(e){return d;} }
function today() { return new Date().toISOString().split('T')[0]; }
function nowISO() { return new Date().toISOString().replace('T',' ').substring(0,16); }
function urlParam(n) { return new URLSearchParams(window.location.search).get(n); }
function isBefore(d,ref) { return d && d < ref; }
function isAfter(d,ref) { return d && d > ref; }

function statusBadge(s) {
  const map={
    'New Lead':'newlead','Contacted':'contacted','Follow-up Scheduled':'followup',
    'Demo Scheduled':'demo','Proposal Sent':'proposal','Negotiation':'negotiation',
    'Won':'won','Close (Won)':'close-won','Lost':'lost','On Hold':'hold',
    'Hot':'hot','Warm':'warm','Solo':'solo','Cold':'cold',
  };
  return `<span class="badge-status bs-${map[s]||'newlead'}">${s||'New Lead'}</span>`;
}
function categoryBadge(c) {
  if (!c) return '';
  const map={Hot:'hot',Warm:'warm',Solo:'solo',Cold:'cold'};
  return `<span class="badge-status bs-${map[c]||'cold'}">${c}</span>`;
}
function paymentBadge(p) {
  if (!p) return '';
  const map={'Pay Today':'today','Pay Tomorrow':'tomorrow','Pay This Week':'thisweek','Pay Next Week':'nextweek','Pay Ignoring':'ignoring','Pay Lost':'lost'};
  return `<span class="badge-pay bp-${map[p]||'ignoring'}">${p}</span>`;
}
function ratingBar(r) {
  if (!r) return '';
  const pct=parseInt(r)||0;
  return `<div class="rating-bar"><div class="rating-track"><div class="rating-fill" style="width:${pct}%"></div></div><div class="rating-label">${pct}%</div></div>`;
}
function roleBadge(r) {
  const map={'Admin':'admin','Manager':'manager','Team Leader':'tl','Team Coordinator':'tc','Employee':'emp'};
  return `<span class="badge-role br-${map[r]||'emp'}">${r}</span>`;
}
function statusIcon(s) {
  const m={Call:'fa-phone',Email:'fa-envelope',Meeting:'fa-handshake',WhatsApp:'fa-whatsapp'};
  return m[s]||'fa-comment';
}

/* ── UI ────────────────────────────────────── */
const UI = {
  TABS:[
    {id:'dashboard',href:'dashboard.html',icon:'fa-chart-pie',label:'Insights'},
    {id:'leads',href:'leads.html',icon:'fa-users',label:'Leads'},
    {id:'calendar',href:'calendar.html',icon:'fa-calendar-alt',label:'Calendar'},
    {id:'reports',href:'reports.html',icon:'fa-chart-bar',label:'Reports'},
    {id:'users',href:'users.html',icon:'fa-user-cog',label:'Users'},
  ],
  init(pageId) {
    const user=Auth.requireAuth(); if(!user) return null;
    this.buildHeader(pageId,user);
    this.buildBottomNav(pageId,user);
    this.buildStatusBar();
    return user;
  },
  buildStatusBar() {
    const el=document.getElementById('phone-status'); if(!el) return;
    el.innerHTML=`<span>9:41</span><div class="pstat-r">
      <i class="fas fa-signal" style="font-size:11px;color:var(--txt)"></i>
      <i class="fas fa-wifi" style="font-size:11px;color:var(--txt)"></i>
      <i class="fas fa-battery-three-quarters" style="font-size:11px;color:var(--txt)"></i>
    </div>`;
  },
  buildHeader(pageId,user) {
    const el=document.getElementById('header-container'); if(!el) return;
    const titles={dashboard:'Insights',leads:'Leads',calendar:'Calendar',reports:'Reports',users:'Users',
      'lead-details':'Lead Details','lead-add':'Add Lead','lead-edit':'Edit Lead',
      'lead-assign':'Assign Lead','lead-comm':'Log Communication',
      'user-add':'Add User','user-edit':'Edit User','user-details':'User Details',
      'insight-followup':'Today Followup','insight-meeting':'Today Meeting',
    };
    const title=titles[pageId]||'CRM Pro';
    const showBack=['lead-details','lead-add','lead-edit','lead-assign','lead-comm','user-add','user-edit','user-details','insight-followup','insight-meeting'].includes(pageId);
    const backHref=pageId.startsWith('lead')?'leads.html':pageId.startsWith('user')?'users.html':pageId.startsWith('insight')?'dashboard.html':'dashboard.html';
    const av=initials(user.name);
    el.innerHTML=`<div class="mob-header">
      ${showBack?`<a href="${backHref}" class="hback"><i class="fas fa-arrow-left" style="font-size:16px"></i></a>`:''}
      <span class="htitle">${title}</span>
      <div class="haction">
        ${!showBack?`<div class="av" title="${user.name}">${av}</div>`:''}
        <button class="hbtn" onclick="CRM.Auth.logout()" title="Logout"><i class="fas fa-sign-out-alt"></i></button>
      </div>
    </div>`;
  },
  buildBottomNav(pageId,user) {
    const el=document.getElementById('bnav-container'); if(!el) return;
    const tabs=this.TABS.filter(t=>{
      if(t.id==='reports') return Auth.can('view_reports',user.role);
      if(t.id==='users') return ['Admin','Manager','Team Leader'].includes(user.role);
      return true;
    });
    el.innerHTML=`<div class="bnav">${tabs.map(t=>`
      <a href="${t.href}" class="btab ${pageId===t.id||pageId.startsWith(t.id)?'active':''}">
        <div class="btab-icon"><i class="fas ${t.icon}"></i></div>
        <span class="btab-lbl">${t.label}</span>
      </a>`).join('')}</div>`;
  },
  toast(msg,type='info') {
    const c=document.getElementById('toast-container'); if(!c) return;
    const d=document.createElement('div');
    d.className=`toast-item ${type}`;
    const icons={success:'fa-check-circle',error:'fa-times-circle',warning:'fa-exclamation-triangle',info:'fa-info-circle'};
    d.innerHTML=`<i class="fas ${icons[type]||'fa-info-circle'}"></i> ${msg}`;
    c.appendChild(d);
    setTimeout(()=>d.remove(),2800);
  },
  confirm(title,msg,cb,btnTxt='Delete') {
    let ov=document.getElementById('confirm-ov'); if(ov) ov.remove();
    ov=document.createElement('div'); ov.className='confirm-overlay'; ov.id='confirm-ov';
    ov.innerHTML=`<div class="confirm-card">
      <div class="confirm-title">${title}</div>
      <div class="confirm-msg">${msg}</div>
      <div style="display:flex;gap:8px">
        <button class="btn-outline-crm w-full" onclick="document.getElementById('confirm-ov').remove()">Cancel</button>
        <button class="btn-danger-crm w-full" id="confirm-yes-btn">${btnTxt}</button>
      </div>
    </div>`;
    document.querySelector('.phone-frame')?.appendChild(ov);
    document.getElementById('confirm-yes-btn').onclick=()=>{ov.remove();cb();};
  },
  showLoading() { const el=document.getElementById('loading-overlay');if(el)el.style.display='flex'; },
  hideLoading() { const el=document.getElementById('loading-overlay');if(el)el.style.display='none'; },
};

/* ── PAGE: LOGIN ──────────────────────────── */
const PageLogin = {
  init() {
    Data._init();
    if (Auth.me()) {window.location.href='dashboard.html';return;}
    UI.hideLoading();
  },
  fillDemo(email,pw) {
    document.getElementById('login-email').value=email;
    document.getElementById('login-pass').value=pw;
    document.getElementById('login-err').textContent='';
  },
  togglePwd() { const p=document.getElementById('login-pass'); p.type=p.type==='password'?'text':'password'; },
  submit(e) {
    e.preventDefault();
    const email=document.getElementById('login-email').value.trim();
    const pw=document.getElementById('login-pass').value;
    const err=document.getElementById('login-err');
    if(!email||!pw){err.textContent='Please enter email and password.';return;}
    const r=Auth.login(email,pw);
    if(!r.ok){err.textContent=r.msg;return;}
    window.location.href='dashboard.html';
  }
};

/* ── PAGE: DASHBOARD / INSIGHTS ──────────── */
const PageDashboard = {
  init() {
    const user=UI.init('dashboard'); if(!user) return;
    const leads=Data.getLeadsForUser(user);
    const td=today();
    const total=leads.length,won=leads.filter(l=>l.status==='Won'||l.status==='Close (Won)').length;
    const hot=leads.filter(l=>l.leadCategory==='Hot'||l.status==='Hot').length;
    const todayFU=leads.filter(l=>l.meetingType==='Followup'&&l.meetingDate===td);
    const upFU=leads.filter(l=>l.meetingType==='Followup'&&isAfter(l.meetingDate,td));
    const todayMT=leads.filter(l=>l.meetingType==='Meeting'&&l.meetingDate===td);
    const upMT=leads.filter(l=>l.meetingType==='Meeting'&&isAfter(l.meetingDate,td));
    const missFU=leads.filter(l=>l.meetingType==='Followup'&&isBefore(l.meetingDate,td));
    const missMT=leads.filter(l=>l.meetingType==='Meeting'&&isBefore(l.meetingDate,td));

    const hour=new Date().getHours();
    const g=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
    const gn=document.getElementById('greeting-name'); if(gn) gn.textContent=g+', '+user.name.split(' ')[0]+'!';
    const gr=document.getElementById('greeting-role'); if(gr) gr.textContent=user.role;

    const stats=document.getElementById('dash-stats');
    if(stats) stats.innerHTML=`
      <div class="stat-card"><div class="sc-icon" style="background:rgba(21,101,192,.1);color:var(--primary)"><i class="fas fa-users"></i></div><div><div class="sc-val">${total}</div><div class="sc-lbl">Total Leads</div></div></div>
      <div class="stat-card"><div class="sc-icon" style="background:rgba(46,125,50,.1);color:var(--success)"><i class="fas fa-trophy"></i></div><div><div class="sc-val">${won}</div><div class="sc-lbl">Won</div></div></div>
      <div class="stat-card"><div class="sc-icon" style="background:rgba(230,81,0,.1);color:var(--warning)"><i class="fas fa-fire"></i></div><div><div class="sc-val">${hot}</div><div class="sc-lbl">Hot Leads</div></div></div>
      <div class="stat-card"><div class="sc-icon" style="background:rgba(41,121,255,.1);color:var(--accent)"><i class="fas fa-calendar-check"></i></div><div><div class="sc-val">${todayFU.length+todayMT.length}</div><div class="sc-lbl">Today</div></div></div>`;

    function insightCards(list,limit) {
      if(!list.length) return '<div style="font-size:11px;color:var(--muted);padding:6px 0;text-align:center">None</div>';
      return list.slice(0,limit).map(l=>`<a href="lead-details.html?id=${l.id}" class="is-item">
        <div class="is-client">${l.clientName}</div>
        <div class="is-detail">${l.businessCategory||'—'} · ${l.meetingAgendaType||'—'}</div>
        <div class="is-date">${l.meetingDate||'—'} ${l.meetingTime||''}</div>
      </a>`).join('');
    }

    const el=document.getElementById('insight-sections');
    if(el) el.innerHTML=`
      <div class="insight-2col">
        <div class="insight-section">
          <div class="is-header"><div class="is-title">Today<br>Followup</div><div class="is-count">${todayFU.length}</div></div>
          ${insightCards(todayFU,3)}
          <a href="insight-list.html?type=followup-today" class="is-viewall">View all &rsaquo;</a>
        </div>
        <div class="insight-section upcoming">
          <div class="is-header"><div class="is-title">Upcoming<br>Followup</div><div class="is-count">${upFU.length}</div></div>
          ${insightCards(upFU,3)}
          <a href="insight-list.html?type=followup-upcoming" class="is-viewall">View all &rsaquo;</a>
        </div>
      </div>
      <div class="insight-2col">
        <div class="insight-section">
          <div class="is-header"><div class="is-title">Today<br>Meeting</div><div class="is-count">${todayMT.length}</div></div>
          ${insightCards(todayMT,3)}
          <a href="insight-list.html?type=meeting-today" class="is-viewall">View all &rsaquo;</a>
        </div>
        <div class="insight-section upcoming">
          <div class="is-header"><div class="is-title">Upcoming<br>Meeting</div><div class="is-count">${upMT.length}</div></div>
          ${insightCards(upMT,3)}
          <a href="insight-list.html?type=meeting-upcoming" class="is-viewall">View all &rsaquo;</a>
        </div>
      </div>
      <div class="insight-2col">
        <div class="insight-section missed">
          <div class="is-header"><div class="is-title">Missed<br>Followup</div><div class="is-count">${missFU.length}</div></div>
          ${insightCards(missFU,3)}
          <a href="insight-list.html?type=followup-missed" class="is-viewall">View all &rsaquo;</a>
        </div>
        <div class="insight-section missed">
          <div class="is-header"><div class="is-title">Missed<br>Meeting</div><div class="is-count">${missMT.length}</div></div>
          ${insightCards(missMT,3)}
          <a href="insight-list.html?type=meeting-missed" class="is-viewall">View all &rsaquo;</a>
        </div>
      </div>`;
    UI.hideLoading();
  }
};

/* ── PAGE: INSIGHT LIST (full view) ──────── */
const PageInsightList = {
  init() {
    const user=UI.init('dashboard'); if(!user) return;
    const type=urlParam('type')||'followup-today';
    const td=today();
    const allLeads=Data.getLeadsForUser(user);
    const titles={'followup-today':'Today Followup','followup-upcoming':'Upcoming Followup','followup-missed':'Missed Followup','meeting-today':'Today Meeting','meeting-upcoming':'Upcoming Meeting','meeting-missed':'Missed Meeting'};
    const ttl=document.getElementById('insight-list-title');
    if(ttl) ttl.textContent=titles[type]||'Insights';

    let leads=[];
    if(type==='followup-today')    leads=allLeads.filter(l=>l.meetingType==='Followup'&&l.meetingDate===td);
    else if(type==='followup-upcoming') leads=allLeads.filter(l=>l.meetingType==='Followup'&&isAfter(l.meetingDate,td));
    else if(type==='followup-missed')  leads=allLeads.filter(l=>l.meetingType==='Followup'&&isBefore(l.meetingDate,td));
    else if(type==='meeting-today')    leads=allLeads.filter(l=>l.meetingType==='Meeting'&&l.meetingDate===td);
    else if(type==='meeting-upcoming') leads=allLeads.filter(l=>l.meetingType==='Meeting'&&isAfter(l.meetingDate,td));
    else if(type==='meeting-missed')   leads=allLeads.filter(l=>l.meetingType==='Meeting'&&isBefore(l.meetingDate,td));

    const el=document.getElementById('insight-full-list');
    if(!el){UI.hideLoading();return;}
    if(!leads.length){
      el.innerHTML='<div class="empty-state"><i class="fas fa-calendar"></i><p>No records found</p></div>';
      UI.hideLoading();return;
    }
    el.innerHTML=leads.map(l=>`<a href="lead-details.html?id=${l.id}" class="insight-list-item">
      <div class="ili-row">
        <div class="ili-name">${l.clientName} <span style="color:var(--muted);font-weight:400">— ${l.city||'—'}</span></div>
        ${statusBadge(l.status)}
      </div>
      <div style="font-size:11px;color:var(--primary);font-weight:700;margin-bottom:3px">
        <i class="fas fa-calendar-alt me-1"></i>${l.meetingDate||'—'} ${l.meetingTime||''}
      </div>
      <div class="ili-meta">
        <span class="ili-tag"><i class="fas fa-tag me-1"></i>${l.businessCategory||'—'}</span>
        <span class="ili-tag"><i class="fas fa-tasks me-1"></i>${l.meetingAgendaType||'—'}</span>
        <span class="ili-tag"><i class="fas fa-user me-1"></i>${Data.getUserName(l.assignedTo)}</span>
        <span class="ili-tag"><i class="fas fa-user-check me-1"></i>Initiated: ${Data.getUserName(l.meetingInitiatedBy)}</span>
        <span class="ili-tag"><i class="fas fa-plus-circle me-1"></i>By: ${Data.getUserName(l.createdBy)}</span>
      </div>
    </a>`).join('');
    UI.hideLoading();
  }
};

/* ── PAGE: LEADS LIST ─────────────────────── */
const PageLeads = {
  _statusFilter:'',_catFilter:'',_search:'',
  _filters:{status:'',leadCategory:'',paymentStatus:'',callStatus:'',product:'',businessCategory:'',groupId:'',teamId:'',assignedTo:'',state:'',rating:''},
  _filterOpen:false,
  _activeFilterCount:0,
  init() {
    const user=UI.init('leads'); if(!user) return;
    this._user=user;
    this._populateFilterDropdowns(user);
    this.render();
    // status chips
    document.querySelectorAll('.status-chip').forEach(c=>{
      c.addEventListener('click',()=>{
        document.querySelectorAll('.status-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active'); this._statusFilter=c.dataset.status; this.render();
      });
    });
    // search
    const si=document.getElementById('lead-search');
    if(si) si.addEventListener('input',()=>{this._search=si.value;this.render();});
    UI.hideLoading();
  },
  _populateFilterDropdowns(user) {
    const groups=Data.getAll('groups');
    const teams=Data.getAll('teams');
    const emps=Data.getEmployeesForUser(user);
    const setOpts=(id,opts)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML='<option value="">All</option>'+opts;};
    setOpts('flt-group',groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join(''));
    setOpts('flt-team',teams.map(t=>`<option value="${t.id}">${t.name}</option>`).join(''));
    setOpts('flt-assignedTo',emps.map(u=>`<option value="${u.id}">${u.name}</option>`).join(''));
  },
  toggleFilter() {
    this._filterOpen=!this._filterOpen;
    const panel=document.getElementById('filter-panel');
    const btn=document.getElementById('filter-toggle-btn');
    if(panel) panel.classList.toggle('open',this._filterOpen);
    if(btn) btn.querySelector('.fa-chevron-down')?.style&&(btn.querySelector('.fa-chevron-down').style.transform=this._filterOpen?'rotate(180deg)':'');
  },
  applyFilters() {
    const ids=['status','leadCategory','paymentStatus','callStatus','product','businessCategory','groupId','teamId','assignedTo','state','rating'];
    ids.forEach(id=>{const el=document.getElementById('flt-'+id);if(el)this._filters[id]=el.value;});
    this._activeFilterCount=ids.filter(id=>this._filters[id]).length;
    const badge=document.getElementById('filter-count-badge');
    if(badge){badge.textContent=this._activeFilterCount||'';badge.style.display=this._activeFilterCount?'inline':'none';}
    this.render();
    this.toggleFilter();
  },
  clearFilters() {
    const ids=['status','leadCategory','paymentStatus','callStatus','product','businessCategory','groupId','teamId','assignedTo','state','rating'];
    ids.forEach(id=>{this._filters[id]='';const el=document.getElementById('flt-'+id);if(el)el.value='';});
    this._activeFilterCount=0;
    const badge=document.getElementById('filter-count-badge');
    if(badge){badge.textContent='';badge.style.display='none';}
    this._statusFilter='';
    document.querySelectorAll('.status-chip').forEach(x=>x.classList.remove('active'));
    document.querySelector('.status-chip[data-status=""]')?.classList.add('active');
    this.render();
    if(this._filterOpen) this.toggleFilter();
  },
  render() {
    let leads=Data.getLeadsForUser(this._user);
    // chip status filter
    if(this._statusFilter) leads=leads.filter(l=>l.status===this._statusFilter||l.leadCategory===this._statusFilter);
    // search
    if(this._search){const q=this._search.toLowerCase();leads=leads.filter(l=>(l.clientName+l.clientCompany+l.clientMobile+(l.city||'')+(l.state||'')).toLowerCase().includes(q));}
    // panel filters
    if(this._filters.status) leads=leads.filter(l=>l.status===this._filters.status);
    if(this._filters.leadCategory) leads=leads.filter(l=>l.leadCategory===this._filters.leadCategory);
    if(this._filters.paymentStatus) leads=leads.filter(l=>l.paymentStatus===this._filters.paymentStatus);
    if(this._filters.callStatus) leads=leads.filter(l=>l.callStatus===this._filters.callStatus);
    if(this._filters.product) leads=leads.filter(l=>l.product===this._filters.product);
    if(this._filters.businessCategory) leads=leads.filter(l=>l.businessCategory===this._filters.businessCategory);
    if(this._filters.groupId) leads=leads.filter(l=>l.groupId===this._filters.groupId);
    if(this._filters.teamId) leads=leads.filter(l=>l.teamId===this._filters.teamId);
    if(this._filters.assignedTo) leads=leads.filter(l=>l.assignedTo===this._filters.assignedTo);
    if(this._filters.state) leads=leads.filter(l=>(l.state||'').toLowerCase().includes(this._filters.state.toLowerCase()));
    if(this._filters.rating) {
      const r=parseInt(this._filters.rating);
      leads=leads.filter(l=>parseInt(l.rating||0)>=r&&parseInt(l.rating||0)<r+10);
    }
    leads=[...leads].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    const el=document.getElementById('leads-list'); if(!el) return;
    const cntEl=document.getElementById('leads-count'); if(cntEl) cntEl.textContent=leads.length+' leads';
    if(!leads.length){el.innerHTML='<div class="empty-state"><i class="fas fa-users"></i><p>No leads found</p></div>';return;}
    el.innerHTML=leads.map(l=>`
      <div class="lead-item">
        <div class="li-top">
          <div class="li-av">${initials(l.clientName)}</div>
          <div class="li-info">
            <div class="li-name">${l.clientName}</div>
            <div class="li-sub">${l.clientCompany} &bull; ${l.city||l.state||'—'}</div>
          </div>
          <div class="li-right">
            <span class="li-date">${l.nextCallDate||''}</span>
            ${statusBadge(l.status)}
          </div>
        </div>
        <div class="li-meta">
          <div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">
            ${l.leadCategory?categoryBadge(l.leadCategory):''}
            ${l.paymentStatus?paymentBadge(l.paymentStatus):''}
            ${l.rating?`<span style="font-size:10px;font-weight:700;color:var(--primary)">${l.rating}%</span>`:''}
          </div>
          <div class="li-actions">
            <a href="tel:${l.clientMobile}" class="action-btn call" title="Call"><i class="fas fa-phone"></i></a>
            <a href="https://wa.me/91${l.clientMobile}" target="_blank" class="action-btn wa" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="mailto:${l.clientEmail||''}" class="action-btn mail" title="Email"><i class="fas fa-envelope"></i></a>
            <a href="lead-details.html?id=${l.id}" class="action-btn view" title="View"><i class="fas fa-eye"></i></a>
            <a href="lead-edit.html?id=${l.id}" class="action-btn edit" title="Edit"><i class="fas fa-edit"></i></a>
          </div>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-top:6px">${l.product.substring(0,30)} &bull; ${Data.getUserName(l.assignedTo)}</div>
      </div>`).join('');
  }
};

/* ── PAGE: LEAD DETAILS ───────────────────── */
const PageLeadDetails = {
  init() {
    const user=UI.init('lead-details'); if(!user) return;
    const id=urlParam('id'); if(!id){window.location.href='leads.html';return;}
    const lead=Data.getById('leads',id);
    if(!lead){UI.toast('Lead not found','error');window.location.href='leads.html';return;}
    this.render(lead,user);
    UI.hideLoading();
  },
  render(lead,user) {
    const hd=document.getElementById('det-header');
    if(hd) hd.innerHTML=`
      <div style="font-size:11px;opacity:.7;margin-bottom:4px">${lead.id}</div>
      <div style="font-size:18px;font-weight:800;margin-bottom:2px">${lead.clientName}</div>
      <div style="font-size:13px;opacity:.8;margin-bottom:8px">${lead.clientCompany} &bull; ${lead.city||''} ${lead.state||''}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
        ${statusBadge(lead.status)}
        ${lead.leadCategory?categoryBadge(lead.leadCategory):''}
        ${lead.paymentStatus?paymentBadge(lead.paymentStatus):''}
      </div>
      ${lead.rating?`<div style="margin-bottom:10px">${ratingBar(lead.rating)}</div>`:''}
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <a href="tel:${lead.clientMobile}" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9);color:#2E7D32"><i class="fas fa-phone me-1"></i>Call</a>
        <a href="https://wa.me/91${lead.clientMobile}" target="_blank" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9);color:#25D366"><i class="fab fa-whatsapp me-1"></i>WhatsApp</a>
        ${lead.clientEmail?`<a href="mailto:${lead.clientEmail}" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9)"><i class="fas fa-envelope me-1"></i>Email</a>`:''}
        <a href="lead-edit.html?id=${lead.id}" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9)"><i class="fas fa-edit me-1"></i>Edit</a>
        <a href="lead-comm.html?id=${lead.id}" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9)"><i class="fas fa-comment me-1"></i>Comm</a>
        ${Auth.can('assign_lead',user.role)?`<a href="lead-assign.html?id=${lead.id}" class="btn-outline-crm btn-sm" style="background:rgba(255,255,255,.9)"><i class="fas fa-user-check me-1"></i>Assign</a>`:''}
        ${Auth.can('delete_lead',user.role)?`<button class="btn-danger-crm btn-sm" onclick="CRM.Pages.leadDetails.deleteLead('${lead.id}')"><i class="fas fa-trash me-1"></i>Delete</button>`:''}
      </div>`;
    const info=document.getElementById('det-info');
    if(info) info.innerHTML=[
      ['Mobile',`<a href="tel:${lead.clientMobile}" style="color:var(--primary)">${lead.clientMobile}</a>`],
      ['Email',lead.clientEmail||'—'],
      ['Product',lead.product],
      ['Lead Status',statusBadge(lead.status)],
      ['Category',lead.leadCategory?categoryBadge(lead.leadCategory):'—'],
      ['Rating',lead.rating?ratingBar(lead.rating):'—'],
      ['Payment',lead.paymentStatus?paymentBadge(lead.paymentStatus):'—'],
      ['Call Status',lead.callStatus||'—'],
      ['Response',lead.clientResponse||'—'],
      ['Next Call',(lead.nextCallDate||'—')+(lead.nextCallTime?' '+lead.nextCallTime:'')],
      ['Meeting Type',lead.meetingType||'—'],
      ['Meeting Agenda',lead.meetingAgendaType||'—'],
      ['Meeting Date',(lead.meetingDate||'—')+(lead.meetingTime?' '+lead.meetingTime:'')],
      ['Meeting Initiated',Data.getUserName(lead.meetingInitiatedBy)],
      ['Assigned To',Data.getUserName(lead.assignedTo)],
      ['Group',Data.getGroupName(lead.groupId)],
      ['Team',Data.getTeamName(lead.teamId)],
      ['Business Category',lead.businessCategory||'—'],
      ['Regarding',lead.regarding||'—'],
      ['State / City',(lead.state||'—')+' / '+(lead.city||'—')],
      ['Created By',Data.getUserName(lead.createdBy)],
      ['Created',fmtDate(lead.createdAt)],
      ['Updated',fmtDate(lead.updatedAt)],
    ].map(([k,v])=>`<div class="info-row"><div class="ir-key">${k}</div><div class="ir-val">${v}</div></div>`).join('');
    const notesEl=document.getElementById('det-notes');
    if(notesEl&&lead.notes) notesEl.innerHTML=`<div class="mob-card"><div class="ir-key" style="margin-bottom:6px">Notes</div><div style="font-size:13px;line-height:1.5;color:var(--txt)">${lead.notes}</div></div>`;
    const comms=document.getElementById('det-comms');
    if(comms){
      const list=lead.communications||[];
      if(!list.length) comms.innerHTML='<div style="font-size:12px;color:var(--muted);text-align:center;padding:14px">No communications logged yet.</div>';
      else comms.innerHTML=`<div class="comm-wrap">${list.map(c=>`
        <div class="comm-item">
          <div class="comm-dot"><i class="fas ${statusIcon(c.type)}" style="font-size:8px"></i></div>
          <div><div class="comm-type">${c.type}</div><div class="comm-date">${c.date} &bull; ${Data.getUserName(c.user)}</div><div class="comm-note">${c.notes}</div></div>
        </div>`).join('')}</div>`;
    }
  },
  deleteLead(id) {
    UI.confirm('Delete Lead','Are you sure? This cannot be undone.',()=>{
      Data.remove('leads',id);UI.toast('Lead deleted','success');setTimeout(()=>window.location.href='leads.html',800);
    });
  }
};

/* ── PAGE: LEAD ADD ───────────────────────── */
const PageLeadAdd = {
  init() {
    const user=UI.init('lead-add'); if(!user) return;
    const empList=Data.getEmployeesForUser(user);
    const sel=document.getElementById('lf-assignedTo');
    if(sel) sel.innerHTML='<option value="">Select Employee</option>'+empList.map(u=>`<option value="${u.id}" ${u.id===user.userId?'selected':''}>${u.name} (${u.role})</option>`).join('');
    const nd=document.getElementById('lf-nextCallDate');if(nd)nd.value=today();
    const md=document.getElementById('lf-meetingDate');if(md)md.value=today();
    const miby=document.getElementById('lf-meetingInitiatedBy');
    if(miby) miby.innerHTML='<option value="">Select User</option>'+empList.map(u=>`<option value="${u.id}" ${u.id===user.userId?'selected':''}>${u.name}</option>`).join('');
    const cbby=document.getElementById('lf-createdBy');
    if(cbby) cbby.innerHTML='<option value="">Select User</option>'+empList.map(u=>`<option value="${u.id}" ${u.id===user.userId?'selected':''}>${u.name}</option>`).join('');
    UI.hideLoading();
  },
  save(e) {
    e.preventDefault();
    const form=e.target,user=Auth.me();
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data.clientName||!data.clientCompany||!data.clientMobile||!data.product){UI.toast('Please fill required fields','error');return;}
    const grp=user.groupId||'GRP001';
    const tm=Data.getAll('users').find(u=>u.id===data.assignedTo)?.teamId||user.teamId||null;
    const lead={id:Data.nextLeadId(),...data,groupId:grp,teamId:tm,createdAt:nowISO(),updatedAt:nowISO(),communications:[]};
    Data.upsert('leads',lead);
    UI.toast('Lead added successfully!','success');
    setTimeout(()=>window.location.href='leads.html',800);
  }
};

/* ── PAGE: LEAD EDIT ──────────────────────── */
const PageLeadEdit = {
  init() {
    const user=UI.init('lead-edit'); if(!user) return;
    const id=urlParam('id');if(!id){window.location.href='leads.html';return;}
    const lead=Data.getById('leads',id);
    if(!lead){UI.toast('Lead not found','error');window.location.href='leads.html';return;}
    const empList=Data.getEmployeesForUser(user);
    const sel=document.getElementById('lf-assignedTo');
    if(sel) sel.innerHTML='<option value="">Select Employee</option>'+empList.map(u=>`<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
    const miby=document.getElementById('lf-meetingInitiatedBy');
    if(miby) miby.innerHTML='<option value="">Select User</option>'+empList.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
    const cbby=document.getElementById('lf-createdBy');
    if(cbby) cbby.innerHTML='<option value="">Select User</option>'+empList.map(u=>`<option value="${u.id}">${u.name}</option>`).join('');
    const form=document.getElementById('lead-edit-form');
    if(form){
      form.dataset.id=id;
      const fields=['clientName','clientCompany','clientMobile','clientEmail','state','city','product',
        'regarding','callStatus','clientResponse','status','leadCategory','rating','paymentStatus',
        'nextCallDate','nextCallTime','meetingType','meetingAgendaType','meetingDate','meetingTime',
        'notes','businessCategory'];
      fields.forEach(f=>{const el=form.querySelector(`[name="${f}"]`);if(el)el.value=lead[f]||'';});
      if(sel) sel.value=lead.assignedTo||user.userId;
      if(miby) miby.value=lead.meetingInitiatedBy||'';
      if(cbby) cbby.value=lead.createdBy||'';
    }
    UI.hideLoading();
  },
  save(e) {
    e.preventDefault();
    const form=e.target,id=form.dataset.id;
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data.clientName||!data.clientCompany||!data.clientMobile||!data.product){UI.toast('Fill required fields','error');return;}
    const existing=Data.getById('leads',id);
    const tm=Data.getAll('users').find(u=>u.id===data.assignedTo)?.teamId||existing.teamId;
    Data.upsert('leads',{...existing,...data,id,teamId:tm,updatedAt:nowISO()});
    UI.toast('Lead updated!','success');
    setTimeout(()=>window.location.href='lead-details.html?id='+id,800);
  }
};

/* ── PAGE: LEAD ASSIGN ────────────────────── */
const PageLeadAssign = {
  init() {
    const user=UI.init('lead-assign'); if(!user) return;
    if(!Auth.can('assign_lead',user.role)){UI.toast('Access denied','error');window.location.href='leads.html';return;}
    const id=urlParam('id');if(!id){window.location.href='leads.html';return;}
    const lead=Data.getById('leads',id);if(!lead){window.location.href='leads.html';return;}
    const info=document.getElementById('assign-lead-info');
    if(info)info.textContent=lead.clientName+' — '+lead.clientCompany;
    const form=document.getElementById('assign-form');if(form)form.dataset.id=id;
    const empList=Data.getEmployeesForUser(user);
    const sel=document.getElementById('assign-to');
    if(sel) sel.innerHTML='<option value="">Select Employee</option>'+empList.map(u=>`<option value="${u.id}" ${u.id===lead.assignedTo?'selected':''}>${u.name} (${u.role})</option>`).join('');
    UI.hideLoading();
  },
  save(e) {
    e.preventDefault();
    const form=e.target,id=form.dataset.id;
    const assignTo=document.getElementById('assign-to').value;
    if(!assignTo){UI.toast('Please select an employee','error');return;}
    const lead=Data.getById('leads',id);
    const tm=Data.getAll('users').find(u=>u.id===assignTo)?.teamId||lead.teamId;
    Data.upsert('leads',{...lead,assignedTo:assignTo,teamId:tm,updatedAt:nowISO()});
    UI.toast('Lead assigned!','success');
    setTimeout(()=>window.location.href='lead-details.html?id='+id,800);
  }
};

/* ── PAGE: LEAD COMM ──────────────────────── */
const PageLeadComm = {
  init() {
    const user=UI.init('lead-comm'); if(!user) return;
    const id=urlParam('id');if(!id){window.location.href='leads.html';return;}
    const lead=Data.getById('leads',id);if(!lead){window.location.href='leads.html';return;}
    const info=document.getElementById('comm-lead-info');if(info)info.textContent=lead.clientName+' — '+lead.clientCompany;
    const form=document.getElementById('comm-form');if(form)form.dataset.id=id;
    const dt=document.getElementById('cf-date');if(dt)dt.value=nowISO();
    UI.hideLoading();
  },
  save(e) {
    e.preventDefault();
    const form=e.target,user=Auth.me(),id=form.dataset.id;
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data.notes){UI.toast('Please enter notes','error');return;}
    const lead=Data.getById('leads',id);
    const comm={type:data.type||'Call',date:(data.date||nowISO()).replace('T',' '),user:user.userId,notes:data.notes};
    const comms=[...(lead.communications||[]),comm];
    const updated={...lead,communications:comms,updatedAt:nowISO()};
    if(data.newStatus) updated.status=data.newStatus;
    Data.upsert('leads',updated);
    UI.toast('Communication logged!','success');
    setTimeout(()=>window.location.href='lead-details.html?id='+id,800);
  }
};

/* ── PAGE: CALENDAR ───────────────────────── */
const PageCalendar = {
  _year:new Date().getFullYear(),_month:new Date().getMonth(),_selected:today(),
  init() {
    const user=UI.init('calendar'); if(!user) return;
    this._leads=Data.getLeadsForUser(user);
    this.renderWidget();this.renderEvents();
    UI.hideLoading();
  },
  renderWidget() {
    const y=this._year,m=this._month;
    const firstDay=new Date(y,m,1).getDay(),daysInMonth=new Date(y,m+1,0).getDate();
    const eventDates=new Set([
      ...this._leads.map(l=>l.nextCallDate),
      ...this._leads.map(l=>l.meetingDate)
    ].filter(Boolean));
    const monthName=new Date(y,m,1).toLocaleString('default',{month:'long',year:'numeric'});
    let html=`<div class="cal-nav"><span>${monthName}</span><div>
      <button class="cal-nav-btn" onclick="CRM.Pages.calendar.prevMonth()"><i class="fas fa-chevron-left"></i></button>
      <button class="cal-nav-btn" onclick="CRM.Pages.calendar.nextMonth()"><i class="fas fa-chevron-right"></i></button>
    </div></div>
    <div class="cal-grid">${['S','M','T','W','T','F','S'].map(d=>`<div class="cal-day-lbl">${d}</div>`).join('')}</div>
    <div class="cal-grid" style="gap:2px">
      ${Array(firstDay).fill('<div></div>').join('')}
      ${Array.from({length:daysInMonth},(_,i)=>{
        const d=i+1;
        const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const isToday=ds===today(),isSel=ds===this._selected,hasEv=eventDates.has(ds);
        return `<div class="cal-date ${isToday?'today':''} ${isSel&&!isToday?'selected':''}" onclick="CRM.Pages.calendar.selectDate('${ds}')">${d}${hasEv?'<div class="cal-dot"></div>':'<div style="height:3px"></div>'}</div>`;
      }).join('')}
    </div>`;
    const el=document.getElementById('cal-widget');if(el)el.innerHTML=html;
  },
  renderEvents() {
    const dayL=this._leads.filter(l=>l.nextCallDate===this._selected||l.meetingDate===this._selected).sort((a,b)=>(a.nextCallTime||'').localeCompare(b.nextCallTime||''));
    const d=new Date(this._selected+'T00:00:00');
    const lbl=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
    const titleEl=document.getElementById('cal-day-title');if(titleEl)titleEl.textContent=lbl;
    const el=document.getElementById('cal-events');if(!el)return;
    if(!dayL.length){el.innerHTML='<div class="empty-state"><i class="fas fa-calendar"></i><p>No events on this day</p></div>';return;}
    el.innerHTML=dayL.map(l=>`<a href="lead-details.html?id=${l.id}" class="fu-item">
      <div class="fu-time">${l.nextCallTime||l.meetingTime||'—'}</div>
      <div class="fu-info"><div class="fu-name">${l.clientName}</div><div class="fu-co">${l.meetingAgendaType||l.product.substring(0,22)}</div></div>
      ${statusBadge(l.status)}
    </a>`).join('');
  },
  selectDate(d){this._selected=d;this.renderWidget();this.renderEvents();},
  prevMonth(){if(this._month===0){this._month=11;this._year--;}else this._month--;this.renderWidget();this.renderEvents();},
  nextMonth(){if(this._month===11){this._month=0;this._year++;}else this._month++;this.renderWidget();this.renderEvents();},
};

/* ── PAGE: REPORTS ────────────────────────── */
const PageReports = {
  init() {
    const user=UI.init('reports'); if(!user) return;
    if(!Auth.can('view_reports',user.role)){
      document.getElementById('report-body').innerHTML='<div class="empty-state"><i class="fas fa-lock"></i><p>Reports available for Admin, Manager, Team Leader</p></div>';
      UI.hideLoading();return;
    }
    document.getElementById('rpt-range').addEventListener('change',()=>this.render(user));
    this.render(user);UI.hideLoading();
  },
  render(user) {
    let leads=Data.getLeadsForUser(user);
    const range=document.getElementById('rpt-range')?.value||'all';
    const now=new Date();
    if(range==='month')leads=leads.filter(l=>{const d=new Date(l.createdAt);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();});
    else if(range==='quarter'){const qs=new Date(now.getFullYear(),Math.floor(now.getMonth()/3)*3,1);leads=leads.filter(l=>new Date(l.createdAt)>=qs);}
    const total=leads.length,won=leads.filter(l=>l.status==='Won'||l.status==='Close (Won)').length;
    const lost=leads.filter(l=>l.status==='Lost').length,hot=leads.filter(l=>l.leadCategory==='Hot').length;
    const conv=total?Math.round(won/total*100):0;
    const products=['Digital Business Card (V-Card)','WhatsApp Store','Custom Website & App','CRM / ERP / CMS / eCommerce Software','Digital Marketing','Other Services'];
    const prodShort=['V-Card','WA Store','Web/App','CRM/ERP','Mktg','Others'];
    const barData=products.map(p=>leads.filter(l=>l.product===p).length);
    const maxBar=Math.max(1,...barData);
    const payStatuses=['Pay Today','Pay Tomorrow','Pay This Week','Pay Next Week','Pay Ignoring','Pay Lost'];
    const catCounts=[['Hot','#FF6D00'],['Warm','#E65100'],['Solo','#283593'],['Cold','#0277BD']].map(([c,col])=>({c,col,n:leads.filter(l=>l.leadCategory===c).length}));
    const el=document.getElementById('report-body');if(!el)return;
    el.innerHTML=`
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-icon-wrap" style="background:rgba(21,101,192,.1);color:var(--primary)"><i class="fas fa-users"></i></div><div class="kpi-val">${total}</div><div class="kpi-lbl">Total Leads</div></div>
      <div class="kpi-card"><div class="kpi-icon-wrap" style="background:rgba(46,125,50,.1);color:var(--success)"><i class="fas fa-trophy"></i></div><div class="kpi-val">${won}</div><div class="kpi-lbl">Won <span class="kpi-trend trend-up">${conv}%</span></div></div>
      <div class="kpi-card"><div class="kpi-icon-wrap" style="background:rgba(230,81,0,.1);color:#E65100"><i class="fas fa-fire"></i></div><div class="kpi-val">${hot}</div><div class="kpi-lbl">Hot Leads</div></div>
      <div class="kpi-card"><div class="kpi-icon-wrap" style="background:rgba(198,40,40,.1);color:var(--danger)"><i class="fas fa-times-circle"></i></div><div class="kpi-val">${lost}</div><div class="kpi-lbl">Lost</div></div>
    </div>
    <div class="mob-card">
      <div class="mob-card-title" style="margin-bottom:10px"><i class="fas fa-box me-1" style="color:var(--primary)"></i> Product Breakdown</div>
      <div class="bar-chart-wrap">${barData.map((v,i)=>`<div class="bc-col"><div class="bc-track"><div class="bc-fill" style="height:${Math.round(v/maxBar*100)}%"></div></div><div class="bc-lbl">${prodShort[i]}</div></div>`).join('')}</div>
    </div>
    <div class="mob-card">
      <div class="mob-card-title" style="margin-bottom:10px"><i class="fas fa-fire me-1" style="color:#E65100"></i> Lead Category</div>
      ${catCounts.map(({c,col,n})=>`<div class="prog-row"><div class="prog-hd"><span class="prog-key">${c}</span><span class="prog-val">${n} (${total?Math.round(n/total*100):0}%)</span></div><div class="prog-bar"><div class="prog-fill" style="width:${total?Math.round(n/total*100):0}%;background:${col}"></div></div></div>`).join('')}
    </div>
    <div class="mob-card">
      <div class="mob-card-title" style="margin-bottom:10px"><i class="fas fa-credit-card me-1" style="color:var(--primary)"></i> Payment Status</div>
      ${payStatuses.map(p=>{const n=leads.filter(l=>l.paymentStatus===p).length;return`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--bg);font-size:12px"><span style="font-weight:600">${p}</span><strong>${n}</strong></div>`;}).join('')}
    </div>
    <div class="mob-card">
      <div class="mob-card-title" style="margin-bottom:10px"><i class="fas fa-chart-pie me-1" style="color:var(--primary)"></i> Lead Status</div>
      ${[['New Lead','#1565C0'],['Contacted','#3949AB'],['Follow-up Scheduled','#E65100'],['Demo Scheduled','#6A1B9A'],['Proposal Sent','#00695C'],['Close (Won)','#1B5E20'],['Won','#2E7D32'],['Lost','#C62828'],['Hot','#FF6D00'],['Warm','#F57F17'],['Solo','#283593'],['On Hold','#616161']].map(([s,c])=>{
        const cnt=leads.filter(l=>l.status===s).length,pct=total?Math.round(cnt/total*100):0;
        return `<div class="prog-row"><div class="prog-hd"><span class="prog-key">${s}</span><span class="prog-val">${cnt} (${pct}%)</span></div><div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${c}"></div></div></div>`;
      }).join('')}
    </div>`;
  }
};

/* ── PAGE: USERS ──────────────────────────── */
const PageUsers = {
  _filter:'',_search:'',
  init() {
    const user=UI.init('users'); if(!user) return;
    const addBtn=document.getElementById('add-user-btn');
    if(addBtn)addBtn.style.display=Auth.can('manage_users',user.role)?'flex':'none';
    this.render(user);
    document.querySelectorAll('.role-chip').forEach(c=>{
      c.addEventListener('click',()=>{document.querySelectorAll('.role-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');this._filter=c.dataset.role;this.render(user);});
    });
    const si=document.getElementById('user-search');
    if(si)si.addEventListener('input',()=>{this._search=si.value;this.render(user);});
    UI.hideLoading();
  },
  render(user) {
    let users=Data.getUsersForUser(user);
    if(this._filter)users=users.filter(u=>u.role===this._filter);
    if(this._search){const q=this._search.toLowerCase();users=users.filter(u=>(u.name+u.email+u.role).toLowerCase().includes(q));}
    const el=document.getElementById('users-list');if(!el)return;
    if(!users.length){el.innerHTML='<div class="empty-state"><i class="fas fa-users"></i><p>No users found</p></div>';return;}
    el.innerHTML=users.map(u=>`<a href="user-details.html?id=${u.id}" class="user-item">
      <div class="ui-av">${initials(u.name)}</div>
      <div class="ui-info"><div class="ui-name">${u.name}</div><div class="ui-role">${u.email}</div></div>
      <div class="ui-right">${roleBadge(u.role)}<span class="${u.status==='Active'?'badge-active':'badge-inactive'}">${u.status}</span></div>
    </a>`).join('');
  }
};

/* ── PAGE: USER DETAILS ───────────────────── */
const PageUserDetails = {
  init() {
    const user=UI.init('users');if(!user)return;
    const id=urlParam('id');if(!id){window.location.href='users.html';return;}
    const u=Data.getById('users',id);
    if(!u){UI.toast('User not found','error');window.location.href='users.html';return;}
    const hd=document.getElementById('udet-header');
    if(hd)hd.innerHTML=`<div style="font-size:18px;font-weight:800;margin-bottom:2px">${u.name}</div><div style="font-size:13px;opacity:.8">${u.role}</div>`;
    const leads=Data.getAll('leads').filter(l=>l.assignedTo===id);
    const won=leads.filter(l=>l.status==='Won'||l.status==='Close (Won)').length;
    const info=document.getElementById('udet-info');
    if(info)info.innerHTML=[
      ['Employee ID',u.empId],['Email',u.email],['Mobile',u.mobile],['Role',roleBadge(u.role)],
      ['Group',Data.getGroupName(u.groupId)],['Team',Data.getTeamName(u.teamId)],
      ['Status',`<span class="${u.status==='Active'?'badge-active':'badge-inactive'}">${u.status}</span>`],
      ['Joining Date',fmtDate(u.joiningDate)],
    ].map(([k,v])=>`<div class="info-row"><div class="ir-key">${k}</div><div class="ir-val">${v}</div></div>`).join('');
    const stats=document.getElementById('udet-stats');
    if(stats)stats.innerHTML=`
      <div class="stat-card"><div class="sc-icon" style="background:rgba(21,101,192,.1);color:var(--primary)"><i class="fas fa-users"></i></div><div><div class="sc-val">${leads.length}</div><div class="sc-lbl">Total Leads</div></div></div>
      <div class="stat-card"><div class="sc-icon" style="background:rgba(46,125,50,.1);color:var(--success)"><i class="fas fa-trophy"></i></div><div><div class="sc-val">${won}</div><div class="sc-lbl">Won</div></div></div>`;
    const actions=document.getElementById('udet-actions');
    if(actions&&Auth.can('edit_user',user.role)){
      actions.innerHTML=`<a href="user-edit.html?id=${u.id}" class="btn-primary-crm w-full" style="margin-bottom:8px"><i class="fas fa-edit me-1"></i>Edit User</a>
      ${Auth.can('delete_user',user.role)&&id!==user.userId?`<button class="btn-danger-crm w-full" onclick="CRM.Pages.userDetails.deleteUser('${id}')"><i class="fas fa-trash me-1"></i>Delete User</button>`:''}`;
    }
    UI.hideLoading();
  },
  deleteUser(id){UI.confirm('Delete User','Remove this user permanently?',()=>{Data.remove('users',id);UI.toast('User deleted','success');setTimeout(()=>window.location.href='users.html',800);});}
};

/* ── PAGE: USER ADD ───────────────────────── */
const PageUserAdd = {
  init() {
    const user=UI.init('users');if(!user)return;
    if(!Auth.can('manage_users',user.role)){UI.toast('Access denied','error');window.location.href='users.html';return;}
    const groups=Data.getAll('groups'),teams=Data.getAll('teams');
    const gs=document.getElementById('uf-group'),ts=document.getElementById('uf-team');
    if(gs)gs.innerHTML='<option value="">Select Group</option>'+groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join('');
    if(ts)ts.innerHTML='<option value="">Select Team</option>'+teams.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
    const nd=document.getElementById('uf-joining');if(nd)nd.value=today();
    UI.hideLoading();
  },
  onRoleChange(){
    const role=document.querySelector('#user-add-form [name="role"]')?.value||'';
    const showGroup=['Manager','Team Leader','Team Coordinator','Employee'].includes(role);
    const showTeam=['Team Leader','Team Coordinator','Employee'].includes(role);
    document.getElementById('uf-group-row').style.display=showGroup?'block':'none';
    document.getElementById('uf-team-row').style.display=showTeam?'block':'none';
  },
  save(e){
    e.preventDefault();
    const form=e.target,data=Object.fromEntries(new FormData(form).entries());
    if(!data.name||!data.email||!data.password||!data.role){UI.toast('Fill required fields','error');return;}
    if(Data.getAll('users').find(u=>u.email===data.email)){UI.toast('Email already exists','error');return;}
    const id=Data.nextUserId();
    Data.upsert('users',{id,empId:'EMP'+id.replace('USR',''),...data,avatar:'',joiningDate:data.joiningDate||today()});
    UI.toast('User added!','success');
    setTimeout(()=>window.location.href='users.html',800);
  }
};

/* ── PAGE: USER EDIT ──────────────────────── */
const PageUserEdit = {
  init(){
    const user=UI.init('users');if(!user)return;
    if(!Auth.can('edit_user',user.role)){UI.toast('Access denied','error');window.location.href='users.html';return;}
    const id=urlParam('id');if(!id){window.location.href='users.html';return;}
    const u=Data.getById('users',id);if(!u){window.location.href='users.html';return;}
    const groups=Data.getAll('groups'),teams=Data.getAll('teams');
    const gs=document.getElementById('uf-group'),ts=document.getElementById('uf-team');
    if(gs){gs.innerHTML='<option value="">Select Group</option>'+groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join('');gs.value=u.groupId||'';}
    if(ts){ts.innerHTML='<option value="">Select Team</option>'+teams.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');ts.value=u.teamId||'';}
    const form=document.getElementById('user-edit-form');
    if(form){form.dataset.id=id;['name','email','mobile','role','status','joiningDate'].forEach(f=>{const el=form.querySelector(`[name="${f}"]`);if(el)el.value=u[f]||'';});}
    this.onRoleChange();UI.hideLoading();
  },
  onRoleChange(){
    const role=document.querySelector('#user-edit-form [name="role"]')?.value||'';
    const showGroup=['Manager','Team Leader','Team Coordinator','Employee'].includes(role);
    const showTeam=['Team Leader','Team Coordinator','Employee'].includes(role);
    const gr=document.getElementById('uf-group-row'),tr=document.getElementById('uf-team-row');
    if(gr)gr.style.display=showGroup?'block':'none';
    if(tr)tr.style.display=showTeam?'block':'none';
  },
  save(e){
    e.preventDefault();
    const form=e.target,id=form.dataset.id;
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data.name||!data.email||!data.role){UI.toast('Fill required fields','error');return;}
    const existing=Data.getById('users',id);
    Data.upsert('users',{...existing,...data,id,password:data.password||existing.password});
    UI.toast('User updated!','success');
    setTimeout(()=>window.location.href='users.html',800);
  }
};

/* ── PUBLIC API ────────────────────────────── */
return {Auth,Data,UI,
  Pages:{
    login:PageLogin,dashboard:PageDashboard,insightList:PageInsightList,
    leads:PageLeads,leadDetails:PageLeadDetails,leadAdd:PageLeadAdd,leadEdit:PageLeadEdit,
    leadAssign:PageLeadAssign,leadComm:PageLeadComm,calendar:PageCalendar,
    reports:PageReports,users:PageUsers,userDetails:PageUserDetails,
    userAdd:PageUserAdd,userEdit:PageUserEdit,
  }
};
})();