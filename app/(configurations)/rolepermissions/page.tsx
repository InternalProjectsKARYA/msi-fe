"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useFeatureFlags } from "@/context/FeatureFlagProvider";

const RoleBasedPermissions = () => {
  const { featureFlags, updateFeatureFlag } = useFeatureFlags();

  if (!featureFlags) {
    return <div>Loading...</div>;
  }

  const handleToggle = (role, key) => {
    updateFeatureFlag(role, key, !featureFlags[role][key]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Role-Based Feature Visibility</h1>
      <div className="space-y-6">
        {Object.keys(featureFlags).map((role) => (
          <div
            key={role}
            className="border rounded-lg p-4 shadow-sm bg-white dark:bg-neutral-900"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{role}</h3>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(featureFlags[role]).map(([key, isVisible]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-lg dark:bg-neutral-800"
                >
                  <span className="text-sm font-medium capitalize">
                    {key.replace("show", "")}
                  </span>
                  <Switch
                    checked={isVisible}
                    onCheckedChange={() => handleToggle(role, key)}
                    className={`${
                      isVisible ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleBasedPermissions;

