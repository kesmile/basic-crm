import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchClients } from '../features/clients/clientSlice';
import { fetchProjects } from '../features/projects/projectSlice';
import { fetchMeetings } from '../features/meetings/meetingSlice';
import { fetchContacts } from '../features/contacts/contactSlice';
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();

  const { clients, status: clientStatus } = useSelector((state: RootState) => state.clients);
  const { projects, status: projectStatus } = useSelector((state: RootState) => state.projects);
  const { meetings, status: meetingStatus } = useSelector((state: RootState) => state.meetings);
  const { contacts, status: contactStatus } = useSelector((state: RootState) => state.contacts);

  useEffect(() => {
    dispatch(fetchClients({}));
    dispatch(fetchProjects({}));
    dispatch(fetchMeetings({}));
    dispatch(fetchContacts({}));
  }, [dispatch]);

  const loading =
    clientStatus === 'loading' ||
    projectStatus === 'loading' ||
    meetingStatus === 'loading' ||
    contactStatus === 'loading';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Clients */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Clients</Typography>
            <Typography variant="h4">{clients.length}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/clients"
              style={{ marginTop: '10px' }}
            >
              View <br /> Clients
            </Button>
          </Paper>
        </Grid>

        {/* Projects */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Projects</Typography>
            <Typography variant="h4">{projects.length}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/projects"
              style={{ marginTop: '10px' }}
            >
              View Projects
            </Button>
          </Paper>
        </Grid>

        {/* Meetings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Meetings</Typography>
            <Typography variant="h4">{meetings.length}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/meetings"
              style={{ marginTop: '10px' }}
            >
              View Meetings
            </Button>
          </Paper>
        </Grid>

        {/* Contacts */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Contacts</Typography>
            <Typography variant="h4">{contacts.length}</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/contacts"
              style={{ marginTop: '10px' }}
            >
              View Contacts
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;