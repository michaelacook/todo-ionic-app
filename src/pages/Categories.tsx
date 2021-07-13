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
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react"

import { useHistory } from "react-router-dom"

import { folderSharp, addSharp, trash, createSharp } from "ionicons/icons"

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

  const history = useHistory()

  function navigateToLists(category) {
    const { Lists } = category
    history.push({
      pathname: `/page/categories/${category.title}/list`,
      state: { Lists },
    })
  }

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

      <IonContent>
        <IonList>
          {categories
            ? categories.map((category) => (
                <IonItemSliding key={category.id}>
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
                    key={category.title}
                    button
                    onClick={() => navigateToLists(category)}
                    detail={true}
                  >
                    <IonIcon slot="start" md={folderSharp} />
                    <IonLabel>{category.title}</IonLabel>
                  </IonItem>
                </IonItemSliding>
              ))
            : null}
        </IonList>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon md={addSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
})

export default connect(mapStateToProps)(Categories)
