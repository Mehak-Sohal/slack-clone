import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

//This is our data-layer which has some initialState, reducer, children
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//This is how we access data from data-layer
export const useStateValue = () => useContext(StateContext);
