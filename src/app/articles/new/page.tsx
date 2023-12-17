'use client'

import Editor from "@/components/Editor"
import isAuth from "@/lib/auth/auth"
import Layout from "@/components/layouts/dashboardLayout"

const NewArticle = () => {
    return (
        <Layout>
            <div className="pb-40">
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Editor
                        onChange={() => {}}
                        initialContent={''}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default isAuth(NewArticle)