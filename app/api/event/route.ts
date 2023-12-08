// gets every resource from the database

import { prisma } from  '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);
        
    const { name, description, url, image, tags, resourceId, start, end, allday}= await req.json();

    const resource = await prisma.resource.findFirst({
        where: {
            id: resourceId!,
        },
    });
    
    
    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    
    if (!start) {
        return NextResponse.json({ error: "Start date is required" }, { status: 400 })
    }
    
    if (!end) {
        return NextResponse.json({ error: "End date is required" }, { status: 400 })
    }
    
    if (!resource) {
        return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    const splittags = tags.split(",").map((tag: string) => tag.trim());

    const record = await prisma.event.create({
        data: {
            userId: currentUserId,
            name: name || "",
            description: description || "",
            url: url || "",
            image: image || "https://i.imgur.com/Jvh1OQm.jpeg",
            tags: splittags || [],
            resourceId: resourceId,
            start: new Date(start),
            end: new Date(end),
            createdAt: new Date(),
            allDay: allday || false,
        },
    });
        return NextResponse.json(record);

}

export async function DELETE(req: NextRequest){
    const session =  await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const {targetId} = await req.json();


    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail }
        }).then(user => user?.id!);

    const record = await prisma.event.delete({
        where: {
            userId: currentUserId,
            id: targetId,
        },
    });

    return NextResponse.json(record);
}

export async function GET(req: NextRequest){
    console.log("GET request");
    const records = await prisma.event.findMany();
    return NextResponse.json(records);
}
