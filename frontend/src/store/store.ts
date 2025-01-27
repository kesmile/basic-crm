import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer from '../features/clients/clientSlice';
import projectReducer from '../features/projects/projectSlice';
import meetingReducer from '../features/meetings/meetingSlice';
import contactReducer from '../features/contacts/contactSlice';
import meetingContactsReducer from '../features/meetingContacts/meetingContactsSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    auth: authReducer,
    clients: clientReducer,
    meetings: meetingReducer,
    contacts: contactReducer,
    meetingContacts: meetingContactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;