import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
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
  IonLoading,
  IonText,
} from "@ionic/react"
import { connect } from "react-redux"
import { trash, menuSharp } from "ionicons/icons"
import { doFetchList, doUpdateList } from "../actions/listActions"
import {
  doUpdateItem,
  doPostListItem,
  doDeleteItem,
} from "../actions/listItemsActions"

interface Props {
  list
  user
  error: { message: string }
  dispatch: any
}

const Todo: React.FC<Props> = ({ dispatch, error, list, user }) => {
  const { id }: any = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [newItem, setNewItem] = useState("")
  const [newItemComment, setNewItemComment] = useState("")

  useEffect(() => {
    dispatch(doFetchList(Number(id), user.email, user.rawPass))
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [error, list])

  function handlePostListItem() {
    if (newItem) {
      setLoading(true)
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

  function handlePinList() {
    if (list) {
      dispatch(
        doUpdateList(
          Number(list.id),
          {
            pinned: list.pinned ? false : true,
          },
          user.email,
          user.rawPass
        )
      )
    }
  }

  function handleDeleteItem(id: number, listId: number) {
    setLoading(true)
    dispatch(doDeleteItem(id, listId, user.email, user.rawPass))
  }

  function changeCompleteStatus(item) {
    dispatch(
      doUpdateItem(
        Number(item.id),
        Number(list.id),
        { complete: item.complete ? false : true },
        user.email,
        user.rawPass
      )
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonItem slot="end" lines="none" color="primary">
            <IonLabel>Pinned</IonLabel>
            <IonToggle
              color="light"
              checked={list ? list.pinned : false}
              onClick={handlePinList}
            ></IonToggle>
          </IonItem>

          <IonTitle>{list ? list.title : null}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {error ? (
          <IonItem>
            <IonText color="danger">{error}</IonText>
          </IonItem>
        ) : null}
        {list ? (
          !Object.keys(list).includes("ListItems") || !list.ListItems.length ? (
            <IonNote className="ion-margin-start ion-margin-top">
              You don't have any list items yet.
            </IonNote>
          ) : (
            <IonText>
              <p className="ion-margin-start" style={{ marginBottom: "0" }}>
                {list.ListItems.filter((item) => item.complete).length} of{" "}
                {list.ListItems.length} complete
              </p>
            </IonText>
          )
        ) : null}
        <IonList>
          {list && Object.keys(list).includes("ListItems")
            ? list.ListItems.map((item) => (
                <IonItemSliding key={item.id}>
                  <IonItemOptions side="end">
                    <IonItemOption
                      type="button"
                      onClick={() => {
                        history.push(`/items/${item.id}`)
                      }}
                    >
                      <IonIcon icon={menuSharp} slot="top" />
                      Details
                    </IonItemOption>

                    <IonItemOption
                      color="danger"
                      onClick={() =>
                        handleDeleteItem(Number(item.id), Number(item.listId))
                      }
                    >
                      <IonIcon icon={trash} size="large" />
                    </IonItemOption>
                  </IonItemOptions>

                  <IonItem key={item.id}>
                    <IonLabel>{item.content}</IonLabel>
                    <IonCheckbox
                      slot="start"
                      checked={item.complete}
                      onClick={() => changeCompleteStatus(item)}
                    />
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
        <IonLoading isOpen={loading} message={"Working..."} />
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state: Props) => ({
  error: state.list.error,
  list: state.list.list,
  user: state.user.user,
})

export default connect(mapStateToProps)(Todo)
