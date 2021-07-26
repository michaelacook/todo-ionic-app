import React, { useState, useEffect } from "react"
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
  IonText,
  IonLoading,
} from "@ionic/react"
import {
  documentTextOutline,
  folder,
  add,
  trash,
  chevronDownSharp,
} from "ionicons/icons"
import useDynamicRefs from "use-dynamic-refs"
import Collapsible from "react-collapsible"
import { useHistory } from "react-router-dom"
import { doFetchCategories } from "../actions/categoryActions"
import { doDeleteList } from "../actions/listActions"

type Props = {
  user
  categories
  dispatch
  error
  loading
}

const Categories: React.FC<Props> = ({
  dispatch,
  user,
  categories,
  error,
  loading,
}) => {
  const history = useHistory()
  const [getRef, setRef] = useDynamicRefs()
  const [collapsibles, setCollapsibles] = useState(
    categories
      ? categories.map((cat) => ({
          id: cat.id,
          open: false,
        }))
      : []
  )

  useEffect(() => {
    dispatch(doFetchCategories(user.email, user.rawPass))
  }, [])

  useEffect(() => {
    setCollapsibles(
      categories
        ? categories.map((cat) => ({
            id: cat.id,
            open: false,
            sliderOpen: false,
            sliderRef: getRef(cat.id),
          }))
        : []
    )
  }, [categories])

  function navigateToList(list) {
    history.push(`/lists/${list.id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {error ? (
            <IonItem>
              <IonText color="danger">
                Couldn't fetch categories. Check your network connection and try
                again.
              </IonText>
            </IonItem>
          ) : null}
          {categories
            ? categories.map((category, i) => (
                <Collapsible
                  key={category.id}
                  transitionTime={100}
                  triggerDisabled={
                    collapsibles[i] ? collapsibles[i]["sliderOpen"] : false
                  }
                  trigger={
                    <IonItem key={category.title} button>
                      <IonIcon slot="start" md={folder} />
                      <IonLabel>{category.title}</IonLabel>

                      <IonIcon slot="end" md={chevronDownSharp} size="small" />
                    </IonItem>
                  }
                >
                  {category.Lists
                    ? category.Lists.map((list) => (
                        <IonItemSliding key={list.id}>
                          <IonItemOptions side="end">
                            <IonItemOption
                              onClick={() => {
                                dispatch(
                                  doDeleteList(
                                    Number(list.id),
                                    user.email,
                                    user.rawPass
                                  )
                                )
                              }}
                              color="danger"
                            >
                              <IonIcon icon={trash} slot="icon-only" />
                            </IonItemOption>
                          </IonItemOptions>

                          <IonItem
                            button
                            onClick={() => navigateToList(list)}
                            detail={true}
                          >
                            <IonIcon slot="start" md={documentTextOutline} />
                            <IonLabel style={{ color: "#73757d" }}>
                              {list.title}
                            </IonLabel>
                          </IonItem>
                        </IonItemSliding>
                      ))
                    : null}
                  <IonItem
                    onClick={() => {
                      history.push({
                        pathname: "/lists/new",
                        state: {
                          categoryId: category.id,
                          prevPath: history.location.pathname,
                        },
                      })
                    }}
                    button={true}
                  >
                    <IonIcon icon={add} slot="start" />
                    <IonText color="primary">New List</IonText>
                  </IonItem>
                </Collapsible>
              ))
            : null}
        </IonList>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton
            onClick={() => {
              history.push("/page/categories/new")
            }}
          >
            <IonIcon md={add} />
          </IonFabButton>
        </IonFab>
        <IonLoading isOpen={loading} message={"Working..."} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
  error: state.categories.error,
  loading: state.categories.loading,
})

export default connect(mapStateToProps)(Categories)
