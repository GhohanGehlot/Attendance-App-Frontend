import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useStore = create(
  persist(
    (set, get) => ({
      attendance: {},
      attendanceTracker : { present : 0 , absent : 0},
      
    
      markPresent : (date) => set((state) => ({ attendance : { ...state.attendance , [date] : "present"}})),
      markAbsent : (date) => set((state) => ({attendance : { ...state.attendance , [date] : "absent"}})),
      clearAttendance : (date) => set((state) => {
        const newAttendance = {...state.attendance};
        delete newAttendance[date];
        return { attendance : newAttendance};
      }),

      presentAttendanceTracker : () => set((state) => ({attendanceTracker : { ...state.attendanceTracker ,present: state.attendanceTracker.present + 1 }})),
      absentAttendanceTracker : () => set((state) => ({ attendanceTracker : {  ...state.attendanceTracker , absent : state.attendanceTracker.absent + 1}})),
      clearAttendanceTracker : (date) => set((state) => {
        if(state.attendance[date] === "present"){
          return {attendanceTracker : { ...state.attendanceTracker ,present: state.attendanceTracker.present - 1 }}
        }else if(state.attendance[date] === "absent"){
          return {attendanceTracker : { ...state.attendanceTracker , absent : state.attendanceTracker.absent - 1}}
        }
      })


    }),
    {
      name: "calendar-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);