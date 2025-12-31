import React, { useState, useEffect } from "react";
import DateFilter from "../components/DateFilter";
import AttendanceTable from "../components/AttendanceTable";
import { exportToCSV } from "../components/ExportCSV";
import { attendanceService } from "../appwrite";

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [records, setRecords] = useState([]);

  // Load attendance from Appwrite on component mount
  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await attendanceService.getAttendance(selectedDate || undefined);
        setRecords(data);
      } catch (error) {
        console.error("Failed to load attendance:", error);
        alert("Failed to load attendance. Please try again.");
      }
    };
    loadAttendance();
  }, [selectedDate]);

  const filteredRecords =
    selectedDate === ""
      ? records
      : records.filter((r) => r.date === selectedDate);

  // Compute stats directly from filtered records
  const stats = {
    total: filteredRecords.length,
    present: filteredRecords.filter((r) => r.status === "Present").length,
    absent: filteredRecords.filter((r) => r.status === "Absent").length,
    late: filteredRecords.filter((r) => r.status === "Late").length,
  };

  const handleSave = () => {
    alert("Attendance has been saved successfully!");
  };

  const handleMarkAttendance = async (uid, newStatus) => {
    try {
      // Find record by uid to get the document $id
      const record = records.find((r) => r.uid === uid);
      if (record && record.$id) {
        await attendanceService.updateAttendance(record.$id, {
          status: newStatus,
          inTime: newStatus !== "Absent" ? record.inTime || "9:00" : "",
          outTime: newStatus !== "Absent" ? record.outTime || "17:00" : "",
        });
        // Reload the data
        const data = await attendanceService.getAttendance(selectedDate || undefined);
        setRecords(data);
      }
    } catch (error) {
      console.error("Failed to update attendance:", error);
      alert("Failed to update attendance. Please try again.");
    }
  };

  const handleAddRecord = () => {
    const name = window.prompt("Enter employee name:");
    if (!name) return;
    
    const status = window.prompt("Enter status (Present/Absent/Late):", "Present");
    if (!status) return;
    
    const date = selectedDate || new Date().toISOString().split("T")[0];
    const nextUid = String(records.length + 1).padStart(3, "0");
    
    setRecords((prev) => [
      ...prev,
      {
        uid: nextUid,
        name,
        status,
        inTime: status !== "Absent" ? "9:00" : "",
        outTime: status !== "Absent" ? "17:00" : "",
        date,
      },
    ]);
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8cfd2",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#b45074",
          animation: "fadeInDown 0.6s ease-out",
        }}
      >
        Attendance Record
      </h1>

      <div style={{ 
        display: "flex", 
        gap: "20px", 
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{
          background: "white",
          padding: "15px 25px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          animation: "slideInUp 0.5s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>Total: </span>
          <strong style={{ color: "#b45074", fontSize: "20px", animation: "countUp 0.8s ease-out" }}>{stats.total}</strong>
        </div>
        <div style={{
          background: "white",
          padding: "15px 25px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          animation: "slideInUp 0.6s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>Present: </span>
          <strong style={{ color: "#2e7d32", fontSize: "20px", animation: "countUp 0.8s ease-out" }}>{stats.present}</strong>
        </div>
        <div style={{
          background: "white",
          padding: "15px 25px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          animation: "slideInUp 0.7s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>Absent: </span>
          <strong style={{ color: "#c62828", fontSize: "20px", animation: "countUp 0.8s ease-out" }}>{stats.absent}</strong>
        </div>
        <div style={{
          background: "white",
          padding: "15px 25px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          animation: "slideInUp 0.8s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>Late: </span>
          <strong style={{ color: "#f57c00", fontSize: "20px", animation: "countUp 0.8s ease-out" }}>{stats.late}</strong>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
          50% {
            box-shadow: 0 4px 20px rgba(180, 80, 116, 0.4);
          }
        }
      `}</style>

      <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <AttendanceTable 
        records={filteredRecords} 
        onMarkAttendance={handleMarkAttendance}
      />

      <div style={{ marginTop: "40px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button
          onClick={handleAddRecord}
          style={{
            padding: "15px 40px",
            fontSize: "20px",
            background: "#b45074",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "transform 0.2s, box-shadow 0.2s",
            animation: "pulse 2s infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(180, 80, 116, 0.4)";
            e.currentTarget.style.animation = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.animation = "pulse 2s infinite";
          }}
        >
          + Add Record
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: "15px 40px",
            fontSize: "20px",
            background: "#fff",
            border: "3px solid #000",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Save
        </button>

        <button
          onClick={() => exportToCSV(filteredRecords)}
          style={{
            padding: "15px 40px",
            fontSize: "20px",
            background: "#fff",
            border: "3px solid #000",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AttendancePage;
