"use client";

import React, { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("userInfo");
      setUserDetails(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("userInfoChanged", loadUser);
    return () => window.removeEventListener("userInfoChanged", loadUser);
  }, []);

  const toggleSubRows = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAllRows = (dataLength) => {
    const allExpanded =
      Object.keys(expandedRows).length === dataLength &&
      !Object.values(expandedRows).includes(false);
    const newExpandedRows = Array.from(
      { length: dataLength },
      (_, idx) => idx
    ).reduce((acc, idx) => {
      acc[idx] = !allExpanded;
      return acc;
    }, {});

    setExpandedRows(newExpandedRows);
  };

  const restFormatedDate = () => {
    setSelectedDate({
      from: new Date(),
      to: new Date(),
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        userDetails,
        setUserDetails,
        expandedRows,
        setExpandedRows,
        toggleSubRows,
        toggleAllRows,
        selectedDate,
        setSelectedDate,
        restFormatedDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
