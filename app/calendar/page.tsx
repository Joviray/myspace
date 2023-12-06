'use server';

import { prisma } from '@/lib/prisma';
import { Calendar } from '../../components/Calendar'


export default async function CalendarPage() {
    const events = await prisma.event.findMany({
        select: {
            id: true,
            name: true,
            start: true,
            end: true,
            url: true,
            description: true,
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    return(
        <Calendar events={events  }/>
    )
}
