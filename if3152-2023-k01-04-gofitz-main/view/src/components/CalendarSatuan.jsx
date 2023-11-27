import React from "react";
import Tanggal from "./Tanggal";

function CalendarSatuan(props) {
    return (
        <div data-testid="CalenderSatuan" className="w-calendar col-6">
            <p className="text-center text-bg-success rounded-pill">
                <b>{new Date(props.year, props.month).toLocaleDateString('id', {year: 'numeric',month: 'long'})}</b>
            </p>
            <div className= "row row-cols-1">
                <p className="m-0 tanggal size-hari">Su</p>
                <p className="m-0 tanggal size-hari">Mo</p>
                <p className="m-0 tanggal size-hari">Tu</p>
                <p className="m-0 tanggal size-hari">We</p>
                <p className="m-0 tanggal size-hari">Th</p>
                <p className="m-0 tanggal size-hari">Fr</p>
                <p className="m-0 tanggal size-hari">Sa</p>
            </div>
            <div className="row row-cols-auto">
                {props.tanggal.map(x => <Tanggal key={x[0]} month={props.month} year={props.year} status={x} ubahTanggal={props.ubahTanggal} ubahHarga={props.ubahHarga} ubahHargaTotal={props.ubahHargaTotal} reservasi={props.reservasi} jam={props.jam} lapangan={props.lapangan} ketersediaan={props.ketersediaan} waktuKosong={props.waktuKosong} getKetersediaan={props.getKetersediaan} setWaktuKosong={props.setWaktuKosong} ubahWaktuKosong={props.ubahWaktuKosong} isReserved={props.isReserved} time={props.time} setCanPesan={props.setCanPesan} checkKetersediaan={props.checkKetersediaan} />)}
            </div>
        </div>
    );
}

export default CalendarSatuan;