import React from "react";
import "../styles/tanggal.css";

function mouseOver(event) {
    event.target.classList.add("mouse-over");
}

function mouseOut(event) {
    event.target.classList.remove("mouse-over");
}

function TanggalUbah(props) {
    function setStyle(status) {
        let style = "";
        if (status[0] <= 0) {
            style = "btn-tanggal invisible";
        } else {
            if (status[1]) {
                if (status[0] === (new Date().getDate() + 1) && props.month === new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getMonth()) {
                    style = "btn-tanggal enabled mouse-click";
                } else {
                    style = "btn-tanggal enabled";
                }
            } else {
                style = "btn-tanggal tgl-disabled"
            }
        }
        return style;
    }

    async function gantiTanggal(event) {
        await props.getKetersediaan(new Date(props.year, props.month, props.status[0]), new Date(new Date(props.year, props.month, props.status[0]).getTime() + 24 * 60 * 60 * 1000));
        // props.isReserved(props.ketersediaan, props.waktuKosong, props.lapangan);
        props.ubahTanggal(new Date(props.year, props.month, event.target.innerText));
        let index;
        for (let i = 0; i < props.lapangan.length; i++) {
            if(props.lapangan[i].nomorLapangan === parseInt(props.reservasi.split(" ")[1])) {
              index = i;
              break;
            }
        }
        if (props.reservasi !== "Pilih lapangan") {
            if (((new Date(props.year, props.month, event.target.innerText)).getDay() === 0) || ((new Date(props.year, props.month, event.target.innerText)).getDay() === 6)) {
                props.ubahHarga(props.lapangan[index].priceLapanganWeekend);
                props.ubahHargaTotal(props.lapangan[index].priceLapanganWeekend * (props.jam));
            } else {
                props.ubahHarga(props.lapangan[index].priceLapanganWeekday);
                props.ubahHargaTotal(props.lapangan[index].priceLapanganWeekday * (props.jam));
            }
            // props.checkKetersediaan(props.reservasi, props.time, props.waktuKosong, props.lapangan, props.setCanPesan);
        }
        
        let button = document.getElementsByClassName("enabled");
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove("mouse-click");
        }
        event.target.classList.add("mouse-click");
        
        

    }
    return (
        <button data-testid="TanggalUbah" onClick={gantiTanggal} onMouseOver={mouseOver} onMouseOut={mouseOut} className={setStyle(props.status)} data-bs-toggle="button">{props.status[0]}</button>
    )
}

export default TanggalUbah;