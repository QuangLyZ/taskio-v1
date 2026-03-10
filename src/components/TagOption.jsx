import IconComponent from "./IconComponent";

export default function TagOption({ tags = [], selectedTagId, onSelectTag }) {
  return (
    <div
      className="tag-option-dropdown"
      style={{
        position: "absolute",
        top: "100%", // ngay dưới tag hiện tại
        left: 0,
        backgroundColor: "#fff",
        borderRadius: "0.8rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "0.5rem 0",
        zIndex: 10,
        width: "100%",
      }}
    >
      {tags.map((tag) => (
        <div
          key={tag.tagId}
          className={`tag-item flex-row align-vertical-center ${selectedTagId === tag.tagId ? "active" : ""}`}
          style={{
            padding: "0.5rem 1rem",
            gap: "0.8rem",
            cursor: "pointer",
            backgroundColor: selectedTagId === tag.tagId ? "#F0F0F0" : "#FFF",
          }}
          onClick={() => onSelectTag(tag.tagId)}
        >
          <div
            className="tag-color"
            style={{
              width: "2.4rem",
              height: "2.4rem",
              borderRadius: "0.4rem",
              backgroundColor: tag.tagColor,
            }}
          />
          <p className="tag-name txt-secondary body-sm">{tag.tagName}</p>
        </div>
      ))}
    </div>
  );
}