import { useRef } from "react";
import "../styles/designer.css";

import { fabric } from "fabric";

const Designer = () => {
  const canvasRef = useRef();
  const text = new fabric.Textbox("Enter text here", {
    left: 100,
    top: 100,
    fontSize: 24,
    // fill: textProps.fill,
    // fontFamily: textProps.fontFamily,
    // editable: true, // Make the text editable
  });
  // canvas.add(text);
  // canvas.setActiveObject(text);
  // text.enterEditing();
  // canvas.renderAll();

  const handleAddImage = (e) => {
    const canvas = new fabric.Canvas(canvasRef.current);
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);
    reader.onload = (e) => {
      let imgUrl = e.target.result;
      let imgElement = document.createElement("img");
      imgElement.src = imgUrl;
      imgElement.onload = function () {
        let image = new fabric.Image(imgElement, {
          scaleX: 0.2, // Resize factor for width
          scaleY: 0.2, // Resize factor for height
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.setActiveObject(image);
      };
    };
  };

  return (
    <div className="parent">
      <input
        type="file"
        accept="image/*"
        label="add image"
        style={{ position: "absolute", top: "0", left: "0" }}
        onChange={handleAddImage}
      />
      <canvas
        width="320"
        height="500"
        style={{
          border: "1px dotted gray",
          position: "absolute",
          top: "30%",
          left: "30%",
        }}
        ref={canvasRef}
      />
    </div>
  );
};

export default Designer;




//2
import { useRef, useEffect, useState } from "react";
import "../styles/designer.css";
import { fabric } from "fabric";

const Designer = () => {
  const canvasRef = useRef();
  const fabricCanvas = useRef(null); // Store fabric canvas reference

  const [textProps, setTextProps] = useState({
    fontSize: 24,
    fill: "black",
    fontFamily: "Arial",
  });

  useEffect(() => {
    // Initialize fabric canvas once when component mounts
    fabricCanvas.current = new fabric.Canvas(canvasRef.current);

    const addText = () => {
      const canvas = fabricCanvas.current; // Get canvas instance
      const text = new fabric.Textbox("Enter text here", {
        left: 100,
        top: 100,
        fontSize: textProps.fontSize,
        fill: textProps.fill,
        fontFamily: textProps.fontFamily,
        editable: true, // Make the text editable
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      canvas.renderAll();
    };

    // Add event listener for 'Add Text' button
    document.getElementById("addTextBtn").addEventListener("click", addText);

    return () => {
      // Clean up canvas and event listeners on unmount
      fabricCanvas.current.dispose();
      document
        .getElementById("addTextBtn")
        .removeEventListener("click", addText);
    };
  }, [textProps]); // Dependency on textProps

  const handleAddImage = (e) => {
    const canvas = fabricCanvas.current; // Get the canvas instance
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);
    reader.onload = (e) => {
      let imgUrl = e.target.result;
      let imgElement = document.createElement("img");
      imgElement.src = imgUrl;
      imgElement.onload = function () {
        let image = new fabric.Image(imgElement, {
          scaleX: 0.2, // Resize factor for width
          scaleY: 0.2, // Resize factor for height
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.setActiveObject(image);
      };
    };
  };

  return (
    <div className="parent">
      <input
        type="file"
        accept="image/*"
        label="add image"
        style={{ position: "absolute", top: "0", left: "0" }}
        onChange={handleAddImage}
      />
      <button
        style={{ position: "absolute", top: "0", left: "300px" }}
        id="addTextBtn"
      >
        Add Text
      </button>
      <canvas
        width="320"
        height="500"
        style={{
          border: "1px dotted gray",
          position: "absolute",
          top: "30%",
          left: "30%",
        }}
        ref={canvasRef}
      />
    </div>
  );
};

export default Designer;

