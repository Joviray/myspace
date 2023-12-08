'use client';

import styles from "./page.module.css";
import { EventCard } from "@/components/EventCard/EventCard";
import { CreateEventForm } from "@/components/Forms/CreateEventForm";
import { Event, Resource } from "@prisma/client";
import { useState, useEffect } from "react";
import { getEvents } from "./actions";
import { getResources } from "../resource/[id]/actions";


export default function eventform() {
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getEvents({}).then((events) => setEvents(events)).then(() => setLoading(false));
    getResources({skip: 0, take: 0}).then((resources) => setResources(resources));

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (<>
      <h1>Events</h1>
      <CreateEventForm resources={resources}/>
      <div className={styles.grid}>
        {events.map((event) => {
            return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </>
  );
}
