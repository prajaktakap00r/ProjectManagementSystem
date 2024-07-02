import { useEffect, useRef, useState } from "react";
import noprojects from "../assets/no-projects.svg";
import Button from "./Button";

export default function NoProjectSelect({ onStartAdd }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mx-auto text-center bg-blue-100/75 rounded-md p-8 w-full max-w-md h-auto my-5 md:my-24 md:h-[20rem]">
      <img src={noprojects} className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl font-bold mt-4 text-black my-4 uppercase">
        No Project Selected
      </h2>
      <p className="mb-4 text-red-600">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAdd}>Create new project</Button>
      </p>
    </div>
  );
}
