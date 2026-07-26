// SYNTHETIC / FAKE DATA ONLY — modeled on the KSP FIR ER diagram structure.
// No real crime records are used anywhere in this prototype.

const firData = [
  {
    CaseMasterID: 1, CrimeNo: "104430006202600001", CaseNo: "202600001",
    CrimeRegisteredDate: "2026-05-03", District: "Bengaluru Urban",
    PoliceStation: "Indiranagar PS", CaseCategory: "FIR",
    CrimeMajorHead: "Crimes Against Property", CrimeMinorHead: "Theft",
    CaseStatus: "Under Investigation", GravityOffence: "Non-Heinous",
    IncidentFromDate: "2026-05-02", latitude: 12.9719, longitude: 77.6412,
    BriefFacts: "Two-wheeler stolen from residential parking area.",
    Accused: [{ AccusedName: "Suresh K", AgeYear: 27, GenderID: "M" }],
    Victim: [{ VictimName: "Ramesh Rao", AgeYear: 41, GenderID: "M" }]
  },
  {
    CaseMasterID: 2, CrimeNo: "104430009202600002", CaseNo: "202600002",
    CrimeRegisteredDate: "2026-05-10", District: "Mysuru",
    PoliceStation: "Krishnaraja PS", CaseCategory: "FIR",
    CrimeMajorHead: "Crimes Against Body", CrimeMinorHead: "Assault",
    CaseStatus: "Charge Sheeted", GravityOffence: "Heinous",
    IncidentFromDate: "2026-05-09", latitude: 12.3052, longitude: 76.6552,
    BriefFacts: "Altercation between neighbours resulting in grievous injury.",
    Accused: [{ AccusedName: "Manjunath P", AgeYear: 35, GenderID: "M" }],
    Victim: [{ VictimName: "Deepak S", AgeYear: 38, GenderID: "M" }]
  },
  {
    CaseMasterID: 3, CrimeNo: "104430006202600003", CaseNo: "202600003",
    CrimeRegisteredDate: "2026-06-01", District: "Bengaluru Urban",
    PoliceStation: "Indiranagar PS", CaseCategory: "FIR",
    CrimeMajorHead: "Crimes Against Property", CrimeMinorHead: "Burglary",
    CaseStatus: "Under Investigation", GravityOffence: "Non-Heinous",
    IncidentFromDate: "2026-05-31", latitude: 12.9719, longitude: 77.6412,
    BriefFacts: "Break-in reported at commercial shop, cash and electronics missing.",
    Accused: [],
    Victim: [{ VictimName: "Anita Traders (Shop)", AgeYear: null, GenderID: null }]
  },
  {
    CaseMasterID: 4, CrimeNo: "104430012202600004", CaseNo: "202600004",
    CrimeRegisteredDate: "2026-06-15", District: "Dakshina Kannada",
    PoliceStation: "Mangaluru North PS", CaseCategory: "FIR",
    CrimeMajorHead: "Crimes Against Property", CrimeMinorHead: "Theft",
    CaseStatus: "Closed", GravityOffence: "Non-Heinous",
    IncidentFromDate: "2026-06-14", latitude: 12.9141, longitude: 74.8560,
    BriefFacts: "Mobile phone snatched near bus stand, recovered later.",
    Accused: [{ AccusedName: "Faisal A", AgeYear: 22, GenderID: "M" }],
    Victim: [{ VictimName: "Priya N", AgeYear: 29, GenderID: "F" }]
  },
  {
    CaseMasterID: 5, CrimeNo: "104430006202600005", CaseNo: "202600005",
    CrimeRegisteredDate: "2026-06-20", District: "Bengaluru Urban",
    PoliceStation: "Whitefield PS", CaseCategory: "FIR",
    CrimeMajorHead: "Crimes Against Property", CrimeMinorHead: "Theft",
    CaseStatus: "Under Investigation", GravityOffence: "Non-Heinous",
    IncidentFromDate: "2026-06-19", latitude: 12.9698, longitude: 77.7500,
    BriefFacts: "Laptop stolen from parked car.",
    Accused: [{ AccusedName: "Suresh K", AgeYear: 27, GenderID: "M" }],
    Victim: [{ VictimName: "Kavya M", AgeYear: 31, GenderID: "F" }]
  }
];

module.exports = { firData };
