import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react"

import { addSharp, listSharp, trash, createSharp } from "ionicons/icons"

const List: React.FC = () => {
  const { title }: any = useParams()
  const history = useHistory()
  const [lists, setLists] = useState([])

  useEffect(() => {
    if (history.location.state) {
      setLists(Array(history.location.state)[0]["Lists"])
    }
  }, [])

  function navigateToList(list) {
    const { ListItems } = list
    history.push({
      pathname: `/lists/${list.title}`,
      state: { ListItems },
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{`${title}»lists`}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {lists.map((list) => (
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
                <IonIcon slot="start" md={listSharp} />
                <IonLabel>{list.title}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
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

export default List
