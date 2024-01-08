import React, { useEffect, useState } from 'react';

import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents } from '@/lib/features/event/eventSlice';
import { EventItem } from '../EventItem';
import { Event } from '@/lib/features/event/type';
import styles from './list.module.css';

export const EventList = () => {
  const events = useSelector((state: RootState) => state.counter.events);

  useEffect(() => {
    const events = localStorage.getItem('events');
    if (events) { setEvents(JSON.parse(events)); }
  }, []);

  if (!events.length) return <div className="no-events">No events</div>;

  const deleteEvent = (id: string) => {
    const newEvents: Event[] = events.filter((event) => event.id !== id);
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
