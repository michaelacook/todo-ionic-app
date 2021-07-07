import React, { useEffect } from "react"
import { connect } from "react-redux"
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react"

import { doFetchCategories } from "../actions/categoryActions"

type Props = {
  user
  categories
  dispatch
}

const Categories: React.FC<Props> = ({ dispatch, user, categories }) => {
  useEffect(() => {
    dispatch(doFetchCategories(user.email, user.rawPass))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
})

export default connect(mapStateToProps)(Categories)
