import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Bell, Building2, Check, CheckCircle2, ChevronDown, ClipboardCheck,
  FileText, Globe2, LayoutDashboard, LogOut, MapPin, Menu, Moon, PanelLeftClose, PanelLeftOpen, QrCode, Search,
  ShieldCheck, Sparkles, Store, Sun, UserRound, Users, X
} from "lucide-react";
import "./styles.css";

const vendors = [
  {id:"ST-1024", name:"Shree Misal Corner", category:"Street Food", area:"Nashik Road", score:94, status:"Compliant", risk:"Low", last:"12 Sep 2026", due:"12 Dec 2026"},
  {id:"ST-1041", name:"Annapurna Snacks", category:"Street Food", area:"College Road", score:82, status:"Warning", risk:"Medium", last:"08 Sep 2026", due:"08 Dec 2026"},
  {id:"ST-1088", name:"Kokan Fresh Bites", category:"Restaurant", area:"Panchavati", score:61, status:"Non-Compliant", risk:"High", last:"27 Aug 2026", due:"27 Sep 2026"},
  {id:"ST-1102", name:"Matoshree Juice Point", category:"Street Food", area:"Gangapur Road", score:89, status:"Compliant", risk:"Low", last:"02 Sep 2026", due:"02 Dec 2026"},
  {id:"ST-1115", name:"Sai Tiffin Hub", category:"Food Stall", area:"Indira Nagar", score:73, status:"Warning", risk:"Medium", last:"18 Aug 2026", due:"18 Sep 2026"},
  {id:"ST-1130", name:"Urban Chaat House", category:"Street Food", area:"Satpur", score:96, status:"Compliant", risk:"Low", last:"11 Sep 2026", due:"11 Dec 2026"},
  {id:"ST-1152", name:"Ganga Tea & Snacks", category:"Food Stall", area:"Nashik City", score:56, status:"Non-Compliant", risk:"High", last:"15 Aug 2026", due:"15 Sep 2026"},
  {id:"ST-1170", name:"Maharashtra Breakfast", category:"Street Food", area:"Deolali", score:78, status:"Warning", risk:"Medium", last:"05 Sep 2026", due:"05 Dec 2026"}
];

const inspectionRows = [
  {vendor:"Shree Misal Corner", location:"Nashik Road", last:"12 Sep 2026", due:"12 Dec 2026", status:"Compliant", score:94},
  {vendor:"Ganga Tea & Snacks", location:"Nashik City", last:"15 Aug 2026", due:"15 Sep 2026", status:"Overdue", score:56},
  {vendor:"Annapurna Snacks", location:"College Road", last:"08 Sep 2026", due:"08 Dec 2026", status:"Warning", score:82},
  {vendor:"Sai Tiffin Hub", location:"Indira Nagar", last:"18 Aug 2026", due:"18 Sep 2026", status:"Due Soon", score:73}
];

function Status({children}) {
  const cls = String(children).toLowerCase().replaceAll(" ","-");
  return <span className={"status "+cls}>{children}</span>
}

function Logo({dark=false}) {
  return <div className={"logo "+(dark?"logo-dark":"")}>
    <div className="logo-mark"><ShieldCheck size={21}/></div>
    <div className="logo-text"><strong>STREET</strong><span>TRUST</span></div>
  </div>
}

function ThemeToggle({theme, toggleTheme, className=""}) {
  return (
    <button 
      className={`icon-btn theme-btn ${className}`} 
      onClick={toggleTheme} 
      title={`Switch to ${theme==="light"?"dark":"light"} mode`} 
      aria-label="Toggle theme"
    >
      {theme==="light"?<Moon size={18}/>:<Sun size={18}/>}
    </button>
  );
}

