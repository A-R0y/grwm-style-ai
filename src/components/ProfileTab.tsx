import { useNavigate } from "react-router-dom";
import { mockUser } from "@/data/mockData";
import { Sparkles, User, LogOut } from "lucide-react";

const ProfileTab = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("grwm-onboarded");
    localStorage.removeItem("grwm-profile");
    navigate("/");
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Avatar Section */}
      <div className="flex flex-col items-center pt-2">
        <img
          src={mockUser.avatar}
          alt={mockUser.name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 mb-3"
        />
        <h2 className="text-xl font-bold">{mockUser.name}</h2>
        <span className="text-muted-foreground text-sm">{mockUser.stylePreference}</span>
      </div>

      {/* Body & Tone Analysis */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">AI Body & Tone Analysis</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Body Type</span>
            <span className="font-medium text-sm">{mockUser.bodyType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Skin Tone</span>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: mockUser.skinTone }}
              />
              <span className="font-medium text-sm">{mockUser.skinTone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="glass rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">AI Color Palette</h3>
        </div>
        <div className="flex gap-3 justify-center">
          {mockUser.colorPalette.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-12 h-12 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-muted-foreground">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full glass rounded-3xl p-4 flex items-center justify-center gap-2 text-destructive font-medium text-sm active:scale-95 transition-transform"
      >
        <LogOut className="w-4 h-4" />
        Log Out
      </button>
    </div>
  );
};

export default ProfileTab;
