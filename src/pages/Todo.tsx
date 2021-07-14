import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import {
  IonButtons,
  IonButton,
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
  IonCheckbox,
  IonInput,
  IonTextarea,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonNote,
  IonToggle,
} from "@ionic/react"
import { connect } from "react-redux"
import { trash, menuSharp, createSharp } from "ionicons/icons"
import { doFetchList } from "../actions/listActions"
import { doPostListItem, doDeleteItem } from "../actions/listItemsActions"

interface Props {
  list
  user
  error: { message: string }
  loading: boolean
  dispatch: any
}

const Todo: React.FC<Props> = ({ dispatch, loading, error, list, user }) => {
  const { id }: any = useParams()
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [newItemComment, setNewItemComment] = useState("")

  function addNewItem() {
    setNewItem("")
    setNewItemComment("")
  }

  function deleteItem(id: number) {
    setItems([...items.filter((item) => item.id !== id)])
  }

  useEffect(() => {
    dispatch(doFetchList(Number(id), user.email, user.rawPass))
  }, [])

  function handlePostListItem() {
    if (newItem) {
      const payload = {
        listId: list.id,
        content: newItem,
      }

      if (newItemComment) {
        payload["comments"] = newItemComment
      }

      dispatch(
        doPostListItem(Number(list.id), payload, user.email, user.rawPass)
      )

      setNewItem("")
      setNewItemComment("")
    }
  }

  function handleDeleteItem(id: number, listId: number) {
    dispatch(doDeleteItem(id, listId, user.email, user.rawPass))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonItem slot="end" lines="none">
            <IonLabel>Pinned</IonLabel>
            <IonToggle></IonToggle>
          </IonItem>

          <IonTitle>{list ? list.title : null}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {list ? (
          !list.ListItems.length ? (
            <IonNote className="ion-margin-start ion-margin-top">
              You don't have any list items yet.
            </IonNote>
          ) : null
        ) : null}
        <IonList>
          {list
            ? list.ListItems.map((item) => (
                <IonItemSliding key={item.id}>
                  <IonItemOptions side="end">
                    <IonItemOption>
                      <IonIcon icon={menuSharp} slot="top" />
                      Details
                    </IonItemOption>

                    <IonItemOption color="success">
                      <IonIcon icon={createSharp} slot="top" />
                      Edit
                    </IonItemOption>

                    <IonItemOption
                      color="danger"
                      onClick={() =>
                        handleDeleteItem(Number(item.id), Number(item.listId))
                      }
                    >
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonItemOption>
                  </IonItemOptions>

                  <IonItem key={item.id}>
                    <IonLabel>{item.content}</IonLabel>
                    <IonCheckbox slot="start" checked={item.complete} />
                  </IonItem>
                </IonItemSliding>
              ))
            : null}
        </IonList>
        <IonItem>
          <IonInput
            type="text"
            value={newItem}
            placeholder="New item"
            onIonChange={(e) => setNewItem(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            value={newItemComment}
            rows={1}
            autoGrow={true}
            placeholder="comments..."
            onIonChange={(e) => setNewItemComment(e.detail.value!)}
          ></IonTextarea>
        </IonItem>
        <IonButton
          onClick={handlePostListItem}
          expand="full"
          size="default"
          shape="round"
        >
          Add
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state: Props) => ({
  loading: state.list.loading,
  error: state.list.error,
  list: state.list.list,
  user: state.user.user,
})

export default connect(mapStateToProps)(Todo)