function Login({onLogin, theme, toggleTheme}) {
  const [role,setRole]=useState("inspector");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [show,setShow]=useState(false);
  const [error,setError]=useState("");

  const submit=(e)=>{
    e.preventDefault();
    if(!email || !password){setError("Please enter your email and password.");return;}
    onLogin(role);
  };

  return <div className="login-page">
    <div className="login-top-right">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
    <div className="login-visual">
      <div className="login-visual-inner">
        <Logo dark/>
        <div className="visual-copy">
          <span className="eyebrow">INSPECTION & VERIFICATION PLATFORM</span>
          <h1>Make every street<br/><em>safer to trust.</em></h1>
          <p>Digitize inspections, surface compliance risks, and give the public a clear way to verify trusted food businesses.</p>
          <div className="trust-points">
            <div><CheckCircle2/> Standardized inspections</div>
            <div><CheckCircle2/> Evidence-backed compliance</div>
            <div><CheckCircle2/> Public verification</div>
          </div>
        </div>
        <div className="visual-foot"><span>VERIFY. INSPECT. TRUST.</span><span>© 2026 StreetTrust</span></div>
      </div>
    </div>
    <div className="login-form-side">
      <div className="mobile-logo"><Logo/></div>
      <div className="login-card">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to StreetTrust</h2>
        <p className="muted">Access your inspection and compliance workspace.</p>

        <div className="role-switch">
          <button className={role==="inspector"?"active":""} onClick={()=>setRole("inspector")}><ClipboardCheck size={16}/> Inspector</button>
          <button className={role==="vendor"?"active":""} onClick={()=>setRole("vendor")}><Store size={16}/> Vendor</button>
        </div>

        <form onSubmit={submit}>
          <label>Email / Username<input value={email} onChange={e=>setEmail(e.target.value)} placeholder={role==="inspector"?"inspector@streettrust.app":"vendor@streettrust.app"} /></label>
          <label>Password<div className="password-wrap"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/><button type="button" onClick={()=>setShow(!show)}>{show?"Hide":"Show"}</button></div></label>
          {error && <div className="form-error">{error}</div>}
          <div className="form-options"><label className="checkbox"><input type="checkbox"/> <span>Remember me</span></label><button type="button" className="link-btn">Forgot password?</button></div>
          <button className="primary-btn full" type="submit">Sign In <ArrowRight size={18}/></button>
        </form>

        <div className="divider"><span>OR</span></div>
        <button className="public-btn" onClick={()=>onLogin("public")}><Globe2 size={18}/> Continue as Public User</button>
        <div className="demo-hint">Demo: any non-empty credentials work in this frontend prototype.</div>
      </div>
    </div>
  </div>
}

function Sidebar({role,path,setPath,logout,collapsed,setCollapsed}) {
  const inspectorItems=[
    ["Dashboard","/inspector",LayoutDashboard],["Vendors","/inspector/vendors",Users],["Inspections","/inspector/inspections",ClipboardCheck],
    ["Reports","/inspector/reports",FileText],["Map","/inspector/map",MapPin],["Notifications","/inspector/notifications",Bell],
    ["Profile","/inspector/profile",UserRound],["Settings","/inspector/settings",Building2]
  ];
  const vendorItems=[
    ["Dashboard","/vendor",LayoutDashboard],["My Profile","/vendor/profile",UserRound],["Documents","/vendor/documents",FileText],
    ["Inspections","/vendor/inspections",ClipboardCheck],["Compliance","/vendor/compliance",ShieldCheck],["Reports","/vendor/reports",FileText],
    ["QR Verification","/vendor/qr",QrCode],["Notifications","/vendor/notifications",Bell],["Settings","/vendor/settings",Building2]
  ];
  const items=role==="inspector"?inspectorItems:vendorItems;
  return <aside className={"sidebar "+(collapsed?"collapsed":"")}>
    <div className="side-header">
      <Logo/>
      <button 
        className="collapse-btn" 
        onClick={()=>setCollapsed(!collapsed)} 
        title={collapsed?"Expand sidebar (Ctrl+B)":"Minimize sidebar (Ctrl+B)"} 
        aria-label="Toggle sidebar"
      >
        {collapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}
      </button>
    </div>
    <div className="side-role"><span>{role==="inspector"?"AUTHORIZED INSPECTOR":"REGISTERED VENDOR"}</span></div>
    <nav>{items.map(([label,to,Icon])=>(
      <button 
        key={to} 
        className={(path===to || (to!=="/inspector"&&to!=="/vendor"&&path.startsWith(to)))?"nav-active":""} 
        onClick={()=>setPath(to)}
        title={label}
      >
        <Icon size={18}/>
        <span>{label}</span>
      </button>
    ))}</nav>
    <div className="side-bottom">
      <div className="security-card" title="Secure workspace · Protected access">
        <ShieldCheck size={18}/>
        <div><strong>Secure workspace</strong><small>Protected access</small></div>
      </div>
      <button className="logout" onClick={logout} title="Sign out">
        <LogOut size={17}/> <span>Sign out</span>
      </button>
    </div>
  </aside>
}

