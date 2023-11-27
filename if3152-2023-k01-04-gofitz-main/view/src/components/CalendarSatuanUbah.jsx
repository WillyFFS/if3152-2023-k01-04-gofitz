import React from "react";
import TanggalUbah from "./TanggalUbah";

function CalendarSatuanUbah(props) {
    return (
        <div data-testid="CalendarSatuanUbah" className="w-calendar col-6">
            <p className="text-bg-success rounded-pill">
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
                {props.tanggal.map(x => <TanggalUbah key={x[0]} month={props.month} year={props.year} status={x} ubahTanggal={props.ubahTanggal} />)}
            </div>
        </div>
    );
}

export default CalendarSatuanUbah;