import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { format } from 'date-fns';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Pagination,
  TextField,
  debounce,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material';
import { deleteMeeting, fetchMeetings, setNameFilter } from '../features/meetings/meetingSlice';

const Meetings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { meetings, status, total, nameFilter } = useSelector((state: RootState) => state.meetings);
  const [open, setOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(fetchMeetings({ page, limit, name: nameFilter }));
  }, [dispatch, nameFilter, page]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(event.target.value));
    setPage(1);
  }, 300);

  const handleDeleteClick = (id: number) => {
    setSelectedMeetingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeetingId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedMeetingId !== null) {
      await dispatch(deleteMeeting(selectedMeetingId));
      setOpen(false);
      setSelectedMeetingId(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Meetings
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Button variant="contained" color="primary" href="/meetings/new">
          Add Meeting
        </Button>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          placeholder="Enter project name"
        />
      </Box>

      {meetings.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          No Project found. Add a new client to get started.
        </Typography>
      ) : (
        <>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.id}</TableCell>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{format(new Date(meeting.date), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>{meeting.notes}</TableCell>
                  <TableCell>{meeting.project_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      href={`/meetings/${meeting.id}`}
                      style={{ marginRight: '10px' }}
                    >
                      View Contacts
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={`/meetings/edit/${meeting.id}`}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteClick(meeting.id)}
                    >
                    Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this meeting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </>
      )}
    </Container>
  );
};

export default Meetings;