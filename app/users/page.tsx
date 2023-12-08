'use client'

import UserCard from '@/components/UserCard/UserCard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './actions';
import { User } from '@prisma/client';


export default async function Users(){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurrentUser().then((user) => setUser(user)).then(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Not logged in</div>;
    }
    
    return (
        <div className={styles.grid}>
            <UserCard user={user} />
        </div>
    );

}