'use client'

import { getFileList } from "@/lib/firebase/functions"
import { useEffect, useState, useRef, ChangeEvent } from "react"
import toast from "react-hot-toast"
import Layout from "@/components/layouts/dashboardLayout"

export default function Articles() {

    const [articles, setArticles] = useState<string[]>([])
    const [filteredArticles, setFilteredArticles] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [uploadStatus, setUploadStatus] = useState<boolean>(false)

    //Fetch Articles
    useEffect(() => {
        async function getFiles() {
            const files = await getFileList()
            setArticles(files)
            setFilteredArticles(files)
            setLoading(false)
        }
        getFiles()
    }, [uploadStatus])

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
        // Create a FormData object
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append(`file${i}`, files[i])
        }

        try {
            // Send the files to your API route
            const response = await fetch('/api/upload-file', {
                method: 'POST',
                body: formData,
            })
            
            if (response.ok) {
                toast('Success')
            }
        } catch (error) {
            console.error('handleUpload', error)
        } finally {
            setUploadStatus(!uploadStatus)
        }
    }

    //Search 
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase()

        const filteredArticles = articles.filter((article) => (
            article.toLowerCase().includes(searchTerm)
        ))

        setFilteredArticles(searchTerm ? filteredArticles : articles)
    }

    return (
        <Layout>
            <div className="flex max-w-full flex-1 flex-col">
                <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                    <div className='flex h-full flex-col px-16 pt-16'>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-mono">Articles</h1>
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
                                <h3 key={article}>{article}</h3>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}