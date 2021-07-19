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
import { doPostList } from "../actions/listActions"

type Props = {
  dispatch
  user
  list
}

const NewList: React.FC<Props> = ({ dispatch, user, list }) => {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState(null)

  function handlePostList() {
    if (title && categoryId) {
      dispatch(
        doPostList(
          {
            title,
            categoryId,
          },
          user.email,
          user.rawPass
        )
      ).then((data) => {
        setTitle("")
        setCategoryId(null)
        history.push(`/lists/${data.id}`)
      })
    }
  }

  useEffect(() => {
    if (history.location) {
      const { state }: any = history.location
      setCategoryId(state.categoryId)
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>New List</IonTitle>
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
        <IonButton onClick={handlePostList} expand="full" shape="round">
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  list: state.list.list,
})

export default connect(mapStateToProps)(NewList)
