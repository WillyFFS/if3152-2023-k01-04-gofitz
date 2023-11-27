import React from "react";
import lapanganPoliuretan from "../assets/lapangan-poliuretan.jpg";
import database from "../models/database";
import { Link } from "react-router-dom";

function ListReservasi(props){
    let a = new Date(props.scheduleBookingStart);
    let c = new Date(props.scheduleBookingEnd);
    let b = a.toLocaleDateString('id', {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'});
    let d = a.toTimeString().split(" ")[0]+"-"+c.toTimeString().split(" ")[0];
    return(
        <div data-testid="ListReservasi" className="text-start container mb-3">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <p className="badge bg-success m-0">Lapangan {props.lapangan}</p>
                        <p className="m-0">{b}</p>
                    </div>
                    <p className="m-0">{d}</p>
                </div>
                <div class="card-body">
                    <div className="d-flex gap-3">
                        <img src={props.imageSrc} alt="lapangan" className="" style={{width:"150px", height:"160px", borderRadius:"10px", objectFit:"cover"}} /> 
                        <div className="d-flex w-100 flex-column justify-content-between" >
                            <div className="d-flex flex-column justify-content-between">
                                <div className="row">
                                    <h5>{props.namaLapangan}</h5>
                                    <div className="col-8">
                                        <p className="m-0">{props.nama}</p>
                                    </div>
                                    <div className="col-4 border-start">
                                        <p className="m-0">Total</p>
                                        <p className="m-0"><b>Rp{props.harga}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                  <Link to="/ketersediaan-ubah-reservasi" state={{id:props.id, idLapangan:props.lapangan, totalHarga:props.harga, scheduleBookingStart:props.scheduleBookingStart, scheduleBookingEnd:props.scheduleBookingEnd}}>

                                    <button className="btn btn-outline-success w-25 align-self-end col-4 offset-8 mt-3">Ubah</button>
                                  </Link>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListReservasi;