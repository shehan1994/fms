import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function CustomerView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    passport_no: "",
    nic: "",
    email: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...customer };
    /**/delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/customer/${id}`, payload);
    } else {
      res = axiosClient.post("/customer", payload);
    }

    res
      .then((res) => {
        navigate("/customers");
        if (id) {
          showToast("The customer was updated");
        } else {
          showToast("The customer was created");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };


  const onBackButton = () => {
    navigate("/customers");
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

  return (
    <PageComponent
      title={!id ? "Create New Customer" : "Edit Customer"}
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
                    value={customer.first_name}
                    onChange={(ev) =>
                      setCustomer({...customer, first_name: ev.target.value})
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
                    value={customer.last_name}
                    onChange={(ev) =>
                      setCustomer({...customer, last_name: ev.target.value})
                    }
                    placeholder="Last Name"
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
                    value={customer.nic}
                    onChange={(ev) =>
                      setCustomer({...customer, nic: ev.target.value})
                    }
                    placeholder="NIC"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="passport_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passport NO.
                  </label>
                  <input
                    type="text"
                    name="passport_no"
                    id="passport_no"
                    value={customer.passport_no}
                    onChange={(ev) =>
                      setCustomer({...customer, passport_no: ev.target.value})
                    }
                    placeholder="Passport"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={customer.email}
                    onChange={(ev) =>
                      setCustomer({...customer, email: ev.target.value})
                    }
                    placeholder="E-mail"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={customer.dob}
                    onChange={(ev) =>
                      setCustomer({...customer, dob: ev.target.value})
                    }
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
