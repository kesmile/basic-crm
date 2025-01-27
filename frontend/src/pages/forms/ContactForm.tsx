import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {  Contact } from "../../types";
import { createContact, fetchContactById, updateContact } from "../../features/contacts/contactSlice";

const ContactForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { contacts, status, error, selectedContact } = useSelector(
    (state: RootState) => state.contacts
  );
  const existingClient = id
    ? contacts.find((c: Contact) => c.id === parseInt(id))
    : null;

  const [name, setName] = useState(existingClient?.name || "");
  const [email, setEmail] = useState(existingClient?.email || "");
  const [phone, setPhone] = useState(existingClient?.phone || "");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchContactById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact?.name || '');
      setEmail(selectedContact?.email || '');
      setPhone(selectedContact?.phone || '');
    }
  }, [selectedContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !phone) {
      setFormError("All fields are required.");
      return;
    }

    const contactData: Contact = {
      id: parseInt(id || "0"),
      name,
      email,
      phone,
    };

    try {
      if (id) {
        await dispatch(updateContact(contactData)).unwrap();
      } else {
        await dispatch(createContact(contactData)).unwrap();
      }
      navigate("/contacts");
    } catch {
      setFormError("An error occurred while saving the client.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Contact" : "Add Contact"}
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

export default ContactForm;
