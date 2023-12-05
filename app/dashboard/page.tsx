import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from './ProfileForm';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/button';
import { authOptions } from "../api/auth/[...nextauth]/route"
import { CreateResourceForm } from '../resource/CreateResourceForm';
import { ResourceList } from '../resource/ResourceList';


export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/api/auth/signin');
    }

    const currentUserEmail = session?.user?.email!;
    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    return (
        <>
        <h1>Dashboard</h1>
        <SignOutButton />
        <CreateResourceForm user={user} />
        <ProfileForm user={user} />
        <ResourceList user={user} />
        </>
    );
}