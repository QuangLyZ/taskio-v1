export default function SmallOrangeButton({
  label,
  onClick,
  width = "18.4rem",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className="bg-orange body bold text-center txt-white"
      type={type}
      disabled={disabled}
      style={{
        width,
        height: "4.5rem",
        padding: "0.8rem 1.6rem",
        borderRadius: "0.8rem",
        filter: "drop-shadow(1px 1px 4px rgba(119, 119, 119, 0.25))",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}