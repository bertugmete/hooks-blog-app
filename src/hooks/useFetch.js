import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url) => {
  const baseUrl = "https://conduit.productionready.io/api"
  const [isLoading, setIsloading] = useState(false)
  const [response, setResponse] = useState(false)
  const [error, setError] = useState(false)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsloading(true)
  }

  useEffect(() => {
    if (isLoading) {
      axios(`${baseUrl}${url}`, options)
        .then((response) => {
          setResponse(response.data)
        })
        .catch((error) => {
          setError(error)
        })
        .finally(() => {
          setIsloading(false)
        })
    }
  }, [isLoading, options, url])

  return [{ isLoading, response, error }, doFetch]
}

export default useFetch
