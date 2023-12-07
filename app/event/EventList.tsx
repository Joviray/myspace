'use server';
import { getServerSession } from 'next-auth';
import { prisma } from  '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { EventDeleteButton } from './EventDeleteButton';
import Link from 'next/link';


export const ResourceList = async ({ resources }: any) => {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);
    const usersEvents = await prisma.event.findMany({
    });
    

    return (
        <div>
            <h1>Events</h1>
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Room Number</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {usersEvents.map((event) => (
                        <tr key={event.id}>
                            <td>
                                <Link href={`/event/${event.id}`}>{event.name}</Link>
                            </td>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>
                                <EventDeleteButton id={event.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};