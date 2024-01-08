'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import styles from './page.module.css';

import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      event: '',
      date: new Date().toISOString().substring(0, 10),
    },
  });
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const deplay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData: Event = {
      id: uuidv4(),
      title: data.event,
      date: data.date,
    }
    localStorage.setItem('events', JSON.stringify([...events, formData]));
    dispatch(addEvent(formData));
  };

  const toogleForm = async () => {
    if (showForm) {
      setAnimation(false);
      await deplay(200);
      setShowForm(false);
      return;
    } else {
      setShowForm(true);
      await deplay(0);
      setAnimation(true);
      return;
    }
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
      <div className={styles.close}>
        <div
          className={styles.close__icon}
          onClick={() => setShowSidebar(true)}
        ></div>
      </div>
      {showSidebar && (
        <div className={styles.sidebar}>
          <div className={styles.sidebar__header}>
            <div className={styles.add}>
              <div className={styles.add__icon} onClick={toogleForm}></div>
            </div>
            <div className="title">
              <h1>Countdown Timer</h1>
            </div>
            <div className={styles.close}>
              <div className={styles.close__icon} onClick={closeSidebar}></div>
            </div>
          </div>
          {showForm ? (
            <div
              className={`${styles.form__add__event} ${
                animation ? styles.show : styles.hide
              }`}
            >
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="event">Event:</label>
                <input
                  type="text"
                  id="event"
                  {...register('event', { required: true })}
                />
                {errors.event && <span>This field is required</span>}

                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  className={styles.form__date}
                  {...register('date', { required: true })}
                />
                {errors.date && <span>This field is required</span>}
                <input type="submit" value="Add Event" />
              </form>
            </div>
          ) : null}

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
