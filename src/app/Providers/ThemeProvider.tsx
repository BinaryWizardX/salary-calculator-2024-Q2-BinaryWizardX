"use client";

import React from 'react'
import { GlobalProvider } from '../Context/GlobalProvider';


interface Props {
    children: React.ReactNode
}


function ThemeProvider({children} : Props) {
  return (
    <GlobalProvider >
        {children}
        
    </GlobalProvider>
  )
}

export default ThemeProvider