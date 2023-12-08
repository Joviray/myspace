'use client'

import { prisma } from "@/lib/prisma";
import { OwnerInfo } from "@/components/ResourceCard/ResourceCard";
import { getFutureEvents, getResource, getCurrentEvents } from "./actions";
import { Event, Resource } from "@prisma/client";
import { useEffect, useState} from "react";
import { get } from "https";


export default ({params}: {params: {id: string}}) => {
    const { id } = params;
    //get the id of the current user from the route

    const [resource, setResource] = useState<Resource | null>(null);
    const [futureEvents, setFutureEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);

    useEffect(() => {
        getResource({resourceId: id}).then((resource) => {
            setResource(resource);
            setLoading(false);
        });
        getFutureEvents({resourceId: id}).then((events) => {
            setFutureEvents(events);
        });
        getCurrentEvents({resourceId: id}).then((events) => {
            setCurrentEvents(events);
        });
    }, []);

    if (loading) {
        return <h1>Loading</h1>
    }

    if(!resource) {
        return <h1>Resource Not Found</h1>
    }

    if(currentEvents.length > 0) {
        return (
            <div>
                <h1>{resource.name}</h1>
                <h2>Current Events</h2>
                <ul>
                    {currentEvents.map((event) => {
                        return <li>{event.name}</li>
                    })}
                </ul>
                <h2>Future Events</h2>
                <ul>
                    {futureEvents.map((event) => {
                        return <li>{event.name}</li>
                    })}
                </ul>
            </div>
        )
    }

    if(futureEvents.length > 0) {
        return (
            <div>
                <h1>{resource.name}</h1>
                <h2>Future Events</h2>
                <ul>
                    {futureEvents.map((event) => {
                        return <li>{event.name}</li>
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <h1>{resource.name}</h1>
            <h2>No Upcoming Events</h2>
        </div>
    )
};