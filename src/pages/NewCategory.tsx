import React, { useState } from "react"
import { useHistory } from "react-router"
import {
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react"
import { connect } from "react-redux"
import { doPostCategory } from "../actions/categoryActions"

type Props = {
  dispatch
  user
}

const NewCategory: React.FC<Props> = ({ dispatch, user }) => {
  const history = useHistory()
  const [title, setTitle] = useState("")

  function handlePostCategory() {
    if (title) {
      dispatch(
        doPostCategory({ userId: user.id, title }, user.email, user.rawPass)
      )
      history.push("/page/categories/manage")
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Title</IonLabel>
          <IonInput
            type="text"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="full" shape="round" onClick={handlePostCategory}>
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(NewCategory)
