"use client"

import Link from "next/link"
import Card from "@/components/card"
import Head from "next/head"
import { getDataThemesByStatus } from "@/lib/getDataThemes"
import { githubUrl } from "@/@core/utilities/githubUrl"
import { GlobalHead } from "@/components/head"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export async function getStaticProps() {
    const data = await getDataThemesByStatus({ statusThemes: "DONE" })

    return {
        props: {
            data
        }
    }
}

const Done = ({ data }: any) => {
    const listRef: any = useRef([])

    useEffect(() => {
        gsap.from(listRef.current, {
            duration: data.length < 5 ? 0.5 : data.length > 10 ? 1.5 : 1,
            y: -30,
            autoAlpha: 0,
            ease: 'ease.inOut',
            stagger: {
                amount: 3
            }
        })
    }, [listRef])

    return (
        <>
            <Head>
                <title>Finished Templates</title>
                <GlobalHead />
            </Head>
            <div className="container">
                <div className="row">
                    {data?.map((item: any, i: any) => (
                        <Link href={`${githubUrl}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name} ref={(el) => (listRef.current[i] = el)}>
                            <Card title={item.name} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Done;