"use client"

import Link from 'next/link';
import styles from './EventCard.module.css'
import { Event, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface Props {
    event: Event;
    email?: boolean;
}

export const EventCard = ({ event }: Props) => {

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
            </div>
        </div>
        );
}