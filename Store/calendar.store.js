import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useStore = create(
  persist(
    (set, get) => ({
      attendance: {},
      attendanceTracker : { present : 0 , absent : 0},

      
       attendancePerc : () => {
        const {present , absent} = get().attendanceTracker;
        if(present + absent === 0) return 0 ;
        return Math.floor((present/(present + absent)) * 100)
      },
      
    // ({ attendance : { ...state.attendance , [date] : "present"}})
      markPresent : (date) => set((state) => {
        const newStatus = { attendance : { ...state.attendance , [date] : "present"}}
        return newStatus;
      } ),
      markAbsent : (date) => set((state) => ({attendance : { ...state.attendance , [date] : "absent"}})),


      clearAttendance : (date) => set((state) => {
        
        const newAttendance = {  ...state.attendance};
        delete newAttendance[date];
         if(state.attendance[date] === "present"){
          return {attendanceTracker : { ...state.attendanceTracker ,present: state.attendanceTracker.present - 1 } , attendance : newAttendance}
        }else if(state.attendance[date] === "absent"){
          return {attendanceTracker : { ...state.attendanceTracker , absent : state.attendanceTracker.absent - 1} , attendance : newAttendance}
        }
        

        
      }),

      presentAttendanceTracker : () => set((state) => ({attendanceTracker : { ...state.attendanceTracker ,present: state.attendanceTracker.present + 1 }})),
      absentAttendanceTracker : () => set((state) => ({ attendanceTracker : {  ...state.attendanceTracker , absent : state.attendanceTracker.absent + 1}})),
      
      
    }),
    {
      name: "calendar-storage", 
      storage: createJSONStorage(() => AsyncStorage),

      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        attendancePerc: currentState.attendancePerc, 
        markPresent: currentState.markPresent,
        markAbsent: currentState.markAbsent,
        clearAttendance: currentState.clearAttendance,
        presentAttendanceTracker: currentState.presentAttendanceTracker,
        absentAttendanceTracker: currentState.absentAttendanceTracker
      }),
    }
  )
);