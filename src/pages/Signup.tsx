import React, { useState } from "react"
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
  user: any
  hasErrors: boolean
  loading: boolean
  dispatch: any
}

const Signup: React.FC<Props> = ({ dispatch, loading, hasErrors, user }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  const history = useHistory()

  async function handleCreateAccount() {
    if (!email || !firstName || !password || !confirmPass) return
    if (password !== confirmPass) return

    await dispatch(
      doCreateAccount({
        firstName,
        lastName,
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
          <IonText
            className={`${
              errors.firstName ? null : "ion-hide"
            } ion-padding-start`}
            color="danger"
          >
            <small>{errors.firstName}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
              type="text"
              placeholder="Last name"
            ></IonInput>
          </IonItem>
          <IonText
            className={`${
              errors.lastName ? null : "ion-hide "
            }ion-padding-start`}
            color="danger"
          >
            <small>{errors.lastName}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              type="text"
              placeholder="Email"
            />
          </IonItem>
          <IonText
            className={`${errors.email ? null : "ion-hide "}ion-padding-start`}
            color="danger"
          >
            <small>{errors.email}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              type="password"
              placeholder="password"
            ></IonInput>
          </IonItem>
          <IonText
            className={`${
              errors.password ? null : "ion-hide "
            }ion-padding-start`}
            color="danger"
          >
            <small>{errors.password}</small>
          </IonText>
          <IonItem>
            <IonInput
              value={confirmPass}
              onIonChange={(e) => setConfirmPass(e.detail.value!)}
              type="password"
              placeholder="confirm password"
            ></IonInput>
          </IonItem>
          <IonText
            className={`${
              errors.confirmPass ? null : "ion-hide "
            }ion-padding-start`}
            color="danger"
          >
            <small>{errors.confirmPass}</small>
          </IonText>
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
})

export default connect(mapStateToProps)(Signup)
