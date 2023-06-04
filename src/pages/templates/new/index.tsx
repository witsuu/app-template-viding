import { getDataThemesByStatus } from "@/lib/getDataThemes"
import Card from "@/components/card"
import Head from "next/head"
import Link from "next/link"
import { Suspense, useEffect, useRef } from "react"
import { githubUrl } from "@/@core/utilities/githubUrl"
import { GlobalHead } from "@/components/head"
import { gsap } from "gsap"

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

    useEffect(() => {
        gsap.from(listRef.current, {
            duration: data.length < 5 ? 0.5 : data.length > 10 ? 1.5 : 1,
            y: -30,
            autoAlpha: 0,
            ease: "ease.inOut",
            stagger: {
                amount: 0.5
            }
        })
    }, [listRef])

    return (
        <>
            <Head>
                <title>New Templates</title>
                <GlobalHead />
            </Head>
            <Suspense fallback={(<h2>Loading.</h2>)}>
                <div className="container">
                    <div className="row">
                        {data?.map((item: any, i: any) => (
                            <Link href={`${githubUrl}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name} ref={(el) => (listRef.current[i] = el)}>
                                <Card title={item.name} />
                            </Link>
                        ))}
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default New;