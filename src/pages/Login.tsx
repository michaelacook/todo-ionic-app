import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  IonButton,
  IonCheckbox,
  IonText,
  IonContent,
  IonInput,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonRouterLink,
  IonLoading,
} from "@ionic/react"

import { connect } from "react-redux"
import { doSignin } from "../actions/authActions"

type Props = {
  user: any
  loading: boolean
  hasErrors: boolean
  error: { message: string }
  dispatch
}

const Login: React.FC<Props> = ({ dispatch, user, loading, error }) => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  const [validationError, setValidationError] = useState("")

  useEffect(() => {
    if (user) {
      history.push("/page/categories")
    }
  })

  function clearState() {
    setEmail("")
    setPassword("")
    setValidationError("")
  }

  async function handleSignin() {
    if (!email) {
      return setValidationError("Email required")
    }

    if (!password) {
      return setValidationError("Password required")
    }

    await dispatch(
      doSignin(
        {
          email,
          password,
        },
        checkbox
      )
    )

    clearState()
  }

  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar color="primary">
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

          {error ? (
            <IonText className="ion-padding-start" color="danger">
              <small>{error.message}</small>
            </IonText>
          ) : null}

          {validationError ? (
            <IonText className="ion-padding-start" color="danger">
              <small>{validationError}</small>
            </IonText>
          ) : null}
        </IonList>
        <IonCheckbox
          checked={checkbox}
          onIonChange={() => setCheckbox(!checkbox)}
          className="ion-margin-start"
        />
        <small style={{ marginLeft: "10px" }}>Keep me signed in</small>
        <IonButton
          style={{ marginTop: "10px" }}
          onClick={handleSignin}
          shape="round"
          expand="full"
        >
          Login
        </IonButton>
        <div className="ion-margin-top ion-text-center">
          <IonText>
            Don't have an account?&nbsp;
            <IonRouterLink routerLink="/signup">Sign up</IonRouterLink>
          </IonText>
        </div>
        <IonLoading isOpen={loading} message={"Logging in..."} />
      </IonContent>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
})

export default connect(mapStateToProps)(Login)
