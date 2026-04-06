import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-05-14T00:00:00');

export function useAnniversaryStatus() {
  const [hasArrived, setHasArrived] = useState(() => new Date() >= TARGET_DATE);

  useEffect(() => {
    if (hasArrived) return; // No need to keep checking

    const timer = setInterval(() => {
      if (new Date() >= TARGET_DATE) {
        setHasArrived(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hasArrived]);

  return hasArrived;
}

export { TARGET_DATE };
