'use client';

import { usePathname } from 'next/navigation';
import NavBar from './navbar';
import SimpleNavBar from './simple-navbar';

export default function NavBarWrapper() {
    const pathname = usePathname();

    // Use the full navbar only on the homepage
    const isHomePage = pathname === '/';

    return isHomePage ? <NavBar /> : <SimpleNavBar />;
}
