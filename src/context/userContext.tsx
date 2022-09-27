import React, { createContext, useState, useEffect } from "react";

interface AppContextInterface {
  user?: any[];
  userName: string;
  userId: string;
  admin?: any[];
}

type props = {
  children: JSX.Element[] | JSX.Element;
};
export const UserContext = createContext<Partial<AppContextInterface>>({});

const UserContextProvider = (props: props) => {
  const [user, setUser] = useState<any>([]);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [admin, setAdmin] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("student") || '""');
    setRefresh(true);
    if (userData) {
      console.log(userData.student);
      setUser(userData.student);
      setUserId(userData.student[0].stuid);
      setUserName(userData.student[0].name);
    }
    // console.log(user);
  }, [refresh]);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin") || '""');
    // console.log(adminData);
    setRefresh(true);
    if (adminData) {
      setAdmin(adminData.admin);
    }
  }, [refresh]);

  const value = { user, userName, userId, admin };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
