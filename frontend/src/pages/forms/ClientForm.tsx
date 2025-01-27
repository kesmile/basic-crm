import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient, fetchClientById, updateClient } from "../../features/clients/clientSlice";
import { RootState, store } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Client } from "../../types";

const ClientForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { clients, status, error, selectedClient } = useSelector(
    (state: RootState) => state.clients
  );
  const existingClient = id
    ? clients.find((c: Client) => c.id === parseInt(id))
    : null;

  const [name, setName] = useState(existingClient?.name || "");
  const [email, setEmail] = useState(existingClient?.email || "");
  const [phone, setPhone] = useState(existingClient?.phone || "");
  const [address, setAddress] = useState(existingClient?.address || "");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchClientById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient?.name || '');
      setEmail(selectedClient?.email || '');
      setPhone(selectedClient?.phone || '');
      setAddress(selectedClient?.address || '');
    }
  }, [selectedClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !phone || !address) {
      setFormError("All fields are required.");
      return;
    }

    const clientData: Client = {
      id: parseInt(id || "0"),
      name,
      email,
      phone,
      address,
    };

    try {
      if (id) {
        await dispatch(updateClient(clientData)).unwrap();
      } else {
        await dispatch(createClient(clientData)).unwrap();
      }
      localStorage.removeItem('clients');
      localStorage.removeItem('clientsPage');
      localStorage.removeItem('clientsNameFilter');
      navigate("/clients");
    } catch {
      setFormError("An error occurred while saving the client.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Client" : "Add Client"}
      </Typography>

      {formError && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {formError}
        </Alert>
      )}
      {error && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "20px" }}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <CircularProgress size={24} />
          ) : id ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default ClientForm;
