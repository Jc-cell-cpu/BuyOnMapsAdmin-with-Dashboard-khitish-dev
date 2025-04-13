

import React from "react"
import DataStatsOne from "@/components/DataStats/DataStatsOne"
import ChartOne from "@/components/Charts/ChartOne"
import ChartTwo from "@/components/Charts/ChartTwo"
import ChartThree from "@/components/Charts/ChartThree"
import DefaultLayout from "@/components/Layouts/DefaultLaout"
import TableOne from "@/components/Tables/TableOne"
import ChatCard from "@/components/Chat/ChatCard"
import { fetchAllAppointments, fetchAllPosts, fetchAllUsers } from "./API_Calls/Dashboard_Apis"

const Dashboard: React.FC = async () => {

  let postData = {
    'All Vechicles': 0,
    'All Furnitures': 0,
    'All Properties': 0,
    'All electronics': 0,
    'total Posts': 0,
  };

  try {
    postData = await fetchAllPosts() as typeof postData;
  } catch (error) {
    console.error('Error fetching post data:', error);
  }

  let totalAppointments = 0;

  try {
    totalAppointments = await fetchAllAppointments(); // Returns 28
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }

  let totalUsers = 0;

  try {
    totalUsers = await fetchAllUsers(); // Returns 26
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <DefaultLayout>
      {/* Stats Section */}
      <div className="mb-6">
        <DataStatsOne />
      </div>

      {/* Charts Grid Section */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1">
          <ChartOne totalUsers={totalUsers} />
        </div>
        <div className="col-span-1">
          <ChartTwo totalAppointments={totalAppointments} />
        </div>
        <div className="col-span-1">
          <ChartThree postData={postData} />
        </div>
      </div>

      {/* Table and Chat Section */}
      {/* <div className="grid grid-cols-1 gap-4 xl:grid-cols-12"> */}
      {/* Table Section */}
      {/* <div className="xl:col-span-8">
          <TableOne />
        </div> */}
      {/* Chat Section */}
      {/* <div className="xl:col-span-4">
          <ChatCard />
        </div> */}
      {/* </div> */}
    </DefaultLayout>
  )
}

export default Dashboard
