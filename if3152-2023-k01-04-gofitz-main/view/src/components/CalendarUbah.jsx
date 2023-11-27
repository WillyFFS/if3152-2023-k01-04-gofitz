import React from "react";
import "../styles/calendar.css";
import CalendarSatuanUbah from "./CalendarSatuanUbah";

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function setTanggal(tanggal, bulan) {
    const tahun = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear();
    const jmlhHari = daysInMonth((bulan + 1), tahun);
    const hari = new Date(tahun, bulan, 1).getDay();
    for (let i = 0; i < hari; i++) {
        tanggal.push([-7+i, false]);
    }
    for (let i = 1; i <= jmlhHari; i++) {
        if (i > (new Date().getDate())) {
            tanggal.push([i, true]);
        } else {
            tanggal.push([i, false]);
        }
        
    }
}

function setTanggal2(tanggal, bulan) {
    const tahun = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear();
    const jmlhHari = daysInMonth((bulan + 1), tahun);
    const hari = new Date(tahun, bulan, 1).getDay();
    for (let i = 0; i < hari; i++) {
        tanggal.push([-7+i, false]);
    }
    for (let i = 1; i <= jmlhHari; i++) {
        if (i <= (30 - (daysInMonth((bulan), tahun) - new Date().getDate()))) {
            tanggal.push([i, true]);
        } else {
            tanggal.push([i, false]);
        }
        
    }
}

function CalendarUbah(props) {
    const tanggal1 = [];
    const tanggal2 = [];
    setTanggal(tanggal1, new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth());
    setTanggal2(tanggal2, (new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth() + 1))

    return (
        <div data-testid="CalendarUbah" className="container">
            <h3 className="text-start mb-4">Pilih tanggal reservasi</h3>
            <div className="row justify-content-center gap-4">
                <CalendarSatuanUbah month={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()} year={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear()} tanggal={tanggal1} ubahTanggal={props.ubahTanggal} />
                <CalendarSatuanUbah month={new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear(), (new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth() + 1)).getMonth()} year={new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getFullYear(), (new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth() + 1)).getFullYear()} tanggal={tanggal2} ubahTanggal={props.ubahTanggal} />
            </div>
            <hr className="m-0" />
        </div>
    );
}

export default CalendarUbah;