'use client'

import { useEffect, useState } from "react"
import app from "@/lib/firebase/config"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import isAuth from "@/lib/auth/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import Layout from "@/components/layouts/dashboardLayout"

const db = getFirestore(app)
const storage = getStorage(app)

interface ArticleDetailProps {
    params: {
        id: string
    }
}

const ArticleDetail = ({ params }: ArticleDetailProps ) => {
    const { id } = params

    const [PDFURL, setPDFURL] = useState('')

    useEffect(() => {
        async function getArticle() {
            const documentSnap = await getDoc(doc(db, "article", id))

            if (!documentSnap.exists()) {
                throw new Error('Document not found')
            }

            const documentPath = documentSnap.data().fullPath

            const documentRef = ref(storage, documentPath)

            getDownloadURL(documentRef).then((url) => {
                setPDFURL(url)
            })
        }

        getArticle()
    }, [id])

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center min-h-screen w-full">
                {PDFURL !== '' && (
                    <iframe src={PDFURL} width="100%" height={100 + '%'}></iframe>
                )}
            </main>
        </Layout>
    )
}

export default isAuth(ArticleDetail)