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

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const searchTermLower = searchTerm.toLowerCase();

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

  const closeModal = () => {
    setShowModal(false);
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className={`whitespace-no-wrap ${row.status === 1 ? "text-green-500" :
                          row.status === 2 ? "text-yellow-500" :
                            row.status === 3 ? "text-red-500" :
                              "text-gray-900"
                          }`}>
                          {row.status === 1 ? "Active" :
                            row.status === 2 ? "Deactive" :
                              row.status === 3 ? "Terminated" :
                                "-"}
                        </p></td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/job_card/${row.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        {row.team_id &&
                          <button onClick={() => handleViewTeamClick(row)} className="text-green-600 hover:text-indigo-900">
                            View Team
                          </button>
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
    </PageComponent>
  );
}
