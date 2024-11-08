import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios.js";
import TButton from "../../../components/core/TButton";
import PageComponent from "../../../components/PageComponent";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import Modal from "../../../components/core/Modal";
import { useSelector } from "react-redux";

export default function EngineerJobCards() {
  const { showToast } = useStateContext();
  const [jobCards, setJobCards] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const user = useSelector((state) => state.auth.user);

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

  const handleViewTeamClick = (jobCard) => {
    console.log("selected Job card ", jobCard);
    setSelectedJobCard(jobCard);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <PageComponent
      title="Engineer Job Cards"
      buttons={
        <>
          {user.level === "3" &&
            <TButton color="green" to="/job_card/create">
              <PlusCircleIcon className="h-6 w-6 mr-2" />
              Create Team
            </TButton>
          }
        </>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Apartment No</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Task</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Assign</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Designation</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Assigned Date</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Created</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 table-header text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobCards.map((row) => (
                    <tr key={row.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.customer?.first_name} {row.customer.last_name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.apartment?.apt_no || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.task || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.user?.first_name || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.user?.designation || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.assign_date || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{row.created_at || "N/A"}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className={`whitespace-no-wrap ${row.status === 1 ? "text-green-500" :
                          row.status === 2 ? "text-yellow-500" :
                            row.status === 3 ? "text-red-500" :
                              "text-gray-900"
                          }`}>
                          {row.status === 1 ? "Active" : row.status === 2 ? "Deactive" : row.status === 3 ? "Terminated" : "-"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {row.team_id ? (
                          <button onClick={() => handleViewTeamClick(row)} className="text-green-500 hover:text-indigo-900">
                            View Team
                          </button>
                        ) : (
                          <Link to={`/engineer_job_card/create/${row.id}?isEdit=0`} className="text-yellow-500 hover:text-indigo-900">
                            Add Team
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Modal show={showModal} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Customer Name : {selectedJobCard?.customer?.first_name} {selectedJobCard?.customer?.last_name}</h2>
        <h3 className="text-xl font-semibold mb-4">Engineer Name : {selectedJobCard?.user?.first_name} {selectedJobCard?.user?.last_name}</h3>

        <p className="text-lg font-medium mb-4 text-gray-700">Assigned Team,</p>
        <ul className="list-disc list-inside">
          {selectedJobCard?.team_members.length > 0 ? (
            selectedJobCard.team_members.map((worker) => (
              <li key={worker.id} className="text-gray-700 text-lg">
                {worker.first_name} {worker.last_name} - {worker.designation} {worker.contact_no}
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No workers assigned to this team.</p>
          )}
        </ul>
      </Modal>
    </PageComponent>
  );
}
