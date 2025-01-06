import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateClock(); // Initialize time
    const intervalId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-4xl font-mono">
      {time ?? 'Loading, please wait.'}
    </div>
  );
}

export default DigitalClock;
