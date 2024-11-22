const Emoji = ({ emoji, onClick, selected }) => (
    <span
      onClick={onClick}
      style={{
        fontSize: "35px",
        cursor: "pointer",
        margin: "0 10px",
        transform: selected ? "scale(1.4)" : "scale(1)",
        // boxShadow: selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {emoji}
    </span>
  );

  export default Emoji;