'use client';

import { getEvent } from "../actions"
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Loaders/Spinner";
import { getOwner, getResource } from "@/app/resource/[id]/actions";
import { Event, Resource, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export default ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [owner, setOwner] = useState<User | null>(null);
    const [resource, setResource] = useState<Resource | null>(null);

    useEffect(() => {
        getEvent({ id })
            .then((e) => {
                setEvent(e)
                getOwner({ id: e?.userId! }).then((owner) => setOwner(owner))
                getResource({ id: e?.resourceId! }).then((resource) => setResource(resource))
            })
            .then(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <h1>{event?.name}</h1>
            This meeting is in the {" "}
            <Link href={`/resource/${event?.resourceId}`}>
                {resource?.title}
            </Link>
            {" "} and is hosted by <Link href={`/user/${owner?.id}`}>{owner?.name}</Link>

            <p>{event?.description}</p>
            <p>{event?.url}</p>
            <img src={event?.image} />
            <p>
                {event?.start.toLocaleString().slice(10)} : {event?.end.toLocaleString().slice(10)}
            </p>
        </div>
    );
}