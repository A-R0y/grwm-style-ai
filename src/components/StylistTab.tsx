import { useState } from "react";
import { Plus, Sparkles, ArrowLeft, ShoppingBag, Clock, X } from "lucide-react";
import { mockOutfits, mockWardrobe } from "@/data/mockData";

const eventTypes = [
  { label: "Casual", emoji: "👕" },
  { label: "Formal", emoji: "👔" },
  { label: "Party", emoji: "🎉" },
  { label: "Date Night", emoji: "💕" },
  { label: "Workout", emoji: "🏋️" },
  { label: "Travel", emoji: "✈️" },
];

const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

const StylistTab = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const getItemById = (id: string) => mockWardrobe.find((i) => i.id === id);

  const handleCreate = () => {
    setShowCreate(false);
    setStep(1);
    setSelectedEvent("");
    setSelectedTime("");
  };

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">AI Outfits</h2>
        <button
          onClick={() => setShowCreate(true)}
          className="gradient-primary w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md shadow-primary/20"
        >
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {mockOutfits.map((outfit) => (
          <div key={outfit.id} className="glass rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">{outfit.occasion}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-medium">
                    {outfit.confidence}% Match
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {outfit.itemIds.map((id) => {
                const item = getItemById(id);
                if (!item) return null;
                return (
                  <img
                    key={id}
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 rounded-2xl object-cover flex-shrink-0"
                  />
                );
              })}
            </div>

            {outfit.suggestions.length > 0 && (
              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">
                    E-commerce Suggestions
                  </span>
                </div>
                <div className="space-y-2">
                  {outfit.suggestions.map((s, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-medium">{s.name}</p>
                        <p className="text-[10px] text-muted-foreground">{s.brand}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Outfit Overlay */}
      {showCreate && (
        <div className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <button onClick={handleCreate} className="absolute top-6 right-6">
              <X className="w-7 h-7 text-primary-foreground" />
            </button>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-primary-foreground text-xl font-bold text-center mb-6">
                  What's the occasion?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {eventTypes.map((ev) => (
                    <button
                      key={ev.label}
                      onClick={() => { setSelectedEvent(ev.label); setStep(2); }}
                      className={`glass rounded-3xl py-6 flex flex-col items-center gap-2 active:scale-95 transition-transform ${
                        selectedEvent === ev.label ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <span className="text-2xl">{ev.emoji}</span>
                      <span className="font-medium text-sm">{ev.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <button onClick={() => setStep(1)} className="text-primary-foreground/60 mb-2">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-primary-foreground text-xl font-bold text-center mb-2">
                  When is it?
                </h3>
                <p className="text-primary-foreground/60 text-sm text-center mb-6">
                  {selectedEvent}
                </p>
                <div className="flex items-center gap-2 text-primary-foreground/60 justify-center mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Select time of day</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`glass rounded-3xl py-5 text-sm font-medium active:scale-95 transition-transform ${
                        selectedTime === t ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {selectedTime && (
                  <button
                    onClick={handleCreate}
                    className="w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-3xl mt-4 active:scale-95 transition-transform"
                  >
                    Generate Outfit ✨
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StylistTab;
