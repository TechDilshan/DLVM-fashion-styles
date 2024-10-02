import React, { useRef, useState, useEffect } from 'react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';
import './CSS/measurement.css';

const BodyMeasurement = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [measurements, setMeasurements] = useState({ shoulders: 0, waist: 0, height: 0 });
  const [clothingSize, setClothingSize] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    let cameraInstance;

    if (cameraActive) {
      cameraInstance = new Camera(videoRef.current, {
        onFrame: async () => {
          try {
            await pose.send({ image: videoRef.current });
          } catch (err) {
            console.error('Error sending image to pose:', err);
            setError('Failed to process camera feed.');
          }
        },
        width: 640,
        height: 480,
      });
      cameraInstance.start();
    }

    if (imageUploaded) {
      processImage(pose);
    }

    return () => {
      if (cameraInstance) {
        cameraInstance.stop();
      }
    };
  }, [cameraActive, imageUploaded]);

  const processImage = async (pose) => {
    if (imageRef.current && canvasRef.current) {
      try {
        await pose.send({ image: imageRef.current });
      } catch (err) {
        console.error('Error sending image to pose:', err);
        setError('Failed to process uploaded image.');
      }
    }
  };

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      setError('Canvas element not found.');
      return;
    }

    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.image) {
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    }

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });

      const calculatedMeasurements = calculateMeasurements(results.poseLandmarks);
      setMeasurements(calculatedMeasurements);

      suggestClothingSize(calculatedMeasurements);

      sendMeasurements(calculatedMeasurements);
    }

    canvasCtx.restore();
  };

  const calculateMeasurements = (landmarks) => {
    const shouldersDistance = calculateDistance(landmarks[11], landmarks[12]);
    const waistDistance = calculateDistance(landmarks[23], landmarks[24]);
    const height = calculateDistance(landmarks[0], landmarks[32]);

    return {
      shoulders: (shouldersDistance * 100).toFixed(2),
      waist: (waistDistance * 100).toFixed(2),
      height: (height * 100).toFixed(2),
    };
  };

  const calculateDistance = (point1, point2) => {
    const xDiff = point1.x - point2.x;
    const yDiff = point1.y - point2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  };

  const suggestClothingSize = (measurements) => {
    const { shoulders, waist, height } = measurements;

    if (height > 180 && shoulders > 45 && waist > 30) {
      setClothingSize('L');
    } else if (height > 170 && shoulders > 40 && waist > 28) {
      setClothingSize('M');
    } else {
      setClothingSize('S');
    }
  };

  const sendMeasurements = async (measurements) => {
    try {
      const response = await fetch('/api/measurements/addmeasurement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurements),
      });
      const result = await response.json();
      console.log('Measurements saved:', result);
    } catch (error) {
      console.error('Error sending measurements:', error);
      setError('Failed to send measurements to the server.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvasElement = canvasRef.current;

          // Check if the canvas element is available
          if (!canvasElement) {
            setError('Canvas element not found');
            console.error('Canvas element not found');
            return;
          }

          const canvasCtx = canvasElement.getContext('2d');
          canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
          imageRef.current = img;
          setImageUploaded(true);
          setCameraActive(false);
          setError('');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    setImageUploaded(false);
    setError('');
  };

  const reset = () => {
    setCameraActive(false);
    setImageUploaded(false);
    setMeasurements({ shoulders: 0, waist: 0, height: 0 });
    setClothingSize('');
    setError('');
  };

  return (
    <div className="container">
      <h2>Body Measurement</h2>
      {!cameraActive && !imageUploaded && (
        <div className="actions">
          <button onClick={startCamera} className="start-button">Start Camera</button>
          <input type="file" accept="image/*" onChange={handleFileChange} className="upload-button" id="upload-photo" />
          <label htmlFor="upload-photo" className="upload-label">Upload Photo</label>
        </div>
      )}

      {(cameraActive || imageUploaded) && (
        <div className="measurement-display">
          {cameraActive && <video ref={videoRef} style={{ display: 'none' }}></video>}
          <canvas ref={canvasRef} width="640" height="480" className="canvas-view"></canvas>

          <div className="measurement-info">
            <h3>Measurements:</h3>
            <p>Shoulders: {measurements.shoulders} cm</p>
            <p>Waist: {measurements.waist} cm</p>
            <p>Height: {measurements.height} cm</p>
            <h3>Suggested Clothing Size: {clothingSize}</h3>
            {error && <p className="error-message">{error}</p>}
            <button onClick={reset} className="reset-button">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyMeasurement;
