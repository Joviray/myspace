"use client";

import { prisma } from "@/lib/prisma";
import { Calendar } from "@/components/Calendar";
import { useState, useEffect } from "react";
import { Resource, User } from "@prisma/client";
import { getResource, getOwner, getEvents } from "../actions";
import { Spinner } from "@/components/Loaders/Spinner";
import { get } from "http";
import Email from "next-auth/providers/email";
import styles from "./page.module.css";

export default ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<any[]>([]);
  const [owner, setOwner] = useState<User | null>(null);

  useEffect(() => {
    getResource({ id })
      .then((r) => {
        setResource(r)
        getOwner({ id: r?.userId! })
            .then((owner) => setOwner(owner))
    })
      .then(() => setLoading(false))

    getEvents({ id })
        .then((events) => setEvents(events));
  }, []);

    if (loading) {
        return <Spinner />
    }

  return (
    <div className={styles.white}>
    <h1>{resource?.title}</h1>
    <Calendar
      initialView="timeGridWeek"
      events={events.map((event) => ({
        ...event,
        image: null,
        userId: "",
        resourceId: "",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        allDay: false,
    }))}
    headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
    }}
    />
    For questions or concerns, please contact <a href={`mailto:${owner?.email}`}>{owner?.name}</a>
    </div>
  );
};