function Topbar({title,setPath,theme,toggleTheme,collapsed,setCollapsed}) {
  return <header className="topbar">
    <div className="topbar-left">
      <button className="mobile-menu" onClick={()=>setCollapsed(!collapsed)} aria-label="Toggle menu"><Menu/></button>
      <div className="crumb"><span>StreetTrust</span><b>/</b><strong>{title}</strong></div>
    </div>
    <div className="top-actions">
      <div className="global-search"><Search size={17}/><input placeholder="Search vendors, reports..."/></div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <button className="icon-btn" title="Notifications"><Bell size={19}/><i></i></button>
      <button className="avatar" title="Inspector Profile" onClick={()=>setPath("/inspector/profile")}>AS</button>
    </div>
  </header>
}

function KPI({label,value,detail,icon:Icon,kind=""}) {
  return <div className="kpi"><div className={"kpi-icon "+kind}><Icon size={20}/></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>
}

function Dashboard({setPath}) {
  return <div className="page">
    <div className="page-heading"><div><span className="eyebrow">TUESDAY, 15 SEPTEMBER 2026</span><h1>Good morning, Inspector.</h1><p>Here’s your inspection overview for today.</p></div><button className="primary-btn" onClick={()=>setPath("/inspector/vendors")}><ClipboardCheck size={17}/> Start inspection</button></div>
    <div className="kpi-grid">
      <KPI label="Total Vendors" value="128" detail="+8.4% this month" icon={Store}/>
      <KPI label="Inspections Due" value="14" detail="4 due this week" icon={ClipboardCheck} kind="amber"/>
      <KPI label="Completed" value="96" detail="+12 this month" icon={CheckCircle2} kind="green"/>
      <KPI label="Non-Compliant" value="7" detail="3 require action" icon={ShieldCheck} kind="red"/>
      <KPI label="Pending Reviews" value="5" detail="Awaiting your review" icon={FileText} kind="purple"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel map-panel">
        <div className="panel-head"><div><h3>Vendor coverage</h3><p>Live inspection status across your assigned area</p></div><button className="text-btn" onClick={()=>setPath("/inspector/map")}>Open map <ArrowRight size={15}/></button></div>
        <div className="fake-map">
          <div className="map-grid"></div>
          <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
          <div className="map-label l1">Nashik Road</div><div className="map-label l2">College Road</div><div className="map-label l3">Panchavati</div>
          {vendors.slice(0,7).map((v,i)=><button className={"map-pin "+(v.status==="Compliant"?"green":v.status==="Warning"?"amber":"red")} style={{left:(15+i*11)+"%",top:(24+(i%3)*21)+"%"}} key={v.id} title={v.name}><span></span></button>)}
          <div className="map-legend"><span><i className="dot green"></i>Compliant</span><span><i className="dot amber"></i>Warning</span><span><i className="dot red"></i>Non-compliant</span></div>
        </div>
      </section>
      <section className="panel queue-panel">
        <div className="panel-head"><div><h3>Inspection queue</h3><p>Vendors needing attention</p></div><button className="icon-btn"><ChevronDown size={17}/></button></div>
        <div className="queue-list">{inspectionRows.map((r,i)=><div className="queue-item" key={r.vendor}><div className="mini-avatar">{r.vendor.slice(0,1)}</div><div className="queue-main"><strong>{r.vendor}</strong><small>{r.location} · Due {r.due}</small></div><Status>{r.status}</Status><button className="small-action" onClick={()=>setPath("/inspector/vendors")}>Inspect</button></div>)}</div>
      </section>
    </div>
    <section className="panel">
      <div className="panel-head"><div><h3>Recent inspections</h3><p>Latest completed field activity</p></div><button className="text-btn" onClick={()=>setPath("/inspector/inspections")}>View all <ArrowRight size={15}/></button></div>
      <InspectionTable rows={inspectionRows.slice(0,3)} setPath={setPath}/>
    </section>
  </div>
}

function InspectionTable({rows,setPath}) {
 return <div className="table-wrap"><table><thead><tr><th>Vendor</th><th>Location</th><th>Last inspection</th><th>Status</th><th>Score</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r.vendor}><td><div className="table-vendor"><div className="mini-avatar">{r.vendor[0]}</div><strong>{r.vendor}</strong></div></td><td>{r.location}</td><td>{r.last}</td><td><Status>{r.status}</Status></td><td><strong className="score-text">{r.score}</strong><span className="outof">/100</span></td><td><button className="ghost-btn" onClick={()=>setPath("/inspector/vendors")}>View</button></td></tr>)}</tbody></table></div>
}

