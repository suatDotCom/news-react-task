import React, {createContext, useReducer} from "react";
import newspaperReducer from './reducers/newspaperReducer'


const initialState = {
    newspapers: [],
    favoriteNewspapers: localStorage.getItem('favoriteNewspapers') || []
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(newspaperReducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;