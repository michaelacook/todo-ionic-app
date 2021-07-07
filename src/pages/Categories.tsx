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

type Props = {
  categories
  dispatch
}

const Categories: React.FC<Props> = ({ dispatch, categories }) => {
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
  categories: state.categories.categories,
})

export default connect(mapStateToProps)(Categories)
