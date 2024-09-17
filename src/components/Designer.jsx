//3      okkkkkkkkkkkk

// import { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";

// const productImageUrl = "/T-SHIRT.png"; // Path to your T-shirt image

// const Designer = () => {
//   const canvasRef = useRef(null);
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [layers, setLayers] = useState([]);
//   const [textProps, setTextProps] = useState({
//     fontSize: 24,
//     fill: "#000000",
//     fontFamily: "Arial",
//   });

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       height: 500,
//       width: 700,
//       backgroundColor: "#f3f3f3",
//     });

//     // Function to load the background T-shirt image
//     const loadBackgroundImage = (url) => {
//       fabric.Image.fromURL(url, (img) => {
//         img.set({
//           selectable: false,
//           evented: false,
//           scaleX: canvas.width / img.width,
//           scaleY: canvas.height / img.height,
//         });
//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//           crossOrigin: "anonymous",
//         });
//       });
//     };

//     loadBackgroundImage(productImageUrl);

//     // Function to apply a color filter to the T-shirt image
//     const applyColorFilter = (color) => {
//       const obj = canvas.backgroundImage;
//       if (obj) {
//         const filter = new fabric.Image.filters.Tint({
//           color,
//           opacity: 0.6, // You can adjust the opacity as needed
//         });
//         obj.filters = [filter];
//         obj.applyFilters();
//         canvas.renderAll();
//       }
//     };

//     // Define a specific design space for user customization
//     const defineDesignSpace = () => {
//       const designRect = new fabric.Rect({
//         left: 225,
//         top: 100,
//         width: 250, // Design space width
//         height: 350, // Design space height
//         fill: "transparent",
//         stroke: "black",
//         strokeDashArray: [5, 5],
//         selectable: false,
//         evented: false,
//       });
//       canvas.add(designRect);
//       canvas.renderAll();
//     };

//     defineDesignSpace();

//     // Event listeners for selection and layer updates
//     canvas.on("selection:created", (event) => {
//       setSelectedObject(event.target);
//     });

//     canvas.on("selection:updated", (event) => {
//       setSelectedObject(event.target);
//     });

//     canvas.on("selection:cleared", () => {
//       setSelectedObject(null);
//     });

//     const updateLayers = () => {
//       setLayers(
//         canvas.getObjects().map((obj, index) => ({
//           id: index,
//           type: obj.type,
//           object: obj,
//         }))
//       );
//     };

//     canvas.on("object:added", updateLayers);
//     canvas.on("object:removed", updateLayers);

//     const handleImageUpload = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (f) => {
//           const data = f.target.result;
//           fabric.Image.fromURL(data, (img) => {
//             img.scaleToWidth(200);
//             img.scaleToHeight(200);
//             canvas.add(img);
//             canvas.setActiveObject(img);
//             canvas.renderAll();
//           });
//         };
//         reader.readAsDataURL(file);
//       }
//     };

//     const addText = () => {
//       if (!canvas) return;

//       const text = new fabric.Textbox("Enter text here", {
//         left: 100,
//         top: 100,
//         fontSize: textProps.fontSize,
//         fill: textProps.fill,
//         fontFamily: textProps.fontFamily,
//       });
//       canvas.add(text);
//       canvas.setActiveObject(text);
//       text.enterEditing();
//       canvas.renderAll();
//     };

//     document
//       .getElementById("imageUpload")
//       .addEventListener("change", handleImageUpload);
//     document.getElementById("addTextBtn").addEventListener("click", addText);

//     return () => {
//       canvas.dispose();
//     };
//   }, [textProps]);

//   const updateTextProps = (prop, value) => {
//     if (selectedObject && selectedObject.type === "textbox") {
//       selectedObject.set(prop, value);
//       selectedObject.setCoords();
//       selectedObject.canvas.renderAll();
//       setTextProps((prevProps) => ({ ...prevProps, [prop]: value }));
//     }
//   };

// const updateScale = (scale) => {
//   if (
//     selectedObject &&
//     (selectedObject.type === "image" || selectedObject.type === "textbox")
//   ) {
//     selectedObject.scale(scale).setCoords();
//     selectedObject.canvas.renderAll();
//   }
// };

