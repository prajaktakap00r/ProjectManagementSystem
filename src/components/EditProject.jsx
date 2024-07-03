import { useState, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

export default function EditProject({ project, onEdit, onCancel }) {
  const [enteredTitle, setEnteredTitle] = useState(project.title);
  const [enteredDescription, setEnteredDescription] = useState(
    project.description
  );
  const [enteredDueDate, setEnteredDueDate] = useState(project.dueDate);
  const modal = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onEdit({
      ...project,
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl text-bold mt-4 text-pink-500 my-4">
          INVALID INPUT
        </h2>
        <p className="mb-4 text-pink-100 italic">
          Oops...Looks like you forgot to enter a value
        </p>
        <p className="mb-4 text-pink-100 italic">
          Please make sure you provide a valid value for each input field
        </p>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="w-[35rem] mt-16  overflow-auto scrollbar-hide mx-auto"
      >
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <Button onClick={onCancel}>Cancel</Button>
          </li>
          <li>
            <Button type="submit">Save</Button>
          </li>
        </menu>
        <div>
          <Input
            label="Title"
            value={enteredTitle}
            onChange={(event) => setEnteredTitle(event.target.value)}
          />
          <Input
            label="Description"
            textarea
            value={enteredDescription}
            onChange={(event) => setEnteredDescription(event.target.value)}
          />
          <Input
            type="date"
            label="Due Date"
            value={enteredDueDate}
            onChange={(event) => setEnteredDueDate(event.target.value)}
          />
        </div>
      </form>
    </>
  );
}
