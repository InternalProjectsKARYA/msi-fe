"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getFeatureFlags, setFeatureFlags } from "../config/featureFlags";

const FeatureFlagContext = createContext();

export const FeatureFlagProvider = ({ userRole, children }) => {
  const [flags, setFlags] = useState(getFeatureFlags()[userRole]);

  useEffect(() => {
    const allFlags = getFeatureFlags();
    setFlags(allFlags[userRole] || {});
  }, [userRole]);

  const updateFeatureFlag = (key, value) => {
    const allFlags = getFeatureFlags();
    const updatedFlags = {
      ...allFlags,
      [userRole]: { ...allFlags[userRole], [key]: value },
    };
    setFeatureFlags(updatedFlags);
    setFlags(updatedFlags[userRole]);
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, updateFeatureFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagProvider");
  }
  return context;
};