// const bringToFront = () => {
//   if (selectedObject) {
//     selectedObject.bringToFront();
//     selectedObject.canvas.renderAll();
//   }
// };

// const sendToBack = () => {
//   if (selectedObject) {
//     selectedObject.sendToBack();
//     selectedObject.canvas.renderAll();
//   }
// };

//   return (
//     <div>
//       <h1>Product Designer</h1>

//       <div>
//         {/* Color picker for changing the T-shirt color */}
//         <label>
//           Change T-shirt Color:
//           <input
//             type="color"
//             onChange={(e) => applyColorFilter(e.target.value)}
//           />
//         </label>

//         <input type="file" id="imageUpload" accept="image/*" />
//         <button id="addTextBtn">Add Text</button>

//         {selectedObject && selectedObject.type === "textbox" && (
//           <div style={{ marginTop: "10px" }}>
//             <label>
//               Font Size:
//               <input
//                 type="number"
//                 value={textProps.fontSize}
//                 onChange={(e) =>
//                   updateTextProps("fontSize", parseInt(e.target.value))
//                 }
//               />
//             </label>
//             <label>
//               Color:
//               <input
//                 type="color"
//                 value={textProps.fill}
//                 onChange={(e) => updateTextProps("fill", e.target.value)}
//               />
//             </label>
//             <label>
//               Font Style:
//               <select
//                 value={textProps.fontFamily}
//                 onChange={(e) => updateTextProps("fontFamily", e.target.value)}
//               >
//                 <option value="Arial">Arial</option>
//                 <option value="Times New Roman">Times New Roman</option>
//                 <option value="Courier New">Courier New</option>
//                 <option value="Georgia">Georgia</option>
//                 <option value="Verdana">Verdana</option>
//               </select>
//             </label>
//           </div>
//         )}

//         {selectedObject && (
//           <div style={{ marginTop: "10px" }}>
//             <label>
//               Scale:
//               <input
//                 type="range"
//                 min="0.1"
//                 max="2"
//                 step="0.1"
//                 defaultValue="1"
//                 onChange={(e) => updateScale(parseFloat(e.target.value))}
//               />
//             </label>
//             <button onClick={bringToFront}>Bring to Front</button>
//             <button onClick={sendToBack}>Send to Back</button>
//           </div>
//         )}

//         <div style={{ marginTop: "20px" }}>
//           <h3>Layers:</h3>
//           <ul>
//             {layers.map((layer, index) => (
//               <li key={index}>{layer.type}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

// export default Designer;

import { useRef, useEffect, useState } from "react";
import "../styles/designer.css";
import { fabric } from "fabric";

// Utility function to convert named colors (e.g., 'black') to hex values
const colorNameToHex = (color) => {
  const colors = {
    black: "#000000", // Define a mapping of named colors to their hex equivalents
    white: "#FFFFFF",
    red: "#FF0000",
    green: "#008000",
    blue: "#0000FF",
    yellow: "#FFFF00",
    gray: "#808080",
    // Add more named colors as needed
  };
  return colors[color.toLowerCase()] || color; // Return the hex value, or the color as-is if not in the map
};

