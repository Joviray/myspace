
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import type { NextAuthOptions } from 'next-auth';
import { authOptions } from "../../api/auth/[...nextauth]/route";

interface Event {
    name: string;
    start: Date;
    end: Date;
    description?: string;
    allDay: boolean;
    tags: string[];
    url: string;
    resourceId: string;

}




export default async function createEvent({
    params,
}: {
    params: { id: string };
}) {
    const formData: Event = {
        name: "",
        start: new Date(),
        end: new Date(),
        allDay: false,
        tags: [],
        url: "",
        resourceId: "1",
       
    };

    async function create(formData: FormData) {
        "use server";
        //const session = await getServerSession(authOptions)
        
        //const { userId } = session as any;

        const name = formData.get("name") || "";
        const start = formData.get("start");
        const end = formData.get("end");
        const description = formData.get("description") || "";


        const prisma = new PrismaClient();
        const event = await prisma.event.create({
            data: {
                name: name,
                start: new Date(start),
                end: new Date(end),
                description: description,
                allDay: false,
                tags:  [],
                url: "",
                userId: 'clj4r8ksv0000v6c0e1wfh71g',
                resourceId: "1",
                createdAt: new Date(),
            },
        });
        console.log(event)


    }

    return (
        <div>

            <form action={create}>
                
                <label>Name</label>
                <input name="name" type="text" defaultValue={" "} />
                <label>Start</label>
                <input name="start" type="datetime-local" />
                <label>End</label>
                <input name="end" type="datetime-local" />
                <label>Description</label>
                <textarea name="description" type="text" defaultValue={" "} />
                <button type="submit">Save and Continue</button>

            </form>
        </div>
    );
}