function Vendors({setPath}) {
 const [q,setQ]=useState(""); const [status,setStatus]=useState("All");
 const filtered=useMemo(()=>vendors.filter(v=>(v.name+" "+v.id+" "+v.area+" "+v.category).toLowerCase().includes(q.toLowerCase()) && (status==="All"||v.status===status)),[q,status]);
 return <div className="page">
   <div className="page-heading"><div><span className="eyebrow">VENDOR DIRECTORY</span><h1>Vendors</h1><p>Search, filter and manage your assigned food businesses.</p></div><button className="primary-btn"><Users size={17}/> Add vendor</button></div>
   <section className="panel">
     <div className="toolbar"><div className="search-box"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by vendor, ID, area or category..."/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Compliant</option><option>Warning</option><option>Non-Compliant</option></select></div>
     <div className="result-line">{filtered.length} vendors found <span>·</span> Updated just now</div>
     <div className="table-wrap"><table><thead><tr><th>Vendor</th><th>Category</th><th>Location</th><th>Trust score</th><th>Last inspection</th><th>Compliance</th><th></th></tr></thead><tbody>{filtered.map(v=><tr key={v.id}><td><div className="table-vendor"><div className="mini-avatar">{v.name[0]}</div><div><strong>{v.name}</strong><small>{v.id}</small></div></div></td><td>{v.category}</td><td>{v.area}</td><td><strong className="score-text">{v.score}</strong><span className="outof">/100</span></td><td>{v.last}</td><td><Status>{v.status}</Status></td><td><button className="ghost-btn" onClick={()=>setPath("/inspector/vendors/"+v.id)}>View</button></td></tr>)}</tbody></table></div>
   </section>
 </div>
}

function VendorProfile({setPath,id}) {
 const v=vendors.find(x=>x.id===id)||vendors[0];
 return <div className="page">
   <button className="back-link" onClick={()=>setPath("/inspector/vendors")}>← Back to vendors</button>
   <div className="profile-hero panel"><div className="profile-logo">{v.name[0]}</div><div className="profile-title"><div><span className="eyebrow">VENDOR {v.id}</span><h1>{v.name}</h1><p>{v.category} · {v.area}</p></div><Status>{v.status}</Status></div><div className="profile-actions"><button className="secondary-btn" onClick={()=>setPath("/inspector/vendors")}>Documents</button><button className="primary-btn" onClick={()=>setPath("/inspector/vendors/"+v.id+"/inspection/new")}><ClipboardCheck size={17}/> Start new inspection</button></div></div>
   <div className="profile-grid">
    <section className="panel"><div className="panel-head"><div><h3>Trust & compliance</h3><p>Current verification overview</p></div><Status>{v.risk} risk</Status></div><div className="score-large"><div className="score-ring" style={{"--score":v.score}}><div><strong>{v.score}</strong><small>/100</small></div></div><div><h2>{v.score>=90?"Excellent":v.score>=75?"Good standing":v.score>=60?"Needs attention":"Non-compliant"}</h2><p>Overall compliance score</p></div></div><div className="category-bars"><Bar label="Hygiene" value={v.score-3}/><Bar label="Documentation" value={Math.min(100,v.score+3)}/><Bar label="Safety" value={v.score-1}/><Bar label="Operations" value={v.score}/></div></section>
    <section className="panel"><div className="panel-head"><div><h3>Business information</h3><p>Registered vendor details</p></div></div><div className="info-grid"><Info label="Vendor ID" value={v.id}/><Info label="Owner" value="Priya Sharma"/><Info label="Phone" value="+91 98765 43210"/><Info label="Email" value="owner@example.com"/><Info label="Address" value={"Near "+v.area+", Nashik"}/><Info label="Operating hours" value="8:00 AM – 10:00 PM"/></div></section>
   </div>
   <section className="panel"><div className="panel-head"><div><h3>Inspection history</h3><p>Recent inspection records and outcomes</p></div></div><InspectionTable rows={[{vendor:v.name,location:v.area,last:v.last,due:v.due,status:v.status,score:v.score},{vendor:v.name,location:v.area,last:"16 Jun 2026",due:"16 Sep 2026",status:"Compliant",score:91}]} setPath={setPath}/></section>
 </div>
}
function Bar({label,value}){return <div className="bar-row"><span>{label}</span><div><i style={{width:value+"%"}}></i></div><strong>{value}%</strong></div>}
function Info({label,value}){return <div className="info"><span>{label}</span><strong>{value}</strong></div>}

