import React, { useState, useEffect } from 'react';
import './Schedule.css';
import axios from 'axios';

function Machinery() {
  const [machinerySchedules, setMachinerySchedules] = useState([]);
  const [emailId, setEmailId] = useState('');
  const [farmerId, setFarmerId] = useState('');

  // Fetch the logged-in user's email ID and farmer ID from localStorage
  const fetchUserData = () => {
    const userEmail = localStorage.getItem('email_id');
    const userFarmerId = localStorage.getItem('farmer_id');
    
    if (userEmail) {
      setEmailId(userEmail);
    }
    if (userFarmerId) {
      setFarmerId(userFarmerId);
    }
  };

  // Add machinery schedule based on days after sowing (DAS)
  const addMachinerySchedule = (schedule, sowingDate) => {
    const machineryTasks = [
      { days: 15, operation: 'Weeding', machinery: 'Power Weeder' },
      { days: 20, operation: 'Spraying', machinery: 'Knapsack Sprayer' },
      { days: 25, operation: 'Fertilization', machinery: 'Fertilizer Spreader' },
      { days: 30, operation: 'Weeding', machinery: 'Rotary Hoe' },
      { days: 40, operation: 'Spraying', machinery: 'Boom Sprayer' },
      { days: 45, operation: 'Fertilization', machinery: 'Drip Fertigation System' },
      { days: 60, operation: 'Spraying', machinery: 'Power Sprayer' },
      { days: 70, operation: 'Fertilization', machinery: 'Fertilizer Spreader' },
      { days: 90, operation: 'Harvesting', machinery: 'Mechanical Harvester' }
    ];

    const updatedSchedule = machineryTasks.map((task) => {
      const taskDate = new Date(sowingDate);
      taskDate.setDate(taskDate.getDate() + task.days); // Calculate the exact date for the task
      return {
        ...schedule,
        date: taskDate.toLocaleDateString('en-CA'),
        operation: task.operation,
        machinery: task.machinery,
        part: '', // No part concept for machinery tasks
      };
    });

    return updatedSchedule;
  };

  // Parse saved data, generate machinery schedules, and store/update in localStorage and DB
  const parseAndGenerateMachineryRows = (savedData) => {
    let parsedData = [];
    if (savedData) {
      try {
        parsedData = JSON.parse(savedData);
        if (!Array.isArray(parsedData)) {
          parsedData = [parsedData];
        }
      } catch (error) {
        console.error('Failed to parse savedData:', error);
        parsedData = [];
      }
    }

    const addRows = [];
    parsedData.forEach((item) => {
      let date = new Date(item.date);
      const sowingDate = new Date(item.sowingDate || date); // Use sowing date if available

      // Add machinery schedule based on the sowing date
      let machinerySchedule = addMachinerySchedule(item, sowingDate);
      addRows.push(...machinerySchedule);
    });

    return addRows;
  };

  // Fetch machinery schedules from localStorage and sync them with the database
  const fetchMachinerySchedulesFromStorage = () => {
    const keys = Object.keys(localStorage).filter(
      (key) => !key.includes('extensionActiveTime') && key !== 'email_id' && key !== 'farmer_id'
    );

    const allMachinerySchedules = keys
      .map((key) => {
        const savedData = localStorage.getItem(key);
        const rows = parseAndGenerateMachineryRows(savedData);

        if (rows.length === 0) {
          localStorage.removeItem(key);
          return null;
        }

        // Check if schedule name contains farmerId
        if (key.includes(farmerId)) {
          return { name: key, rows };
        }
        return null;
      })
      .filter(Boolean);

    setMachinerySchedules(allMachinerySchedules);

    // Sync each matching machinery schedule with the database
    allMachinerySchedules.forEach((schedule) => {
      axios
        .post('http://localhost:8081/api/machinery', {
          name: schedule.name,
          rows: schedule.rows,
          email_id: emailId,
          farmer_id: farmerId,
        })
        .then((response) => {
          console.log(`Machinery Schedule ${schedule.name} synced to database`, response.data);
        })
        .catch((error) => {
          console.error(`Error syncing schedule ${schedule.name} to database:`, error);
        });
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (farmerId) {
      fetchMachinerySchedulesFromStorage();
    }
  }, [farmerId]);

  return (
    <div className="schedule-grid-container">
      <div className="schedule-grid">
        {machinerySchedules.length > 0 ? (
          machinerySchedules.map((schedule, scheduleIndex) => (
            <div key={scheduleIndex} className="schedule-column">
              <table className="table-s">
                <thead>
                  <tr>
                    <th colSpan={3}>Machinery Schedule: {schedule.name}</th>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <th>Operation</th>
                    <th>Machinery</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.rows.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.operation}</td>
                      <td>{item.machinery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div>No machinery schedules available</div>
        )}
      </div>
    </div>
  );
}

export default Machinery;
