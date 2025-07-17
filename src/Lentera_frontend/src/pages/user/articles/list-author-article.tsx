import React, { useEffect } from 'react'
import ViewButton from '../../../components/article/view-button'
import useArticle from '../../../hooks/useArticle'
import useAuth from '../../../hooks/useAuth'
import { Principal } from '@dfinity/principal'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoMdImage } from "react-icons/io";

const ListArticleAuthor = () => {
    const { user, isLoading, principalId } = useAuth()
    const { articles, getAllArticlesByAuthor } = useArticle()

    const getPlainText = (htmlString: string) => {
        return htmlString.replace(/<[^>]+>/g, '')
    }

    useEffect(() => {
        if (principalId && principalId.trim() !== "") {
            try {
                const authorId = Principal.fromText(principalId);
                getAllArticlesByAuthor(authorId);
                console.log("Fetching articles for:", authorId.toString());
            } catch (error) {
                console.error("Invalid principalId received:", principalId);
            }
        } else {
            console.warn("principalId is missing, skipping fetch.");
        }
    }, [principalId, getAllArticlesByAuthor])

    return (
        <div>
            <div className='px-32 py-10 min-h-screen gap-10 flex flex-col items-center justify-center '>
                <Link to={'/create-article'}>
                    <div className='flex items-center gap-5'>
                        <p className='px-2 py-2 bg-gradient-to-r text-white font-bold rounded-full from-[#BCA7E8] to-[#A8E6CF]'><FaPlus /></p>
                        <p className='font-bold '>Start Writing</p>
                    </div>
                </Link>
                {/*  Cards */}
                <div className='min-h-screen'>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='bg-brand-light'>
                            {articles.map((article, i) => (
                                <div key={i} >
                                    <div>
                                        <img src={article.articleImage} alt="Thumbnail" className="w-full h-48 object-cover" />
                                    </div>
                                    <div className='flex flex-col gap-6'>

                                        {/* Title */}
                                        <div>
                                            <h1 className='font-bold text-2xl'>
                                                {article.articleTitle}
                                            </h1>
                                        </div>

                                        {/* Summary Content */}
                                        <div>
                                            <p className='line-clamp-4'>{getPlainText(article.articleContent)}</p>
                                        </div>

                                        <div className='flex justify-between gap-5'>
                                            {/* Profile Author */}
                                            <div className='flex items-center gap-2'>
                                                <div className='text-3xl'>
                                                    <FaUserCircle />
                                                </div>
                                                <div className='flex flex-col '>
                                                    <h1>Your Name</h1>
                                                    <p>{article.authorArticleId.toString()}</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-5'>
                                                <Link to={`/update-thumbnail/${article.id.toString()}`}>
                                                    <button className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                                                        <IoMdImage />
                                                    </button>
                                                </Link>
                                                {/* Like Button */}
                                                <div>

                                                </div>
                                                {/* View button */}
                                                <div>
                                                    <ViewButton articleId={article.id} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListArticleAuthor