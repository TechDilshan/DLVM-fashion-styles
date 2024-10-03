import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import ColorThief from "colorthief";

const SkinColorDetection = () => {
  const [hexColor, setHexColor] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showColorBox, setShowColorBox] = useState(false); // State to control visibility of color box
  const webcamRef = useRef(null);
  const colorThief = new ColorThief();

  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Capture image from webcam and crop it to focus on the face
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImagePreview(imageSrc);
    detectColorFromImage(imageSrc);
  };

  // Handle photo upload and crop the uploaded image
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setImagePreview(dataURL);
        detectColorFromImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  // Detect dominant color from the cropped face area
  const detectColorFromImage = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous"; // Required for color detection
    img.onload = () => {
      // Create a canvas to crop the face area
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Define the face region - adjust these values based on your specific camera and image size
      const faceWidth = img.width / 3; // Face takes about 1/3 of the image width
      const faceHeight = img.height / 3; // Face takes about 1/3 of the image height
      const faceX = (img.width - faceWidth) / 2; // Center the face horizontally
      const faceY = (img.height - faceHeight) / 3; // Slightly above the center vertically

      // Extract the face area from the image
      const faceImageData = ctx.getImageData(faceX, faceY, faceWidth, faceHeight);

      // Create a new canvas for the cropped face image
      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = faceWidth;
      faceCanvas.height = faceHeight;
      const faceCtx = faceCanvas.getContext("2d");

      // Draw the cropped face area
      faceCtx.putImageData(faceImageData, 0, 0);

      // Create a new image from the face canvas
      const croppedFaceImage = new Image();
      croppedFaceImage.src = faceCanvas.toDataURL("image/png");

      // Detect the dominant color from the cropped face image
      croppedFaceImage.onload = () => {
        const dominantColor = colorThief.getColor(croppedFaceImage);
        const hex = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
        setHexColor(hex);
      };
    };
  };

  // Toggle color box visibility when the button is clicked
  const handleShowColorBox = () => {
    if (hexColor) {
      setShowColorBox(true);
    }
  };

  return (
    <div>
      <h2>Skin Color Detection</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Image</button>

      {/* Display detected skin color */}
      {hexColor && (
        <>
          <p>Detected Skin Color: {hexColor}</p>
          <button onClick={handleShowColorBox}>Show Skin Color</button>
        </>
      )}

      {/* Conditionally render the color box */}
      {showColorBox && (
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: hexColor,
            border: "1px solid black",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#fff"
          }}
        >
          {hexColor}
        </div>
      )}
    </div>
  );
};

export default SkinColorDetection;
