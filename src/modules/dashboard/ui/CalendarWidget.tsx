import React from 'react';
import { CalendarEvent } from '../lib/types';
import './CalendarWidget.css';

interface CalendarWidgetProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const defaultEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Приём пациента Иванова А.А.',
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000),
  },
];

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events = defaultEvents, onEventClick }) => {
  return (
    <div className="calendar-widget">
      <h3>📅 Календарь (MVP — заглушка)</h3>
      <p>Здесь будет интерфейс как в Яндекс.Календаре</p>
      <div className="calendar-events">
        {events.map(event => (
          <div
            key={event.id}
            className="calendar-event"
            onClick={() => onEventClick && onEventClick(event)}
          >
            <strong>{event.title}</strong>
            <div>{event.start.toLocaleString()} — {event.end.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};