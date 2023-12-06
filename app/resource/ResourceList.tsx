'use server';
import { getServerSession } from 'next-auth';
import { prisma } from  '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ResourceDeleteButton } from './ResourceDeleteButton';
import Link from 'next/link';


export const ResourceList = async ({ resources }: any) => {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const currentUserId = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})
        .then(user => user?.id!);
    const usersResources = await prisma.resource.findMany({
        where: {
            userId: currentUserId
        }
    });

    return (
        <div>
            <h1>Owned Rooms</h1>
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Room Number</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {usersResources.map((resource) => (
                        <tr key={resource.id}>
                            <td>
                                <Link href={`/resource/${resource.id}`}>{resource.title}</Link>
                            </td>
                            <td>{resource.name}</td>
                            <td>{resource.description}</td>
                            <td>
                                <ResourceDeleteButton id={resource.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};