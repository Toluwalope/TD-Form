import { useState, useCallback, useEffect, useRef } from 'react'

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbortCntrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCntrl)

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCntrl.signal,
        })
        const responseData = await response.json()
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCntrl
        )
        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setIsLoading(false)
        return responseData
      } catch (e) {
        console.log(e.message)
        setError(e.message)
      }
      setIsLoading(false)
    },
    []
  )
  const clearError = () => {
    setError('')
  }

  useEffect(() => {
    return () =>
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
