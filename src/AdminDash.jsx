import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const AdminDash = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard/getUsers");
        setUserDetails(response.data);
        setTotalUsers(response.data.message.length);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  };

  useEffect(() => {
    const userNames = userDetails.message ? userDetails.message.map((user) => user.username) : [];
    const userTime = userDetails.message ? userDetails.message.map((user) => user.createdAt) : [];

    const colors = [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ];
    const options = {
      series: [
        {
          data: userTime,
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            console.log(chart, w, e);
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: userNames,
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup function
    return () => {
      chart.destroy();
    };
  }, [userDetails]); // Dependency on userDetails to update the chart when data changes

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">All User Details</h1>
        <p>Total Users: {totalUsers ? totalUsers : 0}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userDetails.message) &&
            userDetails.message.length > 0 ? (
              userDetails.message.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{formatDateTime(user.createdAt)}</td>{" "}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No user details found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div id="chart"></div>
    </>
  );
};

export default AdminDash;
