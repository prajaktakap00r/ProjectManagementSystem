import "./Styles.css";
import Button from "./Button";

export default function SideBar({
  onStartAdd,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <div
      className="bg-cover bg-center min-h-screen rounded-md"
      style={{
        backgroundImage: `url('https://w0.peakpx.com/wallpaper/831/267/HD-wallpaper-black-blue-abstract-dark-note-waves-background.jpg')`,
      }}
    >
      <aside className="w-full md:w-72 px-4 py-8 md:px-8 md:py-16 rounded-r-xl  border-r-2 border-blue-400 h-[43.3rem] bg-transparent overflow-y-auto scrollbar-hide">
        <h1 className="mb-8 font-bold uppercase text-center text-xl md:text-xl text-white">
          PRO PROJECT
        </h1>
        <div className="flex justify-center mb-4">
          <Button onClick={onStartAdd}>+ Add Project</Button>
        </div>
        <ul className="mt-6">
          {projects.map((project) => {
            let cssClass = "w-full text-left px-2 py-1 rounded-md my-2 ";
            if (project.id === selectedProjectId) {
              cssClass +=
                "uppercase bg-yellow-300 text-black  hover:bg-white transform hover:scale-105 transition-transform duration-500 ease-in-out ";
            } else {
              cssClass += "text-blue-500 bg-white uppercase";
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
