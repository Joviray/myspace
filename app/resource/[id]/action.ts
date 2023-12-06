'use server'
// create a server action that fetches a list of resources
import { prisma } from '@/lib/prisma'
import { Resource } from '@prisma/client'


export const getResources = async ({skip, take}:{skip:number, take:number}) => {    
    const resources = await prisma.resource.findMany({
        skip: skip || 0,
        take: take || 10,
    })

    return resources
}