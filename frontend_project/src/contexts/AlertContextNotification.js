import { createContext, useState } from "react";

export const AlertContextNotification = createContext();

const NotificationCTX = ({ children }) => {
  const [data, setData] = useState({
    open: false,
    message: "",
    success: null
  });
  const toggleOn = (message, success) => {
    setData({
      open: true,
      message,
      success
    });
  };
  const toggleOff = (reason) => {
    setData({
      open: false,
      message: "",
      success: null
    });
  };
  return (
    <AlertContextNotification.Provider
      value={{
        open: data.open,
        message: data.message,
        success: data.success,
        toggleOff,
        toggleOn
      }}
    >
      {children}
    </AlertContextNotification.Provider>
  );
};

export default NotificationCTX;