import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Select from 'react-select';

export default function UserView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  }

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Deactive' },
    { value: 3, label: 'Terminate' },
  ];

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...user };
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/user/${id}`, payload);
    } else {
      res = axiosClient.post("/signup", payload);
    }

    res
      .then((res) => {
        navigate("/users");
        showToast(id ? "The employee was updated" : "The employee was created");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };

  const onBackButton = () => {
    navigate("/users");
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/user/${id}`).then(({ data }) => {
        const userData = data.data;
        userData.join_date = formatDate(userData.join_date);
        setUser(userData);
        setLoading(false);
      });
    }
  }, [id]);


  return (
    <PageComponent
      title={!id ? "Create New Employee" : "Edit Employee"}
      buttons={
        <div className="flex gap-2">
          <TButton color="gray" onClick={onBackButton}>
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </TButton>
        </div>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="max-w-2xl mx-auto">
          <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {error && (
                  <div className="bg-red-500 text-white py-3 px-3">{error}</div>
                )}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={user.first_name}
                    onChange={(ev) =>
                      setUser({ ...user, first_name: ev.target.value })
                    }
                    placeholder="First Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={user.last_name}
                    onChange={(ev) =>
                      setUser({ ...user, last_name: ev.target.value })
                    }
                    placeholder="Last Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <Select
                    options={[
                      { value: "1", label: 'Level 1' },
                      { value: "2", label: 'Level 2' },
                      { value: '3', label: 'Level 3' },
                      { value: "4", label: 'Level 4' },
                      { value: "5", label: 'Level 5' },
                    ]}
                    value={user.level ? { value: user.level, label: `Level ${user.level}` } : null}
                    onChange={(selectedOption) =>
                      setUser({ ...user, level: selectedOption.value })
                    }
                    className="mt-1 block w-full"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="contact_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact No
                  </label>
                  <input
                    type="text"
                    name="contact_no"
                    id="contact_no"
                    value={user.contact_no}
                    onChange={(ev) =>
                      setUser({ ...user, contact_no: ev.target.value })
                    }
                    placeholder="Contact No"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    value={user.designation}
                    onChange={(ev) =>
                      setUser({ ...user, designation: ev.target.value })
                    }
                    placeholder="Designation"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={(ev) =>
                      setUser({ ...user, email: ev.target.value })
                    }
                    placeholder="Email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(ev) =>
                      setUser({ ...user, password: ev.target.value })
                    }
                    placeholder="Password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="password-confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={user.password_confirmation}
                    onChange={(ev) =>
                      setUser({ ...user, password_confirmation: ev.target.value })
                    }
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password Confirmation"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    NIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    id="nic"
                    value={user.nic}
                    onChange={(ev) =>
                      setUser({ ...user, nic: ev.target.value })
                    }
                    placeholder="NIC"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="join_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="join_date"
                    id="join_date"
                    value={user.join_date}
                    onChange={(ev) =>
                      setUser({ ...user, join_date: ev.target.value })
                    }
                    placeholder="Join Date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <Select
                    options={statusOptions}
                    value={statusOptions.find(option => option.value === user.status)}
                    onChange={(selectedOption) =>
                      setUser({ ...user, status: selectedOption.value })
                    }
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end px-4 py-3">
                <TButton type="submit">Save</TButton>
              </div>
            </div>
          </form>
        </div>
      )}
    </PageComponent>
  );
}
