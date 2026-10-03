export type LanguageCode = 'en' | 'hi' | 'bn';

export type UserRole = 'learner' | 'parent' | 'both';

export type AcademicLevel = 
  | 'Class 8 Pass' 
  | 'Class 10 (Secondary)' 
  | 'Class 12 (Arts)' 
  | 'Class 12 (Science)' 
  | 'Class 12 (Commerce)' 
  | 'Class 12 (Vocational)' 
  | 'Diploma/Graduate';

export type RegionType = 'rural' | 'semi-urban' | 'urban';

export interface LocationInfo {
  state: string;
  district: string;
  subDistrictOrBlock?: string;
  type: RegionType;
}

export type ParentConcernCategory = 
  | 'Income & Salary Growth'
  | 'Job Security & Permanence'
  | 'Social Status & Respect'
  | 'Workplace Safety & Health'
  | 'Migration vs Local Work'
  | 'Training Quality & Fraud'
  | 'Course Cost & Hidden Fees'
  | 'Higher Education Pathways'
  | 'Government Job Opportunities'
  | 'Gender & Family Acceptance';

export interface LearnerProfile {
  name: string;
  age: number;
  education: AcademicLevel;
  interests: string[];
  skills: string[];
  preferredLocation: 'home_district' | 'within_state' | 'metro_ready';
  careerGoal: string;
  confidenceScore: number; // 0 - 100
}

export interface ParentProfile {
  relationship: 'Father' | 'Mother' | 'Guardian' | 'Elder Sibling';
  mainExpectations: string[];
  primaryConcerns: ParentConcernCategory[];
  expectedMinIncome: number; // Monthly in INR
  jobSecurityPriority: 'critical' | 'moderate' | 'flexible';
  furtherEducationDesire: boolean;
  confidenceScore: number; // 0 - 100
}

export interface FamilyProfile {
  id: string;
  userRole: UserRole;
  learner: LearnerProfile;
  parent: ParentProfile;
  location: LocationInfo;
  language: LanguageCode;
  createdAt: string;
  alignmentBefore: {
    learnerConfidence: number;
    parentConfidence: number;
  };
  alignmentAfter?: {
    learnerConfidence: number;
    parentConfidence: number;
  };
}

export type TradeCategory = 
  | 'Engineering & Technical'
  | 'Healthcare & Wellness'
  | 'Automotive & EV'
  | 'Construction & Infrastructure'
  | 'IT & Digital Services'
  | 'Renewable Energy & Solar'
  | 'Manufacturing & CNC'
  | 'Retail & Logistics'
  | 'Modern Agriculture & Drones'
  | 'Electronics & Appliances';

export interface TrainingOption {
  type: 'ITI CTS' | 'PMKVY Short-term' | 'Polytechnic Diploma' | 'Apprenticeship NAPS';
  durationMonths: number;
  eligibility: string;
  approxFeeInr: number;
  stipendAvailable: boolean;
  typicalStipendInr?: number;
  certificationBody: string;
  nsqfLevel: number;
}

export interface PathwayStep {
  stepNumber: number;
  title: string;
  qualification: string;
  duration: string;
  roles: string[];
  monthlyEarningRange: [number, number];
  keySkills: string[];
  nextMilestone: string;
  higherEducationBridge?: string;
  governmentExamsEligible?: string[];
}

export interface SourceMetadata {
  id: string;
  agencyName: string;
  portalOrReport: string;
  datasetName: string;
  lastUpdated: string;
  dataPeriod: string;
  methodology: string;
  verificationStatus: 'Verified Government' | 'Verified Industry' | 'Latest Portal Aggregate' | 'Demo Data (Prototype)';
  url?: string;
  geoCoverage: string;
}

export interface Trade {
  id: string;
  name: string;
  nameHindi: string;
  nameBengali: string;
  category: TradeCategory;
  tagline: string;
  description: string;
  nsqfLevel: number;
  trainingOptions: TrainingOption[];
  monthlyStartingSalary: [number, number];
  monthlyMidCareerSalary: [number, number];
  placementRatePercentage: number;
  activeOpeningsCount: number;
  projectedAnnualHiringGrowth: number;
  localAvailabilityRating: 'High' | 'Medium' | 'Emerging';
  requiredSkills: string[];
  pathwaySteps: PathwayStep[];
  parentConcernAnswers: {
    concern: ParentConcernCategory;
    evidenceSummary: string;
    metrics: { label: string; value: string; sourceId: string }[];
  }[];
  sources: SourceMetadata[];
  topEmployers: string[];
  governmentSchemes: string[];
  femaleParticipationTrend: string;
}

export interface EvidenceCardData {
  id: string;
  title: string;
  category: ParentConcernCategory | 'General Market';
  statistic: string;
  comparisonContext?: string;
  keyTakeaways: string[];
  source: SourceMetadata;
  applicableDistricts?: string[];
}

export interface CounsellingMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  speakerLabel?: 'Student' | 'Parent' | 'Both' | 'KaushalSetu AI' | 'System';
  text: string;
  timestamp: string;
  detectedConcern?: ParentConcernCategory;
  evidenceCard?: EvidenceCardData;
  suggestedPrompts?: string[];
  audioScript?: string;
}

export interface Counsellor {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  languages: string[];
  specializations: TradeCategory[];
  rating: number;
  reviewsCount: number;
  location: string;
  avatarUrl: string;
  availableSlots: string[];
  affiliatedCenter: string;
}

export interface CounsellorEscalationBrief {
  learnerName: string;
  education: string;
  interestedTrades: string[];
  parentConcerns: ParentConcernCategory[];
  informationDiscussed: string[];
  unresolvedQuestions: string[];
  urgencyLevel: 'Standard' | 'High' | 'Immediate';
  generatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'joint_family' | 'admin';
  phone?: string;
  email?: string;
  location: string;
  isLoggedIn: boolean;
}

export interface AssessmentQuestion {
  id: string;
  target: 'student' | 'parent';
  categoryTitle: string;
  question: string;
  questionHindi: string;
  subtext: string;
  options: {
    id: string;
    label: string;
    labelHindi: string;
    description?: string;
    iconName?: string;
    recommendedTradeIds?: string[];
  }[];
}

export interface AssessmentMatchResult {
  trade: Trade;
  matchScore: number; // e.g. 96
  matchReason: string;
  parentConsensusScore: number; // e.g. 92
  parentConsensusReason: string;
  startingPayRange: string;
  placementRate: number;
  openingsCount: number;
  careerMilestones: string[];
}

