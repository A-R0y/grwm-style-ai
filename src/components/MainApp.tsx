import { useState } from "react";
import { User, ShirtIcon, Wand2 } from "lucide-react";
import grwmLogo from "@/assets/grwm-logo-header.png";
import { mockUser } from "@/data/mockData";
import ProfileTab from "./ProfileTab";
import ClosetTab from "./ClosetTab";
import StylistTab from "./StylistTab";

type Tab = "profile" | "closet" | "stylist";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "closet", label: "Closet", icon: ShirtIcon },
  { id: "stylist", label: "Stylist", icon: Wand2 },
];

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-gradient">GRWM</h1>
        </div>
        <img
          src={mockUser.avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
        />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "closet" && <ClosetTab />}
        {activeTab === "stylist" && <StylistTab />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[calc(28rem-2.5rem)] glass rounded-3xl px-2 py-2 flex justify-around items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                active ? "scale-110 text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MainApp;
