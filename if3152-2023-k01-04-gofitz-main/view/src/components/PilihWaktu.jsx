import React from "react";
import WaktuTersedia from "./WaktuTersedia";

// ini bkn database
// const ketersediaan = [{"7": false}, {"8": false}, {"9": false}, {"10": false}, {"11": false},
// {"12": false}, {"13": false}, {"14": false}, {"15": false}, {"16": false},
// {"17": false}, {"18": false}, {"19": false}, {"20": false}];



// reservasi udh id lapangan yg sama tanggal yg sama




function PilihWaktu(props) {
    return (
        <div data-testid="PilihWaktu" className="row m-0 collapse" id={"deskripsi-" + props.lapangan}>
            <div className = "col-xl-8 col-12 offset-xl-4 border rounded overflow-hidden shadow-sm py-3">
                <div className="container text-center">
                    <div className="row g-3">
                        {props.waktuKosong.map(x => <WaktuTersedia key={x[0]} time={x[0]} isReserved={x[1]} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PilihWaktu;