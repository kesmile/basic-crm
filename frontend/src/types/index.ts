export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};
export type Project = {
  id: number;
  client_id: number;
  name: string;
  description: string;
  status: string;
  clientname?: string;
  created_at?: string;
  updated_at?: string;
};

export type Meeting = {
  id: number;
  project_id: number;
  project_name?: string;
  title: string;
  date: string;
  time: string;
  notes: string;
  created_at?: string;
  updated_at?: string;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
};

export type MeetingContactsState = {
  meetingContacts: { [key: number]: number[] };
  contactMeetings: { [key: number]: number[] };
  status: string;
  error: string | null;
}
