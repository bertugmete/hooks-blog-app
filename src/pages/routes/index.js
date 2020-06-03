import React from "react"
import { Switch, Route } from "react-router"

import Article from "pages/article"
import GlobalFeed from "pages/globalFeed"
import Authentication from "pages/authentication"

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/article" component={Article} />
    </Switch>
  )
}
export default Routes
