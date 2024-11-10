import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import TButton from "../../components/core/TButton";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

import "./styles.css"; // Import your styles
import { useSelector } from "react-redux";
import ModalQuarter from "../../components/core/ModalQuarter.jsx";

export default function JobCards() {
  const { showToast } = useStateContext();
  const [jobCards, setJobCards] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const searchTermLower = searchTerm.toLowerCase();
  const [payment, setPayment] = useState({});
  const user = useSelector((state) => state.auth.user);

  // const onDeleteClick = (id) => {
  //   if (window.confirm("Are you sure you want to delete this customer?")) {
  //     axiosClient.delete(`/customer/${id}`).then(() => {
  //       getCustomers();
  //       showToast('The customer was deleted');
  //     });
  //   }
  // };

  const onPageClick = (link) => {
    getJobCards(link.url);
  };

  const getJobCards = (url) => {
    url = url || "/job_card";
    setLoading(true);
    const params = user.id ? { user_id: user.id } : {};
    axiosClient.get(url, { params }).then(({ data }) => {
      setJobCards(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getJobCards();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = jobCards.filter((item) =>
  (item.customer.first_name.toLowerCase().includes(searchTermLower) ||
    (item.apartment && item.apartment.apt_no && item.apartment.apt_no.toString().toLowerCase().includes(searchTermLower)))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewTeamClick = (jobCard) => {
    setSelectedJobCard(jobCard);
    setShowModal(true);
  };

  const handlePaymentClick = (jobCard) => {
    setSelectedJobCard(jobCard);
    setShowPaymentModal(true);
  };

  const handlePaymentModelClick = async () => {
    const payload = { ...payment, job_card_id: selectedJobCard?.id };
    try {
      const response = await axiosClient.post("/payment", payload);
      closeModal();
      showToast("Payment added Successfully");
      navigate("/job_cards");
    } catch (err) {
      console.error("Error finishing job card:", err);
      if (err && err.response) {
        showToast("Please contact admin");
        closeModal();
        setError(err.response.data.message);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPaymentModal(false);
    setSelectedJobCard(null);
    setPayment({});
  };

  return (
    <PageComponent
      title="Job Cards"
      buttons={
        <>
          {user.level !== "1" || user.level !== "2" &&
            <TButton color="green" to="/job_card/create">
              <PlusCircleIcon className="h-6 w-6 mr-2" />
              Create New
            </TButton>
          }
        </>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="my-2 flex sm:flex-row flex-col justify-between">
            <div></div> {/* Empty div to push the search input to the right */}
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Job Card
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Apartment No
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Assign
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Designation
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Assigned Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Created By
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">J-00{row.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.customer?.first_name} {row.customer.last_name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.apartment?.apt_no || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.task || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.user?.first_name || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.user?.designation || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.assign_date || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.created_at || "N/A"}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
                        <p className={`whitespace-no-wrap 
                        ${row.status === "1" ? "text-yellow-500" :
                            row.status === "2" ? "text-yellow-500" :
                              row.status === "3" ? "text-yellow-500" :
                                row.status === "4" ? "text-green-500" :
                                  "text-gray-900"
                          }`}>
                          {row.status === "1" ? "Assign to Engineer" :
                            row.status === "2" ? "Team Assigned" :
                              row.status === "3" ? "Engineer Finished" :
                                row.status === "4" ? "Payment Done" :
                                  "-"}
                        </p></td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
                        {(row.status === "1" || row.status === "2") &&
                          <Link
                            to={`/job_card/${row.id}`}
                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-1 border-b-4 border-yellow-700 hover:border-yellow-500 rounded  w-24"
                          >
                            Edit
                          </Link>
                        }
                        {row.team_id &&
                          <button onClick={() => handleViewTeamClick(row)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded w-24">
                            View Team
                          </button>
                        }
                        {row.status === "3" &&
                          <button onClick={() => handlePaymentClick(row)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded w-24">
                            Payment
                          </button>
                        }
                        {(row.status === "4") &&
                          <lable> - </lable>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {indexOfFirstRow + 1} to {indexOfLastRow < filteredData.length ? indexOfLastRow : filteredData.length} of {filteredData.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  {[...Array(Math.ceil(filteredData.length / rowsPerPage)).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`text-sm px-4 py-2 leading-none border rounded ${currentPage === number + 1 ? 'text-white bg-blue-500' : 'text-gray-600 bg-white'
                        } hover:bg-gray-200`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalQuarter show={showModal} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">
          Customer Name: {selectedJobCard?.customer?.first_name} {selectedJobCard?.customer?.last_name}
        </h2>
        <hr></hr>
        <h3 className="text-xl m-4 text-gray-700">
          Engineer Name: {selectedJobCard?.user?.first_name} {selectedJobCard?.user?.last_name}
        </h3>

        <p className="text-lg font-medium m-4 text-gray-700">Assigned Team,</p>
        <ul className="list-disc list-inside ml-8">
          {(selectedJobCard?.team_members?.length ?? 0) > 0 ? (
            selectedJobCard.team_members.map((worker) => (
              <li key={worker.id} className="text-gray-700 text-lg">
                {worker.first_name} {worker.last_name} - {worker.designation} - {worker.contact_no}
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No workers assigned to this team.</p>
          )}
        </ul>
      </ModalQuarter>
      <ModalQuarter show={showPaymentModal} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">
          Payment & Close the Job Card
        </h2>
        <hr></hr>
        <div className="col-span-6 sm:col-span-3 mt-5">
          <label
            htmlFor="method"
            className="block text-sm font-medium text-gray-700"
          >
            Method
          </label>
          <input
            type="text"
            name="method"
            id="method"
            value={payment.method}
            onChange={(ev) =>
              setPayment({ ...payment, method: ev.target.value })
            }
            placeholder="Method"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-3 mt-5">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Total Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={payment.amount}
            onChange={(ev) =>
              setPayment({ ...payment, amount: ev.target.value })
            }
            placeholder="Amount"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-3 mt-5">
          <label
            htmlFor="remark"
            className="block text-sm font-medium text-gray-700"
          >
            Remark
          </label>
          <input
            type="text"
            name="remark"
            id="remark"
            value={payment.remark}
            onChange={(ev) =>
              setPayment({ ...payment, remark: ev.target.value })
            }
            placeholder="remark"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-5 flex justify-center">
          <TButton color="green" onClick={handlePaymentModelClick}>
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Payment
          </TButton>
        </div>
      </ModalQuarter>
    </PageComponent>
  );
}
