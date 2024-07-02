export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 mx-2 text-xs md:text-base rounded-md text-white bg-blue-500 hover:text-black hover:bg-yellow-300"
      {...props}
    >
      {children}
    </button>
  );
}
