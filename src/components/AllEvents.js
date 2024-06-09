// frontend/src/components/AllEvents.js
import React, { useState, useEffect } from 'react';
import '../styles/Events.css';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/api';

const AllEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 18;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    if (!events || events.length === 0) {
        return <div>No events available</div>;
    }

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    const redirectToEventDetails = (eventId) => {
        navigate('/browse/eventdetails', { state: { eventId: eventId } });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="all-events">
            <div className="heading-section">
                <h4><em>All</em> Events</h4>
            </div>
            <div className="row">
                {currentEvents.map((event) => (
                    <div key={event._id} className="col-lg-3 col-sm-6">
                        <div className="item" onClick={() => redirectToEventDetails(event._id)}>
                            <img src={event.images[0]} alt={event.name} />
                            <h4>{event.name}<br /><span>{event.category}</span></h4>
                            <ul>
                                <li><i className="fa fa-star"></i> {event.rating}</li>
                                <li><i className="fa fa-ticket"></i> {event.downloads}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllEvents;
