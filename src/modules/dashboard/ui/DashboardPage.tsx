import React from 'react';
import { useCalendarEvents } from '../model/useCalendarEvents';
import { FullCalendarWidget } from './FullCalendarWidget';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { events, loading, addEvent, updateEvent, deleteEvent } = useCalendarEvents();

  if (loading) {
    return <div className="dashboard-page">Загрузка календаря...</div>;
  }

  return (
    <div className="dashboard-page">
      <h2>🏠 Главная страница</h2>
      <p>Клиника доктора Денисенко. Ниже — ваш рабочий календарь.</p>
      <FullCalendarWidget
        events={events}
        onEventAdd={addEvent}
        onEventUpdate={updateEvent}
        onEventDelete={deleteEvent}
      />
    </div>
  );
};