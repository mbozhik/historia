import {create} from 'zustand'

interface SessionStore {
  session: any | null
  setSession: (session: any) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({session}),
}))
