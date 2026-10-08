// GDG Recruitment Available Positions
export const AVAILABLE_POSITIONS = [
  "Technical Team",
  "Finance Team", 
  "Open-Source Team",
  "Documentation Team",
  "Media Team",
  "Event Management Team",
  "UI/UX Team",
  "Outreach Team",
  "Design Team",
] as const;

export type Position = typeof AVAILABLE_POSITIONS[number];

// Academic Years
export const ACADEMIC_YEARS = [
  { value: "1st", label: "1st Year" },
  { value: "2nd", label: "2nd Year" },
  { value: "3rd", label: "3rd Year" },
  { value: "4th", label: "4th Year" },
] as const;

// Universities
export const UNIVERSITIES = [
  { value: "VIT", label: "VIT" },
  { value: "VSIT", label: "VSIT" },
  { value: "VIIE", label: "VIIE" },
] as const;