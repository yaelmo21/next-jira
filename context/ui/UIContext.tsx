import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;
  startDraggind: () => void;
  endDraggind: () => void;
}

export const UIContext = createContext({} as ContextProps);
