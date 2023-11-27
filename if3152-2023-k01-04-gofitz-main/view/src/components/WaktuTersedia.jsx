import React from "react";
import "../styles/waktuTersedia.css";

function toRangeJam(jam) {
    let first = "";
    let second = "";
    if (parseInt(jam) < 10) {
        first += "0";
    }
    first += (jam + ".00");
    if ((parseInt(jam) + 1) < 10) {
        second += "0";
    }
    second += (parseInt(jam) + 1) + ".00";
    
    return <div><div className="border-bottom">{first}</div><div>{second}</div></div>;
}

function WaktuTersedia(props) {
    return (
        <div data-testid="WaktuTersedia" className="col-3 p-0">
            <button className={props.isReserved ? "btn btn-danger btn-width disabled p-0" : "btn btn-success disabled btn-width p-0"} type="button">{toRangeJam(props.time)}</button>
        </div>
    );
}

export default WaktuTersedia;