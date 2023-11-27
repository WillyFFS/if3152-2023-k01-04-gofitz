import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Ketersediaan from './pages/Ketersediaan';
import DashboardOwner from './pages/DashboardOwner';
import AddLapangan from './components/AddLapangan';
import ListLapangan from './components/ListLapangan';
import EditLapangan from './components/EditLapangan';
import ReservasiOngoing from './pages/ReservasiOngoing';
import Reservasi from './pages/Reservasi';
import Home from './pages/Home';
import database from './models/database';
import { supabase } from './models/database';


// import ReservasiOngoing from './pages/ReservasiOngoing';

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

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
      let data = await database.getRole(session.user.user_metadata.username);
      setRole(data[0].role);
    } else {
      setRole("customer")
    }
  }
  console.log(role);

  return (
    <BrowserRouter>
      <Routes>
        {!session ? <> <Route path="/" element={<Home/>}/>
        <Route path="ketersediaan" element={<Ketersediaan kondisi="online"/>}/></> :(role === "admin" ? <>
        <Route path="/" element={<Home/>}/>
        <Route path="ketersediaan" element={<Ketersediaan kondisi="online"/>}/>
        <Route path="add-lapangan" element={<AddLapangan/>}/>
        <Route path="list-lapangan" element={<ListLapangan/>}/>
        <Route path="list-lapangan/edit-lapangan/:id" element={<EditLapangan/>}/>
        {/* <Route path="keuangan" element={<DashboardOwner/>}/> */}
        <Route path="ketersediaan-onsite" element={<Ketersediaan kondisi="onSite"/>}/>
        <Route path="ketersediaan-ubah-reservasi" element={<Ketersediaan kondisi="ubahReservasi"/>}/>
        <Route path="ubah-reservasi" element={<ReservasiOngoing />}/>
        <Route path="reservasi" element={<Reservasi online={true} />}/>
        <Route path="reservasi-onsite" element={<Reservasi online={false} />}/></> :(role === "owner" ? <>
        <Route path="/" element={<Home/>}/>
        <Route path="ketersediaan" element={<Ketersediaan kondisi="online"/>}/>
        <Route path="keuangan" element={<DashboardOwner/>}/>
        </> : <> <Route path="/" element={<Home/>}/>
        <Route path="ketersediaan" element={<Ketersediaan kondisi="online"/>}/></>)) }
        <Route path="reservasi" element={<Reservasi online={true} />}/>
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
