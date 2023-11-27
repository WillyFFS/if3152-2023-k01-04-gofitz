import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faMoneyBillWave, faGear, faTrash, faRulerCombined, faPlus } from "@fortawesome/free-solid-svg-icons";
import database from "../models/database"





function ListLapangan() {
    const [lapangan, setLapangan] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchLapangan()
      }, [])
    
     
    const navigate = useNavigate();
      async function fetchLapangan(){
        const {data} = await database.supabase
          .from('lapangan')
          .select()
          .order("nomorLapangan");
          await setLapangan(data)
  
      }
      async function deleteLapangan(Id) {
        try {
          const { data, error } = await database.supabase
            .from('lapangan')
            .delete()
            .eq('nomorLapangan', Id);
      
          if (error) {
            throw error;
          }
      
          console.log('Lapangan deleted successfully:', data);
          return data;
        } catch (error) {
          console.error('Error deleting lapangan:', error.message);
        }

      }
     
      async function hasDataWithin30Days(id) {
        try {
          const today = new Date();
          

          const thirtyDaysLater = new Date();
          thirtyDaysLater.setDate(today.getDate() + 30);
      
   
          const { data, error } = await database.supabase
            .from('reservasi') 
            .select()
            .eq('lapanganId', id)
            .gte('scheduleBookingStart', today.toISOString()) 
            .lte('scheduleBookingStart', thirtyDaysLater.toISOString()); 
      
          if (error) {
            throw error;
          }
          console.log(data);
          if (data && data.length > 0) {
            document.getElementById('liveAlertPlaceholder').classList.remove("d-none");
            setShowAlert(true);
            console.log('Ada data dengan timestamp di antara hari ini dan 30 hari ke depan.');

          } else {
            console.log('Tidak ada data dengan timestamp di antara hari ini dan 30 hari ke depan.');
            await deleteLapangan(id);
            window.location.reload(false);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      function closeClick() {
        document.getElementById('liveAlertPlaceholder').classList.add("d-none");
      }


    return (
      <div>
      <Navbar />
      <div className="mb-4" style={{minHeight:"73vh"}}>
      <h1 className="text-center mt-4">DATA LAPANGAN</h1>
      <div className="container w-75">
        <div></div>
        <div className="mt-4 mb-3">
        <button onClick={() => navigate('/add-lapangan')} type="button" class="btn btn-success btn-lg"> <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /> Tambah Lapangan</button>
        </div>
        <div id="liveAlertPlaceholder" className="d-none alert alert-danger alert-dismissible show" role="alert"><div>Masih ada reservasi yang terdaftar di lapangan tersebut.</div><button onClick={closeClick} type="button" className="btn-close"></button></div>
        <div className="row">
            <div className="col-12 d-flex flex-column gap-4 mt-2">
              {lapangan.map((x) => 
              <div className="row mb-0">
              <div className="col-md-12">
                  <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                      <div className="col-auto d-none d-xl-block">
                      <img src={x.imageSrc} alt="lapangan" className="bd-placeholder-img image" />
                      </div>
                      <div className="col p-4 d-flex flex-column position-static text-start">
                          <strong className="d-inline-block mb-2 text-primary-emphasis"><span className="badge bg-success">Lapangan {x.nomorLapangan}</span></strong>
                          <div className="row">
                          <div className="col">
                          <h3 className="mb-0">{x.namaLapangan}</h3>
                          </div>
                          <div className="col-4 text-end"> 
                          <button onClick={()=> navigate(`edit-lapangan/${x.id}`)}   type="button" class="btn btn-outline-light" data-testid="Edit">
                            
                          <FontAwesomeIcon icon={faGear} style={{color: "#6a6d71",}} />
                          </button>
                          </div>
                          <div className="col-1 text-end">
                          <button onClick={()=>hasDataWithin30Days(x.nomorLapangan)}type="button" class="btn btn-outline-light" data-testid="Delete">
                          <FontAwesomeIcon icon={faTrash} style={{color: "#d31717",}} />
                          </button> 

                          </div>
                          </div>
                          <div className="d-flex justify-content-between w-100">
                              <div className="mb-1 text-body-secondary">{<FontAwesomeIcon icon={faFutbol} />} {x.countBola} <small className="text-body-secondary fw-light"> bola</small></div>
                
                          </div>
                          <p className="card-text mb-auto">{<FontAwesomeIcon icon={faMoneyBillWave} />}<b> Weekday: {"Rp" + x.priceLapanganWeekend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b><small className="text-body-secondary fw-light"> / jam</small></p>
                          <p className="card-text mb-auto">{<FontAwesomeIcon icon={faMoneyBillWave} />}<b> Weekend: {"Rp" + x.priceLapanganWeekday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b><small className="text-body-secondary fw-light"> / jam</small></p>
                      </div>
                  </div>
              </div>
          </div>
              )}
            </div>
            </div>
      </div>
</div>
  <Footer />
    </div>

    );
}
export default ListLapangan;