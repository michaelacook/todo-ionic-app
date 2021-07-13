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
  IonNote,
} from "@ionic/react"

import Collapsible from "react-collapsible"
import { useHistory } from "react-router-dom"
import {
  documentTextOutline,
  folder,
  addSharp,
  trash,
  createSharp,
  chevronUpSharp,
  chevronDownSharp,
} from "ionicons/icons"
import { doFetchCategories } from "../actions/categoryActions"

type Props = {
  user
  categories
  dispatch
}

const Categories: React.FC<Props> = ({ dispatch, user, categories }) => {
  const history = useHistory()
  const [collapsibles, setCollapsibles] = useState(
    categories ? categories.map((cat) => ({ id: cat.id, open: false })) : []
  )
  useEffect(() => {
    dispatch(doFetchCategories(user.email, user.rawPass))
  }, [])

  useEffect(() => {
    setCollapsibles(
      categories ? categories.map((cat) => ({ id: cat.id, open: false })) : []
    )
  }, [categories])

  function navigateToList(list) {
    const { ListItems } = list
    history.push({
      pathname: `/lists/${list.title}`,
      state: { ListItems, title: list.title },
    })
  }

  function toggleCollapsibleState(id: number) {
    const cols = [...collapsibles]
    const target = cols.indexOf(cols.find((col) => col.id === id))
    cols[target]["open"] = !cols[target]["open"]
    setCollapsibles(cols)
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
                  onOpening={() => toggleCollapsibleState(category.id)}
                  onClosing={() => toggleCollapsibleState(category.id)}
                  trigger={
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

                      <IonItem key={category.title} button>
                        <IonIcon slot="start" md={folder} />
                        <IonLabel>{category.title}</IonLabel>

                        <IonIcon
                          slot="end"
                          md={
                            collapsibles.length
                              ? collapsibles[i]["open"]
                                ? chevronUpSharp
                                : chevronDownSharp
                              : null
                          }
                          size="small"
                        />
                      </IonItem>
                    </IonItemSliding>
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
                </Collapsible>
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
