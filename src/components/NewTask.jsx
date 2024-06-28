import { useState, useRef } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const modalRef = useRef();

  function handleTask(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      modalRef.current.open();
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl text-bold mt-4 text-pink-500 my-4">
          INVALID INPUT
        </h2>
        <p className="mb-4 text-pink-100 italic">
          Oops...Looks like you forgot to enter a value.
        </p>
        <p className="mb-4 text-pink-100 italic">
          Please make sure you provide a valid value for each input field.
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-pink-100"
          onChange={handleTask}
          value={enteredTask}
        />
        <button
          className="text-orange-400 hover:text-pink-500"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
