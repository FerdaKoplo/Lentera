import React, { useState } from 'react'
import { ArticleComment } from '../../../declarations/Lentera_backend/Lentera_backend.did'

const useArticleComment = () => {
  
    const [articleComments, setArticleComments] = useState<ArticleComment[]>([])
  
    return {

  }
}

export default useArticleComment