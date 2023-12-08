import { prisma } from  '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';



export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const currentUser = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }})

    return currentUser;
}