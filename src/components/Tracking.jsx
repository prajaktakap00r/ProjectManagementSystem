import NewTask from "./NewTask";

export default function Tracking({ tasks, onAdd, onDelete }) {
  return (
    <section className=" m-5 p-3 border-2 border-orange-500 rounded-md bg-pink-700">
      <h2 className="text-2xl font-bold text-orange-300 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />

      {tasks.length === 0 && (
        <p className="text-stone-400 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100 ">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between ">
              <span>{task.text}</span>

              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
