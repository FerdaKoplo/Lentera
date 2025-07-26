import React, { useEffect } from 'react'
import useArticle from '../../../../hooks/useArticle'
import { FaUserCircle } from "react-icons/fa";
import ViewButton from '../../../../components/article/view-button';
import NavApp from '../../../../components/public-nav/nav-app';

const ListAllArticle = () => {

  const { articles, getAllArticles } = useArticle()

  const getPlainText = (htmlString: string) => {
    return htmlString.replace(/<[^>]+>/g, '')
  }

  useEffect(() => {
    getAllArticles()
  }, [])

  return (
    <div>
      <div className='px-32 mt-10'>
        {/*  Cards */}
        <div className='min-h-screen'>
          <div className='grid grid-cols-2 gap-8'>
            {articles.map((article, i) => (
              <div key={i} className='bg-brand-light p-4 rounded shadow'>
                <img src={article.articleImage} alt={article.articleTitle} className="w-full h-48 object-cover" />

                <div className='flex flex-col gap-4 mt-4'>
                  <h1 className='font-bold text-2xl'>
                    {article.articleTitle}
                  </h1>

                  <p className='line-clamp-4'>{getPlainText(article.articleContent)}</p>

                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <FaUserCircle className="text-3xl" />
                      <p className='line-clamp-2'>{article.authorArticleId.toString()}</p>
                    </div>

                    <ViewButton articleId={article.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAllArticle