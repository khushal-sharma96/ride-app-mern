import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();
export const UserProvider = (prop) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : { is_login: false }
  });
  // For login.....
  const updateUser = (value) => {
    let token = user?.token;
    const updatedUser = {
      ...value,
      is_login: true
    };
    if (token && !updatedUser?.token)
      updatedUser.token = token;
    setUser(updatedUser)
  }
  // For logout the user....
  const logout = () => {
    setUser({
      is_login: false
    });
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{ user: JSON.stringify(user), updateUser, logout }}>
      {prop.children}
    </UserContext.Provider>
  );

}
export const useUser = () => useContext(UserContext); 
