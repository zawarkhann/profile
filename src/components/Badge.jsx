const Badge = ({ text, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    primary:
      "bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {text}
    </span>
  );
};

export default Badge;
