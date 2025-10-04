// Save data to localStorage
export const saveToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Load data from localStorage
export const loadFromStorage = (key, defaultValue = null) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Error parsing localStorage data", err);
        return defaultValue;
      }
    }
  }
  return defaultValue;
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
