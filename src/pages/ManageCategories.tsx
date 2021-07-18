import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
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
  IonActionSheet,
} from "@ionic/react"
import { documentTextOutline, create, trash, close } from "ionicons/icons"
import { doFetchCategories, doDeleteCategory } from "../actions/categoryActions"

type Props = {
  categories
  dispatch
  user
}

const ManageCategories: React.FC<Props> = ({ user, categories, dispatch }) => {
  const history = useHistory()
  const [category, setCategory] = useState(null)
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
                  onClick={() => {
                    setActionSheetOpen(true)
                    setCategory(category)
                  }}
                >
                  {category.title}
                </IonItem>
              ))
            : null}
        </IonList>

        <IonActionSheet
          isOpen={actionSheetOpen}
          onDidDismiss={() => {
            setActionSheetOpen(false)
            setCategory(null)
          }}
          buttons={[
            {
              text: "New",
              role: "destructive",
              icon: documentTextOutline,
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
                dispatch(
                  doDeleteCategory(
                    Number(category.id),
                    user.email,
                    user.rawPass
                  )
                )
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
