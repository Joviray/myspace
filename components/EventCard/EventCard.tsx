"use client"

import Link from 'next/link';
import styles from './EventCard.module.css'
import { Event, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface Props {
    event: Event;
    email?: boolean;
}
export const OwnerInfo = async ({ event, email }: Props) => {
    const owner = await prisma.user.findFirst({
        where: {
            id: event.userId,
        },
    });

    return (
        <p>
            <Link href={`/users/${owner?.id}`}>
                {owner?.name}
            </Link>
            <span> at </span>
            {email && (<a href={`mailto:${owner?.email}`}> {owner?.email}</a>)    }
        </p>

        );
}
export const EventCard = async ({ event }: Props) => {

    return (
        <div className={styles.card}>
            <img
            src={event.image ?? 'mememan.webp'}
            alt={`${event.name}`}
            className = {styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3>
                    <Link href={`/event/${event.id}`}>{event.name}</Link>
                </h3>
                <OwnerInfo event={event} />
            </div>
        </div>
        );
}