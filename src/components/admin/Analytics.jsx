import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Analytics = () => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [view, setView] = useState("daily");

  const handleError = () => {
    setShowError(!showError);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitorLoginsResponse = await axios.get(
          "http://localhost:4000/admin/visitor-logins"
        );
        const chatsResponse = await axios.get(
          "http://localhost:4000/admin/visitor-chats"
        );

        renderChart(visitorLoginsResponse.data, chatsResponse.data);
      } catch (error) {
        console.error("Error fetching data: " + error.message);
        setShowError(true);
      }
    };

    fetchData();
  }, [view]);

  const renderChart = (visitorData, chatData) => {
    const mergedData = mergeDataByDate(visitorData, chatData);

    const labels = mergedData.map((item) => item.label);
    const visitorLoginCounts = mergedData.map(
      (item) => item.visitorLoginCount || 0
    );
    const chatCounts = mergedData.map((item) => item.chatCount || 0);

    const ctx = canvasRef.current.getContext("2d");

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Logins",
              data: visitorLoginCounts,
              borderColor: "#0cc8ec",
              tension: 0.1,
            },
            {
              label: "Chats",
              data: chatCounts,
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = visitorLoginCounts;
      chartInstanceRef.current.data.datasets[1].data = chatCounts;
      chartInstanceRef.current.update();
    }
  };

  const mergeDataByDate = (visitorData, chatData) => {
    const mergedData = [];

    if (view === "daily") {
      visitorData.forEach((visitorDataItem) => {
        const chatDataItem = chatData.find(
          (chatDataItem) => chatDataItem.date === visitorDataItem.date
        );
        mergedData.push({
          label: formatDate(new Date(visitorDataItem.date)),
          date: visitorDataItem.date,
          visitorLoginCount: visitorDataItem.count,
          chatCount: chatDataItem ? chatDataItem.count : 0,
        });
      });
    } else if (view === "weekly") {
      const weeklyData = {};

      visitorData.forEach((item) => {
        const weekLabel = getWeekLabel(item.date);
        if (!weeklyData[weekLabel]) {
          weeklyData[weekLabel] = { visitorLoginCount: 0, chatCount: 0 };
        }
        weeklyData[weekLabel].visitorLoginCount += item.count;
      });

      chatData.forEach((item) => {
        const weekLabel = getWeekLabel(item.date);
        if (!weeklyData[weekLabel]) {
          weeklyData[weekLabel] = { visitorLoginCount: 0, chatCount: 0 };
        }
        weeklyData[weekLabel].chatCount += item.count;
      });

      for (const [weekLabel, data] of Object.entries(weeklyData)) {
        mergedData.push({
          label: weekLabel,
          visitorLoginCount: data.visitorLoginCount,
          chatCount: data.chatCount,
        });
      }
    } else if (view === "monthly") {
      const monthlyData = {};

      visitorData.forEach((item) => {
        const monthLabel = getMonthLabel(item.date);
        if (!monthlyData[monthLabel]) {
          monthlyData[monthLabel] = { visitorLoginCount: 0, chatCount: 0 };
        }
        monthlyData[monthLabel].visitorLoginCount += item.count;
      });

      chatData.forEach((item) => {
        const monthLabel = getMonthLabel(item.date);
        if (!monthlyData[monthLabel]) {
          monthlyData[monthLabel] = { visitorLoginCount: 0, chatCount: 0 };
        }
        monthlyData[monthLabel].chatCount += item.count;
      });

      for (const [monthLabel, data] of Object.entries(monthlyData)) {
        mergedData.push({
          label: monthLabel,
          visitorLoginCount: data.visitorLoginCount,
          chatCount: data.chatCount,
        });
      }
    }

    return mergedData;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getWeekLabel = (dateString) => {
    const date = new Date(dateString);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    const weekNumber = Math.ceil(
      (pastDaysOfYear + startOfYear.getDay() + 1) / 7
    );
    return `Week ${weekNumber}, ${date.getFullYear()}`;
  };

  const getMonthLabel = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <>
      {!showError ? (
        <div className="container mt-4">
          <div className="d-flex justify-content-end align-items-center mb-3">
            <div>
              <label htmlFor="viewSelect" className="mx-2">
                View:
              </label>
              <select
                id="viewSelect"
                className="form-control d-inline-block w-auto"
                value={view}
                onChange={(e) => setView(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div style={{ width: "100%", height: "85vh" }}>
            <canvas id="analyticsChart" ref={canvasRef}></canvas>
          </div>
        </div>
      ) : (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Oops!</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={handleError}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Oops, Something went wrong. Please try again!</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleError}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
