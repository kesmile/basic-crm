import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Client } from "../../types";
import { getAuthToken } from "../../utils";
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
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

    const response = await axios.get(`${apiUrl}/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (client: unknown) => {
    const token = getAuthToken();
    const response = await axios.post(`${apiUrl}/clients`, client, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (client: { id: number; [key: string]: unknown }) => {
    const { id } = client;
    const token = getAuthToken();
    const response = await axios.put(`${apiUrl}/clients/${id}`, client, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id: number) => {
    const token = getAuthToken();
    await axios.delete(`${apiUrl}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const fetchClientById = createAsyncThunk(
  'clients/fetchClientById',
  async (id: number) => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [] as Client[],
    status: "idle",
    total: 0,
    nameFilter: "",
    selectedClient: null as Client | null,
    error: null as string | null,
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload.clients;
        state.total = action.payload.total;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createClient.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClientById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedClient = action.payload;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create client';
      })
      .addCase(updateClient.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.clients.findIndex((c: Client) => c.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update client';
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c) => c.id !== action.payload);
      });
  },
});
export const { setNameFilter } = clientSlice.actions;
export default clientSlice.reducer;
