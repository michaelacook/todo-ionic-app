import React, { useState, useEffect, RefObject } from "react"
import { connect } from "react-redux"
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  useIonViewWillEnter,
  IonActionSheet,
} from "@ionic/react"

import {
  documentTextOutline,
  create,
  folder,
  addSharp,
  trash,
  createSharp,
  chevronUpSharp,
  chevronDownSharp,
  add,
  close,
} from "ionicons/icons"

import { doFetchCategories } from "../actions/categoryActions"

type Props = {
  categories
  dispatch
  user
}

const ManageCategories: React.FC<Props> = ({ user, categories, dispatch }) => {
  const [actionSheetOpen, setActionSheetOpen] = useState(false)

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
          <IonTitle>Manage Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {categories
            ? categories.map((category) => (
                <IonItem
                  key={category.id}
                  detail={true}
                  onClick={() => setActionSheetOpen(true)}
                >
                  {category.title}
                </IonItem>
              ))
            : null}
        </IonList>

        <IonActionSheet
          isOpen={actionSheetOpen}
          onDidDismiss={() => setActionSheetOpen(false)}
          buttons={[
            {
              text: "New list",
              role: "destructive",
              icon: add,
              handler: () => null,
            },
            {
              text: "Edit",
              role: "destructive",
              icon: create,
              handler: () => null,
            },
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                console.log("Delete clicked")
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              icon: close,
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  user: state.user.user,
})

export default connect(mapStateToProps)(ManageCategories)