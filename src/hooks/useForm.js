import { useState } from "react"

const useForm = (submitCallback = () => {}) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    submitCallback()
  }

  const handleChange = (e) => {
    e.persist()
    setValue(e.target.value)
  }

  return [value, handleChange, handleSubmit]
}

export default useForm
