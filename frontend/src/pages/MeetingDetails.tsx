import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingById } from '../features/meetings/meetingSlice'; // Assume a meetingSlice exists
import { AppDispatch, RootState } from '../store/store';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import MeetingContacts from './MeetingContacts';

const MeetingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { selectedMeeting, status } = useSelector((state: RootState) => state.meetings);

  useEffect(() => {
    if (id) {
      dispatch(fetchMeetingById(Number(id))); // Fetch meeting details
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedMeeting) {
    return (
      <Container>
        <Typography variant="h4">Meeting Not Found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <MeetingContacts meeting_id={Number(id)} />
    </Container>
  );
};

export default MeetingDetails;