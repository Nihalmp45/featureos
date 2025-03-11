import { create } from 'zustand';

const useRoadmapStore = create((set) => ({
  planned: [],
  inProgress: [],
  completed: [],
  
  setAllData: (groupedData) => {
    const { planned, inProgress, completed } = groupedData;

    set({ planned, inProgress, completed });
}
}));

export default useRoadmapStore;
