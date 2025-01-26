import { create } from "zustand";

export const useUserStore = create((set) => ({
  token: null,
  user: null,

  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
  logout: () => set(() => ({ token: null, user: null })),
}));
