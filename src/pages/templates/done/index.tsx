import Card from "@/components/card"
import { getDataThemesByStatus } from "@/lib/getDataThemes"
import { GlobalHead } from "@/components/head"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export async function getServerSideProps() {
    const data = await getDataThemesByStatus({ statusThemes: "DONE" })

    return {
        props: {
            data
        }
    }
}

const Done = ({ data }: any) => {
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
                    amount: data.length < 5 ? 0.5 : data.length > 10 ? 2 : 1
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [listRef, data, containerRef])

    return (
        <>
                <GlobalHead title="Finished Templates" description="List of finished wedding invitation templates for viding.co" />
            <div className="container" ref={containerRef}>
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

export default Done;