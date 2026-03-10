import IconComponent from "./IconComponent";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar flex-row align-center justify-center" style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
          };
        }}
        placeholder="Search..."
        className="bg-white txt-secondary body-sm regular text-left"
        style={{
          height: "4rem",
          width: "100%",
          padding: "0.8rem 4rem 0.8rem 1.6rem",
          borderRadius: "0.8rem",
          border: "none",
          backgroundColor: "#fff",
          fontSize: "2rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "0.8rem",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <IconComponent name="search" type="light" size={3.2} />
      </div>
    </div>
  );
}