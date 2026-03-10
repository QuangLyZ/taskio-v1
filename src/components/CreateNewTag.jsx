import { useState } from "react";
import IconComponent from "./IconComponent";
import SmallOrangeButton from "./SmallOrangeButton";
import SmallWhiteButton from "./SmallWhiteButton";
import ColorPicker from "./ColorPicker.jsx";

export default function CreateNewTag({ tagId, onClose }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#858585");
  const [tagName, setTagName] = useState("");
  const [pickerPos, setPickerPos] = useState({ top: 0, left: "110%" });

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

  const handleCreateTag = async () => {
    if (!tagName) {
        alert("Please enter a tag name");
        return;
    }

    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) throw new Error("User not logged in");

        const res = await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`);
        const userData = await res.json();

        const newTag = {
          tagId: `tag_${Date.now()}`,
          tagName,
          tagColor: selectedColor,
        };

        const updatedTags = [...(userData.tags || []), newTag];

        await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, tags: updatedTags }),
        });

        alert("Tag created successfully!");
        setTagName("");
        setSelectedColor("#858585");
        onClose?.();
    } catch (err) {
        console.error("Create tag error:", err);
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
            handleClear();  
            handleClose();  
          }}
        />
        <IconComponent
          name="plus"
          type="light"
          size={2.4}
          className="cursor-pointer"
          onClick={handleCreateTag}
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