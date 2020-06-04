import React, { useState, useEffect, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import useInput from "hooks/useInput"
import useFetch from "hooks/useFetch"
import useLocalStorage from "hooks/useLocalStorage"
import { CurrentUserContext } from "contexts/currentUser"

const Authentication = (props) => {
  const isLogin = props.match.path === "/login"
  const descriptionLink = isLogin ? "/register" : "login"
  const pageTitle = isLogin ? "Login" : "Register"
  const descriptionText = isLogin ? "Need an account ?" : "Have an account ?"
  const apiUrl = isLogin ? "/users/login" : "/users"

  const [email, bindEmail, resetEmail] = useInput("")
  const [password, bindPassword, resetPassword] = useInput("")
  const [username, bindUsername, resetUserName] = useInput("")

  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)

  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

  const [token, setToken] = useLocalStorage("token")

  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)

  useEffect(() => {
    if (!response) return

    console.log("response", response)

    localStorage.setItem("token", response.user.token)
    setToken(response.user.token)
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }))
    setIsSuccessfullSubmit(true)
  }, [response, setCurrentUserState, setToken])

  if (isSuccessfullSubmit) {
    return <Redirect to="" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)

    const user = isLogin ? { email, password } : { email, password, username }
    doFetch({
      method: "post",
      data: {
        user,
      },
    })
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="User Name"
                      {...bindUsername}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    {...bindEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    {...bindPassword}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
