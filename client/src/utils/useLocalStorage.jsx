import { useState, useEffect } from "react";
import React from "react";

export const useLocalStorage = (key, initialValue) => {
    // Initialize state with callback to avoid unnecessary localStorage access
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? parseInt(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    // Create a function to update both state and localStorage
    const setValue = (value) => {
      try {
        setStoredValue(value);
        localStorage.setItem(key, value.toString());
      } catch (error) {
        console.error(error);
      }
    };
  
    // Listen for changes
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === key && e.newValue !== null) {
          setStoredValue(parseInt(e.newValue));
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);
  
    return [storedValue, setValue];
  };