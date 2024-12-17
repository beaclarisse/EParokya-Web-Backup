import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MetaData from '../../Layout/MetaData';
import SideBar from '../SideBar';

const localizer = momentLocalizer(moment);

const Calendars = () => {
  const [events, setEvents] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/getAllWeddings`, config);
        const weddingEvents = response.data.map(wedding => ({
          id: wedding._id,
          title: `${wedding.bride} & ${wedding.groom} Wedding`,
          start: new Date(wedding.weddingDate),
          end: new Date(wedding.weddingDate),
        }));
        setEvents(weddingEvents);
      } catch (error) {
        console.error('Error fetching wedding events:', error);
      }
    };

    fetchWeddings();
  }, []);

  const fetchWeddingDetails = async (weddingId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/getWedding/${weddingId}`, config);
      setSelectedWedding(response.data);
    } catch (error) {
      console.error('Error fetching wedding details:', error);
    }
  };

  const handleEventClick = (event) => {
    fetchWeddingDetails(event.id);
  };

  const eventPropGetter = (event) => {
    const backgroundColor = 'blue';
    return { style: { backgroundColor, color: 'white' } };
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, padding: '20px' }}>
        <MetaData title={'Calendar'} />
        <h1>Calendar</h1>
        <div style={{ height: '700px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            eventPropGetter={eventPropGetter}
            onSelectEvent={handleEventClick}
            style={{ height: '100%' }}
          />
        </div>

        {selectedWedding && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>Wedding Details</h2>
            <p><strong>Bride:</strong> {selectedWedding.bride}</p>
            <p><strong>Groom:</strong> {selectedWedding.groom}</p>
            <p><strong>Wedding Date:</strong> {new Date(selectedWedding.weddingDate).toLocaleDateString()}</p>
            <p><strong>Attendees:</strong> {selectedWedding.attendees}</p>
            {/* <p><strong>Flower Girl:</strong> {selectedWedding.flowerGirl || 'N/A'}</p>
            <p><strong>Ring Bearer:</strong> {selectedWedding.ringBearer || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedWedding.weddingStatus}</p>
            <p><strong>Bride Birth Certificate:</strong> <a href={selectedWedding.brideBirthCertificate} target="_blank" rel="noreferrer">View</a></p>
            <p><strong>Groom Birth Certificate:</strong> <a href={selectedWedding.groomBirthCertificate} target="_blank" rel="noreferrer">View</a></p>
            <p><strong>Bride Baptismal Certificate:</strong> <a href={selectedWedding.brideBaptismalCertificate} target="_blank" rel="noreferrer">View</a></p>
            <p><strong>Groom Baptismal Certificate:</strong> <a href={selectedWedding.groomBaptismalCertificate} target="_blank" rel="noreferrer">View</a></p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendars;
