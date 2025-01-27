import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Client, Project } from "../../types";
import { getAuthToken } from "../../utils";
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
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

    const params: Record<string, unknown> = {};
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    if (name !== undefined) params.name = name;

    const response = await axios.get(`${apiUrl}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  }
);;

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: unknown) => {
    const token = getAuthToken();
    const response = await axios.post(`${apiUrl}/projects`, project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project: { id: number; [key: string]: unknown }) => {
    const { id } = project;
    const token = getAuthToken();
    const response = await axios.put(`${apiUrl}/projects/${id}`, project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: number) => {
    const token = getAuthToken();
    await axios.delete(`${apiUrl}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: number) => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchClients = createAsyncThunk('projects/fetchClients', async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    clients: [] as Client[],
    projects: [] as Project[],
    status: "idle",
    total: 0,
    nameFilter: "",
    selectedProject: null as Project | null,
    error: null as string | null,
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload.projects;
        state.total = action.payload.total;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch project';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload.clients;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create project';
      })
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex((p: Project) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update project';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  },
});
export const { setNameFilter } = projectSlice.actions;
export default projectSlice.reducer;
