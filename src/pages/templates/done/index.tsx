"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Card from "@/components/card"
import Head from "next/head"
import { getDataThemes } from "@/lib/getDataThemes"

export async function getStaticProps() {
    const data = await getDataThemes()

    return {
        props: {
            data
        }
    }
}

const Done = (props: any) => {
    const { data } = useQuery({
        queryKey: ["theme"],
        queryFn: getDataThemes,
        initialData: props.data
    })

    return (
        <>
            <Head>
                <title>Finished Templates</title>
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
                        item.status === "DONE" ? <Link href={`${process.env.GITHUB_URL}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name}>
                            <Card title={item.name} />
                        </Link> : ""
                    ))}
                </div>
            </div>
        </>
    )
}

export default Done;