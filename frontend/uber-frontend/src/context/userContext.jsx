import { createContext, useContext, useState } from "react";
const UserContext = createContext();
export const UserProvider = (prop)=>{
    const [user,setUser] = useState({ is_login:true  });
    const updateUser = (value)=>{
        setUser({
            ...value,
            is_login:false
        })
    }
    const logout = ()=>{
      setUser({
        is_login:false
      });
    }
    return (
        <UserContext.Provider value={{ user:JSON.stringify(user), updateUser,logout }}>
          {prop.children}
        </UserContext.Provider>
      );

}
export const useUser = ()=> useContext(UserContext); 
