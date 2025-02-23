import { useState, useRef, useEffect } from "react";

const DraggableBox = ({ tasks }) => {
  const [positions, setPositions] = useState({}); 
  const [dragging, setDragging] = useState(null);
  const boxRefs = useRef({}); 

  const handleMouseDown = (event, index) => {
    event.preventDefault();
    setDragging(index); 
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragging === null) return; // 

      setPositions((prev) => ({
        ...prev,
        [dragging]: {
          x: event.clientX - (boxRefs.current[dragging]?.offsetWidth || 100) / 2,
          y: event.clientY - (boxRefs.current[dragging]?.offsetHeight || 100) / 2,
        },
      }));
    };

    const handleMouseUp = () => {
      setDragging(null); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {tasks.map((item, index) => (
        <div
          key={index}
          ref={(el) => (boxRefs.current[index] = el)}
          onMouseDown={(e) => handleMouseDown(e, index)}
          style={{
            position: "absolute",
            left: positions[index]?.x || 0, 
            top: positions[index]?.y || 0,
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
          {item}
        </div>
      ))}
    </>
  );
};

export default DraggableBox;
