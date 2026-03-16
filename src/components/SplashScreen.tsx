import { useEffect, useState } from "react";
import logo from "@/assets/grwm-logo-clean.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 4500);
    const endTimer = setTimeout(() => onFinish(), 5000);
    return () => { clearTimeout(timer); clearTimeout(endTimer); };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logo}
        alt="GRWM Logo"
        className="w-48 h-48 object-contain animate-pulse"
      />
    </div>
  );
};

export default SplashScreen;