function NewInspection({setPath,id}) {
 const [step,setStep]=useState(1); const [checks,setChecks]=useState({});
 const sections=[["Business & Documentation",["Business registration valid","Required licenses available","Identity verification completed","Required certificates present"]],["Hygiene",["Premises clean","Food/material storage appropriate","Waste disposal appropriate","Equipment clean","Handwashing facilities available"]],["Safety",["Fire safety equipment","Electrical safety","Emergency exits","Safety signage"]],["Operations",["Operating standards followed","Staff compliance","Required records maintained"]]];
 const total=sections.reduce((a,s)=>a+s[1].length,0); const done=Object.keys(checks).length;
 const choose=(item,val)=>setChecks(c=>({...c,[item]:val}));
 const submit=()=>setPath("/inspector/vendors/"+id+"/inspection/analysis");
 return <div className="page">
  <button className="back-link" onClick={()=>setPath("/inspector/vendors/"+id)}>← Back to vendor</button>
  <div className="page-heading"><div><span className="eyebrow">NEW INSPECTION · {id}</span><h1>Field inspection</h1><p>Complete the standardized inspection and attach evidence.</p></div><div className="autosave"><span></span> Draft saved</div></div>
  <div className="stepper"><div className="step active"><b>1</b><span>Checklist</span></div><i></i><div className={"step "+(step>=2?"active":"")}><b>2</b><span>Evidence</span></div><i></i><div className={"step "+(step>=3?"active":"")}><b>3</b><span>Review</span></div></div>
  {step===1 && <section className="panel inspection-panel"><div className="inspection-progress"><div><strong>{done} / {total} checks completed</strong><span>Progress updates automatically</span></div><div className="progress"><i style={{width:(done/total*100)+"%"}}></i></div></div>{sections.map(([name,items])=><div className="check-section" key={name}><h3>{name}</h3>{items.map(item=><div className="check-row" key={item}><div><strong>{item}</strong><small>Mark the current observed condition.</small></div><div className="check-options">{["Pass","Partial","Fail","N/A"].map(val=><button className={checks[item]===val?"selected "+val.toLowerCase():""} onClick={()=>choose(item,val)} key={val}>{val}</button>)}</div></div>)}</div>)}<div className="inspection-footer"><button className="secondary-btn">Save draft</button><button className="primary-btn" disabled={done<total} onClick={()=>setStep(2)}>Continue <ArrowRight size={17}/></button></div></section>}
  {step===2 && <section className="panel evidence-panel"><div className="panel-head"><div><h3>Add inspection observations</h3><p>Attach photos, voice notes or typed remarks as evidence.</p></div></div><div className="evidence-grid"><button className="upload-tile"><span><Building2/></span><strong>Upload photos</strong><small>JPG, PNG · Up to 10 MB</small></button><button className="upload-tile"><span><Sparkles/></span><strong>Record voice note</strong><small>Tap to record an observation</small></button><div className="observation-box"><label>Observation<textarea placeholder="Describe anything important you observed during the inspection..."></textarea></label><div className="observation-meta"><select><option>Hygiene</option><option>Safety</option><option>Documentation</option></select><select><option>Medium severity</option><option>Low severity</option><option>High severity</option><option>Critical</option></select></div></div></div><div className="inspection-footer"><button className="secondary-btn" onClick={()=>setStep(1)}>Back</button><button className="primary-btn" onClick={()=>setStep(3)}>Review inspection <ArrowRight size={17}/></button></div></section>}
  {step===3 && <section className="panel review-panel"><div className="review-banner"><CheckCircle2/><div><strong>Inspection ready for analysis</strong><p>Your checklist and evidence can now be submitted to the compliance engine.</p></div></div><div className="review-grid"><Info label="Vendor" value={vendors.find(v=>v.id===id)?.name||"Shree Misal Corner"}/><Info label="Checklist" value={`${done} / ${total} completed`}/><Info label="Evidence" value="1 observation · 0 photos"/><Info label="Inspector" value="Aarav Shah"/></div><div className="inspection-footer"><button className="secondary-btn" onClick={()=>setStep(2)}>Back</button><button className="primary-btn" onClick={submit}><Sparkles size={17}/> Run AI analysis</button></div></section>}
 </div>
}

