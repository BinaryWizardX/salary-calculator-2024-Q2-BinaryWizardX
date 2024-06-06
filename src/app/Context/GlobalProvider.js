"use client";

import React, { useContext, useState ,createContext, use} from "react";


const GlobalContext = createContext();
const updateGlobalContext = createContext();


export function GlobalProvider({children}){

    const  [salary, setSalary] = useState(1000);


    return(
        <GlobalContext.Provider value={{salary, setSalary}}>
            <updateGlobalContext.Provider value={{setSalary}}>
                {children}
            </updateGlobalContext.Provider>
           
        </GlobalContext.Provider>

    )

    
}

export const  useGlobalContext = () => useContext(GlobalContext);
export const useUpdateGlobalContext = () => useContext(updateGlobalContext)