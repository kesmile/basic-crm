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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Meeting, Project } from "../../types";
import { createMeeting, fetchMeetingById, fetchProjects, updateMeeting } from "../../features/meetings/meetingSlice";

const MeetingForm = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { projects, meetings, status, error, selectedMeeting } = useSelector(
    (state: RootState) => state.meetings
  );
  const existingMeeting= id
    ? meetings.find((m: Meeting) => m.id === parseInt(id))
    : null;
  const [title, setTitle] = useState(existingMeeting?.title || "");
  const [date, setDate] = useState(existingMeeting?.date || "");
  const [time, setTime] = useState(existingMeeting?.time || "");
  const [notes, setNotes] = useState(existingMeeting?.notes || "");
  const [formError, setFormError] = useState("");
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMeetingById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedMeeting) {
      setTitle(selectedMeeting?.title || "");
      setDate(selectedMeeting?.date || "");
      setTime(selectedMeeting?.time || "");
      setNotes(selectedMeeting?.notes || "");
      setProjectId(selectedMeeting?.project_id?.toString() || "");
    }
  }, [selectedMeeting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title || !date || !time || !notes || !projectId) {
      setFormError("All fields are required.");
      return;
    }

    const meetingData: Meeting = {
      id: parseInt(id || "0"),
      title,
      date,
      time,
      notes,
      project_id: Number(projectId),
    };

    try {
      if (id) {
        await dispatch(updateMeeting(meetingData)).unwrap();
      } else {
        await dispatch(createMeeting(meetingData)).unwrap();
      }
      navigate("/meetings");
    } catch {
      setFormError("An error occurred while saving the meeting.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Meeting" : "Add Meeting"}
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
        <FormControl fullWidth margin="normal">
          {/* <InputLabel id="client-select-label">Project</InputLabel>
          <Select
            labelId="client-select-label"
            value={clientId}
            onChange={(e) => setClientId(e.target.value as string)}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select> */}
          <InputLabel id="project-select-label">Project</InputLabel>
          <Select
            labelId="project-select-label"
            value={projectId}
            onChange={(e) => {setProjectId(e.target.value as string)}}
          >
            {projects.map((project: Project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          margin="normal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Time"
          fullWidth
          margin="normal"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          label="Notes"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={statusVal}
            onChange={(e) => setStatusVal(e.target.value)}
          >
            {statusList.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}

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

export default MeetingForm;
