import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  getContactsForMeeting,
  addContactToMeeting,
  removeContactFromMeeting,
} from "../features/meetingContacts/meetingContactsSlice";
import { RootState, store } from "../store/store";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from "@mui/material";

const MeetingContacts = ({ meeting_id }: { meeting_id: number }) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { meetingContacts, contacts } = useSelector(
    (state: RootState) => state.meetingContacts
  );

  const [selectedContact, setSelectedContact] = useState("");

  useEffect(() => {
    dispatch(getContactsForMeeting(meeting_id));
    dispatch(fetchContacts());
  }, [dispatch, meeting_id]);

  const handleAddContact = async () => {
    if (!selectedContact) {
        alert('Please select a contact');
        return;
      }
    
      try {
        // Add the contact to the meeting
        await dispatch(addContactToMeeting({ meeting_id, contact_id: parseInt(selectedContact) })).unwrap();
        // Refresh the contacts for the meeting
        dispatch(getContactsForMeeting(meeting_id));
        setSelectedContact(''); // Reset the dropdown selection
      } catch (error) {
        console.error('Failed to add contact to meeting:', error);
      }
  };

  const handleRemoveContact = (contact_id: number) => {
    dispatch(removeContactFromMeeting({ meeting_id, contact_id }));
  };

  if (!meetingContacts[meeting_id]) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contacts for Meeting {meeting_id}
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="contact-select-label">Select Contact</InputLabel>
        <Select
          labelId="contact-select-label"
          value={selectedContact}
          onChange={(e) => setSelectedContact(e.target.value as string)}
        >
          {contacts.map((contact) => (
            <MenuItem key={contact.id} value={contact.id}>
              {contact.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddContact}
          style={{ marginTop: "10px" }}
        >
          Add Contact
        </Button>
      </FormControl>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contact ID</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingContacts[meeting_id]?.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveContact(contact.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MeetingContacts;
