import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Select from 'react-select';

export default function EmployeeView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    address_01: "",
    address_02: "",
    city: "",
    nic: "",
    status: "", // Ensure status is still in the employee state
  });

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
    const payload = { ...employee };
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/employee/${id}`, payload);
    } else {
      res = axiosClient.post("/employee", payload);
    }

    res
      .then((res) => {
        navigate("/employees");
        showToast(id ? "The employee was updated" : "The employee was created");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };

  const onBackButton = () => {
    navigate("/employees");
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/employee/${id}`).then(({ data }) => {
        const employeeData = data.data;

        // Format the dob and join_date to "yyyy-MM-dd" format
        employeeData.dob = formatDate(employeeData.dob);
        employeeData.join_date = formatDate(employeeData.join_date);

        setEmployee(employeeData);
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
                    value={employee.first_name}
                    onChange={(ev) =>
                      setEmployee({ ...employee, first_name: ev.target.value })
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
                    value={employee.last_name}
                    onChange={(ev) =>
                      setEmployee({ ...employee, last_name: ev.target.value })
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
                    value={employee.level ? { value: employee.level, label: `Level ${employee.level}` } : null}
                    onChange={(selectedOption) =>
                      setEmployee({ ...employee, level: selectedOption.value })
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
                    value={employee.contact_no}
                    onChange={(ev) =>
                      setEmployee({ ...employee, contact_no: ev.target.value })
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
                    value={employee.designation}
                    onChange={(ev) =>
                      setEmployee({ ...employee, designation: ev.target.value })
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
                    value={employee.email}
                    onChange={(ev) =>
                      setEmployee({ ...employee, email: ev.target.value })
                    }
                    placeholder="Email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    value={employee.nic}
                    onChange={(ev) =>
                      setEmployee({ ...employee, nic: ev.target.value })
                    }
                    placeholder="NIC"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DOB
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={employee.dob}
                    onChange={(ev) =>
                      setEmployee({ ...employee, dob: ev.target.value })
                    }
                    placeholder="DOB"
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
                    value={employee.join_date}
                    onChange={(ev) =>
                      setEmployee({ ...employee, join_date: ev.target.value })
                    }
                    placeholder="Join Date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    age
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={employee.age}
                    onChange={(ev) =>
                      setEmployee({ ...employee, age: ev.target.value })
                    }
                    placeholder="Age"
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
                    value={statusOptions.find(option => option.value === employee.status)}
                    onChange={(selectedOption) =>
                      setEmployee({ ...employee, status: selectedOption.value })
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
