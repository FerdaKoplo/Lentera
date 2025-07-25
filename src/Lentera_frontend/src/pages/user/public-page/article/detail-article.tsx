import React, { useEffect } from 'react'
import useArticle from '../../../../hooks/useArticle'
import { useParams } from 'react-router-dom'
import NavApp from '../../../../components/public-nav/nav-app'
import SidebarArticle from '../../../../components/article/sidebar/sidebar-article'
import CreateArticleComment from '../../../../components/article-comment/create-article-comment'
import { FaUserFriends } from 'react-icons/fa'
import useArticleComment from '../../../../hooks/useArticleComment'
import { FaUser } from 'react-icons/fa6'

const DetailArticle = () => {

  const { id } = useParams()
  const { article, error, loading, getDetailArticle } = useArticle()
  const { articleComments, getCommentedArticles, loading: loadingComments } = useArticleComment()

  const articleId = id ? BigInt(id) : BigInt(0)

  useEffect(() => {
    if (id) {
      const articleId = BigInt(id)
      getDetailArticle(articleId)
      getCommentedArticles(articleId)
    }
  }, [id])



  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!article) return <p className="text-center mt-10">Article not found.</p>

  return (
    <div className='mt-10 px-16 py-10 max-w-4xl mx-auto'>
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

      <CreateArticleComment articleId={articleId} />
      
      <div>
        <h2 className="text-xl font-semibold text-black mb-6">
          People Thoughts About This Article
        </h2>

        {articleComments.length === 0 && (
          <p className="text-gray-500">No discussions yet.</p>
        )}

        {articleComments.map((comment, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 mb-6 shadow border"
          >
            <div className="flex items-center mb-3">
              <div className='flex items-center gap-4'>
                <p className="font-semibold text-black text-2xl">
                  <FaUser />
                </p>
                <p className="text-gray-400 text-sm">
                  @{comment.commenterId.toString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              {comment.commentText}
            </p>  
          </div>
        ))}
      </div>
    </div>

  )
}

export default DetailArticle
