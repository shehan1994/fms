import { LinkIcon, PhotoIcon, TrashIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../../../components/core/TButton.jsx";
import PageComponent from "../../../components/PageComponent.jsx";
import axiosClient from "../../../axios.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import Select from 'react-select';
import { useSelector } from "react-redux";

export default function EngineerJobCardView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isEdit = queryParams.get("isEdit");

  const [team, setTeam] = useState({
    team_members: [],
    expected_start_date: "",
    expected_end_date: "",
    job_card_id: "",
    engineer_id: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...team,
      job_card_id: id,
      team_members: selectedTeam,
      engineer_id: user.id,
    };
    delete payload.image_url;
    let res = null;
    if (isEdit === 1) {
      // res = axiosClient.put(`/team/${id}`, editObject);
    } else {
      res = axiosClient.post("/team", payload);
    }
    res
      .then((res) => {
        navigate("/engineer_job_cards");
        showToast(id ? "The Job card was updated" : "The Job card was created");
        const message = "Hi this is from FMMS, Your Job card created successfully, One of our team member will contact you soon."
        if (!id) {
          sendSmS(team.customer_contact_no, message);
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
      });
  };

  const onBackButton = () => {
    navigate("/engineer_job_cards");
  }



  const handleTeamChange = (e, value) => {

    setSelectedTeam((prev) =>
      e.target.checked
        ? [...prev, value] // Add the value if checked
        : prev.filter((member) => member !== value) // Remove the value if unchecked
    );
  };


  const sendSmS = (mobileNo, message) => {
    axiosClient.get(`/sms?phoneNumber=${mobileNo}&message=${message}`).then((response) => {
      console.log("resp", response);

    }).catch((error) => {
      console.error('Error fetching customer options', error);
    });
  };

  const handleSeachClick = (ev) => {
    ev.preventDefault();
    if (team?.expected_start_date && team?.expected_end_date) {
      axiosClient.get(`/users/levelUnder2?start_date=${team.expected_start_date}&end_date=${team.expected_end_date}`).then((response) => {
        setMemberOptions(response.data);
      }).catch((error) => {
        console.error('Error fetching customer options', error);
      });
    } else {
      setError("Please select Date range");
    }
  };

  return (
    <PageComponent
      title="Team"
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
                    htmlFor="assign_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expected to Start Date
                  </label>
                  <input
                    type="date"
                    name="expected_start_date"
                    id="expected_start_date"
                    value={team.expected_start_date}
                    onChange={(ev) =>
                      setTeam({ ...team, expected_start_date: ev.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="expected_end_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expected to End Date
                  </label>
                  <input
                    type="date"
                    name="expected_end_date"
                    id="expected_end_date"
                    value={team.expected_end_date}
                    onChange={(ev) =>
                      setTeam({ ...team, expected_end_date: ev.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 flex justify-center items-center">
                  <button
                    htmlFor="engineer"
                    className="text-m font-medium text-blue-700 cursor-pointer border border-blue-500 rounded-md px-4 py-2 text-center"
                    onClick={handleSeachClick}
                  >
                    Search the Team,
                  </button>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="workers"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Technician | Laborers
                  </label>
                  {memberOptions.length > 0 ? (
                    memberOptions.map((option, index) => (
                      <label key={index} className="mr-5 p-2 flex items-center">
                        <input
                          type="checkbox"
                          name="members"
                          value={option.id} // Use the member's ID for the value
                          onChange={(e) => handleTeamChange(e, option.id)} // Ensure to use option.id here
                          className="mr-2"
                        />
                        <span>
                          {option.user_code} - {option.first_name} - {option.designation}
                        </span>
                      </label>
                    ))
                  ) : (
                    <div className="text-gray-500">No members found.</div>
                  )}
                </div>


                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={team.description}
                    onChange={(ev) =>
                      setTeam({ ...team, description: ev.target.value })
                    }
                    placeholder="Description"
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
