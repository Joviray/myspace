import { prisma } from "@/lib/prisma";
import Error from 'next/error'
import Link from "next/link";
import { OwnerInfo } from "@/components/ResourceCard/ResourceCard";


export default async ({params}: {params: {id: string}}) => {
    const { id } = params;
    //get the id of the current user from the route

    const resource = await prisma.resource.findFirst({
        where: {
            id: id,
        },
    });


    // get the owner of the resource

    const owner = await prisma.user.findFirst({
        where: {
            id: resource?.userId,
        },
    });


    return (
        <>
        <h1>{resource?.title} </h1>
        <p>{resource?.description}</p>
        <img src={resource?.image ?? 'mememan.webp'} alt={`${resource?.title}`} height={300} />

        <p>
            For questions or inqueries about this room please contatct the owner
            <OwnerInfo resource={resource} email={true}/>
        </p>
        </>
    )
};