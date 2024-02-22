"use client"

import { Sidebar as styles } from "@/styles"
import { sidebarData } from "@/data/sidebars"
import className from "@/utils/multiClass";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { Hamburger } from "./hamburger";

export const Sidebar = () => {
    const pathname = usePathname()

    const [navActive, setNavActive] = useState("/templates/new")

    useEffect(() => {
        setNavActive(pathname)
    }, [pathname])

    const isActiveNav = (status: string) => {
        if (navActive == `/templates/${status}`) {
            return true
        } else {
            return false
        }
    }

    return (
        <aside className={styles.sidebar}>
            <Hamburger />
            <ul className={styles.menu}>
                {
                    sidebarData.map(data => (
                        <li className={styles.menuList} key={data.title}>
                            <Link href={"/templates/" + data.path} className={isActiveNav(data.path) ? className(styles.menuItem, styles.active) : styles.menuItem}>{data.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}