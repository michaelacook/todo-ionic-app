import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  IonButton,
  IonContent,
  IonNote,
  IonText,
  IonInput,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonRouterLink,
} from "@ionic/react"

import { connect } from "react-redux"
import { User } from "../types"
import { doCreateAccount } from "../actions/authActions"

interface Props {
  user
  error
  loading
  dispatch
}

const Signup: React.FC<Props> = ({ dispatch, loading, error, user }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [confirmPassErr, setConfirmPassErr] = useState("")
  const [passMatchErr, setPassMatchErr] = useState("")

  function clearErrors() {
    setEmailErr("")
    setPasswordErr("")
    setConfirmPassErr("")
    setPassMatchErr("")
  }

  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push("/page/categories")
    }
  })

  async function handleCreateAccount() {
    clearErrors()

    let hasErrors = false

    if (!email) {
      hasErrors = true
      setEmailErr("Email required")
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      hasErrors = true
      setEmailErr("Please provide a valid email")
    }

    if (!password) {
      hasErrors = true
      setPasswordErr("Password required")
    }

    if (!confirmPass) {
      hasErrors = true
      setConfirmPassErr("Must confirm password")
    }

    if (confirmPass !== password) {
      hasErrors = true
      setPassMatchErr("Password does not match confirmation")
    }

    if (hasErrors) {
      return null
    }

    await dispatch(
      doCreateAccount({
        firstName,
        lastName,
        email,
        password,
      })
    )
  }

  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="ion-margin-top ion-margin-start">
          <IonNote className="ion-margin-bottom">
            ToDo is a simple to-do app. Make lists, get stuff done. Never get
            any junk mail, forever.
          </IonNote>
        </div>

        <IonList>
          <IonItem>
            <IonInput
              required
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
              type="text"
              placeholder="First name"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
              type="text"
              placeholder="Last name"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              type="text"
              placeholder="Email"
            />
          </IonItem>
          <IonText
            className={`${emailErr ? null : "ion-hide"} ion-padding-start`}
            color="danger"
          >
            <small>{emailErr}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              type="password"
              placeholder="Password"
            ></IonInput>
          </IonItem>
          <IonText
            className={`${passwordErr ? null : "ion-hide"} ion-padding-start`}
            color="danger"
          >
            <small>{passwordErr}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={confirmPass}
              onIonChange={(e) => setConfirmPass(e.detail.value!)}
              type="password"
              placeholder="Confirm password"
            ></IonInput>
          </IonItem>
          <IonText
            className={`${
              confirmPassErr ? null : "ion-hide"
            } ion-padding-start`}
            color="danger"
          >
            <small>{confirmPassErr}</small>
          </IonText>
          <IonText
            className={`${passMatchErr ? null : "ion-hide"} ion-padding-start`}
            color="danger"
          >
            <small>{passMatchErr}</small>
          </IonText>
          {error ? (
            <IonText className="ion-padding-start" color="danger">
              <small>{error.message}</small>
            </IonText>
          ) : null}
        </IonList>
        <IonButton shape="round" onClick={handleCreateAccount} expand="full">
          Sign Up
        </IonButton>
        <div className="ion-margin-top ion-text-center">
          <IonText>
            Already have an account?&nbsp;
            <IonRouterLink routerLink="/login">Log in</IonRouterLink>
          </IonText>
        </div>
      </IonContent>
    </React.Fragment>
  )
}

const mapStateToProps = (state: Props) => ({
  loading: state.user.loading,
  hasErrors: state.user.hasErrors,
  user: state.user.user,
  error: state.user.error,
})

export default connect(mapStateToProps)(Signup)
