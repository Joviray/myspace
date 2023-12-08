'use server'
import { prisma } from "@/lib/prisma";
import { Resource, Event } from "@prisma/client";

interface GetFutureEventsType {
    resourceId: string
}

export const getFutureEvents = async (params:GetFutureEventsType): Promise<Event[]> => {
    const { resourceId } = params;
    const events = await prisma.event.findMany({
        where: {
            resourceId: resourceId,
            start: {
                gte: new Date(),
            },
        },
    });
    return events;   
}

export const getResource = async (params: GetFutureEventsType): Promise<Resource | null> => {
    const { resourceId } = params;
    const resource = await prisma.resource.findFirst({
        where: {
            id: resourceId,
        },
    });
    return resource;
}

export const getCurrentEvents = async (params: GetFutureEventsType): Promise<Event[]> => {
    const { resourceId } = params;
    const events = await prisma.event.findMany({
        where: {
            resourceId: resourceId,
            start: {
                lte: new Date(),
            },
            end: {
                gte: new Date(),
            },
        },
    });
    return events;
}