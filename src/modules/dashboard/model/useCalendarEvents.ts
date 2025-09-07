import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../lib/types';

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Моковые данные
  useEffect(() => {
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Приём: Иванов А.А.',
        start: new Date(),
        end: new Date(Date.now() + 60 * 60 * 1000),
        backgroundColor: '#00a8a8',
        textColor: '#ffffff',
        extendedProps: {
          description: 'Первичный осмотр',
          patientId: 'p1',
          doctorId: 'd1',
        },
      },
      {
        id: '2',
        title: 'Совещание с администратором',
        start: new Date(Date.now() + 2 * 60 * 60 * 1000),
        end: new Date(Date.now() + 3 * 60 * 60 * 1000),
        backgroundColor: '#e85d75',
        textColor: '#ffffff',
        allDay: false,
      },
      {
        id: '3',
        title: 'Приём: Петрова М.С.',
        start: new Date(Date.now() + 24 * 60 * 60 * 1000),
        end: new Date(Date.now() + 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
        backgroundColor: '#00a8a8',
        textColor: '#ffffff',
        allDay: false,
      },
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prev =>
      prev.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};