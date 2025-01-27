import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact } from "../../types";
import { getAuthToken } from "../../utils";
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContact",
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
    const response = await axios.get(`${apiUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, limit, name },
    });
    return response.data;
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact: unknown) => {
    const token = getAuthToken();
    const response = await axios.post(`${apiUrl}/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact: { id: number; [key: string]: unknown }) => {
    const { id } = contact;
    const token = getAuthToken();
    const response = await axios.put(`${apiUrl}/contacts/${id}`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: number) => {
    const token = getAuthToken();
    await axios.delete(`${apiUrl}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const fetchContactById = createAsyncThunk(
  'contacts/fetchContactById',
  async (id: number) => {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [] as Contact[],
    status: "idle",
    total: 0,
    nameFilter: "",
    selectedContact: null as Contact | null,
    error: null as string | null,
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload.contacts;
        state.total = action.payload.total;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createContact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContactById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch client';
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create client';
      })
      .addCase(updateContact.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contacts.findIndex((c: Contact) => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update client';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      });
  },
});
export const { setNameFilter } = contactSlice.actions;
export default contactSlice.reducer;
