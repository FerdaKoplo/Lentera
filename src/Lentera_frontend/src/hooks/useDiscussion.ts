import React, { useState } from 'react'
import { Discussion } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Lentera_backend } from '../../../declarations/Lentera_backend'
import { Principal } from '@dfinity/principal'

const useDiscussion = () => {

  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [discussion, setDiscussion] = useState<Discussion | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<String | null>(null)

  const getAllDiscussions = async () => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getAllDiscussion()
      setDiscussions(resultFetch)
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getAllDiscussionAuthor = async (authorDiscussion: Principal) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getDiscussionByUser(authorDiscussion)
      setDiscussions(resultFetch)
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getDiscussionDetail = async (discussionId: bigint) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getDetailDiscussion(discussionId)
      if (resultFetch.length) {
        setDiscussion(resultFetch[0]);
      } else {
        setDiscussion(null);
      }
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getDiscussionsByCommunity = async (communityId: bigint) => {
    setLoading(true);
    try {
      const resultFetch = await Lentera_backend.getDiscussionsByCommunity(communityId);
      setDiscussions(resultFetch);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const createDiscussion = async (newDiscussion: Discussion) => {
    setLoading(true)
    try {
      const resultCreateDiscussion = await Lentera_backend.createDiscussion(newDiscussion)
      if ("ok" in resultCreateDiscussion) {
        setDiscussion(resultCreateDiscussion.ok);
      } else {
        setError(resultCreateDiscussion.err);
      }
      await getAllDiscussions()
      return resultCreateDiscussion
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const updateDiscussion = async (discussionId: bigint, updatedDiscussion: Discussion) => {
    setLoading(true)
    try {
      const resultUpdateDiscussio = await Lentera_backend.updateDiscussion(discussionId, updatedDiscussion)
      if ("ok" in resultUpdateDiscussio) {
        setDiscussion(resultUpdateDiscussio.ok);
      } else {
        setError(resultUpdateDiscussio.err);
      }
      await getAllDiscussions()
      return resultUpdateDiscussio

    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const deleteDiscussion = async (discussionId: bigint) => {
    setLoading(true)
    try {
      const resultDiscussionDelete = await Lentera_backend.deleteCommunity(discussionId)
      if ("ok" in resultDiscussionDelete) {
        setDiscussion(null);
      } else {
        setError(resultDiscussionDelete.err);
      }
      await getAllDiscussions()
      return resultDiscussionDelete
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return {
    discussions,
    discussion,
    error,
    loading,
    getAllDiscussions,
    getAllDiscussionAuthor,
    getDiscussionDetail,
    getDiscussionsByCommunity,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion
  }
}

export default useDiscussion