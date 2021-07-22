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
  IonAlert,
  IonLoading,
} from "@ionic/react"
import { documentTextOutline, create, trash, close } from "ionicons/icons"
import { doFetchCategories, doDeleteCategory } from "../actions/categoryActions"

type Props = {
  categories
  dispatch
  user
  loading
}

const ManageCategories: React.FC<Props> = ({ user, loading, categories, dispatch }) => {
  const history = useHistory()
  const [category, setCategory] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)
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
              handler: () => {
                history.push({
                  pathname: "/lists/new",
                  state: { categoryId: category.id },
                })
              },
            },
            {
              text: "Edit",
              role: "destructive",
              icon: create,
              handler: () => {
                history.push({
                  pathname: "/page/categories/edit",
                  state: { category: category },
                })
              },
            },
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                setAlertOpen(true)
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              icon: close,
            },
          ]}
        ></IonActionSheet>
        <IonAlert
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header={"Confirm"}
          message={
            "Do you want to delete this category? All associated lists will be lost."
          }
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
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
          ]}
        />
        <IonLoading isOpen={loading} message={"Working..."} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  user: state.user.user,
  loading: state.categories.loading
})

export default connect(mapStateToProps)(ManageCategories)
