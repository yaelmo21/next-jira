import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI-Open-Sidebar' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI-Close-Sidebar' });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: 'UI-SetIsAdding', payload: value });
  };

  const startDraggind = () => dispatch({ type: 'UI-Start Dragging' });
  const endDraggind = () => dispatch({ type: 'UI-End Dragging' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDraggind,
        endDraggind,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
