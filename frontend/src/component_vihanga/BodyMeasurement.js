import React, { useRef, useState, useEffect } from 'react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';
import Navi from '../Navi'; // Adjust the import path according to your file structure
import Foot from '../footer'; // Adjust the import path according to your file structure
import './CSS/measurement.css'; // Ensure this path is correct

const BodyMeasurement = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [measurements, setMeasurements] = useState({ shoulders: 0, waist: 0, chest: 0, shoulderToWaist: 0, height: 0 });
  const [clothingSize, setClothingSize] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [height, setHeight] = useState('');
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

    // Cleanup on component unmount or when camera state changes
    return () => {
      if (cameraInstance) {
        cameraInstance.stop();
      }
    };
  }, [cameraActive]);

  const onResults = (results) => {
    const canvasElement = canvasRef.current;
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

      // Suggest clothing size
      suggestClothingSize(calculatedMeasurements);
    }

    canvasCtx.restore();
  };

  const calculateMeasurements = (landmarks) => {
    const shouldersDistance = calculateDistance(landmarks[11], landmarks[12]); // Between shoulders
    const waistDistance = calculateDistance(landmarks[23], landmarks[24]); // Between hips
    const chestDistance = calculateDistance(landmarks[11], landmarks[23]); // Chest measurement (shoulder to hip)
    const shoulderToWaistDistance = calculateDistance(landmarks[11], landmarks[23]); // Shoulder to waist measurement

    const heightDistance = parseFloat(height) / 100; // Convert height from cm to meters for calculation

    return {
      shoulders: (shouldersDistance * heightDistance).toFixed(2), // Scale by height
      waist: (waistDistance * heightDistance).toFixed(2), // Scale by height
      chest: (chestDistance * heightDistance).toFixed(2), // Scale by height
      shoulderToWaist: (shoulderToWaistDistance * heightDistance).toFixed(2), // Scale by height
      height: (heightDistance * 100).toFixed(2), // Keep height in cm
    };
  };

  const calculateDistance = (point1, point2) => {
    const xDiff = point1.x - point2.x;
    const yDiff = point1.y - point2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  };

  const suggestClothingSize = (measurements) => {
    const { shoulders, waist, chest, height } = measurements;

    // Example sizing logic (adjust based on your standards)
    if (height > 180 && shoulders > 45 && waist > 30 && chest > 40) {
      setClothingSize('L');
    } else if (height > 170 && shoulders > 40 && waist > 28 && chest > 38) {
      setClothingSize('M');
    } else {
      setClothingSize('S');
    }
  };

  const startCamera = () => {
    setCameraActive(true);
    setError('');
  };

  const reset = () => {
    setCameraActive(false);
    setMeasurements({ shoulders: 0, waist: 0, chest: 0, shoulderToWaist: 0, height: 0 });
    setClothingSize('');
    setHeight('');
    setError('');
  };

  return (
    <div>
      <Navi />
      <div className='shopping-cart'>
        <h2 className='cart-title'>Body Measurement</h2>
        <div className="actions">
          <input
            type="number"
            placeholder="Enter your height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="height-input"
            disabled={cameraActive} // Make input read-only when camera is active
          />
          <button onClick={startCamera} className="start-button" disabled={cameraActive}>
            Start Camera
          </button>
        </div>

        {cameraActive && (
          <div className="measurement-display">
            <video ref={videoRef} style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} width="640" height="480" className="canvas-view"></canvas>

            <div className="measurement-info">
              <h3>Measurements:</h3>
              <p>Shoulders: {measurements.shoulders} cm</p>
              <p>Waist: {measurements.waist} cm</p>
              <p>Chest: {measurements.chest} cm</p>
              <p>Shoulder to Waist: {measurements.shoulderToWaist} cm</p>
              <p>Height: {measurements.height} cm</p>
              <h3>Suggested Clothing Size: {clothingSize}</h3>
              {error && <p className="error-message">{error}</p>}
              <button onClick={reset} className="reset-button">
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
      <Foot />
    </div>
  );
};

export default BodyMeasurement;
