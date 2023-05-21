import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Pop from "./Pop";
import PopCreate from "./PopCreate"
import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Nav() {
  let user = Cookies.get('username');
  const [showPopUpLogin, setShowPopUpLogin] = useState(false);
  const [showPopUpCreate, setShowPopUpCreate] = useState(false);

  const handleClosePopUp = () => {
    if(user){
      setShowPopUpCreate(false)
    }else{
      setShowPopUpLogin(false)
    }
    
  };
  const handleShowPopUp = () => {
    if(user){
      setShowPopUpCreate(true)
    }else{
      setShowPopUpLogin(true)
    }
  };
  const Logout=()=>{
    Cookies.remove('username');
    Cookies.remove('isLoggedIn');
    window.location.reload();
  }
  return (
    <div className="bg-black" style={{marginBottom:"-10px"}}>
    <h1 style={{color:"white"}}>NEWNEWS</h1>
    <nav className="navbar bg-dark" data-bs-theme="dark">
    {
        user ? <div style={{color:"white",marginLeft:"220px",position:"absolute"}}>Username:{user}
        <Button style={{marginLeft:"10px"}} variant="danger" onClick={Logout}>Logout</Button></div>
        : null
      }
    <div style={{marginLeft:"450px",marginTop:"10px"}}>
   <a className="navbar-brand text-white" href='/'>NEWNews</a>
   <a className="navbar-brand text-white" href='/game'>GAMENews</a>
   <a className="navbar-brand text-white" href='/sport'>SPORTNews</a>
   <Button variant="primary" onClick={handleShowPopUp} style={{marginBottom:"10px"}}>Create NEWS</Button>
  </div>
  <Pop show={showPopUpLogin} onHide={handleClosePopUp}/>
  <PopCreate show={showPopUpCreate} onHide={handleClosePopUp}/>
  </nav></div>

  );
}
export default Nav;