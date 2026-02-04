// src/components/Input.jsx
export const Input = ({ label, name, value, onChange, placeholder, type = "text" }) => {
  const commonClasses = "w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all";
  
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={commonClasses}
          rows="3"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={commonClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};