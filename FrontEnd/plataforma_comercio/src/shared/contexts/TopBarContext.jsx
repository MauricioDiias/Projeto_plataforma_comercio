import { createContext, useState } from "react";

export const TopBarContext = createContext();

// eslint-disable-next-line react/prop-types
export const TopBarProvider = ({ children }) => {
  const [titleTopBar, setTitleTopBar] = useState();
  return (
    <TopBarContext.Provider value={{ titleTopBar, setTitleTopBar }}>
      {children}
    </TopBarContext.Provider>
  );
};
