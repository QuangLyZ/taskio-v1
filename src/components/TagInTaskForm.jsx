import IconComponent from "./IconComponent";
import TagOption from "./TagOption.jsx"; 

export default function TagInTaskForm({
  userTags = [],
  selectedTagId,
  onSelectTag,
  isActive,
  onClick,
}) {
  const defaultTags = [
    { tagId: "t01", tagName: "Work", tagColor: "#FF7F17" },
    { tagId: "t02", tagName: "Personal", tagColor: "#17D4FF" },
  ];

  const filteredUserTags = userTags.filter(
    userTag => !defaultTags.some(defTag => defTag.tagId === userTag.tagId)
  );

  const allTags = [...defaultTags, ...filteredUserTags];

  const currentTag = allTags.find(tag => tag.tagId === selectedTagId) || defaultTags[1];

  return (
    <section className="tag-options">
      <div
        className={`tag-item flex-row space-between ${isActive ? "active" : ""}`}
        onClick={onClick} // sẽ bật dropdown
        style={{
          padding: "0.5rem",
          borderRadius: "0.8rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#FFF",
          filter: "drop-shadow(1px 1px 4px rgba(119,119,119,0.25))",
          cursor: "pointer",
        }}
      >
        <div className="left flex-row" style={{ alignItems: "center", gap: "0.8rem" }}>
          <div className="tag-color" style={{ 
            backgroundColor: currentTag.tagColor,
            width: "2.4rem",
            height: "2.4rem",
            borderRadius: "0.4rem"
          }} />
          <p className="tag-name txt-secondary body-sm">{currentTag.tagName}</p>
        </div>
        <IconComponent name="caret" type="light" size={2.4} className="rotate-90" />
      </div>
      <TagOption 
        tags={allTags}
        selectedTagId={selectedTagId}
        onSelectTag={onSelectTag}
      />
    </section>
  );
}