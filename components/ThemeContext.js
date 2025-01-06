// useThemeStore.js
import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeColors: {
    topBarColor: '',
    sidebarColor: '',
    sidebarBackground: '',
    primary: '240 5.9% 10%', // default values
    primaryForeground: '0 0% 98%',
    secondary: '240 4.8% 95.9%', 
    secondaryForeground: '240 5.9% 10%',
  },
  updateThemeColor: (colorType, colorValue) =>
    set((state) => ({
      themeColors: {
        ...state.themeColors,
        [colorType]: colorValue,
      },
    })),
  resetTheme: () =>
    set(() => ({
      themeColors: {
        topBarColor: '',
        sidebarColor: '',
        sidebarBackground: '',
        primary: '240 5.9% 10%',
        primaryForeground: '0 0% 98%',
        secondary: '240 4.8% 95.9%',
        secondaryForeground: '240 5.9% 10%',
      },
    })),


    formData: null, 
setFormData: (data) =>
  set((state) => ({
    formData: { ...state.formData, ...data },  
  })),
// resetFormData: () =>
//   set(() => ({
//     formData: {},  
//   })),

  healthFormData: null,
  setHealthFormData: (data) => set((state) => ({ healthFormData: { ...state.healthFormData, ...data } })),
 
  notifications: 0, // Add notifications state
  incrementNotifications: () =>
    set((state) => {
      const newCount = state.notifications + 1;
      console.log("Incrementing notifications:", newCount);
      return { notifications: newCount };
    }),
  resetNotifications: () =>
    set(() => {
      console.log("Resetting notifications to 0");
      return { notifications: 0 };
    }),

}));

 
 
 

export default useThemeStore;
