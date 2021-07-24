import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  IonButton,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonLoading,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/react"
import { doUpdateAccount } from "../actions/authActions"

type Props = {
  dispatch
  user
  loading
}

const Account: React.FC<Props> = ({ dispatch, user, loading }) => {
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")

  function handleUpdateAccount() {
    dispatch(
      doUpdateAccount(
        Number(user.id),
        {
          firstName,
          lastName,
          email,
          password,
        },
        user.email,
        user.rawPass
      )
    )
  }

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setPassword(user.rawPass)
    setLastUpdated(user.updatedAt)
  }, [user])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>First Name:</IonLabel>
            <IonInput
              onIonChange={(e) => setFirstName(e.detail.value!)}
              disabled={!edit}
              value={firstName}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Last Name:</IonLabel>
            <IonInput
              onIonChange={(e) => setLastName(e.detail.value!)}
              disabled={!edit}
              value={lastName}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Email:</IonLabel>
            <IonInput
              onIonChange={(e) => setEmail(e.detail.value!)}
              disabled={!edit}
              value={email}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password:</IonLabel>
            <IonInput
              onIonChange={(e) => setPassword(e.detail.value!)}
              disabled={!edit}
              type="password"
              value={password}
            ></IonInput>
          </IonItem>
          {edit ? (
            <IonItem>
              <IonLabel>Confirm password:</IonLabel>
              <IonInput
                onIonChange={(e) => setConfirmPass(e.detail.value!)}
                disabled={!edit}
                type="password"
                value={confirmPass || password}
              ></IonInput>
            </IonItem>
          ) : null}
          <IonItem>
            Account last updated:&nbsp;
            {new Date(lastUpdated).toLocaleDateString()}
          </IonItem>
        </IonList>
        <IonButton
          onClick={() => {
            if (edit) {
              handleUpdateAccount()
            }
            setEdit(!edit)
          }}
          color="primary"
          expand="full"
          shape="round"
        >
          {edit ? "Save" : "Edit"}
        </IonButton>
        <IonLoading isOpen={loading} message={"Working..."} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
})

export default connect(mapStateToProps)(Account)
