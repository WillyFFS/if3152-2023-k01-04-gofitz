import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Link } from "react-router-dom";
import { supabase } from '../models/database';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import database from "../models/database";

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      changeRole(session);
      // changeRole();
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log(session.user.user_metadata.username);
      setSession(session);
      changeRole(session);
    })
    // console.log(session);
    // console.log(supabase.auth.getSession())
    // changeRole(session);
    
    return () => subscription.unsubscribe()
  }, [])

  async function changeRole(session) {
    if (session) {
      setUsername(session.user.user_metadata.username);
      let data = await database.getRole(session.user.user_metadata.username);
      setRole(data[0].role);
    } else {
      setUsername(null);
      setRole("customer")
    }
  }
  
  async function handleLogout(){
    // sessionStorage.removeItem('token')
    await supabase.auth.signOut();
    navigate("/");
    // dibutton ntar pas onClick={handleLogout}
  }

  // console.log(supabase.auth.getSession())
  return (
    <header data-testid="Navbar" className="px-5 d-flex flex-wrap align-items-center justify-content-between border-bottom" style={{height:"10vh"}}>
      <div className="w-25 mb-0">
        <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          <span className="badge bg-success fs-5">GOFITZ</span>
        </Link>
      </div>

      <ul className="nav w-50 d-none d-lg-flex justify-content-center">
        <li><Link to="/ketersediaan" reloadDocument className="nav-link px-2 link-body-emphasis">Reservasi</Link></li>
        <li><Link to="/ketersediaan-onsite" reloadDocument className={role === "admin" ? "nav-link px-2 link-body-emphasis" : "d-none"}>Reservasi Onsite</Link></li>
        <li><Link to="/ubah-reservasi" className={role === "admin" ? "nav-link px-2 link-body-emphasis" : "d-none"}>Ubah Reservasi</Link></li>
        <li><Link to="/list-lapangan" className={role === "admin" ? "nav-link px-2 link-body-emphasis" : "d-none"}>Lapangan</Link></li>
        <li><Link to="/keuangan" className={role === "owner" ? "nav-link px-2 link-body-emphasis" : "d-none"}>Keuangan</Link></li>
      </ul>
      {!session ?
        <>
          <div className="w-25 text-end d-none d-lg-block">
            <button type="button" className="btn btn-outline-success me-2" data-bs-toggle="modal" data-bs-target="#modalLogin">Login</button>
            <Login />
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalSignIn">Sign-up</button>
            <Register />
          </div>
          <div className="w-25 text-end d-block d-lg-none">
            <button className="m-0 p-0 border-0" style={{background:"transparent"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/ketersediaan" className="dropdown-item">Reservasi</Link></li>
              <li><Link to="/ketersediaan-onsite" reloadDocument className={role === "admin" ? "dropdown-item" : "d-none"}>Reservasi Onsite</Link></li>
              <li><Link to="/ubah-reservasi" className={role === "admin" ? "dropdown-item" : "d-none"}>Ubah Reservasi</Link></li>
              <li><Link to="/list-lapangan" className={role === "admin" ? "dropdown-item" : "d-none"}>Lapangan</Link></li>
              <li><Link to="/keuangan" className={role === "owner" ? "dropdown-item" : "d-none"}>Keuangan</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalLogin">Login</button></li>
              <li><button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalSignIn">Sign-up</button></li>
              {/* LOGINN */}
            </ul>
          </div>
        </>
        :
        <div className="w-25 d-block justify-content-end d-flex">
          <button className="m-0 text-end border-0 d-flex gap-2 justify-content-center align-items-center dropdown-toggle" style={{background:"transparent"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div className=" m-0 p-2 px-3 border border-2 border-success rounded-circle" >{username.slice(0,1).toUpperCase()}</div>
            {/* <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" /> */}
            
          </button>
          <ul className="dropdown-menu" >
            <li><span className="dropdown-item">{username}</span></li>
            <li><Link to="/ketersediaan" className="dropdown-item d-lg-none">Reservasi</Link></li>
            <li><Link to="/ketersediaan-onsite" className={role === "admin" ? "dropdown-item d-lg-none" : "d-none"}>Reservasi Onsite</Link></li>
            <li><Link to="/ubah-reservasi" className={role === "admin" ? "dropdown-item d-lg-none" : "d-none"}>Ubah Reservasi</Link></li>
            <li><Link to="/list-lapangan" className={role === "admin" ? "dropdown-item d-lg-none" : "d-none"}>Lapangan</Link></li>
            <li><Link to="/keuangan" className={role === "owner" ? "dropdown-item d-lg-none" : "d-none"}>Keuangan</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
          </ul>
        </div>
      }
    </header>
  );
}

export default Navbar;