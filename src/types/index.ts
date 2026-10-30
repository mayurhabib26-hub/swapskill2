export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type SessionStatus =
  | 'requested'
  | 'accepted'
  | 'completed'
  | 'awaiting_confirmation'
  | 'settled'
  | 'declined'
  | 'cancelled';

export type TransactionType = 'starter' | 'held' | 'released' | 'refunded' | 'earned';

export interface SkillOffering {
  id: string;
  skillName: string;
  category: string;
  proficiency: ProficiencyLevel;
  description: string;
  sessionCount: number;
}

export interface SkillDemand {
  id: string;
  skillName: string;
  category: string;
  targetLevel: string;
  goalDescription: string;
}

export interface AvailabilitySlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlots: string[];
  mode: 'Online' | 'On-Campus' | 'Both';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'admin';
  university: string;
  major: string;
  year?: string;
  bio: string;
  rating: number;
  reviewCount: number;
  creditsAvailable: number;
  creditsHeld: number;
  skillsTeaching: SkillOffering[];
  skillsLearning: SkillDemand[];
  languages: string[];
  availability: AvailabilitySlot[];
  portfolioLinks?: { title: string; url: string }[];
  joinedDate: string;
  verifiedStudent?: boolean;
}

export interface Session {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  learnerId: string;
  learnerName: string;
  learnerAvatar: string;
  skillName: string;
  skillCategory: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number; // default 30
  meetingMode: 'Online' | 'On-Campus' | 'Both';
  meetingLocationOrLink?: string;
  status: SessionStatus;
  creditCost: number; // 1
  creditHeld: boolean;
  teacherConfirmed: boolean;
  learnerConfirmed: boolean;
  createdAt: string;
  notes?: string;
  learningGoal?: string;
}

export interface CreditTransaction {
  id: string;
  date: string;
  type: TransactionType;
  sessionId?: string;
  sessionTitle?: string;
  amount: number;
  status: 'completed' | 'pending' | 'escrow';
  description: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantMajor: string;
  participantSkill: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export interface Review {
  id: string;
  sessionId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  recipientId: string;
  rating: number;
  comment: string;
  date: string;
  skillName: string;
}

export interface DisputeReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  sessionId?: string;
  sessionTitle?: string;
  reason: string;
  details: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  date: string;
}
