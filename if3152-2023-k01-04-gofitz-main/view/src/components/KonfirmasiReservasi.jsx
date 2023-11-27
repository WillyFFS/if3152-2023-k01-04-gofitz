import React from "react";
import "../styles/konfirmasiReservasi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown ,faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DropdownItem from "./DropdownItem";
import database from "../models/database";
import { Link } from "react-router-dom";
import { supabase } from '../models/database';
import { useEffect, useState } from "react";

function toRupiah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toTime(time) {
    let timeString = ""
    if (time < 10) {
        timeString += "0";
    }
    timeString += time.toString();
    return timeString;
}

function KonfirmasiReservasi(props) {
    const [session, setSession] = useState(null);
    const [style, setStyle] = React.useState("mt-3 d-none");

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          // changeRole();
        })
    }, [])
    console.log(session);

    function incrementStart() {
        if (props.time.mulai < 20) {
            if (props.time.selesai -props.time.mulai === 1) {
                props.setTime({"mulai": props.time.mulai + 1, "selesai": props.time.selesai + 1});
                props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai + 1, "selesai": props.time.selesai + 1}, props.waktuKosong, props.lapangan, props.setCanPesan)
            } else {
                props.setTime({"mulai": props.time.mulai + 1, "selesai": props.time.selesai});
                props.ubahJam(props.time.selesai - props.time.mulai - 1);
                if (props.reservasi !== "Pilih lapangan") {
                    props.ubahHargaTotal(props.harga * (props.time.selesai - props.time.mulai - 1));
                }
               
                props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai + 1, "selesai": props.time.selesai}, props.waktuKosong, props.lapangan, props.setCanPesan)
            }
        }
    }

    function incrementEnd() {
        if (props.time.selesai < 21 && (props.time.selesai - props.time.mulai) < 6) {
            props.setTime({"mulai": props.time.mulai, "selesai": props.time.selesai + 1});
            props.ubahJam(props.time.selesai - props.time.mulai + 1);
            if (props.reservasi !== "Pilih lapangan") {
                props.ubahHargaTotal(props.harga * (props.time.selesai - props.time.mulai + 1));
            }
            props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai, "selesai": props.time.selesai + 1}, props.waktuKosong, props.lapangan, props.setCanPesan)
        }
    }

    function decrementStart() {
        if (props.time.mulai > 7 && (props.time.selesai - props.time.mulai) < 6) {
            props.setTime({"mulai": props.time.mulai - 1, "selesai": props.time.selesai});
            props.ubahJam(props.time.selesai - props.time.mulai + 1);
            if (props.reservasi !== "Pilih lapangan") {
                props.ubahHargaTotal(props.harga * (props.time.selesai - props.time.mulai + 1));
            }
            props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai-1, "selesai": props.time.selesai}, props.waktuKosong, props.lapangan, props.setCanPesan)
        }
    }

    function decrementEnd() {
        if (props.time.selesai > 8) {
            if (props.time.selesai - props.time.mulai === 1) {
                props.setTime({"mulai": props.time.mulai - 1, "selesai": props.time.selesai - 1});
                props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai-1, "selesai": props.time.selesai - 1}, props.waktuKosong, props.lapangan, props.setCanPesan)
            } else {
                props.setTime({"mulai": props.time.mulai, "selesai": props.time.selesai - 1});
                props.ubahJam(props.time.selesai - props.time.mulai - 1);
                if (props.reservasi !== "Pilih lapangan") {
                    props.ubahHargaTotal(props.harga * (props.time.selesai - props.time.mulai - 1));
                }
                props.checkKetersediaan(props.reservasi, {"mulai": props.time.mulai, "selesai": props.time.selesai - 1}, props.waktuKosong, props.lapangan, props.setCanPesan);
            }
        }
    }

    function gantiLapangan(event) {
        props.ubahReservasi(event.target.innerText);
        let index;
        for (let i = 0; i < props.lapangan.length; i++) {
            if(props.lapangan[i].nomorLapangan === parseInt(event.target.innerText.split(" ")[1])) {
              index = i;
              break;
            }
        }
        if ((props.pilihTanggal.getDay() === 0) || (props.pilihTanggal.getDay() === 6)) {
            props.ubahHarga(props.lapangan[index].priceLapanganWeekend);
            props.ubahHargaTotal(props.lapangan[index].priceLapanganWeekend * (props.time.selesai-props.time.mulai));
        } else {
            props.ubahHarga(props.lapangan[index].priceLapanganWeekday);
            props.ubahHargaTotal(props.lapangan[index].priceLapanganWeekday * (props.time.selesai-props.time.mulai));
        }
        setStyle("mt-3 d-block");
        props.checkKetersediaan(event.target.innerText, props.time, props.waktuKosong, props.lapangan, props.setCanPesan);
    }

    async function clickUpdateReservasi() {
        await database.updateReservasi({scheduleBookingStart: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.mulai),
            scheduleBookingEnd: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.selesai),
            totalHarga: props.hargaTotal,
            lapanganId: parseInt(props.reservasi.split(" ")[1]),
            id:props.state.id})
    }
    

    return (
        <>
            <div data-testid="KonfirmasiReservasi" className="container sticky-top z-0 pt-4 d-none d-lg-block">
                <div className="card shadow">
                    <div className="card-body m-2">
                        <h1 className="card-title pricing-card-title fs-4 text-start mt-2 mb-4">Rp{toRupiah(props.harga)}<small className="fs-6 text-body-secondary fw-light"> / jam</small></h1>
                        <p className="mb-2 text-start">{props.pilihTanggal.toLocaleDateString('id', {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}</p>
                        <div className="border rounded text-start">
                            <div className="row m-0">
                                <button className="col-12 border-bottom style-dropdown text-start btn" type="button" data-bs-toggle="dropdown" >
                                    <div className="m-0 p-0 d-flex justify-content-between align-items-center">
                                        <div className="m-0 p-0">
                                            <b className="size-title">LAPANGAN</b>
                                             <p className="m-0">{props.reservasi}</p>
                                        </div>
                                        <FontAwesomeIcon className="icon-size" icon={faChevronDown} />
                                    </div>
                                    
                                </button>
                                <ul className="dropdown-menu">
                                    {(props.lapangan).map(x => <DropdownItem key={x.id} id={x.nomorLapangan} methodClick={gantiLapangan} />)}
                                </ul>
                            </div>
                            <div className="row m-0">
                                <div className="col-6 border-end pb-2 pt-1 d-flex justify-content-between align-items-center">
                                    <div>
                                        <b className="size-title">MULAI</b>
                                        <p className="m-0">{toTime(props.time.mulai)} : 00</p>
                                    </div>
                                    <div className="row">
                                        <button onClick={incrementStart} className="p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronUp} /></button>
                                        <button onClick={decrementStart} className="p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronDown} /></button>
                                    </div>
                                    
                                </div>
                                <div className="col-6 pb-2 pt-1 d-flex justify-content-between align-items-center">
                                    <div>
                                        <b className="size-title">SELESAI</b>
                                        <p className="m-0">{toTime(props.time.selesai)} : 00</p>
                                    </div>
                                    <div className="row">
                                        <button onClick={incrementEnd} className="col-12 p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronUp} /></button>
                                        <button onClick={decrementEnd} className="col-12 p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronDown} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="ps-1 mb-0 mt-1 text-start text-danger">{!session ?"Login terlebih dahulu!" : (props.reservasi === "Pilih lapangan" ? "Pilih lapangan terlebih dahulu!" : (!props.canPesan ? "Lapangan tidak tersedia!" : ""))}</p>
                        {props.canPesan && session ? 
                            <Link to={props.kondisi === "online" ? "/reservasi" : (props.kondisi === "onSite" ? "/reservasi-onsite" : "/")} state={props.kondisi !== "ubahReservasi" ? {lapangan:parseInt(props.reservasi.split(" ")[1]), harga:props.harga, totalHarga:props.hargaTotal, durasi:props.jam, scheduleBookingStart: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.mulai), scheduleBookingEnd: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.selesai)} : null}>
                            <button onClick={props.kondisi === "ubahReservasi" ? clickUpdateReservasi : null} className="btn btn-success rounded w-100 align-self-center mt-3 p-2" type="button">
                                {props.kondisi !== "ubahReservasi" ? "Pesan" : "Ubah"}
                            </button>
                            </Link> :
                            <button onClick={props.kondisi === "ubahReservasi" ? clickUpdateReservasi : null} className="btn btn-success rounded w-100 align-self-center mt-3 p-2" type="button" disabled>
                                {props.kondisi !== "ubahReservasi" ? "Pesan" : "Ubah"}
                            </button>
                        }
                        <div className={style}>
                            <p className="text-start"><b>Total :</b></p>
                            <hr />
                            <div className="d-flex justify-content-between flex-wrap">
                                <p className="m-0"><b>Rp{toRupiah(props.harga)} x {props.jam} jam</b></p>
                                <p className="m-0">= <b><u>Rp{toRupiah(props.hargaTotal)}</u></b></p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid row d-flex d-lg-none px-4 py-2 justify-content-between align-items-center fixed-bottom border-top bg-white">
                <div className="text-start col-6">
                    <p className="m-0"><u>{props.pilihTanggal.toLocaleDateString('id', {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}</u></p>
                    <div className="d-flex justify-content-start align-items-center">
                        <strong>Rp{toRupiah(props.hargaTotal)}<small className="fs-6 text-body-secondary fw-light"> / {props.jam} jam</small></strong>
                        <button className="d-flex justify-content-between align-items-center style-dropdown text-start btn" type="button" data-bs-toggle="dropdown" >
                            <p className="m-0 me-2">{props.reservasi}</p>
                            <FontAwesomeIcon className="icon-size" icon={faChevronDown} />
                        </button>
                        <ul className="dropdown-menu">
                            {(props.lapangan).map(x => <DropdownItem key={x.id} id={x.nomorLapangan} methodClick={gantiLapangan} />)}
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className="d-flex justify-content-center gap-3 align-items-center">
                        <div className="d-flex flex-row gap-2">
                            <div>
                                <b className="size-title">MULAI</b>
                                <p className="m-0">{toTime(props.time.mulai)} : 00</p>
                            </div>
                            <div className="row">
                                <button onClick={incrementStart} className="p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronUp} /></button>
                                <button onClick={decrementStart} className="p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronDown} /></button>
                            </div>
                        </div>
                        
                        <div className="d-flex flex-row gap-2">
                            <div>
                                <b className="size-title">SELESAI</b>
                                <p className="m-0">{toTime(props.time.selesai)} : 00</p>
                            </div>
                            
                            <div className="row">
                                <button onClick={incrementEnd} className="col-12 p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronUp} /></button>
                                <button onClick={decrementEnd} className="col-12 p-0 me-2 remove-button"><FontAwesomeIcon className="icon-size" icon={faChevronDown} /></button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {props.canPesan && session ? 
                    <Link to={props.kondisi === "online" ? "/reservasi" : (props.kondisi === "onSite" ? "/reservasi-onsite" : "/")} state={props.kondisi !== "ubahReservasi" ? {lapangan:parseInt(props.reservasi.split(" ")[1]), harga:props.harga, totalHarga:props.hargaTotal, durasi:props.jam, scheduleBookingStart: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.mulai), scheduleBookingEnd: new Date(props.pilihTanggal.getFullYear(), props.pilihTanggal.getMonth(), props.pilihTanggal.getDate(), props.time.selesai)} : null}>
                    <button onClick={props.kondisi === "ubahReservasi" ? clickUpdateReservasi : null} className="col-2 btn btn-success rounded align-self-center mt-3 p-2" type="button">
                        {props.kondisi !== "ubahReservasi" ? "Pesan" : "Ubah"}
                    </button>
                    </Link> :
                    <button onClick={props.kondisi === "ubahReservasi" ? clickUpdateReservasi : null} className="col-2 btn btn-success rounded align-self-center mt-3 p-2" type="button" disabled>
                        {props.kondisi !== "ubahReservasi" ? "Pesan" : "Ubah"}
                    </button>
                }
            </div>
        </>
    );
}

export default KonfirmasiReservasi;