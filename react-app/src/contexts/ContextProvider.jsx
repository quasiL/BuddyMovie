import {createContext, useContext, useMemo, useState} from "react";

const StateContext = createContext({
  token: null,
  setToken: () => {}
});

export const ContextProvider = ({children}) => {
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));


  const setToken = (token) => {
    _setToken(token);
    if (token.length !== 0) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const memo = useMemo(() => ({token: token, setToken: setToken}), []);
  return (
    <StateContext.Provider value={{token, setToken}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);