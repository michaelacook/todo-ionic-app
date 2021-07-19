import { useState } from "react"

import {
  IonAlert,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react"

import { useLocation, useHistory } from "react-router-dom"
import {
  folder,
  folderOutline,
  pinSharp,
  personOutline,
  personSharp,
  logOutOutline,
  logOutSharp,
  pinOutline,
  hammer,
} from "ionicons/icons"
import "./Menu.css"

import { doSignout } from "../actions/authActions"
import { connect } from "react-redux"

interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
}

const appPages: AppPage[] = [
  {
    title: "Categories",
    url: "/page/categories",
    iosIcon: folderOutline,
    mdIcon: folder,
  },
  {
    title: "Manage Categories",
    url: "/page/categories/manage",
    iosIcon: hammer,
    mdIcon: hammer,
  },
  {
    title: "Pinned",
    url: "/lists/pinned",
    iosIcon: pinOutline,
    mdIcon: pinSharp,
  },
]

const bottomAppPages: AppPage[] = [
  {
    title: "Account",
    url: "/page/account",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
]

type Props = {
  user: any
  dispatch
}

const Menu: React.FC<Props> = ({ dispatch, user }) => {
  const location = useLocation()
  const history = useHistory()
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleSignout() {
    await dispatch(doSignout())
    history.push("/login")
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>{user ? user.email : null}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>

        <IonList id="labels-list">
          <IonMenuToggle autoHide={false}>
            <IonItem
              routerLink="/page/account"
              routerDirection="none"
              className={
                location.pathname === "/page/account" ? "selected" : null
              }
              detail={false}
              lines="none"
            >
              <IonIcon slot="start" ios={personOutline} md={personSharp} />
              <IonLabel>Account</IonLabel>
            </IonItem>
            <IonItem
              detail={false}
              lines="none"
              onClick={(e) => {
                e.preventDefault()
                setAlertOpen(true)
              }}
            >
              <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonAlert
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header={"Confirm"}
          message={"Do you want to logout?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Logout",
              handler: handleSignout,
            },
          ]}
        />
      </IonContent>
    </IonMenu>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Menu)
