import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useStore = create(
  persist(
    (set, get) => ({
      
      attendance : {},

      addSubjectAttendance: (subjectId) => set((state) => ({
            attendance: {
              ...state.attendance,
              [subjectId]: { days: {}, attendanceTracker: { present: 0, absent: 0 } }
            }
          })),
      

      
       attendancePerc : (subjectId) => {
        const tracker = get().attendance[subjectId]?.attendanceTracker || { present : 0 , absent : 0};
        const { present , absent } = tracker;
        if(present + absent === 0) return 0 ;
        return Math.floor((present/(present + absent)) * 100)
      },
      
    
      markPresent : (subjectId ,date) => set((state) => {
      const newStatus =  {attendance: {
                  ...state.attendance,
                  [subjectId]: {
                    ...state.attendance[subjectId],
                    days: {
                      ...state.attendance[subjectId]?.days,
                      [date]: "present"
                    },
                    attendanceTracker: {
                      absent : (state.attendance[subjectId]?.attendanceTracker.absent || 0) ,
                      present: (state.attendance[subjectId]?.attendanceTracker.present || 0) + 1
                    }
                  }
                }}

        return newStatus;
      } ),
      markAbsent : (subjectId ,date) => set((state) => {
      const newStatus =  {attendance: {
                  ...state.attendance,
                  [subjectId]: {
                    ...state.attendance[subjectId],
                    days: {
                      ...state.attendance[subjectId]?.days,
                      [date]: "absent"
                    },
                    attendanceTracker: {
                      present : (state.attendance[subjectId]?.attendanceTracker.present || 0),
                      absent: (state.attendance[subjectId]?.attendanceTracker.absent || 0) + 1
                    }
                  }
                }}

        return newStatus;
      } ),


      clearAttendance : (subjectId,date) => set((state) => {
        
        const newAttendance = {  ...state.attendance[subjectId]?.days};
        delete newAttendance[date];

         if(state.attendance[subjectId]?.days[date] === "present"){

          return { attendance : {
            ...state.attendance, 
            [subjectId] : {
              ...state.attendance[subjectId],
             
                days : newAttendance,
              
              attendanceTracker: {
                ...state.attendance[subjectId]?.attendanceTracker,
                present: state.attendance[subjectId]?.attendanceTracker.present - 1 ,
              }

            }
          }}
        }else 
          if(state.attendance[subjectId]?.days[date] === "absent"){

          return { attendance : {
            ...state.attendance, 
            [subjectId] : {
              ...state.attendance[subjectId],
              
                days : newAttendance,
        
              attendanceTracker: {
                ...state.attendance[subjectId]?.attendanceTracker,
                absent: state.attendance[subjectId]?.attendanceTracker.absent - 1,
              }

            }
          }}
        

        
      }}),
      
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