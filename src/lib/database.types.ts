export type ModuleStatus = 'not_started' | 'in_progress' | 'completed';

export interface Profile {
  id: string;
  full_name: string | null;
  role: string | null;
  company: string | null;
  primary_goal: string | null;
  total_time_seconds: number;
  certificate_issued_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ModuleProgressRow {
  user_id: string;
  module_id: string;
  status: ModuleStatus;
  started_at: string | null;
  completed_at: string | null;
  time_seconds: number;
  updated_at: string;
}

export interface ChecklistItemRow {
  user_id: string;
  item_id: string;
  checked: boolean;
  updated_at: string;
}

export interface BuildArtifactRow {
  id: string;
  user_id: string;
  goal_id: string;
  title: string;
  notes: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      module_progress: {
        Row: ModuleProgressRow;
        Insert: Partial<ModuleProgressRow> & { user_id: string; module_id: string };
        Update: Partial<ModuleProgressRow>;
      };
      checklist_items: {
        Row: ChecklistItemRow;
        Insert: Partial<ChecklistItemRow> & { user_id: string; item_id: string };
        Update: Partial<ChecklistItemRow>;
      };
      build_artifacts: {
        Row: BuildArtifactRow;
        Insert: Omit<BuildArtifactRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<BuildArtifactRow>;
      };
    };
  };
}
