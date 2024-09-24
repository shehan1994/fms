import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Select from 'react-select';

export default function JobCardView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobCard, setJobCard] = useState({
    customer_id: "",
    apartment_id: "",
    employee_id: "",
    task: "",
    assign_date: "",
    customer_contact_no: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [apartmentOptions, setApartmentOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...jobCard };
    console.log("paylod", payload);
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/job_card/${id}`, payload);
    } else {
      res = axiosClient.post("/job_card", payload);
    }
    res
      .then((res) => {
        console.log(res);
        navigate("/");
        showToast(id ? "The apartment was updated" : "The apartment was created");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });
  };


  const onBackButton = () => {
    navigate("/job_cards");
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/customer/${id}`).then(({ data }) => {
        setCustomer(data.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    setJobCard({ ...jobCard, customer_id: selectedOption?.value || "" });
  };

  const handleApartmentChange = (selectedOption) => {
    setSelectedApartment(selectedOption);
    setJobCard({ ...jobCard, apartment_id: selectedOption?.value || "" });
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
    setJobCard({ ...jobCard, employee_id: selectedOption?.value || "" });
  };

  const fetchCustomers = (inputValue) => {
    console.log("feching call", inputValue);
    if (inputValue) {
      axiosClient.get(`/customers?search=${inputValue}`).then((response) => {
        setCustomerOptions(
          response.data.map(customer => ({
            value: customer.id,
            label: customer.first_name + ' ' + customer.last_name,
          }))
        );
      }).catch((error) => {
        console.error('Error fetching customer options', error);
      });
    }
  };

  const fetchEmployees = (inputValue) => {
    console.log("feching call", inputValue);
    if (inputValue) {
      axiosClient.get(`/employee?search=${inputValue}`).then((response) => {
        console.log("after empo seach", response);
        setEmployeeOptions(
          response.data.data.map(employee => ({
            value: employee.id,
            label: employee.first_name + ' ' + employee.last_name + '-' + employee.designation,
          }))
        );
      }).catch((error) => {
        console.error('Error fetching employee options', error);
      });
    }
  };

  const fetchApartments = (inputValue) => {
    if (inputValue) {
      console.log("cust value", selectedCustomer.value);
      axiosClient.get(`/apartments?customer=${selectedCustomer.value}&search=${inputValue}`).then((response) => {
        console.log("resp", response);
        setApartmentOptions(
          response.data.map(apartment => ({
            value: apartment.id,
            label: apartment.apt_no + ' ' + apartment.address_01,
          }))
        );
      }).catch((error) => {
        console.error('Error fetching customer options', error);
      });
    }
  };

  return (
    <PageComponent
      title={!id ? "Create new Job Card" : "Edit Job Card"}
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
                    htmlFor="customer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Name
                  </label>
                  <Select
                    id="customer"
                    value={selectedCustomer}
                    onChange={handleCustomerChange}
                    options={customerOptions}
                    placeholder="Select a customer"
                    onInputChange={fetchCustomers}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment
                  </label>
                  <Select
                    id="apartment"
                    value={selectedApartment}
                    onChange={handleApartmentChange}
                    options={apartmentOptions}
                    placeholder="Select a Apartment"
                    onInputChange={fetchApartments}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="employee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assign To
                  </label>
                  <Select
                    id="employee"
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                    options={employeeOptions}
                    placeholder="Select a employee"
                    onInputChange={fetchEmployees}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="job_task"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job / Task
                  </label>
                  <input
                    type="text"
                    name="job_task"
                    id="job_task"
                    value={jobCard.task}
                    onChange={(ev) =>
                      setJobCard({ ...jobCard, task: ev.target.value })
                    }
                    placeholder="Search Job"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="assign_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assign Date
                  </label>
                  <input
                    type="date"
                    name="assign_date"
                    id="assign_date"
                    value={jobCard.assign_date}
                    onChange={(ev) =>
                      setJobCard({ ...jobCard, assign_date: ev.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={jobCard.customer_contact_no}
                    onChange={(ev) =>
                      setJobCard({ ...jobCard, customer_contact_no: ev.target.value })
                    }
                    placeholder="Contact Number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
