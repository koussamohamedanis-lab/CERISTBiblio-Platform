import { createContext, useState, useContext } from "react";


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ results, setResults, loading, setLoading, searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);