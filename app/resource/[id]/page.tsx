'use server';

import { prisma } from '@/lib/prisma';
import { Calendar } from '@/components/Calendar';
import { OwnerInfo } from "@/components/ResourceCard/ResourceCard";



export default async ({params}: {params: {id: string}}) => {
    const { id } = params;

    const resource = await prisma.resource.findUnique({
        where: {
            id: id
        }
    });

    const events = await prisma.event.findMany({
        where : {
            resourceId: id
        },
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
    
    return (
        <>
            <Calendar
                initialView="timeGridWeek"
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
                headerToolbar = {{
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridWeek,timeGridDay",
                }}
                />
            <OwnerInfo resource={resource} email={true}/>
        </>
    );
}
