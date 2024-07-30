import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../../components/core/TButton.jsx";
import PageComponent from "../../components/PageComponent.jsx";
import axiosClient from "../../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function ApartmentView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [apartment, setApartment] = useState({
    customer_id: "",
    address_01: "",
    address_02: "",
    city: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    /*axiosClient.post(`/apartment`, {
      apt_no:"AP001",
      customer_id:1,
      address_01:"A1",
      address_02:"A2",
      city:"city",
      status:"1",

    });*/

    const payload = { ...apartment };
    /**/delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/apartment/${id}`, payload);
    } else {
      res = axiosClient.post("/apartment", payload);
    }

    res
      .then((res) => {
        console.log(res);
        navigate("/apartments");
        if (id) {
          showToast("The apartment was updated");
        } else {
          showToast("The apartment was created");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
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
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <PageComponent
      title={!id ? "Create new Apartment" : "Edit Apartment"}
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
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={apartment.customer_id}
                    onChange={(ev) =>
                      setApartment({...apartment, customer_id: ev.target.value})
                    }
                    placeholder="Customer"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment No
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={apartment.apt_no}
                    onChange={(ev) =>
                      setApartment({...apartment, apt_no: ev.target.value})
                    }
                    placeholder="Apartment No"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 01
                  </label>
                  <input
                    type="text"
                    name="nic"
                    id="nic"
                    value={apartment.address_01}
                    onChange={(ev) =>
                      setApartment({...apartment, address_01: ev.target.value})
                    }
                    placeholder="Address Line 01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address Line 02
                  </label>
                  <input
                    type="text"
                    name="nic"
                    id="nic"
                    value={apartment.address_02}
                    onChange={(ev) =>
                      setApartment({...apartment, address_02: ev.target.value})
                    }
                    placeholder="Address Line 02"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="passport_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="passport_no"
                    id="passport_no"
                    value={apartment.city}
                    onChange={(ev) =>
                      setApartment({...apartment, city: ev.target.value})
                    }
                    placeholder="City"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={apartment.email}
                    onChange={(ev) =>
                      setApartment({...apartment, status: ev.target.value})
                    }
                    placeholder="Status"
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
