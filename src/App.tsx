import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router-dom"
import Menu from "./components/Menu"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Categories from "./pages/Categories"
import ManageCategories from "./pages/ManageCategories"
import NewList from "./pages/NewList"
import Todo from "./pages/Todo"

import PrivateComponent from "./components/PrivateComponent"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

import { connect } from "react-redux"

type Props = {
  user: any
}

const App: React.FC<Props> = ({ user }) => {
  return (
    <IonApp>
      <IonReactRouter>
        <PrivateComponent user={user}>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route
                path="/page/categories"
                exact={true}
                component={Categories}
              />
              <Route
                path="/page/categories/manage"
                exact={true}
                component={ManageCategories}
              />
              <Route path="/lists/:id" exact={true} component={Todo} />
              <Route path="/lists/new" exact={true} component={NewList} />
            </IonRouterOutlet>
          </IonSplitPane>
        </PrivateComponent>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/signup" component={Signup} />
      </IonReactRouter>
    </IonApp>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(App)
