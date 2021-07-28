import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
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
  IonModal,
  IonLoading,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonText,
} from "@ionic/react"
import { doUpdateAccount, doDeleteAccount } from "../actions/authActions"

type Props = {
  dispatch
  user
  loading
  error
}

const Account: React.FC<Props> = ({ dispatch, user, loading, error }) => {
  const [edit, setEdit] = useState(false)
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")

  function handleConfirmDeleteAccount(password: string) {
    if (password === user.rawPass) {
      setConfirmDeleteAccount(true)
    } else {
      setConfirmDeleteAccount(false)
    }
  }

  function handleUpdateAccount() {
    if (
      firstName !== user.firstName ||
      lastName !== user.lastName ||
      email !== user.email ||
      password !== user.rawPass
    ) {
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
  }

  function handleDeleteAccount() {
    dispatch(doDeleteAccount(Number(user.id), user.email, user.rawPass))
  }

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setPassword(user.rawPass)
    setConfirmPass(user.rawPass)
    setLastUpdated(user.updatedAt)
  }, [user])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {error ? (
          <IonItem>
            <IonText color="danger">{error}</IonText>
          </IonItem>
        ) : null}
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
                value={confirmPass}
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
        <IonButton
          onClick={() => setShowModal(true)}
          color="danger"
          expand="full"
          shape="round"
          style={{
            marginTop: "8px",
          }}
        >
          Delete Account
        </IonButton>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Delete Account</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonText>
              <p>
                This action <strong>cannot</strong> be undone. This will
                permanently delete your account and all associated data.{" "}
              </p>
            </IonText>

            <IonInput
              type="password"
              placeholder="Password"
              autofocus={true}
              className="ion-margin-top"
              onIonChange={(e) => handleConfirmDeleteAccount(e.detail.value!)}
            ></IonInput>

            <IonText>
              <p className="ion-margin-top">
                Please type your password to confirm.
              </p>
            </IonText>

            <IonButton
              disabled={!confirmDeleteAccount}
              color="danger"
              expand="full"
              onClick={handleDeleteAccount}
            >
              I understand, delete my account
            </IonButton>
          </IonContent>
        </IonModal>
        <IonLoading isOpen={loading} message={"Working..."} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
})

export default connect(mapStateToProps)(Account)