const Designer = () => {
  const canvasRef = useRef(); // Reference to the canvas element
  const fabricCanvas = useRef(null); // Reference to the Fabric.js canvas
  const [selectedText, setSelectedText] = useState(null); // Track the currently selected text object

  const [textProps, setTextProps] = useState({
    fontSize: 24, // Initial font size
    fill: "#000000", // Initial text color (black)
    fontFamily: "Arial", // Initial font family
  });

  useEffect(() => {
    // Initialize the Fabric.js canvas
    fabricCanvas.current = new fabric.Canvas(canvasRef.current);

    // Function to handle when text is selected or updated
    const handleSelection = (e) => {
      if (e.target && e.target.type === "textbox") {
        // Check if a textbox was selected
        setSelectedText(e.target); // Set the selected text
        setTextProps({
          fontSize: e.target.fontSize, // Set the current text properties in the state
          fill: colorNameToHex(e.target.fill), // Convert fill to hex if it's a named color
          fontFamily: e.target.fontFamily,
        });
      }
    };

    // Listen for text selection and update events
    fabricCanvas.current.on("selection:created", handleSelection);
    fabricCanvas.current.on("selection:updated", handleSelection);

    // Handle clearing of the selection
    fabricCanvas.current.on("selection:cleared", () => {
      setSelectedText(null); // No text is selected
    });

    // Function to add a new text object to the canvas
    const addText = () => {
      const canvas = fabricCanvas.current;
      const textbox = new fabric.Textbox("Enter text here", {
        left: 100,
        top: 100,
        fontSize: textProps.fontSize, // Use the current font size from the state
        fill: textProps.fill, // Use the current text color from the state
        fontFamily: textProps.fontFamily, // Use the current font family from the state
        editable: true, // Allow the user to edit the text
      });
      canvas.add(textbox); // Add the textbox to the canvas
      canvas.setActiveObject(textbox); // Make the new textbox the active object
      canvas.renderAll(); // Re-render the canvas to display the changes
    };

    // Add the event listener for the "Add Text" button
    document.getElementById("addTextBtn").addEventListener("click", addText);

    // Cleanup when the component unmounts
    return () => {
      fabricCanvas.current.dispose(); // Dispose of the Fabric.js canvas
      document
        .getElementById("addTextBtn")
        .removeEventListener("click", addText);
    };
  }, [textProps]); // Only re-run this effect if textProps changes

  // Function to update the properties of the selected text
  const updateTextProps = (prop, value) => {
    console.log(selectedText);

    if (selectedText) {
      console.log("ji");
      // Only proceed if a text object is selected
      selectedText.set(prop, value); // Update the property (e.g., font size or color) of the selected text
      selectedText.setCoords(); // Recalculate the text's coordinates in case of any changes
      fabricCanvas.current.renderAll(); // Re-render the canvas

      // Update the state with the new text properties
      setTextProps((prev) => ({
        ...prev, // Keep the existing properties
        [prop]: value, // Update the specific property that was changed
      }));
    }
  };

  // Function to handle adding an image to the canvas
  const handleAddImage = (e) => {
    const canvas = fabricCanvas.current;
    let imgObj = e.target.files[0]; // Get the uploaded image file
    let reader = new FileReader();
    reader.readAsDataURL(imgObj); // Read the image file as a data URL
    reader.onload = (e) => {
      let imgElement = document.createElement("img");
      imgElement.src = e.target.result; // Set the image source to the data URL
      imgElement.onload = function () {
        const image = new fabric.Image(imgElement, {
          scaleX: 0.2, // Scale down the image for the canvas
          scaleY: 0.2,
        });
        canvas.add(image); // Add the image to the canvas
        canvas.centerObject(image); // Center the image on the canvas
        canvas.setActiveObject(image); // Make the image the active object
      };
    };
  };

  return (
    <div className="parent">
      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage} // Handle the image upload
        style={{ position: "absolute", top: "0", left: "0" }}
      />

      {/* Color Picker for Text */}
      <input
        type="color"
        value={"#FF0000"} // Bind the color picker to the current text color
        onChange={(e) => {
          updateTextProps("fill", e.target.value);
          console.log(e.target.value);
        }} // Update the fill color when changed
        style={{ position: "absolute", top: "10%", left: "0" }}
      />

      {/* Font Size Input */}
      <input
        type="number"
        value={textProps.fontSize} // Bind the input to the current font size
        onChange={(e) => updateTextProps("fontSize", parseInt(e.target.value))} // Update the font size when changed
        style={{ position: "absolute", top: "20%", left: "0" }}
        placeholder="Font Size"
      />

      {/* Font Family Selector */}
      <select
        value={textProps.fontFamily} // Bind the select dropdown to the current font family
        onChange={(e) => updateTextProps("fontFamily", e.target.value)} // Update the font family when changed
        style={{ position: "absolute", top: "30%", left: "0" }}
      >
        {/* Options for font family */}
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
      </select>

      {/* Fabric.js Canvas */}
      <canvas
        ref={canvasRef} // Reference to the canvas element
        width="320"
        height="500"
        style={{
          border: "1px dotted gray",
          position: "absolute",
          top: "30%",
          left: "30%",
        }}
      />

      {/* Button to Add Text */}
      <button id="addTextBtn">Add Text</button>
    </div>
  );
};

export default Designer;
