"use client";

import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'


export async function Calendar(params:any){
    
    const events = params.events.map((event: { url: any; }) => ({
        ...event,
        url: event.url || undefined, // Convert null to undefined
    }));


  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events}
    />
  );
};