function Analysis({setPath,id}) {
 const [done,setDone]=useState(false);
 React.useEffect(()=>{const t=setTimeout(()=>setDone(true),1800);return()=>clearTimeout(t)},[]);
 return <div className="page analysis-page"><button className="back-link" onClick={()=>setPath("/inspector/vendors/"+id+"/inspection/new")}>← Back to inspection</button>
 <div className="analysis-card panel">{!done?<><div className="ai-orb"><Sparkles size={28}/></div><span className="eyebrow">STREETTRUST COMPLIANCE ENGINE</span><h1>Analyzing inspection...</h1><p>Reviewing checklist responses and field evidence to prepare a structured compliance assessment.</p><div className="analysis-stages"><Stage active text="Reviewing checklist"/><Stage active text="Processing observations"/><Stage active text="Analyzing evidence"/><Stage text="Calculating compliance score"/><Stage text="Generating recommendations"/></div></>:<><div className="result-icon"><Check/></div><span className="eyebrow">ANALYSIS COMPLETE</span><h1>Compliance assessment ready</h1><p>The AI-assisted assessment has been prepared for inspector review. AI findings are advisory and not legally binding.</p><div className="result-score"><div className="score-ring" style={{"--score":84}}><div><strong>84</strong><small>/100</small></div></div><div><span className="status warning">Needs Attention</span><h2>Moderate risk</h2><p>Review the highlighted findings before finalizing.</p></div></div><div className="finding"><span className="finding-dot"></span><div><strong>Waste disposal area requires improvement</strong><p>Hygiene · Medium severity · Corrective cleaning and segregation recommended.</p></div></div><div className="finding"><span className="finding-dot red"></span><div><strong>Safety evidence needs confirmation</strong><p>Safety · High severity · Inspector review required before report finalization.</p></div></div><button className="primary-btn full" onClick={()=>setPath("/inspector/inspections/report-demo")}>Review & finalize report <ArrowRight size={17}/></button></>}</div></div>
}
function Stage({active,text}){return <div className={active?"stage active":"stage"}><span>{active?<Check size={13}/>:<i/>}</span>{text}</div>}

function Report({setPath}) {
 return <div className="page"><button className="back-link" onClick={()=>setPath("/inspector")}>← Back to dashboard</button><div className="page-heading"><div><span className="eyebrow">INSPECTION REPORT · ST-INS-2094</span><h1>Inspection report</h1><p>AI-assisted draft reviewed by the assigned inspector.</p></div><div className="heading-actions"><button className="secondary-btn">Print</button><button className="primary-btn">Download PDF</button></div></div>
 <section className="report-sheet panel"><div className="report-header"><Logo/><div className="report-meta"><span>Inspection ID</span><strong>ST-INS-2094</strong><span>15 September 2026</span></div></div><div className="report-vendor"><div><span className="eyebrow">VENDOR</span><h2>Shree Misal Corner</h2><p>ST-1024 · Street Food · Nashik Road, Nashik</p></div><div className="report-score"><strong>84</strong><span>/100</span><Status>Needs Attention</Status></div></div><div className="report-stats"><Info label="Passed checks" value="18"/><Info label="Partial checks" value="4"/><Info label="Failed checks" value="2"/><Info label="Risk level" value="Moderate"/></div><h3 className="report-section-title">Checklist results</h3><div className="report-checks">{["Business registration valid","Required licenses available","Premises clean","Waste disposal appropriate","Fire safety equipment","Operating standards followed"].map((x,i)=><div key={x}><span>{x}</span><Status>{i===4?"Fail":i===3?"Partial":"Pass"}</Status></div>)}</div><h3 className="report-section-title">Priority findings</h3><div className="finding"><span className="finding-dot"></span><div><strong>Waste disposal area requires improvement</strong><p>Improve waste segregation and cleaning around the food preparation area.</p></div><Status>Medium</Status></div><div className="finding"><span className="finding-dot red"></span><div><strong>Safety evidence needs confirmation</strong><p>Verify current safety equipment certification before final publication.</p></div><Status>High</Status></div><div className="report-footer"><span>AI-generated insights require inspector review.</span><button className="primary-btn" onClick={()=>setPath("/inspector")}>Finalize report <CheckCircle2 size={17}/></button></div></section></div>
}

