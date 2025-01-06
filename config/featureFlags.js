const defaultFeatureFlags = {
  admin: {
    showSpecialCard: false,
  },
  teacher: {
    showSpecialCard: true,
  },
  student: {
    showSpecialCard: true,
  },
};

const getFeatureFlags = () => {
  if (typeof window !== "undefined") {
    const savedFlags = localStorage.getItem("featureFlags");
    return savedFlags ? JSON.parse(savedFlags) : defaultFeatureFlags;
  }
  return defaultFeatureFlags;
};

const setFeatureFlags = (flags) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("featureFlags", JSON.stringify(flags));
  }
};

export { getFeatureFlags, setFeatureFlags };
