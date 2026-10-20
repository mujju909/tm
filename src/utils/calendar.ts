import { EventDetail, WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * Formats a local date and time string into iCalendar format (YYYYMMDDTHHMMSS)
 */
function formatICalDate(dateISO: string, timeStr: string): string {
  const [year, month, day] = dateISO.split('-');
  const [hours, minutes] = timeStr.split(':');
  return `${year}${month}${day}T${hours || '00'}${minutes || '00'}00`;
}

/**
 * Downloads a standard .ics calendar file for the given event
 */
export function downloadIcsFile(event: EventDetail): void {
  const coupleNames = `${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName}`;
  const summary = `${event.title} — ${coupleNames}`;
  const description = `${event.tagline}\\n\\nVenue: ${event.fullAddress}\\n\\nJoin the Khan & Mulla families in celebrating this blessed day!`;
  const location = event.fullAddress;

  const dtStart = formatICalDate(event.dateISO, event.startTime);
  const dtEnd = event.endTime
    ? formatICalDate(event.dateISO, event.endTime)
    : formatICalDate(event.dateISO, `${Number(event.startTime.split(':')[0]) + 3}:00`);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Taufique & Madiha Wedding//Islamic Digital Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@taufique-madiha.wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
    `DTEND;TZID=Asia/Kolkata:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${summary} tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-wedding-${event.dateISO}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a direct Google Calendar web link for 1-tap addition on mobile
 */
export function getGoogleCalendarUrl(event: EventDetail): string {
  const coupleNames = `${WEDDING_CONFIG.couple.groom.firstName} & ${WEDDING_CONFIG.couple.bride.firstName}`;
  const title = encodeURIComponent(`${event.title}: ${coupleNames}`);
  const details = encodeURIComponent(
    `${event.tagline}\n\nVenue: ${event.fullAddress}\n\nFamily Contacts: ${WEDDING_CONFIG.contacts.map((c) => `${c.name}: ${c.formattedPhone}`).join(', ')}`
  );
  const location = encodeURIComponent(event.fullAddress);

  const startFormatted = formatICalDate(event.dateISO, event.startTime);
  const endFormatted = event.endTime
    ? formatICalDate(event.dateISO, event.endTime)
    : formatICalDate(event.dateISO, `${Number(event.startTime.split(':')[0]) + 3}:00`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
}
