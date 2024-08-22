import { Home, ShoppingBag, User } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/authSlice";
import { RootState } from "../store/store";

type Props = {};

const menu = [
  {
    menu: "Dashboard",
    link: "/",
    icon: <Home />,
  },
  {
    menu: "User",
    link: "/user",
    icon: <User />,
  },
];

const Sidebar = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="fixed shadow-lg top-0 left-0 right-auto bottom-0 py-10 px-5 w-[270px] rounded-tr-lg rounded-br-lg bg-white">
      <div className="flex flex-col justify-between h-full">
        <ul className="space-y-5">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => {
                return `flex items-center gap-x-2 border-b border-b-slate-200 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white p-5 font-bold"
                    : "bg-transparent p-5"
                }`;
              }}
            >
              <Home /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => {
                return `flex items-center gap-x-2 border-b border-b-slate-200 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white p-5 font-bold"
                    : "bg-transparent p-5"
                }`;
              }}
            >
              <ShoppingBag /> Products
            </NavLink>
          </li>
          {user && user.role === "admin" ? (
            <li>
              <p className="mb-2">Admin</p>
              <NavLink
                to="/users"
                className={({ isActive }) => {
                  return `flex items-center gap-x-2 border-b border-b-slate-200 rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white p-5 font-bold"
                      : "bg-transparent p-5"
                  }`;
                }}
              >
                <User /> Users
              </NavLink>
            </li>
          ) : null}
          <li>
            <button className="flex p-5 w-full font-semibold hover:text-white hover:rounded-lg hover:bg-blue-500" onClick={handleLogout}>Logout</button>
          </li>
          {/* <li>
            <NavLink
              to="/users"
              className={({ isActive }) => {
                return `flex items-center gap-x-2 border-b border-b-slate-200 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white p-5 font-bold"
                    : "bg-transparent p-5"
                }`;
              }}
            >
              <User /> Users
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
