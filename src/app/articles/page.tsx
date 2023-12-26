'use client'

import { useEffect, useState, useRef, ChangeEvent } from "react"
import toast from "react-hot-toast"
import Layout from "@/components/layouts/dashboardLayout"
import { getAuth } from "firebase/auth"
import app from "@/lib/firebase/config"
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import isAuth from "@/lib/auth/auth"
import { getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import Article from "@/components/Article"

const db = getFirestore(app)
const storage = getStorage(app)

interface ArticleType {
    name: string
    id: string
}

const Articles = () => {

    const [articles, setArticles] = useState<ArticleType[]>([])
    const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([])
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

            //get organisation documents
            const q = query(collection(db, 'article'), where('organisationId', '==', organisationId))
            const organisationArticles = await getDocs(q)

            //Put into object
            const fileObject = organisationArticles.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                fullPath: doc.data().fullPath
            }))
            
            //Set to state
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

            //get organisation name
            const organisationName = organisationSnap.get('name')

            //Get files from org folder
            const organisationFilesRef = ref(storage, organisationName)

            //Get count 
            const organisationFiles = await listAll(organisationFilesRef)

            //If exceeds file limit throw error
            if (organisationFiles.items.length > 20) {
                throw new Error('Maxiumum file number exceeded (20)')
            }

            //get assistantId name
            const assistantId = organisationSnap.get('assistantId')

            formData.append('assistantId', assistantId)

            //Append files to form data
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i])
            }

            //Upload to firebase storage
            //Get list of files in mapable form
            const articles: File[] = formData.getAll('file') as File[]
            
            //Map through and upload
            for (const article of articles) {
                //Ref to storage location
                const organisationStorageRef = ref(storage, `${organisationName}/${article.name}`)
                await uploadBytes(organisationStorageRef, article)
                //Store in db
                await addDoc(collection(db, "article"), {
                    organisationId: organisationId,
                    name: article.name,
                    fullPath: organisationStorageRef.fullPath
                })
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
                                    className="bg-zinc-300 py-1 px-3 rounded hover:opacity-90"
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
                                className="border-2 border-zinc-300 rounded text-sm pl-1 pr-10 py-2 w-72" 
                                placeholder="Search"
                                onChange={(event) => handleSearch(event)}
                            ></input>
                        </div>
                        <div className="flex flex-col rounded-sm pl-1">
                            {filteredArticles.length > 0 && filteredArticles.map((article) => (
                                <Article key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default isAuth(Articles)