import { useState, useEffect } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelect from "./components/NoProjectSelect";
import SideBar from "./components/SideBar";
import { v4 as uuidv4 } from "uuid";
import SelectedProject from "./components/SelectedProject";
import EditProject from "./components/EditProject";
import "./App.css"; // Ensure this imports your CSS

export default function App() {
  const [selectedProject, setSelectedProject] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const [isEditing, setIsEditing] = useState(false);

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
  function handleCancelProject() {
    setSelectedProject((prev) => {
      return { ...prev, selectedProjectId: undefined };
    });
    setIsEditing(false);
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
        onCancel={handleCancelProject}
      />
    );
  }

  return (
    <div
      className="bg-cover bg-center h-200vh"
      /*  style={{
    backgroundImage: `url(${bg})`,
  }} */

      style={{
        backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/41611b21-a7ce-419b-bc77-4644f8105930/ddw9lh3-0e4cc0de-530c-4d4b-a5a7-ad495c8e561c.png/v1/fill/w_1600,h_1200,q_80,strp/black_and_blue_gradient_background_by_therprtnetwork_ddw9lh3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIwMCIsInBhdGgiOiJcL2ZcLzQxNjExYjIxLWE3Y2UtNDE5Yi1iYzc3LTQ2NDRmODEwNTkzMFwvZGR3OWxoMy0wZTRjYzBkZS01MzBjLTRkNGItYTVhNy1hZDQ5NWM4ZTU2MWMucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tykGF1Nh0wTAhKrFEpcAZYrK8odM474o-1LC_WMyxQg')`,
      }}
      //style={{ backgroundColor: "black" }}
    >
      <main className="flex h-screen gap-8 relative">
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
