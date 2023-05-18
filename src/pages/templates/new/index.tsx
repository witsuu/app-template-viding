import { getDataThemesServer } from "@/lib/getDataThemes"
import Card from "@/components/card"
import Head from "next/head"
import Link from "next/link"
import { Suspense } from "react"
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

const New = ({ data }: any) => {

    return (
        <>
            <Head>
                <title>New Templates</title>
                <GlobalHead />
            </Head>
            <Suspense fallback={(<h2>Loading.</h2>)}>
                <div className="container">
                    <div className="row">
                        {data?.map((item: any) => (
                            !item.status ? <Link href={`${githubUrl}${item.path}`} target="_blank" rel="noopener noreferrer" key={item.name}>
                                <Card title={item.name} />
                            </Link> : ""
                        ))}
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default New;