import IconComponent from "./IconComponent";
import SmallOrangeButton from "./SmallOrangeButton";
import SmallWhiteButton from "./SmallWhiteButton";
import { useState } from "react";

export default function ColorPicker({ onClose, onSelectColor }) {
    const [selectedColor, setSelectedColor] = useState(null);

    const colorPalette = [
        { colorId: "c1", color: "#01C7FC"},
        { colorId: "c2", color: "#3A87FD"},
        { colorId: "c3", color: "#5E30EB"},
        { colorId: "c4", color: "#BE38F3"},
        { colorId: "c5", color: "#E63B7A"},
        { colorId: "c6", color: "#FE6250"},
        { colorId: "c7", color: "#FE8648"},
        { colorId: "c8", color: "#FEB43F"},
        { colorId: "c9", color: "#FECB3E"},
        { colorId: "c10", color: "#FFF76B"},
        { colorId: "c11", color: "#E4EF65"},
        { colorId: "c12", color: "#96D35F"},
        { colorId: "c13", color: "#FFFFFF"},
        { colorId: "c14", color: "#858585"},
        { colorId: "c15", color: "#000000"},
    ];

    const handleColorClick = (color) => {
        setSelectedColor(color.color);
    };

        const handleSave = () => {
        if (selectedColor) {
            onSelectColor(selectedColor);
            onClose?.();
        }
    };

    return (
        <section className="color-picker" style={{ padding: "1rem" }}>
            <div className="color-picker-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="color-picker-title body txt-primary bold">Colors</p>
                <IconComponent name="XButton" size={2.4} onClick={onClose} className="cursor-pointer"/>
            </div>
            <div className="color-picker-head-underline" style={{ height: "1px", backgroundColor: "#ccc", margin: "0.5rem 0" }}></div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 3rem)",
                gridGap: "0rem",
                margin: "0rem auto",
                border: "0.1rem solid #ccc",
                padding: "0.5rem",
                borderRadius: "0.4rem"

            }}>
                {colorPalette.map((color) => (
                    <div
                        key={color.colorId}
                        style={{
                            width: "3rem",
                            height: "3rem",
                            backgroundColor: color.color,
                            // borderRadius: "0.25rem",
                            cursor: "pointer",
                            border: selectedColor === color.color ? "0.2rem solid #404040ff" : "none",
                            borderRadius: selectedColor === color.color ? "0.2rem" : "0",
                        }}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </div>

            <div className="color-picker-action" style={{ display: "flex", gap: "1rem", margin: "1rem auto 0rem auto" }}>
                {/* <SmallWhiteButton label="Cancel" onClick={onClose} /> */}
                <SmallOrangeButton label="Select" onClick={handleSave} />
            </div>
        </section>
    );
}