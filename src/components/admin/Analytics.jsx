import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Analytics = () => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [showError, setShowError] = useState(false);

  const handleError = () => {
    setShowError(!showError); // Close the modal
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitorLoginsResponse = await axios.get(
          "http://localhost:3000/admin/visitor-logins"
        );
        const chatsResponse = await axios.get(
          "http://localhost:3000/admin/visitor-chats"
        );

        renderChart(visitorLoginsResponse.data, chatsResponse.data);
      } catch (error) {
        console.error("Error fetching data: " + error.message);
        setShowError(true);
      }
    };

    fetchData();
  }, []);

  const renderChart = (visitorData, chatData) => {
    const mergedData = mergeDataByDate(visitorData, chatData);

    const dates = mergedData.map((item) => new Date(item.date));
    const visitorLoginCounts = mergedData.map(
      (item) => item.visitorLoginCount || 0
    );
    const chatCounts = mergedData.map((item) => item.chatCount || 0);

    const ctx = canvasRef.current.getContext("2d");

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates.map((date) => date.toDateString()),
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
      chartInstanceRef.current.data.labels = dates.map((date) =>
        date.toDateString()
      );
      chartInstanceRef.current.data.datasets[0].data = visitorLoginCounts;
      chartInstanceRef.current.data.datasets[1].data = chatCounts;
      chartInstanceRef.current.update();
    }
  };

  const mergeDataByDate = (visitorData, chatData) => {
    const mergedData = [];
    console.log(visitorData);
    visitorData.forEach((visitorDataItem) => {
      const chatDataItem = chatData.find(
        (chatDataItem) => chatDataItem.date === visitorDataItem.date
      );
      mergedData.push({
        date: visitorDataItem.date,
        visitorLoginCount: visitorDataItem.count,
        chatCount: chatDataItem ? chatDataItem.count : 0,
      });
    });
    return mergedData;
  };

  return (
    <>
      {!showError ? (
        <div className="px-2">
          <div style={{ width: "100%", height: "100vh" }}>
            <canvas id="analyticsChart" ref={canvasRef}></canvas>
          </div>
        </div>
      ) : (
        <div className="modal modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Oops!</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
              <div className="modal-body">
                <p>Oops, Something went wrong. Please try again!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={handleError}>
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
