import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  IonButton,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonNote,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react"
import { calendarOutline } from "ionicons/icons"
import { connect } from "react-redux"
import { doFetchItem } from "../actions/listItemsActions"

type Props = {
  dispatch
  user
  item
}

const ItemDetails: React.FC<Props> = ({ dispatch, user, item }) => {
  const { id }: any = useParams()

  useEffect(() => {
    dispatch(doFetchItem(id, user.email, user.rawPass))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Details</IonTitle>

          <IonButton
            color="tertiary"
            className="ion-margin-end"
            size="small"
            slot="end"
          >
            Edit
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {item ? (
          <div className="ion-margin-start">
            <h2>{item.content}</h2>
            <IonGrid>
              <IonRow>
                <IonCol size="1">
                  <IonIcon icon={calendarOutline} size="small" />
                </IonCol>
                <IonCol style={{ paddingTop: "7px" }}>
                  {`${new Date(item.createdAt).toLocaleDateString()}`}
                </IonCol>
              </IonRow>
            </IonGrid>

            <h4>Comments:</h4>
            <IonNote style={{ lineHeight: "1.6" }}>{item.comments}</IonNote>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  item: state.listItem.listItem,
})

export default connect(mapStateToProps)(ItemDetails)
