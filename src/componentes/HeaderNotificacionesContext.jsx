import React, { createContext, useState, useContext } from 'react';

const HeaderNotificationsContext = createContext();

export const HeaderNotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});

  const addNotification = (key, count) => {
    setNotifications(prev => ({ ...prev, [key]: count }));
  };

  const removeNotification = (key) => {
    setNotifications(prev => {
      const newNotifications = { ...prev };
      delete newNotifications[key];
      return newNotifications;
    });
  };

  return (
    <HeaderNotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </HeaderNotificationsContext.Provider>
  );
};

export const useHeaderNotifications = () => {
  return useContext(HeaderNotificationsContext);
};
