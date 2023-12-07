"use server";

import UserCard from "@/components/UserCard/UserCard";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { EventCard } from "@/components/EventCard/EventCard";
import { CreateEventForm } from "@/app/event/CreateEventForm";

export default async function Users() {
  const events = await prisma.event.findMany();
  const resources = await prisma.resource.findMany();

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
