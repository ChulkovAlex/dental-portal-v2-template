import React, { useCallback, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarEvent } from '../lib/types';
import './FullCalendarWidget.css';

interface FullCalendarWidgetProps {
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
}

export const FullCalendarWidget: React.FC<FullCalendarWidgetProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  const handleDateSelect = useCallback(
    (selectInfo: any) => {
      const title = prompt('Введите название события:');
      if (title) {
        const newEvent = {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          backgroundColor: '#00a8a8',
          textColor: '#ffffff',
        };
        onEventAdd(newEvent);
      }
      // Сбрасываем выделение
      if (calendarRef.current) {
        calendarRef.current.getApi().unselect();
      }
    },
    [onEventAdd]
  );

  const handleEventClick = useCallback(
    (clickInfo: any) => {
      if (
        confirm(
          `Удалить событие "${clickInfo.event.title}"?`
        )
      ) {
        onEventDelete(clickInfo.event.id);
      }
    },
    [onEventDelete]
  );

  const handleEventDrop = useCallback(
    (dropInfo: any) => {
      const updatedEvent = {
        ...dropInfo.event.extendedProps,
        id: dropInfo.event.id,
        title: dropInfo.event.title,
        start: dropInfo.event.start,
        end: dropInfo.event.end,
      };
      onEventUpdate(updatedEvent);
    },
    [onEventUpdate]
  );

  const handleEventResize = useCallback(
    (resizeInfo: any) => {
      const updatedEvent = {
        ...resizeInfo.event.extendedProps,
        id: resizeInfo.event.id,
        title: resizeInfo.event.title,
        start: resizeInfo.event.start,
        end: resizeInfo.event.end,
      };
      onEventUpdate(updatedEvent);
    },
    [onEventUpdate]
  );

  return (
    <div className="fullcalendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        locale="ru"
        buttonText={{
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
          list: 'Список',
        }}
        height="80vh"
      />
    </div>
  );
};