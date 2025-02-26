
import React, { useEffect, useState, useRef } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UpcomingSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Prevent double fetch in React Strict Mode
    const fetchedRef = useRef(false);

    // Example: Google Calendar public read-only
    const CALENDAR_ID = 'd0b3cdfcbfae917ff338591f7cbbe1da76b7e3e9916e2e46d94e702125864d5f@group.calendar.google.com';
    const gcal = atob('QUl6YVN5Q3NlSzRmMEF2SmdJcW5pNHB1c3gta3d1dVNISXN0ZGow');

    useEffect(() => {
    if (fetchedRef.current) return; // skip if already fetched
    fetchedRef.current = true;

    const fetchEvents = async () => {
        try {
        const now = new Date().toISOString();
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${gcal}&singleEvents=true&orderBy=startTime&timeMin=${now}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.items || []);
        } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    fetchEvents();
    }, [CALENDAR_ID, gcal]);

    // Format helpers
    const formatDate = (event) => {
    const isAllDay = !!event.start.date;
    const start = isAllDay
        ? event.start.date
        : event.start.dateTime || event.start.date;
    const startDate = new Date(start);

    return isAllDay
        ? startDate.toDateString()         // e.g., "Tue Feb 25 2025"
        : startDate.toLocaleDateString(); // e.g., "2/25/2025"
    };

    const formatTime = (event) => {
    const isAllDay = !!event.start.date;
    if (isAllDay) return '';

    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Format: "8:00 AM - 9:30 AM"
    const startStr = startDate.toLocaleString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
    const endStr = endDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
    return `${startStr} - ${endStr}`;
    };

    return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 font-[Gloock] text-center">
        Upcoming Events
        </h1>

        {loading && <p className="text-center">Loading events...</p>}
        {!loading && error && (
        <p className="text-red-500 text-center">Error: {error}</p>
        )}
        {!loading && !error && events.length === 0 && (
        <p className="text-center">No upcoming events found.</p>
        )}

        {!loading && !error && events.length > 0 && (
        <ul className="mx-auto md:w-[60%] w-[80%] space-y-4 text-center">
            {events.map((event) => (
            <li key={event.id} className="border-b border-gray-200 pb-4">
                <h2 className="font-[Instrument_Sans] text-lg font-medium mb-2">
                {event.summary}
                </h2>

                {/* DATE/TIME ROW */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-[Instrument_Sans] mb-1">
                <CalendarMonthIcon fontSize="small" />
                <span>
                    {formatDate(event)}
                    {formatTime(event) && ` · ${formatTime(event)}`}
                </span>
                </div>

                {/* LOCATION ROW */}
                {event.location && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-[Instrument_Sans]">
                    <LocationOnIcon fontSize="small" />
                    <span>{event.location}</span>
                </div>
                )}
            </li>
            ))}
        </ul>
        )}
    </section>
    );
};

export default UpcomingSection;