function VendorDashboard({setPath}) {
 return <div className="page"><div className="page-heading"><div><span className="eyebrow">VENDOR PORTAL</span><h1>Good morning, Priya.</h1><p>Here’s the latest compliance status for Shree Misal Corner.</p></div><button className="secondary-btn" onClick={()=>setPath("/vendor/qr")}><QrCode size={17}/> View QR</button></div>
 <div className="kpi-grid four"><KPI label="Trust Score" value="92" detail="+3 since last inspection" icon={ShieldCheck} kind="green"/><KPI label="Compliance" value="Good" detail="No critical issues" icon={CheckCircle2} kind="green"/><KPI label="Next Inspection" value="12 Dec" detail="88 days remaining" icon={ClipboardCheck} kind="amber"/><KPI label="Documents Expiring" value="1" detail="Within 30 days" icon={FileText} kind="red"/></div>
 <div className="vendor-dash-grid"><section className="panel"><div className="panel-head"><div><h3>Current compliance</h3><p>Your public trust profile is healthy.</p></div><Status>Good Standing</Status></div><div className="vendor-score-row"><div className="score-ring" style={{"--score":92}}><div><strong>92</strong><small>/100</small></div></div><div><h2>Good standing</h2><p>Last verified 12 September 2026</p><button className="text-btn" onClick={()=>setPath("/vendor/compliance")}>View compliance details <ArrowRight size={15}/></button></div></div></section><section className="panel action-panel"><h3>Action required</h3><div className="action-item"><div className="action-icon"><FileText/></div><div><strong>Safety certificate expires soon</strong><p>Upload an updated certificate within 12 days.</p><button className="text-btn">Upload certificate <ArrowRight size={15}/></button></div></div></section></div>
 <section className="panel"><div className="panel-head"><div><h3>Recent inspection</h3><p>Your latest finalized inspection report.</p></div><button className="primary-btn" onClick={()=>setPath("/vendor/inspections")}>View report <ArrowRight size={16}/></button></div><InspectionTable rows={[{vendor:"Shree Misal Corner",location:"Nashik Road",last:"12 Sep 2026",due:"12 Dec 2026",status:"Compliant",score:92}]} setPath={setPath}/></section>
 </div>
}

function PublicVerify({setPath,id,theme,toggleTheme}) {
 const v=vendors.find(x=>x.id===id)||vendors[0];
 return <div className="public-page"><header className="public-header"><Logo/><div style={{display:'flex',gap:'10px',alignItems:'center'}}><ThemeToggle theme={theme} toggleTheme={toggleTheme}/><button className="secondary-btn" onClick={()=>setPath("/login")}>Sign in</button></div></header><main className="verify-main"><div className="verified-pill"><CheckCircle2 size={17}/> VERIFIED BY STREETTRUST</div><div className="verify-card panel"><div className="verify-top"><div className="public-business-logo">{v.name[0]}</div><div><span className="eyebrow">VERIFIED BUSINESS</span><h1>{v.name}</h1><p>{v.category} · {v.area}, Nashik</p></div><Status>Good Standing</Status></div><div className="public-score"><div className="score-ring" style={{"--score":92}}><div><strong>92</strong><small>/100</small></div></div><div><h2>Good standing</h2><p>Current StreetTrust compliance score</p><span>Last verified 12 September 2026</span></div></div><div className="public-grid"><Info label="Verification ID" value={v.id}/><Info label="Registration" value="Verified"/><Info label="Hygiene" value="Good"/><Info label="Safety" value="Compliant"/></div><div className="public-note"><ShieldCheck/><div><strong>What this means</strong><p>This public profile shows finalized information intended for verification. Private inspector notes and sensitive documents are not displayed.</p></div></div><button className="secondary-btn full">Share verification <ArrowRight size={16}/></button></div><p className="public-disclaimer">StreetTrust provides digital verification information. Always confirm the latest status before making a decision.</p></main></div>
}

function PublicSearch({setPath,theme,toggleTheme}) {
 const [q,setQ]=useState("");
 return <div className="public-page"><header className="public-header"><Logo/><div style={{display:'flex',gap:'10px',alignItems:'center'}}><ThemeToggle theme={theme} toggleTheme={toggleTheme}/><button className="secondary-btn" onClick={()=>setPath("/login")}>Restricted user sign in</button></div></header><main className="public-search-main"><div className="public-search-copy"><div className="verified-pill"><ShieldCheck size={17}/> PUBLIC VERIFICATION</div><h1>Can you trust this business?</h1><p>Verify a StreetTrust-registered vendor using their vendor ID or scan their QR code.</p></div><div className="verify-search panel"><div className="search-large"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Enter vendor ID or verification code"/><button className="primary-btn" onClick={()=>setPath("/public/verify/"+(q||"ST-1024"))}>Verify <ArrowRight size={17}/></button></div><div className="or-line"><span>OR</span></div><button className="qr-cta"><QrCode size={28}/><div><strong>Scan a StreetTrust QR code</strong><span>Point your camera at the vendor's verification QR.</span></div><ArrowRight/></button></div></main></div>
}

