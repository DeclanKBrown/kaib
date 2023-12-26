'use client'

import { useEffect, useState, useRef, ChangeEvent } from "react"
import toast from "react-hot-toast"
import Layout from "@/components/layouts/dashboardLayout"
import { getAuth } from "firebase/auth"
import app from "@/lib/firebase/config"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import isAuth from "@/lib/auth/auth"
import { getStorage, listAll, ref, uploadBytes } from "firebase/storage"

const db = getFirestore(app)
const storage = getStorage(app)

interface Article {
    name: string
    id: string
}

const Articles = () => {

    const [articles, setArticles] = useState<Article[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [uploadSwitch, setUploadSwitch] = useState<boolean>(false)

    //Fetch Articles
    useEffect(() => {
        async function getFiles() {
            //Get current user
            const auth = getAuth(app)
            const user = auth.currentUser
    
            //Throw error if not authenticated
            if (user === null) {
                throw new Error('User not authenticated')
            }

            //Get current user from db
            const userSnap = await getDoc(doc(db, "user", user.uid))

            //get organisation id from user
            const organisationId = userSnap.get('organisationId')

            //get organisation 
            const organisationSnap = await getDoc(doc(db, 'organisation', organisationId))

            //get organisation name
            const organisationName = organisationSnap.get('name')

            //Get files from org folder
            const organisationFilesRef = ref(storage, organisationName)
            const files = await listAll(organisationFilesRef)
            //Put into object
            const fileObject = files.items.map(file => ({
                name: file.name,
                id: file.fullPath
            }))
            //Set to sdtate
            setArticles(fileObject)
            setFilteredArticles(fileObject)
            setLoading(false)
        }
        getFiles()
    }, [uploadSwitch])

    //Upload input
    const hiddenFileInput = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files
        if (files) { 
            handleUpload(files)
        }
    }

    //Send file to server
    const handleUpload = async (files: FileList) => {
        setLoading(true)
        try {
            //Get current user
            const auth = getAuth(app)
            const user = auth.currentUser
    
            //Throw error if not authenticated
            if (user === null) {
                throw new Error('User not authenticated')
            }

            // Create a FormData object
            const formData = new FormData()

            //Get current user from db
            const userSnap = await getDoc(doc(db, "user", user.uid))

            //get organisation id from user
            const organisationId = userSnap.get('organisationId')

            //get organisation 
            const organisationSnap = await getDoc(doc(db, 'organisation', organisationId))

            //get assistantId name
            const assistantId = organisationSnap.get('assistantId')

            formData.append('assistantId', assistantId)

            //Append files to form data
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }

            //Upload to firebase storage
            //Get organisation name
            const organisationName = organisationSnap.get('name')
            
            //Get list of files in mapable form
            const articles: File[] = formData.getAll('file') as File[]
            
            //Map through and upload
            for (const article of articles) {
                //Ref to storage location
                const organisationStorageRef = ref(storage, `${organisationName}/${article.name}`)
                uploadBytes(organisationStorageRef, article)
            }

            // Send the files to your API route | upload to openai
            const response = await fetch('/api/upload-file', {
                method: 'POST',
                body: formData,
            })
            
            if (response.ok) {
                toast('Success')
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('handleUpload', error)
                toast(error.message)
            } else {
                console.error('Unexpected error:', error)
                toast('An unexpected error occurred.')
            }
        } finally {
            setUploadSwitch(!uploadSwitch)
        }
    }

    //Search 
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase()

        const filteredArticles = articles.filter((article) => (
            article.name.toLowerCase().includes(searchTerm)
        ))

        setFilteredArticles(searchTerm ? filteredArticles : articles)
    }

    return (
        <Layout>
            <div className="flex max-w-full flex-1 flex-col">
                <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                    <div className='flex h-full flex-col px-16 pt-16'>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl">Articles</h1>
                            <div className="flex flex-row">
                                <button 
                                    className="bg-zinc-300 py-1 px-3 rounded-sm"
                                    onClick={handleClick}
                                >Add New</button>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={hiddenFileInput}
                                    onChange={handleChange}  
                                    multiple   
                                ></input>
                            </div>
                        </div>
                        <div className="flex mb-12">
                            <input 
                                type="text" 
                                className="border-2 border-zinc-300 rounded-sm text-sm pl-1 py-1" 
                                placeholder="Search"
                                onChange={(event) => handleSearch(event)}
                            ></input>
                        </div>
                        <div className="flex flex-col gap-5 hover:bg-zinc-300 rounded-sm pl-1">
                            {filteredArticles.length > 0 && filteredArticles.map((article) => (
                                <h3 key={article.id}>{article.name}</h3>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default isAuth(Articles)