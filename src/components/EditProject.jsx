import { useState } from "react";

export default function EditProject({ project, onEdit, onCancel }) {
  const [enteredTitle, setEnteredTitle] = useState(project.title);
  const [enteredDescription, setEnteredDescription] = useState(
    project.description
  );
  const [enteredDueDate, setEnteredDueDate] = useState(project.dueDate);

  function handleSubmit(event) {
    event.preventDefault();
    onEdit({
      ...project,
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={enteredTitle}
          onChange={(event) => setEnteredTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={enteredDescription}
          onChange={(event) => setEnteredDescription(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={enteredDueDate}
          onChange={(event) => setEnteredDueDate(event.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
