import React, { useState, useEffect } from 'react';
import './Schedule.css';
import axios from 'axios';

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [emailId, setEmailId] = useState('');
  const [farmerId, setFarmerId] = useState('');

  // Fetch the logged-in user's email ID and farmer ID from localStorage
  const fetchUserData = () => {
    const userEmail = localStorage.getItem('email_id'); // Correct key
    const userFarmerId = localStorage.getItem('farmer_id'); // Correct key
    console.log('Fetched Email ID:', userEmail); // Debugging log
    console.log('Fetched Farmer ID:', userFarmerId); // Debugging log

    if (userEmail) {
      setEmailId(userEmail);
    }
    if (userFarmerId) {
      setFarmerId(userFarmerId);
    }
  };

  // Parse saved data and generate rows based on the irrigation schedule
  const parseAndGenerateRows = (savedData) => {
    let parsedData = [];
    if (savedData) {
      try {
        parsedData = JSON.parse(savedData);
        console.log('Parsed Data:', parsedData); // Debugging log
        if (!Array.isArray(parsedData)) {
          parsedData = [parsedData];
          console.warn('Parsed data was not an array. Converted to array.');
        }
      } catch (error) {
        console.error('Failed to parse savedData:', error);
        parsedData = [];
      }
    }

    const addRows = [];
    const addedDates = new Set();
    const currentDate = new Date();

    parsedData.forEach((item) => {
      let newRow = { ...item, currentDays: Number(item.currentDays) || 0 };
      let date = new Date(item.date);
      const partsCount = Number(item.parts_count) || 1;

      let partIndex = 1;
      const i_w = parseFloat(newRow.i_w) || 0;
      const m_w = parseFloat(newRow.m_w) || 0;
      const l_w = parseFloat(newRow.l_w) || 0;

      while (newRow.currentDays < newRow.days) {
        if (newRow.currentDays < newRow.days / 3) {
          newRow.timeinHrs = (i_w * partsCount).toFixed(2);
        } else if (newRow.currentDays < newRow.days / 2) {
          newRow.timeinHrs = (m_w * partsCount).toFixed(2);
        } else {
          newRow.timeinHrs = (l_w * partsCount).toFixed(2);
        }

        const formattedDate = date.toLocaleDateString('en-CA');

        if (date >= currentDate) {
          if (!addedDates.has(formattedDate)) {
            const updatedRow = {
              ...newRow,
              date: formattedDate,
              currentDays: newRow.currentDays + Number(item.days_btw),
              part: partIndex,
            };
            addRows.push(updatedRow);
            addedDates.add(formattedDate);
          }
        }

        newRow.currentDays += Number(item.days_btw);
        date.setDate(date.getDate() + 1);
        partIndex = (partIndex % partsCount) + 1;

        if (partIndex === 1) {
          date.setDate(date.getDate() + 1);
        }
      }
    });

    return addRows;
  };

  // Fetch schedules from localStorage and sync them with the database
  const fetchSchedulesFromStorage = () => {
    const keys = Object.keys(localStorage).filter(
      (key) => !key.includes('extensionActiveTime') && key !== 'email_id' && key !== 'farmer_id'
    );
    console.log('Filtered Keys:', keys); // Debugging log

    const allSchedules = keys
      .map((key) => {
        const savedData = localStorage.getItem(key);
        console.log(`Saved Data for ${key}:`, savedData); // Debugging log
        const rows = parseAndGenerateRows(savedData);
        console.log(`Parsed Rows for ${key}:`, rows); // Debugging log

        if (rows.length === 0) {
          localStorage.removeItem(key);
          return null;
        }

        // Check if schedule name contains farmerId
        if (key.includes(farmerId)) {
          return { name: key, rows };
        }
        return null; // Don't return schedules that don't match
      })
      .filter(Boolean); // Filter out nulls

    console.log('All Schedules:', allSchedules); // Debugging log
    setSchedules(allSchedules);

    // Sync each matching schedule with the database along with the user's email ID
    allSchedules.forEach((schedule) => {
      axios
        .post('http://localhost:8081/api/schedules', {
          name: schedule.name,
          rows: schedule.rows,
          email_id: emailId, // Send email_id to the database
          farmer_id: farmerId, // Include farmer_id for additional context
        })
        .then((response) => {
          console.log(`Schedule ${schedule.name} synced to database`, response.data);
        })
        .catch((error) => {
          console.error(`Error syncing schedule ${schedule.name} to database:`, error);
        });
    });
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component loads
  }, []);

  useEffect(() => {
    // Fetch schedules without additional conditions
    console.log('Fetching schedules'); // Debugging log
    fetchSchedulesFromStorage();
  }, [farmerId]); // Add farmerId as a dependency to refetch schedules when it changes

  return (
    <div className="schedule-grid-container">
      <div className="schedule-grid">
        {schedules.length > 0 ? (
          schedules.map((schedule, scheduleIndex) => (
            <div key={scheduleIndex} className="schedule-column">
              <table className="table-s">
                <thead>
                  <tr>
                    <th colSpan={4}>Vegetable: {schedule.name}</th>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <th>Vegetable Name</th>
                    <th>Time in Hrs</th>
                    <th>Part</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.rows.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.veg_name || schedule.name}</td>
                      <td>{item.timeinHrs}</td>
                      <td>{item.part}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div>No schedules available</div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