function Placeholder({title,role,setPath}) {
 return <div className="page"><div className="empty-hero panel"><div className="empty-icon"><Sparkles/></div><span className="eyebrow">{role==="inspector"?"INSPECTOR WORKSPACE":"VENDOR PORTAL"}</span><h1>{title}</h1><p>This module is wired into the StreetTrust frontend and ready for the next implementation pass.</p><button className="primary-btn" onClick={()=>setPath(role==="inspector"?"/inspector":"/vendor")}>Back to dashboard <ArrowRight size={17}/></button></div></div>
}

function App(){
 const [role,setRole]=useState(null); 
 const [path,setPath]=useState("/login");
 const [theme,setTheme]=useState(()=>{
   return localStorage.getItem("st_theme") || "light";
 });
 const [collapsed,setCollapsed]=useState(()=>{
   return localStorage.getItem("st_sidebar_collapsed") === "true";
 });

 useEffect(()=>{
   document.documentElement.setAttribute("data-theme", theme);
   localStorage.setItem("st_theme", theme);
 },[theme]);

 useEffect(()=>{
   localStorage.setItem("st_sidebar_collapsed", String(collapsed));
 },[collapsed]);

 useEffect(()=>{
   const handleKeyDown=(e)=>{
     if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="b"){
       e.preventDefault();
       setCollapsed(prev => !prev);
     }
   };
   window.addEventListener("keydown", handleKeyDown);
   return ()=>window.removeEventListener("keydown", handleKeyDown);
 },[]);

 const toggleTheme=()=>setTheme(t=>t==="light"?"dark":"light");
 const login=r=>{setRole(r);setPath(r==="inspector"?"/inspector":r==="vendor"?"/vendor":"/public/verify")};
 const logout=()=>{setRole(null);setPath("/login")};

 if(!role || path==="/login") return <Login onLogin={login} theme={theme} toggleTheme={toggleTheme}/>;
 if(role==="public") return path.startsWith("/public/verify/")?
   <PublicVerify setPath={setPath} id={path.split("/").pop()} theme={theme} toggleTheme={toggleTheme}/>:
   <PublicSearch setPath={setPath} theme={theme} toggleTheme={toggleTheme}/>;

 const title=path.split("/").filter(Boolean).pop()||"Dashboard";
 const titles={inspector:"Dashboard",vendors:"Vendors",inspections:"Inspections",reports:"Reports",map:"Map",notifications:"Notifications",profile:"Profile",settings:"Settings",vendor:"Dashboard",documents:"Documents",compliance:"Compliance",qr:"QR Verification"};
 let content;
 if(role==="inspector"){
  if(path==="/inspector") content=<Dashboard setPath={setPath}/>;
  else if(path==="/inspector/vendors") content=<Vendors setPath={setPath}/>;
  else if(path.match(/^\/inspector\/vendors\/[^/]+\/inspection\/new$/)) content=<NewInspection setPath={setPath} id={path.split("/")[3]}/>;
  else if(path.match(/^\/inspector\/vendors\/[^/]+\/inspection\/analysis$/)) content=<Analysis setPath={setPath} id={path.split("/")[3]}/>;
  else if(path.startsWith("/inspector/vendors/")) content=<VendorProfile setPath={setPath} id={path.split("/")[3]}/>;
  else if(path==="/inspector/inspections/report-demo") content=<Report setPath={setPath}/>;
  else content=<Placeholder title={titles[title]||"Workspace"} role={role} setPath={setPath}/>;
 } else {
  if(path==="/vendor") content=<VendorDashboard setPath={setPath}/>;
  else if(path==="/vendor/qr") content=<PublicVerify setPath={setPath} id="ST-1024" theme={theme} toggleTheme={toggleTheme}/>;
  else content=<Placeholder title={titles[title]||"Vendor workspace"} role={role} setPath={setPath}/>;
 }
 return <div className="app-shell" data-theme={theme}>
   <Sidebar role={role} path={path} setPath={setPath} logout={logout} collapsed={collapsed} setCollapsed={setCollapsed}/>
   <div className={"main-area "+(collapsed?"expanded-main":"")}>
     <Topbar title={titles[title]||"Workspace"} setPath={setPath} theme={theme} toggleTheme={toggleTheme} collapsed={collapsed} setCollapsed={setCollapsed}/>
     <main>{content}</main>
   </div>
 </div>
}

createRoot(document.getElementById("root")).render(<App/>);