'use client';

import { prisma } from '@/lib/prisma';
import { Calendar } from '../../components/Calendar'
import { getEvents } from '../event/actions';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/Loaders/Spinner';

export default async function CalendarPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getEvents({}).then((events) => setEvents(events)).then(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner />
    }

    return (
        <Calendar
            initialView="dayGridMonth"
            events={events.map(event => ({
                ...event,
                image: null,
                userId: '',
                resourceId: '',
                tags: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                allDay: false,
            }))}
        />
    );
}
