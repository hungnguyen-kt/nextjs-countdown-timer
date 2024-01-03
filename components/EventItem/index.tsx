import React, { useEffect } from 'react';
import styles from './item.module.css';
import CountdownTimer from '@/helpers/CountdownTimer';

type PropsType = {
  id: number;
  title: string;
  date: Date;
  deleteEvent: (id: number) => void;
};

export const EventItem = (props: PropsType) => {
  const { id, title, date } = props;

  const deleteEvent = () => {
    props.deleteEvent(id);
  }

  useEffect(() => {
    const daysEl = document.getElementById(`days-${id}`);
    const hoursEl = document.getElementById(`hours-${id}`);
    const minutesEl = document.getElementById(`minutes-${id}`);
    const secondsEl = document.getElementById(`seconds-${id}`);

    const timer = new CountdownTimer(
      date,
      daysEl,
      hoursEl,
      minutesEl,
      secondsEl
    );

    timer.start();
    return () => timer.stop();
  }, [id]);

  return (
    <li className={styles.event}>
      <div className={styles.event__wapper}>
        <div className={styles.event__content}>
          <h2 className={styles.event__title}>{title}</h2>
          <time>
            <span id={`days-${id}`}></span> days,{' '}
            <span id={`hours-${id}`}></span> hours,{' '}
            <span id={`minutes-${id}`}></span> minutes,{' '}
            <span id={`seconds-${id}`}></span> seconds.
          </time>
        </div>
        <div className={styles.event__actions}>
          <div className={styles['event__actions--edit']}>Edit</div>
          <div className={styles['event__actions--delete']} onClick={deleteEvent}>Delete</div>
        </div>
      </div>
    </li>
  );
};
