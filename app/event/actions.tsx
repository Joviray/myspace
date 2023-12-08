'use server'
// create a server action that fetches a list of resources
import { prisma } from '@/lib/prisma'
import { Resource, Event } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


export const getEvents = async (params: any): Promise<Event[]> => {
    const { resourceId } = params;
    const events = await prisma.event.findMany({
        where: {
            resourceId: resourceId
        }
    });

    return events;
}

export const createEvent = async ({ name, description, url, image, resourceId, tags, start, end, allDay }: any): Promise<Event> => {

    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);

    const resource = await prisma.resource.findUnique({
        where: {
            id: resourceId
        }
    });

    if (!resource) {
        throw new Error("Resource not found");
    }

    name = name || '';
    description = description || '';
    url = url || "";
    image = image || "http://placekitten.com/200/300";
    tags = tags || [];
    start = new Date(start) || new Date();
    end = new Date(end) || new Date();
    allDay = allDay == 'true' ? true : false

    const event = await prisma.event.create({
        data: {
            userId: currentUserId,
            name: name,
            description: description,
            url: url,
            image: image,
            resourceId: resourceId,
            tags: tags,
            start: start,
            end: end,
            allDay: allDay,
        }
    });

    return event;
};

export const getEvent = async ({ id }: { id: string }): Promise<Event | null> => {
    const event = await prisma.event.findUnique({
        where: { id: id }
    });

    return event;
}

