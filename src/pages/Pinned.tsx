import React from "react"
import { useHistory } from "react-router-dom"
import {
  IonButtons,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonLabel,
  IonNote,
  IonLoading,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react"
import { heart, documentTextOutline, trash, createSharp } from "ionicons/icons"
import { connect } from "react-redux"
import { doFetchPinned } from "../actions/listActions"

type Props = {
  dispatch
  user
  pinned
  loading
  error
}

const Pinned: React.FC<Props> = ({
  dispatch,
  user,
  pinned,
  loading,
  error,
}) => {
  const history = useHistory()
  useIonViewDidEnter(() => {
    dispatch(doFetchPinned(user.email, user.rawPass))
  }, [])

  function navigateToList(list) {
    history.push(`/lists/${list.id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pinned</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error ? (
          <IonItem>
            <IonText color="danger">{error}</IonText>
          </IonItem>
        ) : null}
        {pinned.length ? (
          pinned.map((list) => (
            <IonItemSliding key={list.id}>
              <IonItemOptions side="end">
                <IonItemOption color="success">
                  <IonIcon icon={createSharp} slot="top" />
                  Edit
                </IonItemOption>
                <IonItemOption color="danger">
                  <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>

              <IonItem
                button
                detail={true}
                onClick={() => navigateToList(list)}
              >
                <IonIcon slot="start" md={heart} color="danger" />
                <IonLabel>{list.title}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))
        ) : !error ? (
          <div className="ion-margin-top">
            <IonNote className="ion-margin-start">
              You do not have any pinned lists.
            </IonNote>
          </div>
        ) : null}
        <IonLoading message={"Working..."} isOpen={loading} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  pinned: state.list.pinned,
  loading: state.list.loading,
  error: state.list.error,
})

export default connect(mapStateToProps)(Pinned)
