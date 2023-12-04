// gets every resource from the database

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from  '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const { title, name, description, url, image, tags, color } = await req.json();
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);

        const record = await prisma.resource.create({
            data: {
                userId     : currentUserId,
                title: title || "",
                name: name || "",
                description: description || "",
                url: url || "",
                image: image || "https://www.specadsystems.com/content/dam/ad-systems/site-images/blog/oct-2018-blog-childrens.jpg",
                tags: tags || [],
                color: color || "",
            },
        })

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

    const record = await prisma.resource.delete({
        where: {
            userId: currentUserId,
            id: targetId!,
        },
    });

    return NextResponse.json(record);
}

export async function GET(req: NextRequest){
    const records = await prisma.resource.findMany();
    return NextResponse.json(records);
}

export async function PUT(req: NextRequest){
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const { title, name, description, url, image, tags, color } = await req.json();
    const targetId = req.nextUrl.searchParams.get('targetUserId');

    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);

        const record = await prisma.resource.update({
            where: {
                userId: currentUserId,
                id: targetId!,
            },
            data: {
                title: title || "",
                name: name || "",
                description: description || "",
                url: url || "",
                image: image || "https://www.specadsystems.com/content/dam/ad-systems/site-images/blog/oct-2018-blog-childrens.jpg",
                tags: tags || [],
                color: color || "",
            },
        })

        return NextResponse.json(record);
}