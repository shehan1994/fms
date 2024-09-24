import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
          <DashboardCard
            title="Total Apartment"
            className="order-1 lg:order-2"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalApartment}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Total Customers"
            className="order-2 lg:order-4"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalCustomer}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Latest Job"
            className="order-3 lg:order-1 row-span-2"
            style={{ animationDelay: '0.2s' }}
          >
            {data.latestJobCard && (
              <div>
                <img
                  src={data.latestJobCard.image_url}
                  className="w-[240px] mx-auto"
                />
                <h3 className="font-bold text-xl mb-3">
                  {data.latestJobCard.title}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <div>Create Date:</div>
                  <div>{data.latestJobCard.created_at}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Expire Date:</div>
                  <div>{data.latestJobCard.expire_date}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{data.latestJobCard.status ? "Active" : "Draft"}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Questions:</div>
                  <div>{data.latestJobCard.questions}</div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Answers:</div>
                  <div>{data.latestJobCard.answers}</div>
                </div>
                <div className="flex justify-between">
                  <TButton to={`/surveys/${data.latestJobCard.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>

                  <TButton link>
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Answers
                  </TButton>
                </div>
              </div>
            )}
            {!data.latestJobCard && (
              <div className="text-gray-600 text-center py-16">
                Your don't have Jobs yet
              </div>
            )}
          </DashboardCard>
          <DashboardCard
            title="Today Assign Jobs"
            className="order-4 lg:order-3 row-span-2"
            style={{ animationDelay: '0.3s' }}
          >
           
          </DashboardCard>
          <DashboardCard
            title="Employee Count"
            className="order-5 lg:order-3 row-span-2"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalCustomer}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Job Count"
            className="order-5 lg:order-3 row-span-2"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.job_total}
            </div>
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  );
}
