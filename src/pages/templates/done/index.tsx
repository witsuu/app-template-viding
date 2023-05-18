"use client"

import Link from "next/link"
import Card from "@/components/card"
import Head from "next/head"
import { getDataThemesServer } from "@/lib/getDataThemes"
import { githubUrl } from "@/@core/utilities/githubUrl"
import { GlobalHead } from "@/components/head"

export async function getServerSideProps() {
    const data = await getDataThemesServer()

    return {
        props: {
            data
        }
    }
}

const Done = ({ data }: any) => {

    return (
        <>
            <Head>
                <title>Finished Templates</title>
                <GlobalHead />
            </Head>
            <div className="container">
                <div className="row">
                    {data?.map((item: any) => (
                        item.status === "DONE" ? <Link href={`${githubUrl}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name}>
                            <Card title={item.name} />
                        </Link> : ""
                    ))}
                </div>
            </div>
        </>
    )
}

export default Done;