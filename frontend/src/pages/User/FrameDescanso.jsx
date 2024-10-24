import React, { useState, useEffect } from "react";

const FrameDescanso = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAddTime = () => {
    setTimeLeft((prevTime) => prevTime + 20);
  };

  const handleSkip = () => {
    setTimeLeft(0);
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <div className="text-center py-4">
        <h5>Descanso</h5>
        <div className="display-1 fw-bold">{`00:${
          timeLeft < 10 ? `0${timeLeft}` : timeLeft
        }`}</div>
      </div>

      <div className="d-flex justify-content-center py-2">
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={handleAddTime}
        >
          +20s
        </button>
        <button className="btn btn-primary mx-2" onClick={handleSkip}>
          Omitir
        </button>
      </div>
    </div>
  );
};

export default FrameDescanso;
