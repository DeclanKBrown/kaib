import Link from "next/link"

interface ArticleType {
    name: string
    id: string
}

interface ArticleProps {
    article: ArticleType
} 

const Article = ({ article }: ArticleProps) => {
    return (
        <div className="flex justify-between items-center py-2 px-4 rounded hover:bg-zinc-200">
            <Link href={`/article/${article.id}`}>
                <h3 className="cursor-pointer w-fit">{article.name}</h3>
            </Link>
            <div className="cursor-pointer">
                <h3 className="text-sm hover:underline text-gray-600">Remove</h3>
            </div>
        </div>
    )
}

export default Article