import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios.js";
import TButton from "../../../components/core/TButton";
import PageComponent from "../../../components/PageComponent";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import ModalQuarter from "../../../components/core/ModalQuarter.jsx";
import ModalHalf from "../../../components/core/ModalHalf.jsx";
import { useSelector } from "react-redux";

export default function EngineerJobCards() {
  const { showToast } = useStateContext();
  const [jobCards, setJobCards] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [finishJob, setFinishJob] = useState({});
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
    setSelectedJobCard(jobCard);
    setShowModal(true);
  };
  const handleFinishClick = (jobCard) => {
    console.log("j", jobCard);
    setSelectedJobCard(jobCard);
    setShowFinishModal(true);
  };

  const handleFinishModelClick = async () => {
    const payload = { ...finishJob, id: selectedJobCard?.id };
    try {
      const response = await axiosClient.post("/job_card/finishByEngineer", payload);
      console.log("Response data:", response.data);
      closeModal();
      showToast("The Job card finished By Engineer");
      navigate("/engineer_job_cards", { state: { reload: Date.now() } });
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
    setShowFinishModal(false);
    setSelectedJobCard(null);
    setFinishJob({});
  };

  return (
    <PageComponent
      title="Engineer Job Cards"
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
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-40">
                        <p className={`whitespace-no-wrap 
                        ${row.status === "1" ? "text-yellow-500" :
                            row.status === "2" ? "text-yellow-500" :
                              row.status === "3" ? "text-yellow-500" :
                                row.status === "4" ? "text-blue-500" :
                                  row.status === "5" ? "text-green-500" :
                                    "text-gray-900"
                          }`}>
                          {row.status === "1" ? "Assign to Engineer" :
                            row.status === "2" ? "Team Assigned" :
                              row.status === "3" ? "Engineer Finished" :
                                row.status === "4" ? "Payment Pending" :
                                  row.status === "5" ? "Payment Done" :
                                    "-"}
                        </p></td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {row.team_id || row.status === "5" ? (
                          <><button onClick={() => handleViewTeamClick(row)} className=" hover:text-indigo-900 border-y-4 border-indigo-300 w-16">
                            View Team
                          </button>
                          </>

                        ) : (
                          <>
                            {(row.status === "1" || row.status === "2") &&
                              <Link to={`/engineer_job_card/create/${row.id}?isEdit=0`} className=" hover:text-indigo-900  border-y-4 border-indigo-300  w-16">
                                Add Team
                              </Link>
                            }
                          </>
                        )}
                        {(row.status === "1" || row.status === "2") &&
                          <button onClick={() => handleFinishClick(row)} className=" hover:text-indigo-900 border-y-4 border-indigo-300 w-16">
                            Finish Job
                          </button>
                        }
                        {row.status === "5" &&
                          <lable className="text-green-500 hover:text-indigo-900 border-y-4 border-indigo-300 w-16"> Job Done</lable>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <ModalQuarter show={showFinishModal} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">
          Finish Job Card
        </h2>
        <hr></hr>
        <div className="col-span-6 sm:col-span-3 mt-2">
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={finishJob?.start_date}
            onChange={(ev) =>
              setFinishJob({ ...finishJob, start_date: ev.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-3 mt-2">
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={finishJob?.end_date}
            onChange={(ev) =>
              setFinishJob({ ...finishJob, end_date: ev.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-5 flex justify-center">
          <TButton color="green" onClick={handleFinishModelClick}>
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Finish
          </TButton>
        </div>
      </ModalQuarter>


    </PageComponent >
  );
}
