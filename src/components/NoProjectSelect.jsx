import noprojects from "../assets/no-projects.svg";
import Button from "./Button";
export default function NoProjectSelect({ onStartAdd }) {
  return (
    <div className="mt-24 text-center w-2/3 ">
      <img src={noprojects} className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl text-bold mt-4 text-orange-500 my-4">
        No Project Selected
      </h2>
      <p className="mb-4 text-pink-400">
        Select a project or get started with a new One
      </p>
      <p className="mt-8">
        <Button onClick={onStartAdd}>Create new project</Button>
      </p>
    </div>
  );
}
