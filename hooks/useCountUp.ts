
import { useState, useEffect, useRef } from 'react';

const useCountUp = (end: number, duration: number = 2000): number => {
  const [count, setCount] = useState(0);
  const ref = useRef<number | null>(null);

  const easeOutExpo = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };
  
  const animate = (timestamp: number) => {
    if (!ref.current) {
      ref.current = timestamp;
    }
    const progress = Math.min((timestamp - ref.current) / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentCount = Math.floor(easedProgress * end);
    
    setCount(currentCount);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    ref.current = null; // Reset animation on change
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);
  
  return count;
};

export default useCountUp;
