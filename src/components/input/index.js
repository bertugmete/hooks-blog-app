import React from "react"
import useInput from "../../hooks/useInput"
const Input = ({ type = "text", name, placeholder = "", initialValue = "" }) => {
  const [bind] = useInput(initialValue)

  return (
    <fieldset className="form-group">
      <input
        type={type}
        name={name}
        className="form-control form-control-lg"
        placeholder={placeholder}
        {...bind}
      />
    </fieldset>
  )
}

export default Input
