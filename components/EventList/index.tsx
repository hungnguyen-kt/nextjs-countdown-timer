import React, { useEffect, useState } from 'react';
import { EventItem } from '../EventItem';
import styles from './list.module.css';

const mockEvents = [
  {
    id: 1,
    title: 'Tet Holiday',
    date: '2024-12-01',
  },
  {
    id: 2,
    title: 'School Day',
    date: '2024-08-08',
  },
  {
    id: 3,
    title: 'New Job Day',
    date: '2024-01-10',
  },
  {
    id: 4,
    title: 'Birthday Party',
    date: '2024-02-18',
  }
];

type EventItem = {
  id: number;
  title: string;
  date: Date;
};

export const EventList = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  // localStorage.setItem('events', JSON.stringify(mockEvents));

  useEffect(() => {
    const events = localStorage.getItem('events');
    if (events) { setEvents(JSON.parse(events)); }
  }, []);

  if (!events.length) return <div className="no-events">No events</div>;

  const deleteEvent = (id: number) => {
    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem key={event.id} {...event} deleteEvent={(id) => deleteEvent(id)} />
      ))}
    </ul>
  );
};
