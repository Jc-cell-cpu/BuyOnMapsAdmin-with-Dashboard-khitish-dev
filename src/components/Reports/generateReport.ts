"use server";

import { cookies } from "next/headers";
import { format } from "date-fns";

const BASE_URL =
  process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com"; // Fallback for safety

export async function generateReport(
  startDate: Date,
  endDate: Date,
  isSubscriber: boolean,
  isUser: boolean,
) {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    throw new Error("Authentication token not found");
  }

  // Format dates correctly
  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  let url = "";
  console.log(isUser);

  if (!isUser) {
    // url = `http://localhost:8080/api/v1/admin/report/getUserReport?fromDate=${formattedStartDate}&toDate=${formattedEndDate}&isSubscribe=${isSubscriber}`;
    url = `${BASE_URL}/api/v1/admin/report/getUserReport?fromDate=${formattedStartDate}&toDate=${formattedEndDate}&isSubscribe=${isSubscriber}`;
  } else {
    url = `${BASE_URL}/api/v1/admin/report/getCategoryWiseReport?fromDate=${formattedStartDate}&toDate=${formattedEndDate}`;
  }

  try {
    console.log("Fetching report data from:", url);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "API response not OK:",
        response.status,
        response.statusText,
      );
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;

    // // Generate Excel file
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });
    // const blob = new Blob([excelBuffer], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // });

    // return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error in generateReport:", error);
    throw new Error(
      "Failed to generate report. Please check the server logs for more details.",
    );
  }
}
