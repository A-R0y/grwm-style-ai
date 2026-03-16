export const mockUser = {
  name: "Sophia Laurent",
  email: "sophia@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  stylePreference: "Minimalist / Old Money",
  bodyType: "Inverted Triangle",
  skinTone: "#E3C1B4",
  colorPalette: ["#4A2C6B", "#D4A574", "#8B6F5C", "#F5E6D3"],
};

export interface WardrobeItem {
  id: string;
  name: string;
  category: "Topwear" | "Bottomwear" | "Footwear" | "Accessories";
  image: string;
  fit: string;
  color: string;
}

export const mockWardrobe: WardrobeItem[] = [
  { id: "1", name: "Cream Knit Sweater", category: "Topwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop", fit: "Regular", color: "#F5E6D3" },
  { id: "2", name: "White Linen Shirt", category: "Topwear", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop", fit: "Slim", color: "#FFFFFF" },
  { id: "3", name: "Navy Blazer", category: "Topwear", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop", fit: "Tailored", color: "#1B2A4A" },
  { id: "4", name: "Silk Blouse", category: "Topwear", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop", fit: "Relaxed", color: "#C4A882" },
  { id: "5", name: "Tailored Trousers", category: "Bottomwear", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=400&fit=crop", fit: "Slim", color: "#2C2C2C" },
  { id: "6", name: "Wide Leg Pants", category: "Bottomwear", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop", fit: "Baggy", color: "#D4C5A9" },
  { id: "7", name: "Pleated Skirt", category: "Bottomwear", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=300&h=400&fit=crop", fit: "Regular", color: "#8B6F5C" },
  { id: "8", name: "Leather Loafers", category: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop", fit: "Regular", color: "#5C3D2E" },
  { id: "9", name: "White Sneakers", category: "Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop", fit: "Regular", color: "#FFFFFF" },
  { id: "10", name: "Gold Watch", category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop", fit: "N/A", color: "#D4A574" },
  { id: "11", name: "Leather Belt", category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop", fit: "N/A", color: "#3B2314" },
];

export interface Outfit {
  id: string;
  occasion: string;
  confidence: number;
  itemIds: string[];
  suggestions: { name: string; brand: string; price: string }[];
}

export const mockOutfits: Outfit[] = [
  {
    id: "o1",
    occasion: "Casual Outing",
    confidence: 95,
    itemIds: ["1", "6", "9"],
    suggestions: [
      { name: "White Sneakers", brand: "Common Projects", price: "$425" },
      { name: "Silver Watch", brand: "Daniel Wellington", price: "$189" },
    ],
  },
  {
    id: "o2",
    occasion: "Evening Date",
    confidence: 92,
    itemIds: ["4", "5", "8"],
    suggestions: [
      { name: "Pearl Earrings", brand: "Mejuri", price: "$78" },
      { name: "Clutch Bag", brand: "Saint Laurent", price: "$1,290" },
    ],
  },
  {
    id: "o3",
    occasion: "Office Meeting",
    confidence: 98,
    itemIds: ["3", "5", "8", "10"],
    suggestions: [
      { name: "Silk Pocket Square", brand: "Tom Ford", price: "$150" },
    ],
  },
];

export const categoryImages: Record<string, string> = {
  Topwear: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop",
  Bottomwear: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
  Footwear: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop",
  Accessories: "https://images.unsplash.com/photo-1611923134239-b9be5816d0f0?w=400&h=500&fit=crop",
};
