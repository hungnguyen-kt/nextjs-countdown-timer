'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { EventList } from '@/components/EventList';
import CountdownTimer from '@/helpers/CountdownTimer';

export default function Home() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const deplay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
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
    const date = new Date('2024-02-18');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const timer = new CountdownTimer(date, daysEl, hoursEl, minutesEl, secondsEl);
    timer.start();
    return () => timer.stop();
  }, []);

  return (
    <main className={styles.main}>
      <button onClick={() => setShowSidebar(true)}>setShowSidebar</button>
      {showSidebar && (
        <div className={styles.sidebar}>
          <div className={styles.sidebar__header}>
            <div className={styles.close}>
              <div className={styles.close__icon} onClick={closeSidebar}></div>
            </div>
            <div className="title">
              <h1>Countdown Timer</h1>
            </div>
            <div className={styles.add}>
              <div className={styles.add__icon} onClick={toogleForm}></div>
            </div>
          </div>
          {showForm ? (
            <div
              className={`${styles.form__add__event} ${
                animation ? styles.show : styles.hide
              }`}
            >
              <form onSubmit={onSubmit}>
                <div className={styles.form__group}>
                  <label htmlFor="event">Event:</label>
                  <input type="text" name="event" id="event" />
                </div>

                <div className={styles.form__group}>
                  <label htmlFor="date">Date:</label>
                  <input type="date" name="date" id="date" />
                </div>

                <div className={styles.form__group}>
                  <button type="submit">Add Event</button>
                </div>
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
