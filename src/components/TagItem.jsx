import IconComponent from "./IconComponent";

export default function TagItem({
  color,
  name,
  counter,
  isActive,
  onClick,
  onDoubleClick
}) {
  return (
    <div
      className={`tag-item flex-row space-between ${isActive ? "active" : ""}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="left flex-row">
        <div className="tag-color" style={{ backgroundColor: color }} />
        <p className="tag-name txt-secondary body-sm">{name}</p>
      </div>
      <div className="tag-counter">{counter}</div>
    </div>
  );
}