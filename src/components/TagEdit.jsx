import { useState, useEffect } from "react";
import IconComponent from "./IconComponent";
import SmallOrangeButton from "./SmallOrangeButton";
import ColorPicker from "./ColorPicker.jsx";

export default function TagEdit({ tagId, onClose }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#858585");
  const [tagName, setTagName] = useState("");
  const [pickerPos, setPickerPos] = useState({ top: 0, left: "110%" });

  
  useEffect(() => {
    const fetchTagData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) throw new Error("User not logged in");

        const res = await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`);
        const userData = await res.json();

        const currentTag = (userData.tags || []).find(tag => tag.tagId === tagId);
        if (currentTag) {
          setTagName(currentTag.tagName);
          setSelectedColor(currentTag.tagColor || "#858585");
        }
      } catch (err) {
        console.error("Load tag error:", err);
      }
    };

    fetchTagData();
  }, [tagId]);

  const handleOpenColorPicker = () => {
  if (tagRef.current) {
    const rect = tagRef.current.getBoundingClientRect();
    setPickerPos({
      top: rect.top + window.scrollY, 
      left: rect.right + 8,
    });
  }
  setShowColorPicker(true);
};

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const handleClear = () => {
    setTagName("");        
    setSelectedColor("#858585"); 
  };

  const handleClose = () => {
    onClose?.();
  };

    const handleDelete = async () => {
    if (!tagId) return;

    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) throw new Error("User not logged in");

        const res = await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`);
        const userData = await res.json();

        
        const updatedTags = (userData.tags || []).filter(tag => tag.tagId !== tagId);

        await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, tags: updatedTags }),
        });

        alert("Tag deleted successfully!");
        onClose?.(); 
    } catch (err) {
        console.error("Delete tag error:", err);
    }
    };

  const handleSave = async () => {
    if (!tagName) {
      alert("Please enter a tag name");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) throw new Error("User not logged in");

      const res = await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`);
      const userData = await res.json();

      
      const updatedTags = (userData.tags || []).map(tag =>
        tag.tagId === tagId ? { ...tag, tagName, tagColor: selectedColor } : tag
      );

      await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, tags: updatedTags }),
      });

      alert("Tag updated successfully!");
      onClose?.();
    } catch (err) {
      console.error("Update tag error:", err);
    }
  };

  return (
    <div className="tag-edit flex-row" style={{ position: "relative" }}>
      <div className="content">
        <div
          className="tag-color-picker flex-row align-vertical-center"
          style={{ cursor: "pointer" }}
          onClick={() => setShowColorPicker(true)}
        >
          <div
            className="color-value"
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.4rem",
              backgroundColor: selectedColor,
            }}
          />
          <IconComponent
            name="caret"
            type="light"
            size={2.4}
            className="rotate-90"
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          style={{
            width: "85%",
            height: "4rem",
            filter: "drop-shadow(1px 1px 4px rgba(119,119,119,0.25))",
            marginLeft: "1rem",
          }}
        />
      </div>

      <div className="new-tag-action flex-row" style={{ gap: "1rem", marginLeft: "1rem" }}>
        <IconComponent
          name="trash"
          type="light"
          size={2.4}
          className="cursor-pointer"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        />
        <IconComponent
          name="plus"
          type="light"
          size={2.4}
          className="cursor-pointer"
          onClick={handleSave}
        />
      </div>

      {showColorPicker && (
              <div
                  style={{
                  position: "absolute",
                  top: pickerPos.top,
                  left: pickerPos.left,
                  zIndex: 10,
                  backgroundColor: "#fff",
                  padding: "1rem",
                  borderRadius: "0.8rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
              >
                  <ColorPicker
                  onClose={() => setShowColorPicker(false)}
                  onSelectColor={handleColorSelect}
                  />
              </div>
        )}
    </div>
  );
}