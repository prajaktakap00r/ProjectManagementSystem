import Button from "./Button";

export default function SideBar({
  onStartAdd,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <div
      className="bg-cover bg-center h-200vh"
      /*  style={{
      backgroundImage: `url(${bg})`,
    }} */
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/631/139/HD-wallpaper-up-and-down-slices-art-moon-blue-round-black-yellow-circles.jpg')",
      }}
      //style={{ backgroundColor: "black" }}
    >
      <aside className="w-1/3 px-8 py-16 md:w-72 rounded-r-xl my-4">
        <h1 className="mb-8 font-bold uppercase md:text-xl text-blue-500 text-center">
          SideBar
        </h1>
        <div className="flex justify-center mb-4">
          <Button onClick={onStartAdd}>+ Add Project</Button>
        </div>
        <ul className="mt-6">
          {projects.map((project) => {
            let cssClass = "w-full text-left px-2 py-1 rounded-md my-2 ";
            if (project.id === selectedProjectId) {
              cssClass +=
                "bg-orange-600 text-pink-200 hover:text-pink-600 hover:bg-white";
            } else {
              cssClass += "text-orange-300 bg-black";
            }
            return (
              <li key={project.id}>
                <button
                  className={cssClass}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
