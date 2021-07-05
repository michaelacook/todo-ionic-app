import React from "react"
import { Redirect } from "react-router-dom"

type Props = {
  user: any
}

const PrivateComponent: React.FC<Props> = (props) => {
  return !props.user.user ? (
    <Redirect exact={true} to="/login" />
  ) : (
    <React.Fragment>{props.children}</React.Fragment>
  )
}

export default PrivateComponent
