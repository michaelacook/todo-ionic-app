import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import {
  IonButton,
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react"
import { connect } from "react-redux"
import { doUpdateCategory } from "../actions/categoryActions"

type Props = {
  dispatch
  user
}

const UpdateCategory: React.FC<Props> = ({ dispatch, user }) => {
  const history = useHistory()
  const [category, setCategory] = useState(null)
  const [title, setTitle] = useState("")

  function handleUpdateCategory() {
    if (title && category) {
      dispatch(
        doUpdateCategory(
          Number(category.id),
          {
            title,
          },
          user.email,
          user.rawPass
        )
      )
      history.push("/page/categories/manage")
    }
  }

  useEffect(() => {
    if (history.location) {
      const { state }: any = history.location
      setCategory(state.category)
      setTitle(state.category.title)
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Title</IonLabel>
          <IonInput
            inputMode="text"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={handleUpdateCategory} expand="full" shape="round">
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(UpdateCategory)
