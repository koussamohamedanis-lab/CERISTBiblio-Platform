/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ results, setResults, loading, setLoading, searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
}