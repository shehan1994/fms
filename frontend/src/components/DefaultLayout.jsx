import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useDispatch } from 'react-redux';
import Toast from "./Toast";

const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Apartments", to: "/apartments" },
  { name: "Employees", to: "/users" },
  { name: "Customers", to: "/customers" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, userToken, setCurrentUser, showToast } = useStateContext();

  console.log("currentUser", currentUser);
  console.log("userToken", userToken);

  if (!userToken) {
    return <Navigate to="login" />;
  }

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient
      .post('/logout')
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          dispatch(loginFailure(finalErrors.join('<br>')));
        }
      });
  };

  const onJobClick = (ev) => {
    navigate("/job/create");
  };

  const onJobCardClick = (ev) => {
    navigate("/job_cards");
  };

  const onEngineerJobCardClick = (ev) => {
    navigate("/engineer_job_cards");
  };

  const userManage = (ev) => {
    ev.preventDefault();
    showToast("Please contact Admin", "warning");
  };

  useEffect(() => {
    axiosClient.get('/me')
      .then(({ data }) => {
        setCurrentUser(data);
      });
  }, []);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-center font-bold tracking-tight text-white text-3xl">
                    FMMS
                  </h1>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <Menu as="div" className="relative ml-3">
                        <Menu.Button className="px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                          Job Card
                        </Menu.Button>
                        {(currentUser?.level === "1" || currentUser?.level === "2" || currentUser?.level === "3") && (
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {(currentUser?.level === "1" || currentUser?.level === "2") && (
                              <Menu.Item>
                                <a href="#" onClick={onJobCardClick} className="block px-4 py-2 text-sm text-gray-700">
                                  Job Card
                                </a>
                              </Menu.Item>
                            )}
                            {currentUser?.level === "3" && (
                              <Menu.Item>
                                <a href="#" onClick={onEngineerJobCardClick} className="block px-4 py-2 text-sm text-gray-700">
                                  Engineer Job Card
                                </a>
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-5">
                  <div className="ml-3">
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {currentUser ? currentUser.email : ""}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">


                          <Menu.Item>
                            <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                          </Menu.Item>
                          <Menu.Item>
                            <a href="#" onClick={userManage} className="block px-4 py-2 text-sm text-gray-700">User Management</a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {/* <UserIcon className="w-8 h-8 bg-black/25 p-2 rounded-full text-white" /> */}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {currentUser ? currentUser.name : "Loading..."}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {currentUser ? currentUser.email : ""}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={logout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
      <Toast />
    </div>
  );
}
