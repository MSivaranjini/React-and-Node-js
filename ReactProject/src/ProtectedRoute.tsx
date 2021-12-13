import { Route, Redirect } from "react-router-dom";
import ManagerHOC from "./Redux/HOC/ManagerHOC";
import Wfm_ManagerHOC from "./Redux/HOC/Wfm_ManagerHOC";



const ProtectedRoute = ({ children, ...rest }:any) => {
  const token= localStorage.getItem("token");
const usertype =  localStorage.getItem("usertype")

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token? usertype==="manager"?(
          <ManagerHOC/>
        ):(<Wfm_ManagerHOC/>) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
