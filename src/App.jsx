import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import SideBar from "./components/SideBar";
import { v4 as uuidv4 } from "uuid";
import SelectedProject from "./components/SelectedProject";
import EditProject from "./components/EditProject";
import "./App.css"; // Ensure this imports your CSS

const getLocalItems = () => {
  let list = localStorage.getItem("project");
  if (list) {
    return JSON.parse(list);
  } else {
    return {
      selectedProjectId: undefined,
      projects: [],
    };
  }
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(getLocalItems);

  const removeAll = () => {
    setSelectedProject({
      selectedProjectId: undefined,
      projects: [],
    });
  };

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(selectedProject));
  }, [selectedProject]);

  const [isEditing, setIsEditing] = useState(false);

  function handleAddTask(text) {
    setSelectedProject((prev) => {
      const taskId = uuidv4();
      const newTask = { text, id: taskId };
      return {
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === prev.selectedProjectId
            ? { ...project, tasks: [...project.tasks, newTask] }
            : project
        ),
      };
    });
  }

  function handleDeleteTask(taskId) {
    setSelectedProject((prev) => {
      return {
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === prev.selectedProjectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== taskId),
              }
            : project
        ),
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
      return { ...prev, selectedProjectId: id };
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
      tasks: [],
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
        tasks={selectProject.tasks}
        onEdit={() => setIsEditing(true)}
        onCancel={handleCancelProject}
      />
    );
  }

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center h-full backdrop-blur-sm"
        style={{
          backgroundImage: `url('https://wallpaper.dog/large/10969106.jpg')`,
          filter: "blur(10px)",
          WebkitFilter: "blur(10px)",
        }}
      ></div>
      <main className="relative z-10 flex h-full gap-8">
        <SideBar
          onStartAdd={handleStartAddProject}
          projects={selectedProject.projects}
          onSelectProject={handleSelectedProject}
          selectedProjectId={selectedProject.selectedProjectId}
        />
        {content}
      </main>
    </div>
  );
}
