export const vendors = [
  {id:"ST-1024", alias:"vendor-1", name:"Shree Misal Corner", category:"Street Food", area:"Nashik Road", score:94, status:"Compliant", risk:"Low", last:"12 Sep 2026", due:"12 Dec 2026", owner:"Priya Sharma", phone:"+91 98765 43210", email:"owner@example.com", hours:"8:00 AM – 10:00 PM"},
  {id:"ST-1041", alias:"vendor-2", name:"Annapurna Snacks", category:"Street Food", area:"College Road", score:82, status:"Warning", risk:"Medium", last:"08 Sep 2026", due:"08 Dec 2026", owner:"Ramesh Gupta", phone:"+91 98765 12345", email:"annapurna@example.com", hours:"9:00 AM – 9:00 PM"},
  {id:"ST-1088", alias:"vendor-3", name:"Kokan Fresh Bites", category:"Restaurant", area:"Panchavati", score:61, status:"Non-Compliant", risk:"High", last:"27 Aug 2026", due:"27 Sep 2026", owner:"Sunil Kulkarni", phone:"+91 98765 67890", email:"kokan@example.com", hours:"10:00 AM – 11:00 PM"},
  {id:"ST-1102", alias:"vendor-4", name:"Matoshree Juice Point", category:"Street Food", area:"Gangapur Road", score:89, status:"Compliant", risk:"Low", last:"02 Sep 2026", due:"02 Dec 2026", owner:"Aarti Patil", phone:"+91 98765 99887", email:"matoshree@example.com", hours:"7:00 AM – 10:00 PM"},
  {id:"ST-1115", alias:"vendor-5", name:"Sai Tiffin Hub", category:"Food Stall", area:"Indira Nagar", score:73, status:"Warning", risk:"Medium", last:"18 Aug 2026", due:"18 Sep 2026", owner:"Vikram Joshi", phone:"+91 98765 33445", email:"saitiffin@example.com", hours:"8:00 AM – 8:00 PM"},
  {id:"ST-1130", alias:"vendor-6", name:"Urban Chaat House", category:"Street Food", area:"Satpur", score:96, status:"Compliant", risk:"Low", last:"11 Sep 2026", due:"11 Dec 2026", owner:"Sneha More", phone:"+91 98765 55667", email:"urbanchaat@example.com", hours:"11:00 AM – 10:00 PM"},
  {id:"ST-1152", alias:"vendor-7", name:"Ganga Tea & Snacks", category:"Food Stall", area:"Nashik City", score:56, status:"Non-Compliant", risk:"High", last:"15 Aug 2026", due:"15 Sep 2026", owner:"Ganesh Deshmukh", phone:"+91 98765 11223", email:"gangatea@example.com", hours:"6:00 AM – 9:00 PM"},
  {id:"ST-1170", alias:"vendor-8", name:"Maharashtra Breakfast", category:"Street Food", area:"Deolali", score:78, status:"Warning", risk:"Medium", last:"05 Sep 2026", due:"05 Dec 2026", owner:"Animesh Pawar", phone:"+91 98765 44332", email:"mabreakfast@example.com", hours:"7:00 AM – 3:00 PM"}
];

export const inspectionRows = [
  {id:"inspection-1", code:"ST-INS-2094", vendorId:"ST-1024", vendor:"Shree Misal Corner", location:"Nashik Road", last:"12 Sep 2026", due:"12 Dec 2026", status:"Compliant", score:94},
  {id:"inspection-2", code:"ST-INS-2088", vendorId:"ST-1152", vendor:"Ganga Tea & Snacks", location:"Nashik City", last:"15 Aug 2026", due:"15 Sep 2026", status:"Overdue", score:56},
  {id:"inspection-3", code:"ST-INS-2075", vendorId:"ST-1041", vendor:"Annapurna Snacks", location:"College Road", last:"08 Sep 2026", due:"08 Dec 2026", status:"Warning", score:82},
  {id:"inspection-4", code:"ST-INS-2061", vendorId:"ST-1115", vendor:"Sai Tiffin Hub", location:"Indira Nagar", last:"18 Aug 2026", due:"18 Sep 2026", status:"Due Soon", score:73}
];

export const reports = [
  {
    id: "report-1",
    code: "ST-INS-2094",
    inspectionId: "inspection-1",
    vendorId: "ST-1024",
    vendor: "Shree Misal Corner",
    date: "15 September 2026",
    score: 84,
    status: "Needs Attention",
    stats: { passed: 18, partial: 4, failed: 2, risk: "Moderate" },
    findings: [
      { title: "Waste disposal area requires improvement", desc: "Improve waste segregation and cleaning around the food preparation area.", severity: "Medium" },
      { title: "Safety evidence needs confirmation", desc: "Verify current safety equipment certification before final publication.", severity: "High" }
    ]
  },
  {
    id: "report-2",
    code: "ST-INS-2088",
    inspectionId: "inspection-2",
    vendorId: "ST-1152",
    vendor: "Ganga Tea & Snacks",
    date: "15 August 2026",
    score: 56,
    status: "Non-Compliant",
    stats: { passed: 10, partial: 5, failed: 9, risk: "High" },
    findings: [
      { title: "Cleanliness standard breach", desc: "Kitchen surface sanitation below mandatory grade.", severity: "High" }
    ]
  }
];

export function getVendor(idOrAlias) {
  if (!idOrAlias) return vendors[0];
  const query = idOrAlias.toLowerCase();
  return vendors.find(v => v.id.toLowerCase() === query || v.alias.toLowerCase() === query) || null;
}

export function getInspection(idOrCode) {
  if (!idOrCode) return inspectionRows[0];
  const query = idOrCode.toLowerCase();
  return inspectionRows.find(i => i.id.toLowerCase() === query || i.code.toLowerCase() === query) || null;
}

export function getReport(idOrCode) {
  if (!idOrCode) return reports[0];
  const query = idOrCode.toLowerCase();
  return reports.find(r => r.id.toLowerCase() === query || r.code.toLowerCase() === query || r.inspectionId.toLowerCase() === query) || null;
}
