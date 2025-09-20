// calendar.store.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // root data: per-subject attendance
      // attendance: {
      //   [subjectId]: {
      //     days: { "2025-09-20": { present: 2, absent: 1 }, ... },
      //     attendanceTracker: { present: 3, absent: 1 }
      //   }
      // }
      attendance: {},

      // create subject attendance (call when you create a subject)
      addSubjectAttendance: (subjectId) =>
        set((state) => {
          if (state.attendance[subjectId]) return {}; // already exists
          return {
            attendance: {
              ...state.attendance,
              [subjectId]: { days: {}, attendanceTracker: { present: 0, absent: 0 } },
            },
          };
        }),

      // Migrate legacy data (string "present"/"absent") -> counts {present, absent}
      // Call this once after updating the store if you have old persisted data.
      migrateLegacy: () => {
        const att = get().attendance || {};
        let changed = false;
        const newAtt = { ...att };

        Object.keys(newAtt).forEach((subId) => {
          const sub = newAtt[subId];
          if (!sub) return;
          sub.days = sub.days || {};
          sub.attendanceTracker = sub.attendanceTracker || { present: 0, absent: 0 };

          Object.keys(sub.days).forEach((d) => {
            const val = sub.days[d];
            if (typeof val === "string") {
              changed = true;
              if (val === "present") {
                sub.days[d] = { present: 1, absent: 0 };
                sub.attendanceTracker.present = (sub.attendanceTracker.present || 0) + 1;
              } else if (val === "absent") {
                sub.days[d] = { present: 0, absent: 1 };
                sub.attendanceTracker.absent = (sub.attendanceTracker.absent || 0) + 1;
              } else {
                // unknown => reset
                sub.days[d] = { present: 0, absent: 0 };
              }
            } else {
              // already object; ensure keys exist
              sub.days[d].present = sub.days[d].present || 0;
              sub.days[d].absent = sub.days[d].absent || 0;
            }
          });
        });

        if (changed) {
          set({ attendance: newAtt });
        }
        return changed;
      },

      
      markPresent: (subjectId, date) =>
        set((state) => {
          const subject = state.attendance[subjectId] || {
            days: {},
            attendanceTracker: { present: 0, absent: 0 },
          };

          const currentDay = subject.days?.[date] || { present: 0, absent: 0 };
          const updatedDay = { ...currentDay, present: currentDay.present + 1 };

          const updatedTracker = {
            present: (subject.attendanceTracker?.present || 0) + 1,
            absent: subject.attendanceTracker?.absent || 0,
          };

          return {
            attendance: {
              ...state.attendance,
              [subjectId]: {
                ...subject,
                days: { ...subject.days, [date]: updatedDay },
                attendanceTracker: updatedTracker,
              },
            },
          };
        }),

    
      markAbsent: (subjectId, date) =>
        set((state) => {
          const subject = state.attendance[subjectId] || {
            days: {},
            attendanceTracker: { present: 0, absent: 0 },
          };

          const currentDay = subject.days?.[date] || { present: 0, absent: 0 };
          const updatedDay = { ...currentDay, absent: currentDay.absent + 1 };

          const updatedTracker = {
            present: subject.attendanceTracker?.present || 0,
            absent: (subject.attendanceTracker?.absent || 0) + 1,
          };

          return {
            attendance: {
              ...state.attendance,
              [subjectId]: {
                ...subject,
                days: { ...subject.days, [date]: updatedDay },
                attendanceTracker: updatedTracker,
              },
            },
          };
        }),

      // CLEAR attendance for a specific date (remove that date entirely from days
      // and subtract its counts from the tracker)
      clearAttendance: (subjectId, date) =>
        set((state) => {
          const subject = state.attendance[subjectId];
          if (!subject || !subject.days || !subject.days[date]) return {};

          const { present = 0, absent = 0 } = subject.days[date];
          const newDays = { ...subject.days };
          delete newDays[date];

          const newTracker = {
            present: Math.max(0, (subject.attendanceTracker?.present || 0) - present),
            absent: Math.max(0, (subject.attendanceTracker?.absent || 0) - absent),
          };

          return {
            attendance: {
              ...state.attendance,
              [subjectId]: {
                ...subject,
                days: newDays,
                attendanceTracker: newTracker,
              },
            },
          };
        }),

      
      removeAttendance: (subjectId) =>
        set((state) => {
          const newAttendance = { ...state.attendance };
          delete newAttendance[subjectId];
          return { attendance: newAttendance };
        }),

      getTracker: (subjectId) => {
        return get().attendance[subjectId]?.attendanceTracker || { present: 0, absent: 0 };
      },

     
      attendancePerc: (subjectId) => {
        const tracker = get().attendance[subjectId]?.attendanceTracker || { present: 0, absent: 0 };
        const { present, absent } = tracker;
        const total = present + absent;
        if (total === 0) return 0;
        return Math.round((present / total) * 100); 
      },

      
      avgAttendance: () => {
        const attendance = get().attendance || {};
        let totalPresent = 0;
        let totalLectures = 0;

        Object.values(attendance).forEach((sub) => {
          const tracker = sub?.attendanceTracker || { present: 0, absent: 0 };
          totalPresent += tracker.present;
          totalLectures += tracker.present + tracker.absent;
        });

        if (totalLectures === 0) return 0;
        return parseFloat(((totalPresent / totalLectures) * 100).toFixed(1));
      },
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
