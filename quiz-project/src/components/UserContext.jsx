/* eslint-disable react/prop-types */
// This component will hold the context for the user's name.

import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [name, setName] = useState("");

    return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>
}