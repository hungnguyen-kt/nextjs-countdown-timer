import React, { useEffect, useState } from 'react';
import { EventItem } from '../EventItem';
import styles from './list.module.css';

type EventItem = {
  id: number;
  title: string;
  date: Date;
};

export const EventList = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

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
