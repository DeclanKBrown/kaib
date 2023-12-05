'use client'

import { getFileList } from "@/firebase/storage"
import { useEffect, useState } from "react"

export default function Articles() {

    const [articles, setArticles] = useState<string[]>([])

    useEffect(() => {
        async function getFiles() {
            const files = await getFileList()
            console.log('Files', files)
            setArticles(files)
        }
        getFiles()
    }, [])

    return (
        <div className="flex max-w-full flex-1 flex-col">
            <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                <div className='flex h-full flex-col px-16 pt-16'>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-mono">Articles</h1>
                        <button className="bg-zinc-300 py-1 px-3 rounded-sm">Add New</button>
                    </div>
                    <div className="flex mb-12">
                        <input type="text" className="border-2 border-zinc-300 rounded-sm text-sm pl-1 py-1" placeholder="Search"></input>
                    </div>
                    <div className="flex flex-col gap-5 hover:bg-zinc-300 rounded-sm pl-1">
                        {articles.length > 0 && articles.map((article) => (
                            <h3 key={article}>{article}</h3>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}