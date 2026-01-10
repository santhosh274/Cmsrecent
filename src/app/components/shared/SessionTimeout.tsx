import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';

interface SessionTimeoutProps {
  timeout?: number; // in milliseconds (default: 15 minutes)
  warningTime?: number; // show warning before timeout (default: 2 minutes)
  onLogout: () => void;
}

export default function SessionTimeout({
  timeout = 15 * 60 * 1000, // 15 minutes
  warningTime = 2 * 60 * 1000, // 2 minutes
  onLogout,
}: SessionTimeoutProps) {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
  }, []);

  const handleLogout = useCallback(() => {
    setShowWarning(false);
    toast.info('Session expired due to inactivity');
    onLogout();
    navigate('/');
  }, [onLogout, navigate]);

  const handleStayLoggedIn = () => {
    resetTimer();
    toast.success('Session extended');
  };

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer]);

  // Check for timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      const remaining = timeout - timeSinceActivity;

      if (remaining <= 0) {
        handleLogout();
      } else if (remaining <= warningTime && !showWarning) {
        setShowWarning(true);
        setTimeLeft(Math.floor(remaining / 1000));
      } else if (showWarning) {
        setTimeLeft(Math.floor(remaining / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity, timeout, warningTime, showWarning, handleLogout]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Session About to Expire
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in <strong>{formatTime(timeLeft)}</strong> due to inactivity.
            Click "Stay Logged In" to continue your session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLogout}>Logout Now</AlertDialogCancel>
          <AlertDialogAction onClick={handleStayLoggedIn} className="bg-blue-600 hover:bg-blue-700">
            Stay Logged In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
