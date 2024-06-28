import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import SideBar from "./components/SideBar";
import { v4 as uuidv4 } from "uuid";
import SelectedProject from "./components/SelectedProject";
import EditProject from "./components/EditProject"; // Import the new component

export default function App() {
  const [selectedProject, setSelectedProject] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  function handleAddTask(text) {
    setSelectedProject((prev) => {
      const taskId = uuidv4();
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: taskId,
      };
      return {
        ...prev,
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setSelectedProject((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  function handleStartAddProject() {
    setIsEditing(false);
    setSelectedProject((prev) => {
      return { ...prev, selectedProjectId: null };
    });
  }

  function handleCancelProject() {
    setSelectedProject((prev) => {
      return { ...prev, selectedProjectId: undefined };
    });
  }

  function handleSelectedProject(id) {
    setIsEditing(false);
    setSelectedProject((prev) => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setSelectedProject((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(
          (project) => project.id !== prev.selectedProjectId
        ),
      };
    });
  }

  function handleNewProject(projectData) {
    const newProject = {
      ...projectData,
      id: uuidv4(),
    };
    setSelectedProject((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }

  function handleEditProject(projectData) {
    setSelectedProject((prev) => {
      return {
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === projectData.id ? projectData : project
        ),
        selectedProjectId: undefined,
      };
    });
    setIsEditing(false);
  }

  const selectProject = selectedProject.projects.find(
    (project) => project.id === selectedProject.selectedProjectId
  );

  let content;
  if (selectedProject.selectedProjectId === undefined) {
    content = <NoProjectSelect onStartAdd={handleStartAddProject} />;
  } else if (selectedProject.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleNewProject} onCancel={handleCancelProject} />
    );
  } else if (isEditing) {
    content = (
      <EditProject
        project={selectProject}
        onEdit={handleEditProject}
        onCancel={() => setIsEditing(false)}
      />
    );
  } else {
    content = (
      <SelectedProject
        project={selectProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={selectedProject.tasks}
        onEdit={() => setIsEditing(true)}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAdd={handleStartAddProject}
        projects={selectedProject.projects}
        onSelectProject={handleSelectedProject}
        selectedProjectId={selectedProject.selectedProjectId}
      />
      {content}
    </main>
  );
}
