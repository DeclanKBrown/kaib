'use client'
import Chat from '@/components/Chat'
import Layout from '@/components/layouts/dashboardLayout'
import isAuth from '@/lib/auth/auth'

const Home = () => {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}

export default isAuth(Home)