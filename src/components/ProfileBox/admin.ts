export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  contactNumber: string;
  lastLogin: Date;
  profileImage: string;
  twoFactorEnabled: boolean;
}

export interface Activity {
  id: number;
  date: Date;
  description: string;
  type: "approval" | "moderation" | "settings" | "security";
}
