import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from '../axios.js'
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Select from 'react-select';

export default function Signup() {
  const navigate = useNavigate();
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [employee, setEmployee] = useState({});

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Deactive' },
    { value: 3, label: 'Terminate' },
  ];

  const backgroundStyle = {
    backgroundImage: "url('/wall03.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    ev.preventDefault();
    const payload = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      password: employee.password,
      password_confirmation: employee.passwordConfirmation,
      level: employee.level,
      contact_no: employee.contact_no,
      terminate_date: employee.terminate_date,
      designation: employee.designation,
      nic: employee.nic,
      status: employee.status,
      join_date: employee.join_date,
    };
    delete payload.image_url;

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') })
        }
        console.error(error)
      });
  };

  return (
    <>

      <div style={backgroundStyle}></div>
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md mx-auto mt-32 z-20 relative">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create New User
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login with your account
          </Link>
        </p>

        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
        </div>)}

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="col-span-6 sm:col-span-3">
              {/* <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label> */}
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={employee.first_name}
                onChange={(ev) =>
                  setEmployee({ ...employee, first_name: ev.target.value })
                }
                placeholder="First Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={employee.last_name}
                onChange={(ev) =>
                  setEmployee({ ...employee, last_name: ev.target.value })
                }
                placeholder="Last Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">

              <Select
                options={[
                  { value: "2", label: 'Level 2' },
                  { value: '3', label: 'Level 3' },
                  { value: "4", label: 'Level 4' },
                  { value: "5", label: 'Level 5' },
                ]}
                value={employee.level ? { value: employee.level, label: `Level ${employee.level}` } : null}
                onChange={(selectedOption) =>
                  setEmployee({ ...employee, level: selectedOption.value })
                }
                className="mt-1 block w-full"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <input
                type="text"
                name="contact_no"
                id="contact_no"
                value={employee.contact_no}
                onChange={(ev) =>
                  setEmployee({ ...employee, contact_no: ev.target.value })
                }
                placeholder="Contact No"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">

              <input
                type="text"
                name="designation"
                id="designation"
                value={employee.designation}
                onChange={(ev) =>
                  setEmployee({ ...employee, designation: ev.target.value })
                }
                placeholder="Designation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">

              <input
                type="text"
                name="email"
                id="email"
                value={employee.email}
                onChange={(ev) =>
                  setEmployee({ ...employee, email: ev.target.value })
                }
                placeholder="Email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">

              <input
                type="text"
                name="nic"
                id="nic"
                value={employee.nic}
                onChange={(ev) =>
                  setEmployee({ ...employee, nic: ev.target.value })
                }
                placeholder="NIC"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <input
                type="date"
                name="join_date"
                id="join_date"
                value={employee.join_date}
                onChange={(ev) =>
                  setEmployee({ ...employee, join_date: ev.target.value })
                }
                placeholder="Join Date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                options={statusOptions}
                value={statusOptions.find(option => option.value === employee.status)}
                onChange={(selectedOption) =>
                  setEmployee({ ...employee, status: selectedOption.value })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={employee.password}
                onChange={(ev) =>
                  setEmployee({ ...employee, password: ev.target.value })
                }
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password-confirmation" className="sr-only">
                Password Confirmation
              </label>
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                required
                value={employee.passwordConfirmation}
                onChange={(ev) =>
                  setEmployee({ ...employee, passwordConfirmation: ev.target.value })
                }
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password Confirmation"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
