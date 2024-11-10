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
    user_id: "",
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
    delete payload.image_url;
    let res = null;
    if (id) {
      const editObject = {
        "id": jobCard.id,
        "assign_date": jobCard.assign_date,
        "task": jobCard.task,
        "customer_contact_no": jobCard.customer_contact_no,
        "user_id": selectedEmployee.value,
        "customer_id": selectedCustomer.value,
        "apartment_id": selectedApartment
      }
      res = axiosClient.put(`/job_card/${id}`, editObject);
    } else {
      res = axiosClient.post("/job_card", payload);
    }
    res
      .then((res) => {
        navigate("/job_cards");
        showToast(id ? "The Job card was updated" : "The Job card was created");
        const message = "Hi this is from FMMS, Your Job card created successfully, One of our team member will contact you soon."
        if (!id) {
          sendSmS(jobCard.customer_contact_no, message);
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };


  const onBackButton = () => {
    navigate("/job_cards");
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/job_card/${id}`).then(({ data }) => {
        setJobCard(data.data);
        setSelectedCustomer({ label: data.data.customer.first_name, value: data.data.customer.id });
        setSelectedApartment({ label: data.data.apartment.apt_no, value: data.data.apartment.id });
        setSelectedEmployee({ label: data.data.user.first_name, value: data.data.user.id });
        fetchApartments(data.data.customer?.id);
        setLoading(false);
      });
    }
  }, [id]);

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    if(selectedOption.value){
      fetchApartments(selectedOption.value);
    }
    setJobCard({ ...jobCard, customer_id: selectedOption?.value || "" });
  };

  const handleApartmentChange = (event) => {
const aprtmentId = event.target.value
    setSelectedApartment(aprtmentId);
    setJobCard({ ...jobCard, apartment_id: aprtmentId || "" });
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
    setJobCard({ ...jobCard, user_id: selectedOption?.value || "" });
  };

  const fetchCustomers = (inputValue) => {
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
    if (inputValue) {
      axiosClient.get(`/users?searchEngineers=${inputValue}`).then((response) => {
        setEmployeeOptions(
          response.data.map(employee => ({
            value: employee.id,
            label: employee.first_name + ' ' + employee.last_name + '-' + employee.designation,
          }))
        );
      }).catch((error) => {
        console.error('Error fetching employee options', error);
      });
    }
  };

  const fetchApartments = (customerId) => {
    // if (inputValue) {
      axiosClient.get(`/apartments/aprtmentsByCustomer?customer=${customerId}`).then((response) => {
        setApartmentOptions(
          response.data.map(apartment => ({
            value: apartment.id,
            label: apartment.apt_no + ' / ' + apartment.address_01,
          }))
        );
      }).catch((error) => {
        console.error('Error fetching customer options', error);
      });
    // }
  };

  const sendSmS = (mobileNo, message) => {
    axiosClient.get(`/sms?phoneNumber=${mobileNo}&message=${message}`).then((response) => {
      console.log("resp", response);

    }).catch((error) => {
      console.error('Error fetching customer options', error);
    });
  };

  return (
    <PageComponent
      title={!id ? "Create New Job Card" : "Edit Job Card"}
      buttons={

        <>
          <div className="flex gap-2">
            <TButton color="gray" onClick={onBackButton}>
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Back
            </TButton>
          </div>
        </>
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
                    isDisabled={id}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="apartments"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Apartments
                  </label>
                  {apartmentOptions.map((option, index) => (
                    <label key={index} className="mr-5 p-4 flex items-center">
                      <input
                        type="radio"
                        name="apartments"
                        value={option.value} 
                        onChange={handleApartmentChange}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
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
                    min={new Date().toISOString().split('T')[0]}
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
