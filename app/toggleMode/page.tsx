// components/ModeToggle.js
"use client";

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // To avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (!mounted) return null;

  return (
    <button onClick={toggleTheme} className=" px-1">
      {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
