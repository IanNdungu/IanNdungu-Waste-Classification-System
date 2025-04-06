export type UserRole = 'admin' | 'operator';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  assignedBelt?: string | null;
  lastLogin?: Date;
  status: 'active' | 'inactive';
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'error' | 'warning' | 'info' | 'success';
  source: string;
  read: boolean;
}

export interface SortingResult {
  id: string;
  timestamp: Date;
  itemType: 'plastic' | 'non-plastic';
  confidence: number;
  imageUrl?: string;
}

export interface SortingStats {
  totalItems: number;
  plasticItems: number;
  nonPlasticItems: number;
  accuracy: number;
  trend?: number;
}

export interface SystemSettings {
  beltSpeed: number;
  cameraQuality: '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';
  cameraZoom: number;
}
