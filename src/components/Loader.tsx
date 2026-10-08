import { useEffect, useState } from 'react';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* GDG Logo */}
        <div className="text-6xl font-bold">
          <span className="text-google-blue">G</span>
          <span className="text-google-red">D</span>
          <span className="text-google-yellow">G</span>
          <span className="text-foreground"> Recruitment</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-google-blue via-google-red to-google-yellow transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground animate-pulse">Loading your future...</p>
      </div>
    </div>
  );
};