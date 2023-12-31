import Link from "next/link"
import toast from "react-hot-toast"

interface ArticleType {
    name: string
    id: string
}

interface ArticleProps {
    article: ArticleType
} 

const Article = ({ article }: ArticleProps) => {

    const handleDeleteClick = () => {
        try {
            //Delete in firebase storage
            //Delete in db
            //Delete in openai
            toast('Deleted')

        } catch (err) {
            console.log(err)
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