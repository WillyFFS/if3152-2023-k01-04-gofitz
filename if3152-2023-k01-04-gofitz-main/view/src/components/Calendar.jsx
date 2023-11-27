import React from "react";
import "../styles/calendar.css";
import CalendarSatuan from "./CalendarSatuan";
//tes

function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
}

function setTanggal(now, tanggal, bulan) {
    console.log(bulan);
    const tahun = new Date(now.getTime() + 24 * 60 * 60 * 1000).getFullYear();
    const jmlhHari = daysInMonth((bulan), tahun);
    const hari = new Date(tahun, bulan, 1).getDay();
    for (let i = 0; i < hari; i++) {
        tanggal.push([-7+i, false]);
    }
    let count = 0;
    for (let i = 1; i <= jmlhHari; i++) {
        if (count < 30 && i >= new Date(now.getTime() + 24 * 60 * 60 * 1000).getDate()) {
            tanggal.push([i, true]);
            count++;
        } else {
            tanggal.push([i, false]);
        }
    }
}

function setTanggal2(now, tanggal, bulan) {
    console.log(bulan);
    let tahun = now.getFullYear();
    if (new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() === 11) {
        tahun = now.getFullYear() + 1;
    }
    console.log(tahun);
    const jmlhHari = daysInMonth((bulan), tahun);
    const hari = new Date(tahun, bulan, 1).getDay();
    for (let i = 0; i < hari; i++) {
        tanggal.push([-7+i, false]);
    }

    let jmlhHariSblm = daysInMonth(new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth(),new Date(now.getTime() + 24 * 60 * 60 * 1000).getFullYear());
    let sum = 0;
    let count = 0;
    for (let i = 1; i <= jmlhHariSblm; i++) {
        if (count < 30 && i >= new Date(now.getTime() + 24 * 60 * 60 * 1000).getDate()) {
            sum++;
        }
    }

    for (let i = 1; i <= jmlhHari; i++) {
        if (i <= (30-sum)) {
            tanggal.push([i, true]);
        } else {
            tanggal.push([i, false]);
        }
    }
}

function Calendar(props) {
    const now = new Date();
    const tanggal1 = [];
    const tanggal2 = [];
    setTanggal(now, tanggal1, new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth());
    setTanggal2(now, tanggal2, (new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() === 11 ? 0 : new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() + 1))

    return (
        <>
            <h3 data-testid="Calendar" className="text-start m-0">Pilih tanggal reservasi</h3>
            <div className="container">
                <div className="row justify-content-center gap-4">
                    <CalendarSatuan month={new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth()} year={new Date(now.getTime() + 24 * 60 * 60 * 1000).getFullYear()} tanggal={tanggal1} ubahTanggal={props.ubahTanggal} ubahHarga={props.ubahHarga} ubahHargaTotal={props.ubahHargaTotal} reservasi={props.reservasi} jam={props.jam} lapangan={props.lapangan} ketersediaan={props.ketersediaan} waktuKosong={props.waktuKosong} getKetersediaan={props.getKetersediaan} setWaktuKosong={props.setWaktuKosong} ubahWaktuKosong={props.ubahWaktuKosong} isReserved={props.isReserved} time={props.time} setCanPesan={props.setCanPesan} checkKetersediaan={props.checkKetersediaan} />
                    <CalendarSatuan month={new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() === 11 ? 0 : new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() + 1} year={new Date(now.getTime() + 24 * 60 * 60 * 1000).getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()} tanggal={tanggal2} ubahTanggal={props.ubahTanggal} ubahHarga={props.ubahHarga} ubahHargaTotal={props.ubahHargaTotal} reservasi={props.reservasi} jam={props.jam} lapangan={props.lapangan} ketersediaan={props.ketersediaan} waktuKosong={props.waktuKosong} getKetersediaan={props.getKetersediaan} setWaktuKosong={props.setWaktuKosong} ubahWaktuKosong={props.ubahWaktuKosong} isReserved={props.isReserved} time={props.time} setCanPesan={props.setCanPesan} checkKetersediaan={props.checkKetersediaan} />
                </div>
            </div>
            <hr className="m-0" />
        </>
    );
}

export default Calendar;