import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { THEME_CONTEXT_NAME } from '../config/defaultValues';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface IThemeContext {
  dispatch?: React.Dispatch<IThemeAction>;
  state: Theme;
}

export interface IThemeAction {
  type: Theme;
}

const initialState =
  localStorage.theme === Theme.dark ||
  (!(THEME_CONTEXT_NAME in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? Theme.dark
    : Theme.light;

const themeReducer = (state: Theme, action: IThemeAction) => {
  switch (action.type) {
    case Theme.light:
      localStorage.removeItem(THEME_CONTEXT_NAME);
      return Theme.light;
    case Theme.dark:
      localStorage.setItem(THEME_CONTEXT_NAME, Theme.dark);
      return Theme.dark;
    default:
      return state;
  }
};

export const ThemeContext = createContext<IThemeContext>({
  state: initialState,
});

export interface IThemeProvider {
  children: ReactNode;
}

export function ThemeProvider({ children }: IThemeProvider) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    if (state === Theme.dark) {
      document.documentElement.classList.add(Theme.dark);
    } else {
      document.documentElement.classList.remove(Theme.dark);
    }
  }, [state]);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}
