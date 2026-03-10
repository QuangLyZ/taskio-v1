import { useNavigate } from "react-router-dom";
import LogoSm from "./LogoSm";
import SearchBar from "./SearchBar";
import IconComponent from "../components/IconComponent";
import TaskCounter from "../components/TaskCounter";
import { getTaskCounts } from "../utils/taskUtils.jsx";
import TagItem from "./TagItem.jsx";
import TagEdit from "./TagEdit.jsx";
import CreateNewTag from "./CreateNewTag.jsx";
import React, { useState } from "react";

export default function Aside({
  tasks = [],
  userTags = [],
  activeCategory,
  onChangeCategory,
  activeTagId,
  onSetActiveTagId,
  onEditTag,
  searchTerm,
  onSearchChange,
}) {
  const navigate = useNavigate();
  const taskCounts = getTaskCounts(tasks);

  const categories = [
    { key: "upcoming", label: "Upcoming", icon: "angles", iconType: "light" },
    { key: "today", label: "Today", icon: "list", iconType: "light" },
    { key: "overdue", label: "Overdue", icon: "xcalendar", iconType: "dark" },
    { key: "done", label: "Done", icon: "checked", iconType: "light" },
  ];

  const defaultTags = [
    { tagId: "t01", tagName: "Work", tagColor: "#FF7F17" },
    { tagId: "t02", tagName: "Personal", tagColor: "#17D4FF" },
  ];

  const filteredUserTags = userTags.filter(
    userTag => !defaultTags.some(defTag => defTag.tagId === userTag.tagId)
  );

  const allTags = [ ...defaultTags, ...userTags];

  const isActive = (key) => key === activeCategory;

   const [showCreateTag, setShowCreateTag] = useState(false);
   const [editingTagId, setEditingTagId] = useState(null);

  return (
    <div className="aside">
      <div className="aside-main">
        <LogoSm />
        <SearchBar
        value={searchTerm}
        onChange={e => {
          onSearchChange(e);
          if (e.target.value.trim() !== "") {
            onChangeCategory("all");
            onSetActiveTagId("");
          }
        }}
/>

        <section className="aside-tasks">
          <p className="aside-title txt-primary body bold">Tasks</p>

          {categories.map(cat => (
            <div
              key={cat.key}
              className={`aside-tasks-item flex-row align-vertical-center space-between ${isActive(cat.key) ? "active" : ""}`}
              onClick={() => onChangeCategory(cat.key)}
              style={{ cursor: "pointer" }}
            >
              <div className="flex-row align-vertical-center" style={{ gap: "1.6rem" }}>
                <IconComponent name={cat.icon} type={cat.iconType} size={2.4} />
                <p
                  className="txt-secondary body-sm"
                  style={{
                    fontWeight: isActive(cat.key) ? 700 : 400,
                    color: isActive(cat.key) ? "#5D5D5D" : "#777777",
                  }}
                >
                  {cat.label}
                </p>
              </div>
              <TaskCounter count={taskCounts[cat.key]} />
            </div>
          ))}
        </section>

        <section className="aside-tags flex-column">
          <p className="aside-title txt-primary body bold">Tags</p>

        {allTags.map(tag => (
          <div key={tag.tagId} style={{ position: "relative", marginBottom: "0.5rem" }}>
            {editingTagId === tag.tagId ? (
              <TagEdit
                tagId={tag.tagId}
                onClose={() => setEditingTagId(null)}
                onTagUpdated={(updatedTag) => {
                  setUserTags(prev => prev.map(t => t.tagId === updatedTag.tagId ? updatedTag : t));
                }}
              />
            ) : (
              <TagItem
                color={tag.tagColor}
                name={tag.tagName}
                counter={tasks.filter(t => t.tagId === tag.tagId).length}
                isActive={activeTagId === tag.tagId}
                onClick={() => onSetActiveTagId(tag.tagId)}
                onDoubleClick={() => setEditingTagId(tag.tagId)}
              />
            )}
          </div>
        ))}

          {/* Create new tag */}
          <div style={{ marginTop: "1rem" }}>
            {showCreateTag ? (
              <CreateNewTag 
                tagId={null}
                onClose={() => setShowCreateTag(false)}
                onTagCreated={(newTag) => {
                  setUserTags(prev => [...prev, newTag]);
                }}
              />
            ) : (
              <div
                className="tag-item flex-row align-vertical-center"
                style={{ cursor: "pointer" }}
                onClick={() => setShowCreateTag(true)}
              >
                <IconComponent name="plus" type="light" size={2.4}/>
                <p className="tag-name txt-secondary regular body-sm">New tag</p>
              </div>
            )}
</div>
        </section>
      </div>

      <div className="signout flex-row align-vertical-center" style={{ gap: "1.6rem" }}>
        <IconComponent name="export" type="dark" size={3.6} />
        <p
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Helvetica",
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "#5D5D5D",
            cursor: "pointer",
          }}
        >
          Sign out
        </p>
      </div>
    </div>
  );
}