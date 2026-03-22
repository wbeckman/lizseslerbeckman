
import React, { useEffect, useState, useRef } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { convert } from 'ical2json';

const ICAL_URL = 'https://weathered-mode-3913.wbeckman91715.workers.dev';

const unescapeIcal = (str) => str?.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/gi, '\n').replace(/\\\\/g, '\\');

// iCal property keys can carry parameters, e.g. "DTSTART;TZID=America/New_York"
const getProp = (event, name) => {
    const key = Object.keys(event).find(k => k === name || k.startsWith(name + ';'));
    return key ? event[key] : null;
};

// Returns { date: Date, isAllDay: bool } or null
const parseICalDate = (raw) => {
    if (!raw) return null;
    // All-day: YYYYMMDD
    if (/^\d{8}$/.test(raw)) {
        const [y, m, d] = [raw.slice(0, 4), raw.slice(4, 6), raw.slice(6, 8)];
        return { date: new Date(+y, +m - 1, +d), isAllDay: true };
    }
    // Date-time: YYYYMMDDTHHmmss[Z]
    const match = raw.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
    if (match) {
        const [, y, mo, d, h, mi, s, utc] = match;
        const iso = `${y}-${mo}-${d}T${h}:${mi}:${s}${utc ? 'Z' : ''}`;
        return { date: new Date(iso), isAllDay: false };
    }
    return null;
};

const UpcomingSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Prevent double fetch in React Strict Mode
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchEvents = async () => {
            try {
                const response = await fetch(ICAL_URL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const text = await response.text();
                const data = convert(text);
                const vevents = data?.VCALENDAR?.[0]?.VEVENT ?? [];

                const now = new Date();
                const parsed = vevents
                    .map(event => ({
                        id: event.UID,
                        summary: unescapeIcal(event.SUMMARY),
                        location: unescapeIcal(getProp(event, 'LOCATION')),
                        start: parseICalDate(getProp(event, 'DTSTART')),
                        end: parseICalDate(getProp(event, 'DTEND')),
                    }))
                    .filter(e => e.start && e.start.date >= now)
                    .sort((a, b) => a.start.date - b.start.date);

                setEvents(parsed);
            } catch (err) {
                console.error('Error fetching calendar events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = ({ start }) =>
        start.isAllDay
            ? start.date.toDateString()
            : start.date.toLocaleDateString();

    const formatTime = ({ start, end }) => {
        if (start.isAllDay) return '';
        const startStr = start.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const endStr = end ? end.date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
        return endStr ? `${startStr} - ${endStr}` : startStr;
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
