"use client"

import { getDataThemes } from "@/lib/getDataThemes"
import Card from "@/components/card"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"
import Link from "next/link"

export async function getStaticProps() {
    const data = await getDataThemes()

    return {
        props: {
            data
        }
    }
}

const Draft = (props: any) => {
    const { data } = useQuery({
        queryKey: ["theme"],
        queryFn: getDataThemes,
        initialData: props.data
    })

    return (
        <>
            <Head>
                <title>Draft Templates</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <div className="container">
                <div className="row">
                    {data?.map((item: any) => (
                        item.status === "DRAFT" ? <Link href={`/${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name}>
                            <Card title={item.name} />
                        </Link> : ""
                    ))}
                </div>
            </div>
        </>
    )
}

export default Draft;