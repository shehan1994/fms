import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import CardBarChart from "./../components/Cards/CardBarChart.jsx";
import HeaderStats from "./../components/Cards/HeaderStats.jsx";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  return (
    <PageComponent title="Dashboard">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (

        <>
          <HeaderStats data={data} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">

            <DashboardCard
              title="Total Apartment"
              className="order-1 lg:order-2"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="text-5xl  font-semibold flex-1 flex items-center justify-center">
                {data?.totalApartment}
              </div>
            </DashboardCard>
            <DashboardCard
              title="Total Customers"
              className="order-2 lg:order-4"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-5xl  font-semibold flex-1 flex items-center justify-center">
                {data?.totalCustomer}
              </div>
            </DashboardCard>
            <DashboardCard
              title="Latest Jobs"
              className="order-3 lg:order-1 row-span-2"
              style={{ animationDelay: '0.2s' }}
            >
              {data.latestJobCard && data.latestJobCard.length > 0 ? (
                data.latestJobCard.map((job, index) => (
                  <div key={index} className="mt-5 border rounded-xl m-2 p-2 bg-blue-100">
                    <div className="flex justify-between text-sm mb-1">
                      <div>Create Date:</div>
                      <div>{job?.created_at}</div>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <div>Assign Date:</div>
                      <div>{job?.assign_date}</div>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <div>Job Card Number:</div>
                      <div>J-00{job?.id}</div>
                    </div>
                    <div className="flex justify-between">
                      <TButton to={`/job_cards`} link>
                        <PencilIcon className="w-5 h-5 mr-2" />
                        Edit Job
                      </TButton>
                      <TButton to={`/job_cards`} link>
                        <EyeIcon className="w-5 h-5 mr-2" />
                        View Job
                      </TButton>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600 text-center py-16">
                  You don't have Jobs yet
                </div>
              )}
            </DashboardCard>

            <DashboardCard
              title="Total Income"
              className="order-4 lg:order-3 row-span-2"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-4xl font-semibold flex-1 flex items-center justify-center text-blue-500">
                Rs. {data?.totalAmountSum}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Employee Count by Role"
              className="order-3 lg:order-1 row-span-2"
              style={{ animationDelay: '0.2s' }}
            >
              {data?.levelCounts && (
                <div>
                  {/* <h3 className="font-bold text-xl mb-3">
                    Employee Count by Role
                  </h3> */}
                  {data?.levelCounts.map((levelData) => {
                    let roleName = '';
                    switch (levelData.level) {
                      case "2":
                        roleName = "System User";
                        break;
                      case "3":
                        roleName = "Engineer";
                        break;
                      case "4":
                        roleName = "Technician";
                        break;
                      case "5":
                        roleName = "Helper";
                        break;
                      default:
                        roleName = "Super Role"; // Optional: handle unexpected levels
                    }

                    return (
                      <label
                        key={levelData.level}
                        className="flex justify-between items-center p-4 text-sm mb-3 p-2 bg-gray-100 rounded-md mt-5"
                      >
                        <span className="font-medium">{roleName}:</span>
                        <span className="bg-blue-500 text-white rounded-full px-3 py-1">
                          {levelData.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
              {!data.levelCounts && (
                <div className="text-gray-600 text-center py-16">
                  You don't have Jobs yet
                </div>
              )}
            </DashboardCard>
            <DashboardCard
              title="Employee Count"
              className="order-5 lg:order-3 row-span-2"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-5xl font-semibold flex-1 flex items-center justify-center">
                {data?.employee_total}
              </div>
            </DashboardCard>
            <DashboardCard
              title="Job Count"
              className="order-5 lg:order-3 row-span-2"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-5xl font-semibold flex-1 flex items-center justify-center">
                {data?.job_total}
              </div>
            </DashboardCard>
            <DashboardCard
              title="Job Status Summary"
              className="order-3 lg:order-1 row-span-2"
              style={{ animationDelay: '0.2s' }}
            >
              {data.jobCounts && data.jobCounts.length > 0 ? (
                <div>
                  <h5 className=" mb-3">Each job cards status count</h5>
                  {data.jobCounts.map((job) => (
                    <div key={job.status} className="flex justify-between text-sm mb-3 p-2 bg-gray-100 rounded-md">

                      <span className="font-medium">Jobs Status - 
                        {job.status === "1" ? " Assign to Engineer" :
                          job.status === "2" ? " Team Assigned" :
                            job.status === "3" ? " Engineer Finished" :
                              job.status === "4" ? " Payment Done" :
                                " Unknown Status"}:</span>
                      <span className="bg-blue-500 text-white rounded-full px-3 py-1">{job.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 text-center py-16">
                  No job data available
                </div>
              )}
            </DashboardCard>
            <CardBarChart dashboard={data} />

          </div>
        </>

      )}
    </PageComponent>
  );
}
