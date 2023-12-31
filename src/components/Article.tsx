import app from "@/lib/firebase/config"
import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore, deleteDoc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import Link from "next/link"
import { SetStateAction } from "react"
import toast from "react-hot-toast"

interface ArticleType {
    name: string
    id: string
}

interface ArticleProps {
    article: ArticleType
    setRefetchCounter: React.Dispatch<SetStateAction<number>>
} 

const db = getFirestore(app)
const storage = getStorage(app)

const Article = ({ article, setRefetchCounter }: ArticleProps) => {

    const handleDeleteClick = async () => {
        try {
            //Get current user
            const auth = getAuth(app)
            const user = auth.currentUser
    
            //Throw error if not authenticated
            if (user === null) {
                throw new Error('User not authenticated')
            }

            //Get assistant Id
            const userSnap = await getDoc(doc(db, "user", user.uid))
            const organisationId = userSnap.get('organisationId')
            const organisationSnap = await getDoc(doc(db, 'organisation', organisationId))
            const assistantId = await organisationSnap.get('assistantId')

            //Get article doc in db
            const articleDoc = await getDoc(doc(db, "article", article.id))
            console.log('articleDoc:', articleDoc)

            //get openai file id 
            const openaiFileId = articleDoc.get('openaiFileId')

            //get articleId for db
            const articleIdDB = articleDoc.id

            //get full path in storage
            const articleFullPath = articleDoc.get('fullPath')
            const articleRef = ref(storage, articleFullPath)

            //Delete in openai
            const response = await fetch('/api/delete-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileId: openaiFileId, assistantId: assistantId }),
            })

            if (response.ok) {
                //Delete in firebase storage
                await deleteDoc(doc(db, 'article', articleIdDB))
    
                //Delete in db
                await deleteObject(articleRef)

                toast('Deleted')
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
            setRefetchCounter(prev => prev + 1)
        }
    }

    return (
        <div className="flex justify-between items-center py-2 px-4 rounded hover:bg-zinc-200">
            <Link href={`/articles/${article.id}`}>
                <h3 className="cursor-pointer w-fit">{article.name}</h3>
            </Link>
            <div className="cursor-pointer">
                <h3 onClick={handleDeleteClick} className="text-sm hover:underline text-gray-600">Remove</h3>
            </div>
        </div>
    )
}

export default Article