"use client"

import { GlobalHead } from '@/components/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/templates/new')
  }, [router])

  return (
    <GlobalHead/>
  )
}

export default Page