import Head from 'next/head'

type THead={
    title?:string,
    description?:string
}

export const GlobalHead = ({title,description}:THead) => {
    return (
        <Head>
            <title>{title ?? "Template for Viding"}</title>
            <meta name="description" content={description ?? "List templates wedding invitation for viding.co"} />

            <meta property='og:title' content="Template For Viding" />
            <meta property='og:url' content="https://template.cakwit.my.id" />
            <meta property='og:type' content='website' />
            <meta property='og:description' content={description ?? "List templates wedding invitation for viding.co"} />
            <meta property='og:image' content="/android-icon-192x192.png" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
    )
}