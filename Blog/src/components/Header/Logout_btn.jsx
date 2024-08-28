import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../service/auth";
function Logout_btn() {
  const dispatch = useDispatch();
  const logout_handler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div class="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
      <button class="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
        Logout
      </button>
    </div>
  );
}

export default Logout_btn;
