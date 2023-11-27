import React from "react";
import DetailPesanan from "../components/DetailPesanan";
import FormReserve from "../components/FormReserve";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

function Reservasi(props) {
    let {state} = useLocation();

  return (
    <>
        <header  data-testid="Reservasi" className="d-lg-block d-none py-3 border-bottom text-start" style={{height:"10vh"}}>
            <Link to="/" className="ms-5 link-body-emphasis text-decoration-none">
                <span className="badge bg-success fs-5">GOFITZ</span>
            </Link>
        </header>
        <div className="container-fluid container-lg mt-3 pt-3 p-0 mb-5"style={{minHeight:"70vh"}}>
            <div className="d-flex align-items-center gap-3 justify-content-between justify-content-lg-start">
                <Link to={props.online ? "/ketersediaan" : "/ketersediaan-onsite"}>
                    <button style={{width: "40px", height:"40px", background:"transparent", border:"none"}}><FontAwesomeIcon className="icon-size" icon={faChevronLeft} /></button>
                </Link>
                <h3 className="text-lg-start m-0">Pilih Waktu</h3>
                <button className="invisible" style={{width: "40px", height:"40px", background:"transparent", border:"none"}}><FontAwesomeIcon className="icon-size" icon={faChevronLeft} /></button>
            </div>
            <div className="row justify-content-between mx-0 mx-lg-5">
                
                <div className="col-12 col-lg-5 order-lg-3">
                    <DetailPesanan lapangan={state.lapangan} harga={state.harga} totalHarga={state.totalHarga} durasi={state.durasi}/>
                </div>
                <div className="p-0 col-lg-6 col-12">
                    <FormReserve online={props.online} totalHarga={state.totalHarga} lapangan={state.lapangan} scheduleBookingStart={state.scheduleBookingStart} scheduleBookingEnd={state.scheduleBookingEnd}/>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
}

export default Reservasi;