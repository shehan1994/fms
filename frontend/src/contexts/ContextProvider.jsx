import { useContext, createContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken } from '../redux/slices/authSlice'; // Assume this action is available in your Redux slice

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => { },
  setUserToken: () => { },
});

const tmpSurveys = [
  // Existing surveys data
];

export const ContextProvider = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [surveys, setSurveys] = useState(tmpSurveys);
  const [questionTypes] = useState(['text', "select", "radio", "checkbox", "textarea"]);
  const [toast, setToast] = useState({
    message: "",
    icon: "success",
    show: false
  });

  const setCurrentUser = (user) => {
    // Here you would normally set the user using dispatch if needed
    // dispatch(setCurrentUser(user)); 
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
        surveys,
        questionTypes,
        toast,
        showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
