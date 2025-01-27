import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Meeting, Project } from "../../types";
import { getAuthToken } from "../../utils";

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeeting",
  async ({
    page,
    limit,
    name,
  }: {
    page?: number;
    limit?: number;
    name?: string;
  }) => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, limit, name },
    });
    return response.data;
  }
);

export const createMeeting = createAsyncThunk(
  "meetings/createMeeting",
  async (meeting: unknown) => {
    const token = getAuthToken();
    const response = await axios.post(`${apiUrl}/meetings`, meeting, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateMeeting = createAsyncThunk(
  "meetings/updateMeeting",
  async (meeting: { id: number; [key: string]: unknown }) => {
    const { id } = meeting;
    const token = getAuthToken();
    const response = await axios.put(`${apiUrl}/meetings/${id}`, meeting, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteMeeting = createAsyncThunk(
  "meetings/deleteMeeting",
  async (id: number) => {
    const token = getAuthToken();
    await axios.delete(`${apiUrl}/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const fetchMeetingById = createAsyncThunk(
  'meetings/fetchMeetingById',
  async (id: number) => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const token = getAuthToken();
  const response = await axios.get('${apiUrl}/projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    projects: [] as Project[],
    meetings: [] as Meeting[],
    status: "idle",
    total: 0,
    nameFilter: "",
    selectedMeeting: null as Meeting | null,
    error: null as string | null,
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meetings = action.payload.meetings;
        state.total = action.payload.total;
      })
      .addCase(fetchMeetings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMeetingById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMeetingById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMeeting = action.payload;
      })
      .addCase(fetchMeetingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch project';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetings.push(action.payload);
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create project';
      })
      .addCase(createMeeting.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.meetings.findIndex((m: Meeting) => m.id === action.payload.id);
        if (index !== -1) {
          state.meetings[index] = action.payload;
        }
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update project';
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.meetings = state.meetings.filter((m) => m.id !== action.payload);
      });
  },
});
export const { setNameFilter } = meetingSlice.actions;
export default meetingSlice.reducer;
