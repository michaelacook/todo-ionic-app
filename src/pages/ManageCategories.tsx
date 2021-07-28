import React, { useState } from "react"
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
  IonText,
  useIonViewDidEnter,
} from "@ionic/react"
import { documentTextOutline, create, trash, close } from "ionicons/icons"
import { doFetchCategories, doDeleteCategory } from "../actions/categoryActions"

type Props = {
  categories
  dispatch
  user
  loading
  error
}

const ManageCategories: React.FC<Props> = ({
  user,
  loading,
  error,
  categories,
  dispatch,
}) => {
  const history = useHistory()
  const [category, setCategory] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)
  const [actionSheetOpen, setActionSheetOpen] = useState(false)

  useIonViewDidEnter(() => {
    dispatch(doFetchCategories(user.email, user.rawPass))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Manage Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error ? (
          <IonItem>
            <IonText color="danger">{error}</IonText>
          </IonItem>
        ) : null}
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
          message={"Are you sure? All associated lists will be lost."}
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
  loading: state.categories.loading,
  error: state.categories.error,
})

export default connect(mapStateToProps)(ManageCategories)
