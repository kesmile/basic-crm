export interface Project {
  id: number;
  client_id: number;
  name: string;
  description?: string;
  status?: string;
  clientName?: string;
  created_at?: Date;
  updated_at?: Date;
}
