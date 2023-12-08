'use server'
// create a server action that fetches a list of resources
import { prisma } from '@/lib/prisma'
import { Resource } from '@prisma/client'


export const getResources = async ({skip, take}:{skip:number | null, take:number | null}) => {    
    const resources = await prisma.resource.findMany({
        skip: skip || 0,
        take: take || 10,
    })

    return resources
}

export const getResource = async ({id}:{id:string}) => {    
    const resource = await prisma.resource.findUnique({
        where: {id : id}
    })

    return resource
}

export const getOwner = async ({id}:{id:string}) => {
    const owner = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return owner
}

export const getEvents = async ({id}:{id:string}) => {
    const events = await prisma.event.findMany({
        where: {
            resourceId: id
        }
    })

    return events
}