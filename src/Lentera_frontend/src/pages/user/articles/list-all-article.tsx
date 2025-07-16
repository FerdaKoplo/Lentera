import React, { useEffect } from 'react'
import useArticle from '../../../hooks/useArticle'
import { FaUserCircle } from "react-icons/fa";
import ViewButton from '../../../components/universal-buttons/view-button';

const ListAllArticle = () => {

  const { article, articles, getAllArticles } = useArticle()

  const getPlainText = (htmlString: string) => {
    return htmlString.replace(/<[^>]+>/g, '')
  }


  useEffect(() => {
    getAllArticles()
  }, [])

  return (
    <div>
      <div className='px-32'>
        <div className=''>
          <h1 className='text-3xl font-semibold mint-violet'>Articles</h1>
        </div>
        {/*  Cards */}
        <div className='min-h-screen'>
          <div className='grid grid-cols-3 '>
            <div className='bg-brand-light  '>
              {articles.map((article, i) => (
                <div key={i}>
                  <div>
                    <img src={article.articleImage} alt={article.articleTitle} className="w-full h-48 object-cover" />
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

                    <div className='flex justify-between'>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAllArticle