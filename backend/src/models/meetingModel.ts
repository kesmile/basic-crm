export interface Meeting {
    id: number;
    project_id: number;
    title: string;
    date?: string;
    time?: string;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
  }