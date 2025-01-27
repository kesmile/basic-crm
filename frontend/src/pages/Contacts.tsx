import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
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
} from '@mui/material';
import { deleteContact, fetchContacts, setNameFilter } from '../features/contacts/contactSlice';

const Contacts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { contacts, status, total, nameFilter } = useSelector((state: RootState) => state.contacts);
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(fetchContacts({ page, limit, name: nameFilter }));
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
    setSelectedClientId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClientId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedClientId !== null) {
      await dispatch(deleteContact(selectedClientId));
      setOpen(false);
      setSelectedClientId(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Button variant="contained" color="primary" href="/contacts/new">
          Add Contact
        </Button>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          placeholder="Enter contact name"
        />
      </Box>

      {contacts.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          No Contacts found. Add a new contact to get started.
        </Typography>
      ) : (
        <>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.id}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={`/contacts/edit/${contact.id}`}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(contact.id)}
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
            Are you sure you want to delete this contact? This action cannot be undone.
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

export default Contacts;