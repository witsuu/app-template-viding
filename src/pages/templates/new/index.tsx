'use client'

import { getDataThemesByStatus } from "@/lib/getDataThemes"
import Card from "@/components/card"
import { useEffect, useRef } from "react"
import { GlobalHead } from "@/components/head"
import { gsap } from "gsap"
import { Content } from "@/components/content"

export async function getStaticProps() {
    const data = await getDataThemesByStatus({ statusThemes: "" })

    return {
        props: {
            data
        }
    }
}

const New = ({ data }: any) => {
    const listRef: any = useRef([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(listRef.current, {
                duration: data.length < 5 ? 0.5 : data.length > 10 ? 1.5 : 1,
                y: -30,
                autoAlpha: 0,
                ease: "ease.inOut",
                stagger: {
                    amount: 0.5
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [listRef, data, containerRef])

    return (
        <>
            <GlobalHead title="New Templates" description="List of new templates wedding invitation for viding.co" />
            <Content>
                <div className="row card-list">
                    {data?.map((item: any, i: any) => (
                        <div ref={(el: HTMLDivElement) => (listRef.current[i] = el)} key={item.name} >
                            <Card title={item.name} path={item.path} withImg={true} />
                        </div>
                    ))}
                </div>
            </Content>
        </>
    )
}

export default New;