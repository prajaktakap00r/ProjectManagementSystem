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
        <h2 className="text-xl text-bold mt-4 text-white my-4 uppercase">
          INVALID INPUT
        </h2>
        <hr className="border-blue-500"></hr>
        <p className="mb-4 text-white italic">
          Oops...Looks like you forgot to enter a value.
        </p>
        <p className="mb-4 text-white italic">
          Please make sure you provide a valid value for each input field.
        </p>
        <hr className="border-blue-500"></hr>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-white"
          onChange={handleTask}
          value={enteredTask}
        />
        <button
          className="text-white text-bold rounded-md bg-yellow-500 m-2 p-1"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
