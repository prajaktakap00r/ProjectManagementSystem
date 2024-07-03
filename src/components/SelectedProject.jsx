import Button from "./Button";
import Tracking from "./Tracking";
import "./Styles.css";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
  onEdit,
  onCancel,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16 overflow-auto scrollbar-hide mx-auto">
      <header className="pb-4 mb-4 border-b-2 border-yellow-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">
            {project.title}
          </h1>
          <div className="flex">
            <Button onClick={onDelete}>Delete Project</Button>
            <Button onClick={onEdit}>Edit Project</Button>
            <Button onClick={onCancel}>Save</Button>
          </div>
        </div>
        <p className="mb-4 text-blue-400">{formattedDate}</p>
        <p className="text-pink-100 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tracking onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
