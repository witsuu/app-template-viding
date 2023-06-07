"use client"

import Card from "@/components/card"
import Head from "next/head"
import Link from "next/link"
import { githubUrl } from "@/@core/utilities/githubUrl"
import { GlobalHead } from "@/components/head"
import { getDataThemesByStatus } from "@/lib/getDataThemes"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export async function getStaticProps() {
    const data = await getDataThemesByStatus({ statusThemes: "DRAFT" })

    return {
        props: {
            data
        }
    }
}

const Draft = ({ data }: any) => {
    const listRef: any = useRef([])

    useEffect(() => {
        gsap.from(listRef.current, {
            duration: data.length < 5 ? 0.5 : data.length > 10 ? 1.5 : 1,
            y: -30,
            autoAlpha: 0,
            ease: 'ease.inOut',
            stagger: {
                amount: 1
            }
        })
    }, [listRef, data])

    return (
        <>
            <Head>
                <title>Draft Templates</title>
                <GlobalHead />
            </Head>
            <div className="container">
                <div className="row">
                    {data?.map((item: any, i: any) => (
                        <div ref={(el: HTMLDivElement) => (listRef.current[i] = el)} key={item.name}>
                            <Card title={item.name} path={item.path} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Draft;