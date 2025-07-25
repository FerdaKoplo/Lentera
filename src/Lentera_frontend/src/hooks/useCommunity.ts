import React, { useState } from 'react'
import { Community } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Lentera_backend } from '../../../declarations/Lentera_backend'
import { Principal } from '@dfinity/principal'

const useCommunity = () => {

  const [community, setCommunity] = useState<Community | null>(null)
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<String | null>(null)


  const getAllCommunities = async () => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getAllCommunity()
      setCommunities(resultFetch)
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getAllCommunitiesAuthor = async (authorCommunityId : Principal) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getCommunityByUser(authorCommunityId)
      setCommunities(resultFetch)
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getJoinedCommunites = async (userId : Principal) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getAllJoinedCommunities(userId)
      setCommunities(resultFetch)
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const getCommunityDetail = async (communityId: bigint) => {
    setLoading(true)
    try {
      const resultFetch = await Lentera_backend.getDetailCommunity(communityId)
      if (resultFetch.length) {
        setCommunity(resultFetch[0]);
      } else {
        setCommunity(null);
      }
    } catch (e) {
      setError(String(e))
    }
    finally {
      setLoading(false)
    }
  }

  const createCommunity = async (newCommunity : Community) => {
    setLoading(true)
    try {
      const resultCreateCommunity = await Lentera_backend.createCommunity(newCommunity)
      if ("ok" in resultCreateCommunity) {
        setCommunity(resultCreateCommunity.ok);
      } else {
        setError(resultCreateCommunity.err);
      }
      await getAllCommunities()
      return resultCreateCommunity
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const updateCommunity = async (communityId : bigint, updatedCommunity : Community) => {
    setLoading(true)
    try {
      const resultUpdateCommunity = await Lentera_backend.updateCommunity(communityId, updatedCommunity)
       if ("ok" in resultUpdateCommunity) {
        setCommunity(resultUpdateCommunity.ok);
      } else {
        setError(resultUpdateCommunity.err);
      }
      await getAllCommunities()
      return resultUpdateCommunity

    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const deleteCommunity = async (communityId : bigint) => {
    setLoading(true)
    try {
      const resultDeleteCommunity =  await Lentera_backend.deleteCommunity(communityId)
      if ("ok" in resultDeleteCommunity) {
        setCommunity(null);
      } else {
        setError(resultDeleteCommunity.err);
      }
      await getAllCommunities()
      return resultDeleteCommunity
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const joinCommunity = async (communityId: bigint, userId: Principal) => {
    setLoading(true)
    try {
      const result = await Lentera_backend.joinCommunity(communityId, userId)
      await getCommunityDetail(communityId)
      return result
    } catch (e) {
      setError('Failed to join community.')
    } finally {
      setLoading(false)
    }
  }

  const leaveCommunity = async (communityId: bigint, userId: Principal) => {
    setLoading(true)
    try {
      const result = await Lentera_backend.leaveCommunity(communityId, userId)
      await getCommunityDetail(communityId)
      return result
    } catch (e) {
      setError('Failed to leave community.')
    } finally {
      setLoading(false)
    }
  }


  return {
    communities,
    community,
    loading,
    error,
    getAllCommunities,
    getAllCommunitiesAuthor,
    getJoinedCommunites,
    getCommunityDetail,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    joinCommunity,
    leaveCommunity

  }
}

export default useCommunity