import React, { useState } from 'react'
import { Lentera_backend } from '../../../declarations/Lentera_backend'
import { Article } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Principal } from '@dfinity/principal'

const useArticle = () => {

  const [articles, setArticles] = useState<Article[]>([])
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<String | null>(null)

  const getAllArticles = async () => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getAllArticles()
      setArticles(resultFetch)
    } catch (error) {
      setError(String(error))
    }
    finally {
      setLoading(false)
    }
  }

  const getDetailArticle = async (articleId : bigint) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getArticleDetail(articleId)
      if (resultFetch.length) {
        setArticle(resultFetch[0]);
      } else {
        setArticle(null);
      }
    } catch (error) {
      setError(String(error))
    }
    finally {
      setLoading(false)
    }
  }

  const getAllArticlesByAuthor = async (authorArticle : Principal) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getArticleByAuthor(authorArticle)
      setArticles(resultFetch)
    } catch (error) {
      setError(String(error))
    }
    finally {
      setLoading(false)
    }
  }

  const createArticle = async (newArticle : Article)  => {
    setLoading(true)
    try {
      const resultCreateArticle = await Lentera_backend.addArticle(newArticle)
      if ("ok" in resultCreateArticle) {
        setArticle(resultCreateArticle.ok);
      } else {
        setError(resultCreateArticle.err);
      }
      await getAllArticles()
      return resultCreateArticle
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const updateArticle = async (articleId : bigint, updateArticle : Article) => {
    setLoading(true)
    try {
      const resultUpdateArticle = await Lentera_backend.updateArticle(articleId, updateArticle)
       if ("ok" in resultUpdateArticle) {
        setArticle(resultUpdateArticle.ok);
      } else {
        setError(resultUpdateArticle.err);
      }
      await getAllArticles()
      return resultUpdateArticle

    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const updateArticleThumbnail = async (articleId : bigint, newThumbnail : string) => {
    setLoading(true)
    try {
      const resultUpdateThumbnail = await Lentera_backend.updateArticleThumbnail(articleId, newThumbnail)
      if ("ok" in resultUpdateThumbnail) {
        setArticle(resultUpdateThumbnail.ok)
      } else {
        setError(resultUpdateThumbnail.err)
      }
      await getAllArticles()
      return resultUpdateThumbnail
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async (articleId : bigint) => {
    setLoading(true)
    try {
      const resultDeleteArticle =  await Lentera_backend.deleteArticle(articleId)
      if ("ok" in resultDeleteArticle) {
        setArticle(null);
      } else {
        setError(resultDeleteArticle.err);
      }
      await getAllArticles()
      return resultDeleteArticle
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return {
    getAllArticles,
    getAllArticlesByAuthor,
    getDetailArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    updateArticleThumbnail,
    articles,
    article,
    loading,
    error
  }
}

export default useArticle