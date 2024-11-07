import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Select from 'react-select';

export default function ApartmentView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [apartment, setApartment] = useState({
    customer_id: "",
    address_01: "",
    address_02: "",
    city: "",
    district: "",
    province: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    setApartment({ ...apartment, customer_id: selectedOption?.value || "" });
  };

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Deactive' },
    { value: 3, label: 'Terminate' },
  ];

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...apartment };
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/apartment/${id}`, payload);
    } else {
      res = axiosClient.post("/apartment", payload);
    }

    res
      .then((res) => {
        navigate("/apartments");
        showToast(id ? "The apartment was updated" : "The apartment was created");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };

  const onBackButton = () => {
    navigate("/apartments");
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/apartment/${id}`).then(({ data }) => {
        setApartment(data.data);
        setSelectedCustomer({
          value: data.data.customer_id,
          label: data.data.customer_name, // Assuming you have a customer_name field
        });
        setLoading(false);
      });
    }
  }, [id]);


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

  return (
    <PageComponent
      title={!id ? "Create New Apartment" : "Edit Apartment"}
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
                    onInputChange={fetchCustomers}  // Fetch new customer options based on search input
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address_01"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 01
                  </label>
                  <input
                    type="text"
                    name="address_01"
                    id="address_01"
                    value={apartment.address_01}
                    onChange={(ev) =>
                      setApartment({ ...apartment, address_01: ev.target.value })
                    }
                    placeholder="Address Line 01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address_02"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 02
                  </label>
                  <input
                    type="text"
                    name="address_02"
                    id="address_02"
                    value={apartment.address_02}
                    onChange={(ev) =>
                      setApartment({ ...apartment, address_02: ev.target.value })
                    }
                    placeholder="Address Line 02"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={apartment.city}
                    onChange={(ev) =>
                      setApartment({ ...apartment, city: ev.target.value })
                    }
                    placeholder="City"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700"
                  >
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    value={apartment.district}
                    onChange={(ev) =>
                      setApartment({ ...apartment, district: ev.target.value })
                    }
                    placeholder="District"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    value={apartment.province}
                    onChange={(ev) =>
                      setApartment({ ...apartment, province: ev.target.value })
                    }
                    placeholder="Province"
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
                    value={statusOptions.find(option => option.value === apartment.status)}
                    onChange={(selectedOption) =>
                      setApartment({ ...apartment, status: selectedOption.value })
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
