import Button from "./Button";
import Tracking from "./Tracking";

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
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-orange-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-pink-500 mb-2 uppercase">
            {project.title}
          </h1>
          <div className="flex">
            <Button onClick={onDelete}>Delete Project</Button>
            <Button onClick={onEdit}>Edit Project</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </div>
        <p className="mb-4 text-orange-400">{formattedDate}</p>
        <p className=" text-pink-100 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tracking onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
