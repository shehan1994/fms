import React from "react";
import CardStats from "./CardStats";

// components


export default function HeaderStats(data) {

  console.log("data",data);
  


  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 mb-10">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap w-full">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Jobs"
                  statTitle={data?.data?.job_total}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle={data?.data?.employee_total}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Job Finished"
                  statTitle={data?.data?.jobFinishedCount}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-green-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PENDING JOBS"
                  statTitle={data?.data?.jobsPendingCount}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-briefcase"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
