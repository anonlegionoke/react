import { createContext, useContext } from "react";


// PART 1
export const ThemeContext = createContext({
    themeMode: 'light',
    darkTheme: () => { },
    lightTheme: () => { },

});

// PART 2 we need a provider to put this into work

export const ThemeProvider = ThemeContext.Provider;

// PART 3 Now we create a custom made HOOK to use it everywhere by incorporating the useContext

export default function useTheme() {
    return useContext(ThemeContext);
}
