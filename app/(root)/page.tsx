'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearEvent } from '@/lib/features/event/eventSlice';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    event: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

import { v4 as uuidv4 } from 'uuid';
import styles from './page.module.css';

import { RootState } from '@/lib/store';
import { addEvent } from '@/lib/features/event/eventSlice';
import { Event } from '@/lib/features/event/type';

import { EventList } from '@/components/EventList';
import CountdownTimer from '@/helpers/CountdownTimer';

type Inputs = {
  event: string;
  date: string;
};

export default function Home() {
  const events = useSelector((state: RootState) => state.counter.events);
  const dispatch = useDispatch();

  const addMoreDate = (date: string, days: number) => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj.toISOString().substring(0, 10);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      event: '',
      date: addMoreDate(new Date().toISOString().substring(0, 10), 2),
    },
  });
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const closeSidebar = () => {
    dispatch(clearEvent());
    setShowSidebar(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData: Event = {
      id: uuidv4(),
      title: data.event,
      date: data.date,
    };
    setValue('event', '');
    localStorage.setItem('events', JSON.stringify([...events, formData]));
    dispatch(addEvent(formData));
  };

  useEffect(() => {
    const date = '2024-02-18';
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const timer = new CountdownTimer(
      date,
      daysEl,
      hoursEl,
      minutesEl,
      secondsEl
    );
    timer.start();
    return () => timer.stop();
  }, []);

  return (
    <main className={styles.main}>
      {!showSidebar && (
        <div className={styles.open__sidebar}>
          <div className={styles.close}>
            <div
              className={styles.close__icon}
              onClick={() => setShowSidebar(true)}
            ></div>
          </div>
        </div>
      )}

      {showSidebar && (
        <div className={styles.sidebar}>
          <div className={styles.sidebar__header}>
            <div className={styles.logo}>
            </div>
            <div className="title">
              <h1>Countdown Timer</h1>
            </div>
            <div className={styles.close}>
              <div className={styles.close__icon} onClick={closeSidebar}></div>
            </div>
          </div>
          <div className={`${styles.form__add__event} ${styles.show}`}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="event">Event:</label>
              <input
                type="text"
                id="event"
                {...register('event', { required: true })}
              />
              {errors.event?.message}

              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                className={styles.form__date}
                min={addMoreDate(new Date().toISOString().substring(0, 10), 2)}
                {...register('date', { required: true })}
              />
              {errors.date?.message}
              <input type="submit" value="Add Event" />
            </form>
          </div>

          <EventList />
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.countdown}>
          <div className={styles.countdown__item}>
            <div id="days" className={styles['countdown__item--number']}>
              00
            </div>
            <div className="countdown__item--text">Days</div>
          </div>
          <div className={styles.countdown__item}>
            <div id="hours" className={styles['countdown__item--number']}>
              00
            </div>
            <div className="countdown__item--text">Hours</div>
          </div>
          <div className={styles.countdown__item}>
            <div id="minutes" className={styles['countdown__item--number']}>
              00
            </div>
            <div className="countdown__item--text">Minutes</div>
          </div>
          <div className={styles.countdown__item}>
            <div id="seconds" className={styles['countdown__item--number']}>
              00
            </div>
            <div className="countdown__item--text">Seconds</div>
          </div>
        </div>
      </div>
    </main>
  );
}
