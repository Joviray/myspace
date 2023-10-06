import Link from 'next/link';
import  Image from 'next/image';
import styles from './NavMenu.module.css';
import { SignInButton } from '../components/button';

export default function NavMenu() {
    return (
        <nav className={styles.nav}>
            <Link href={'/'}>
            <Image
            src = "/gator_logo.jpg"
            width={73}
            height = {73}
            alt="NextSpace Logo"
            />
            </Link>
            <ul className={styles.links}>
                <li>
                    <Link href={'/about'}>About Us</Link>
                </li>
               
                <li>
                    <Link href={'/calendar'}>Calendar</Link>
                </li>
                <li>
                    <Link href={'/users'}>Users</Link>
                </li>
                <li>
                    <SignInButton />
                </li>
                </ul>
            </nav>

    );
}