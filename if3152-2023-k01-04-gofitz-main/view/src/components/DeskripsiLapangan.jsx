import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faMoneyBillWave, faArrowDown, faArrowUp, faRulerCombined } from "@fortawesome/free-solid-svg-icons";

function toRupiah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return num;
}

function DeskripsiLapangan(props) {
    const [arrow, toggleArrow] = React.useState(faArrowDown);

    function setArrow(event) {
        if (event.target.className === "btn btn-outline-success rounded-pill w-75 align-self-center align-self-xl-start mt-3 mt-xl-0") {
            toggleArrow(faArrowUp);
        } else {
            toggleArrow(faArrowDown);
        }
    }
    
    return (
        <div data-testid="DeskripsiLapangan" className="row mb-0">
            <div className="col-md-12">
                <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                    <div className="col-auto d-none d-xl-block">
                        <img src={props.image} alt="lapangan" className="bd-placeholder-img image" /> 
                    </div>
                    <div className="col p-4 d-flex flex-column position-static text-start">
                        <strong className="d-inline-block mb-2 text-primary-emphasis"><span className="badge bg-success">Lapangan {props.nomorLapangan}</span></strong>
                        <h3 className="mb-0">{props.jenisLapangan}</h3>
                        <div className="d-flex justify-content-between w-100">
                            <div className="mb-1 text-body-secondary">{<FontAwesomeIcon icon={faFutbol} />} {props.jumlahBola} <small className="text-body-secondary fw-light"> bola</small></div>
                            <div className="mb-1 text-body-secondary">{<FontAwesomeIcon icon={faRulerCombined} />} {props.luas} <small className="text-body-secondary fw-light"> meter</small></div>
                        </div>
                        <p className="card-text mb-auto">{<FontAwesomeIcon icon={faMoneyBillWave} />}<b> Weekday: {"Rp" + toRupiah(props.hargaWeekday)}</b><small className="text-body-secondary fw-light"> / jam</small></p>
                        <p className="card-text mb-auto">{<FontAwesomeIcon icon={faMoneyBillWave} />}<b> Weekend: {"Rp" + toRupiah(props.hargaWeekend)}</b><small className="text-body-secondary fw-light"> / jam</small></p>
                        <button onClick={setArrow} className="btn btn-outline-success rounded-pill w-75 align-self-center align-self-xl-start mt-3 mt-xl-0" type="button" data-bs-toggle="collapse" data-bs-target={"#deskripsi-" + props.nomorLapangan}>
                            Ketersediaan <FontAwesomeIcon icon={arrow} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DeskripsiLapangan;