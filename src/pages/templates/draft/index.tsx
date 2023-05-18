"use client"

import { getDataThemesServer } from "@/lib/getDataThemes"
import Card from "@/components/card"
import Head from "next/head"
import Link from "next/link"
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

const Draft = ({ data }: any) => {

    return (
        <>
            <Head>
                <title>Draft Templates</title>
                <GlobalHead />
            </Head>
            <div className="container">
                <div className="row">
                    {data?.map((item: any) => (
                        item.status === "DRAFT" ? <Link href={`${githubUrl}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name}>
                            <Card title={item.name} />
                        </Link> : ""
                    ))}
                </div>
            </div>
        </>
    )
}

export default Draft;