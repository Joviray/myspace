"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Event } from "@prisma/client";
import { EventSourceInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";

interface CalendarType {
  events: Event[];
  initialView?:
    | "dayGridMonth"
    | "dayGridWeek"
    | "dayGridDay"
    | "timeGridWeek"
    | "timeGridDay"
    | "listWeek"
    | "listDay";
  headerToolbar?: {
    left: string;
    center: string;
    right: string;
  };
}

export async function Calendar(params: CalendarType) {
  const events: EventSourceInput = params.events.map((event: Event) => ({
    ...event,
    title: event.name,
    url: `/event/${event.id}`,
    diplay: "block",
  }));

  const headerToolbar = params.headerToolbar ?? {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,dayGridDay",
  }

  return (
  <div>
    <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin]}
    headerToolbar={headerToolbar}
      initialView={params.initialView ?? "dayGridMonth"}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events}
      slotMinTime={"08:00:00"}
      slotMaxTime={"22:00:00"}
      />
    </div>
  );
}
