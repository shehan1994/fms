import { useContext, createContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken } from '../redux/slices/authSlice';

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => { },
  setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    message: "",
    icon: "success",
    show: false
  });

  const setCurrentUser = (user) => {
    // Update user in state if needed
  };

  const showToast = (message, icon = "success") => {
    setToast({ message, icon, show: true });

    // Reset the toast state after showing it
    setTimeout(() => {
      setToast({ message: "", icon: "success", show: false });
    }, 3000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser: user,
        setCurrentUser,
        userToken: token,
        setUserToken: (token) => dispatch(setUserToken(token)),
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
