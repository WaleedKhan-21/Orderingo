import React,{createContext,useContext,useEffect} from 'react'

export const DropdownsContext = createContext()

export default function DropdownsProvider({children}) {
  return (
    <DropdownsContext.Provider value={{}}>
        {children}
    </DropdownsContext.Provider>
  )
}