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
import { Project } from "../../types";
import {
  fetchProjectById,
  updateProject,
  fetchClients,
  createProject,
} from "../../features/projects/projectSlice";

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const statusList = [{ id: "active", name: "Active" }, { id: "inactive", name: "Inactive" }];
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { projects, clients, status, error, selectedProject } = useSelector(
    (state: RootState) => state.projects
  );
  const existingProject = id
    ? projects.find((p: Project) => p.id === parseInt(id))
    : null;
  const [name, setName] = useState(existingProject?.name || "");
  const [description, setDescription] = useState(
    existingProject?.description || ""
  );
  const [statusVal, setStatusVal] = useState(existingProject?.status || "");
  const [clientId, setClientId] = useState<string>("");
  const [formError, setFormError] = useState("");
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject?.name || "");
      setDescription(selectedProject?.description || "");
      setStatusVal(selectedProject?.status || "");
      setClientId(selectedProject?.client_id?.toString() || "");
    }
  }, [selectedProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !description || !statusVal) {
      setFormError("All fields are required.");
      return;
    }

    const projectData: Project = {
      id: parseInt(id || "0"),
      name,
      description,
      status: statusVal,
      client_id: parseInt(clientId),
    };

    try {
      if (id) {
        await dispatch(updateProject(projectData)).unwrap();
      } else {
        await dispatch(createProject(projectData)).unwrap();
      }
      navigate("/projects");
    } catch {
      setFormError("An error occurred while saving the client.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Project" : "Add Project"}
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
          <InputLabel id="client-select-label">Client</InputLabel>
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
          </Select>
        </FormControl>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
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

export default ProjectForm;
