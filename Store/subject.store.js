import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSubject = create(
  persist(
    (set, get) => ({
      subjects: [],
      setSubject: (name) =>
        set((state) => ({
          subjects: [...state.subjects, { id: Date.now(), name,  }],
        })),
      removeSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "subject-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);



