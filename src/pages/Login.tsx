import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import {
  IonButton,
  IonText,
  IonContent,
  IonInput,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonRouterLink,
} from "@ionic/react"

import { connect } from "react-redux"

import { doSignin } from "../actions/authActions"

type Props = {
  user: any
  loading: boolean
  hasErrors: boolean
  dispatch
}

const Login: React.FC<Props> = ({ dispatch, user, loading, hasErrors }) => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignin() {
    await dispatch(
      doSignin({
        email,
        password,
      })
    )

    if (!hasErrors) {
      history.push("/")
    }
  }

  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              value={email}
              required
              type="text"
              placeholder="Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={password}
              required
              type="password"
              placeholder="Password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton shape="round" expand="full">
          Login
        </IonButton>
        <div className="ion-margin-top ion-text-center">
          <IonText>
            Don't have an account?&nbsp;
            <IonRouterLink routerLink="/signup">Sign up</IonRouterLink>
          </IonText>
        </div>
      </IonContent>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  hasErrors: state.user.hasErrors,
})

export default connect(mapStateToProps)(Login)
