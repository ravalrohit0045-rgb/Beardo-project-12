import { useSelector } from "react-redux";

export default function useAuth() {

  const { isLogin, currentUser } = useSelector(
    (state) => state.user
  );

  return {
    isLogin,
    currentUser,
  };

}