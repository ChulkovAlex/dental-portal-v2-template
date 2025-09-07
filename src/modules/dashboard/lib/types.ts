export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  allDay?: boolean;
  extendedProps?: {
    description?: string;
    patientId?: string;
    doctorId?: string;
  };
}