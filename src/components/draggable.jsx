import { useState, useRef, useEffect } from "react";

const DraggableBox = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const boxRef = useRef(null);


  const handleMouseDown = () => {
    setDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragging) return;

      setPosition({
        x: event.clientX - boxRef.current.offsetWidth / 2,
        y: event.clientY - boxRef.current.offsetHeight / 2,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
      }}
    >
      drag me
    </div>
  );
};

export default DraggableBox;
