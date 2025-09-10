import {create} from 'zustand';


export const useStore = create((set) => ({
    subjects: [],
    setSubject : (name) => set((state) => ({ subjects : [ ...state.subjects , { id : Date.now() , name: name}]})),
}))





