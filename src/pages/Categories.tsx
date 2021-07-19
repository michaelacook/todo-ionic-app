import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  IonButton,
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
  IonNote,
} from "@ionic/react"
import {
  documentTextOutline,
  folder,
  add,
  trash,
  createSharp,
  chevronUpSharp,
  chevronDownSharp,
} from "ionicons/icons"
import useDynamicRefs from "use-dynamic-refs"
import Collapsible from "react-collapsible"
import { Link, useHistory } from "react-router-dom"
import { doFetchCategories } from "../actions/categoryActions"

type Props = {
  user
  categories
  dispatch
}

const Categories: React.FC<Props> = ({ dispatch, user, categories }) => {
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
    const { ListItems } = list
    history.push(`/lists/${list.id}`)
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
            ? categories.map((category, i) => (
                <Collapsible
                  key={category.id}
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
                            <IonItemOption color="success">
                              <IonIcon icon={createSharp} slot="top" />
                              Edit
                            </IonItemOption>
                            <IonItemOption color="danger">
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
                  <IonItem>
                    <Link
                      to={{
                        pathname: "/lists/new",
                        state: { categoryId: category.id },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      New List
                    </Link>
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
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
})

export default connect(mapStateToProps)(Categories)
