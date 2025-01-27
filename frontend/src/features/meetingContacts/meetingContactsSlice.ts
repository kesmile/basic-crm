import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils";
import { Contact } from "../../types";
const apiUrl = import.meta.env.VITE_API_URL;
export const addContactToMeeting = createAsyncThunk(
  "meetingContacts/addContactToMeeting",
  async ({
    meeting_id,
    contact_id,
  }: {
    meeting_id: number;
    contact_id: number;
  }) => {
    const token = getAuthToken();
    await axios.post(
      `${apiUrl}/meeting-contacts/add`,
      {
        meeting_id,
        contact_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const removeContactFromMeeting = createAsyncThunk(
  "meetingContacts/removeContactFromMeeting",
  async ({
    meeting_id,
    contact_id,
  }: {
    meeting_id: number;
    contact_id: number;
  }) => {
    const token = getAuthToken();
    await axios.delete(`${apiUrl}/meeting-contacts/remove`, {
      data: { meeting_id, contact_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { meeting_id, contact_id };
  }
);

export const getContactsForMeeting = createAsyncThunk(
  "meetingContacts/getContactsForMeeting",
  async (meeting_id: number) => {
    const token = getAuthToken();
    const response = await axios.get(
      `${apiUrl}/meeting-contacts/meeting/${meeting_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { meeting_id, contacts: response.data };
  }
);

export const getMeetingsForContact = createAsyncThunk(
  "meetingContacts/getMeetingsForContact",
  async (contact_id: number) => {
    const token = getAuthToken();
    const response = await axios.get(
      `${apiUrl}/meeting-contacts/contact/${contact_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { contact_id, meetings: response.data };
  }
);

export const fetchContacts = createAsyncThunk(
  "meetingContacts/fetchContact",
  async () => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }
);

// Slice
interface MeetingContactsState {
  meetingContacts: { [key: number]: Contact[] };
  contactMeetings: { [key: number]: number[] };
  contacts: Contact[];
  status: string;
  error: string | null;
}

const initialState: MeetingContactsState = {
  meetingContacts: {},
  contactMeetings: {},
  contacts: [],
  status: "idle",
  error: null,
};

const meetingContactsSlice = createSlice({
  name: "meetingContacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContactToMeeting.fulfilled, (state) => {
        state.status = 'loading';
      })
      .addCase(removeContactFromMeeting.fulfilled, (state, action) => {
        const { meeting_id, contact_id } = action.payload;
        state.meetingContacts[meeting_id] = state.meetingContacts[
          meeting_id
        ]?.filter((c) => c.id !== contact_id);
      })
      .addCase(getContactsForMeeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetingContacts[action.payload.meeting_id] =
          action.payload.contacts;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.contacts;
      })
      .addCase(getMeetingsForContact.fulfilled, (state, action) => {
        state.contactMeetings[action.payload.contact_id] =
          action.payload.meetings;
      });
  },
});

export default meetingContactsSlice.reducer;


