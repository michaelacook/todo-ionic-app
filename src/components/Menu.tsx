import {
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

import { useLocation } from "react-router-dom"
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  folderSharp,
  folderOutline,
  listOutline,
  listSharp,
  settingsOutline,
  settingsSharp,
  logInSharp,
  logInOutline,
  personOutline,
  personSharp,
} from "ionicons/icons"
import "./Menu.css"
import { userInfo } from "os"

import { connect } from "react-redux"

interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
}

const appPages: AppPage[] = [
  {
    title: "My Categories",
    url: "/page/categories",
    iosIcon: folderOutline,
    mdIcon: folderSharp,
  },
  {
    title: "My ToDos",
    url: "/page/todos",
    iosIcon: listOutline,
    mdIcon: listSharp,
  },
]

const bottomAppPages: AppPage[] = [
  {
    title: "Account",
    url: "/page/account",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
  {
    title: "Settings",
    url: "/page/settings",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
  {
    title: "Logout",
    url: "/page/logout",
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
]

type Props = {
  user: any
}

const Menu: React.FC<Props> = ({ user }) => {
  const location = useLocation()

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
          {bottomAppPages.map((appPage, index) => {
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
      </IonContent>
    </IonMenu>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Menu)
