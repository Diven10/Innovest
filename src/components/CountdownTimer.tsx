import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  // State to control visibility of the countdown timer
  const [isVisible, setIsVisible] = useState(true);

  // Set the target date to exactly 5 days from now
  const [targetDate] = useState(() => {
    const date = new Date();
    // Set time to end of day (23:59:59) 5 days from now
    date.setDate(date.getDate() + 5);
    date.setHours(23, 59, 59, 999);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      // When countdown reaches zero, keep it at zero but don't clear the interval
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial value
    const updateTimer = () => setTimeLeft(calculateTimeLeft());
    updateTimer();

    // Update every second
    const timer = setInterval(updateTimer, 1000);

    // Cleanup on unmount

    return () => clearInterval(timer);
  }, []); // Remove targetDate dependency since it's now stable

  const timeUnits = [
    { label: "Days", value: timeLeft.days, color: "text-google-blue" },
    { label: "Hours", value: timeLeft.hours, color: "text-google-red" },
    { label: "Minutes", value: timeLeft.minutes, color: "text-google-yellow" },
    { label: "Seconds", value: timeLeft.seconds, color: "text-google-green" },
  ];

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render anything if the timer is closed
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-40 bg-card/90 backdrop-blur-lg border border-border rounded-lg p-4 shadow-lg">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50 transition-colors group"
        aria-label="Close countdown timer"
      >
        <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      </button>

      <div className="flex items-center gap-2 mb-3 pr-6">
        <Clock className="w-5 h-5 text-google-red" />
        <span className="google-caption text-sm font-semibold text-foreground">
          Applications Close In:
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="timer-digit rounded-lg p-3 text-center"
          >
            <div
              className={`google-heading-4 text-2xl font-bold ${unit.color}`}
            >
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="google-caption text-xs text-muted-foreground font-medium mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="google-caption text-xs text-muted-foreground">
          Don't miss out! Apply today
        </span>
      </div>
    </div>
  );
};
