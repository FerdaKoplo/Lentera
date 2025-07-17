import React, { useEffect } from 'react'
import useArticle from '../../../../hooks/useArticle'
import { useParams } from 'react-router-dom'

const DetailArticle = () => {

  const { id } = useParams()
  const { article, error, loading, getDetailArticle } = useArticle()

  useEffect(() => {
    if (id) {
      getDetailArticle(BigInt(id))
    }
  }, [id])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!article) return <p className="text-center mt-10">Article not found.</p>

  return (
    <div className='px-10 py-10 max-w-4xl mx-auto'>
      {article.articleImage && (
        <img
          src={article.articleImage}
          alt="Thumbnail"
          className='w-full h-96 object-cover rounded mb-10'
        />
      )}

      <h1 className='text-4xl font-bold mb-4'>{article.articleTitle}</h1>

      <div
        className='prose prose-lg'
        dangerouslySetInnerHTML={{ __html: article.articleContent }}
      ></div>
    </div>
  )
}

export default DetailArticle
