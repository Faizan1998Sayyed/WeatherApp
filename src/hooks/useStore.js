import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  setData: (data) =>
    set(() => ({
      data: data,
    })),
}));

export default useStore;
