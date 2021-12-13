import { useState } from "react"
import { Redirect } from "react-router";



const Login = ({token,usertype,performLogin}:any)=>{

  const [user,setUser]=useState("")
  const [pass,setPass]=useState("")
  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
    return (
  <div className="card" 
  style={{width: "400px", minHeight: "300px",position: "relative", top:"100px",left:"35%" 
  ,padding: "20px", color:"darkblue"}}>
    <h3> Work Force Management </h3>
        <form action="/action_page.php">
  <div className="mb-3 mt-3">
 
    <input type="text" className="form-control" 
    value={user}
    placeholder="username"
     onChange={(x:any)=>setUser(x.target.value)}
     />
  </div>
  <div className="mb-3">
  
    <input type="password" 
    className="form-control"
     value={pass}
     onChange={(x:any)=>setPass(x.target.value)}
    placeholder="password"
    name="pswd"/>
  </div>
 
  <button type="button" className="btn btn-primary" onClick={()=>performLogin({
    username:user,password:pass
  })}>Login</button>
</form>
</div>
    )
}

export default Login