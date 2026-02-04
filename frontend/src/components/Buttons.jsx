// src/components/Button.jsx
export const Button = ({ onClick, children, type = "button", variant = "primary" }) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-600",
    success: "bg-emerald-600 hover:bg-emerald-700",
    secondary: "bg-gray-500 hover:bg-gray-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} text-white font-bold py-2 px-4 rounded shadow-sm active:scale-95 transition-all`}
    >
      {children}
    </button>
  );
};