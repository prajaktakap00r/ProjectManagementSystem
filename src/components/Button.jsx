export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 mx-2 text-xs md:text-base rounded-md text-pink-200 bg-orange-600 hover:bg-pink-50 hover:text-orange-600"
      {...props}
    >
      {children}
    </button>
  );
}
