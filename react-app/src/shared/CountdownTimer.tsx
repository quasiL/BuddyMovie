// noinspection TypeScriptCheckImport

import {useEffect, useState} from 'react';
import {differenceInSeconds, parseISO} from 'date-fns';

const CountdownTimer = ({targetDate}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const targetDateTime = parseISO(targetDate);
    const intervalId = setInterval(() => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(targetDateTime, now);

      if (diffInSeconds <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(diffInSeconds);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      {timeRemaining > 0 ? (
        <div>
          Time remaining: {formatTime(timeRemaining)}
        </div>
      ) : (
        <div>Countdown finished!</div>
      )}
    </div>
  );
};

export default CountdownTimer;
