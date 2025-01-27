import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, fetchClients, setNameFilter } from '../features/clients/clientSlice';
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

const Clients = () => {
  const dispatch: AppDispatch = useDispatch();
  const { clients, status, total, nameFilter } = useSelector((state: RootState) => state.clients);
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  useEffect(() => {
    const cachedClients = localStorage.getItem('clients');
    const cachedPage = localStorage.getItem('clientsPage');
    const cachedNameFilter = localStorage.getItem('clientsNameFilter');
    // basic cache implementation
    if (cachedClients && cachedPage) {
      dispatch(fetchClients({
        page: Number(cachedPage),
        limit,
        name: cachedNameFilter || '',
      }));
      console.log('Fetching clients from cache');
    } else {
      dispatch(fetchClients({ page, limit, name: nameFilter }));
      console.log('Fetching clients from API');
    }
  }, [dispatch, nameFilter, page]);

  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('clients', JSON.stringify(clients));
      localStorage.setItem('clientsPage', String(page));
      if (nameFilter){
        localStorage.setItem('clientsNameFilter', nameFilter);
      }
    }
  }, [clients, page, nameFilter]);

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
      await dispatch(deleteClient(selectedClientId));
      setOpen(false);
      setSelectedClientId(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Button variant="contained" color="primary" href="/clients/new">
          Add Client
        </Button>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          placeholder="Enter client name"
        />
      </Box>

      {clients.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          No clients found. Add a new client to get started.
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={`/clients/edit/${client.id}`}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(client.id)}
                  >
                    Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={Math.ceil(total / limit)} // Total pages
              page={page} // Current page
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
          {/* Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client? This action cannot be undone.
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

export default Clients;