'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from './main-header.module.css'

interface NavLinkProps{
    href : string;
    children : string;
}


export default function NavLink ({ href, children } : NavLinkProps) {
    const path: string | undefined = usePathname()
    
    return (
        <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : undefined }>
        {children}
        </Link>


    )

}