import { useState } from "react";
import { ArrowLeft, Plus, Camera, Upload, X } from "lucide-react";
import { mockWardrobe, categoryImages, WardrobeItem } from "@/data/mockData";

const categories = ["Topwear", "Bottomwear", "Footwear", "Accessories"] as const;

const ClosetTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string | null>(null);

  const getCategoryCount = (cat: string) =>
    mockWardrobe.filter((i) => i.category === cat).length;

  const filteredItems = mockWardrobe.filter((i) => i.category === selectedCategory);

  return (
    <div className="relative pb-4">
      {!selectedCategory ? (
        <>
          <h2 className="text-lg font-bold mb-4">My Closet</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div key={cat} className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full h-full active:scale-95 transition-transform"
                >
                  <img
                    src={categoryImages[cat]}
                    alt={cat}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-primary-foreground font-semibold text-sm">{cat}</p>
                    <p className="text-primary-foreground/70 text-xs">{getCategoryCount(cat)} items</p>
                  </div>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setUploadCategory(cat); setShowUpload(true); }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform z-10"
                >
                  <Plus className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-muted-foreground mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{selectedCategory}</h2>
            <button
              onClick={() => { setUploadCategory(selectedCategory); setShowUpload(true); }}
              className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <ClothingCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowUpload(true)}
        className="fixed bottom-24 right-6 sm:right-auto sm:ml-[calc(50%-1.5rem+12rem)] gradient-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform z-30"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-4">
            <button onClick={() => setShowUpload(false)} className="absolute top-6 right-6">
              <X className="w-7 h-7 text-primary-foreground" />
            </button>
            <h3 className="text-primary-foreground text-xl font-bold text-center mb-8">
              Add to Wardrobe
            </h3>
            <button className="w-full glass rounded-3xl py-6 flex flex-col items-center gap-3 active:scale-95 transition-transform">
              <Camera className="w-8 h-8 text-primary" />
              <span className="font-semibold text-sm">Open Camera</span>
            </button>
            <button className="w-full glass rounded-3xl py-6 flex flex-col items-center gap-3 active:scale-95 transition-transform">
              <Upload className="w-8 h-8 text-primary" />
              <span className="font-semibold text-sm">Upload from Gallery</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ClothingCard = ({ item }: { item: WardrobeItem }) => (
  <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    <div className="absolute top-2 left-2 glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
      <span className="text-[10px] font-medium">{item.fit}</span>
    </div>
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-8">
      <p className="text-primary-foreground text-xs font-medium">{item.name}</p>
    </div>
  </div>
);

export default ClosetTab;
