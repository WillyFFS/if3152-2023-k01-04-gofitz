import React, { useEffect , useState} from "react";
import database from "../models/database"

export default  function DetailPesanan(props) {
    const [dataLapangan, setdata] = useState([]);
    
    useEffect(()=>{
        getData();
    }, []);

    async function getData(){
        let data =  await database.getDataLapangan(props.lapangan);
        setdata(data);
    }
    return (
        <>
            <div data-testid="DetailPesanan" className="container-fluid container-lg sticky-top pt-4">
                <div className="border p-4" style={{borderRadius:"15px"}}>
                    <div className="d-flex gap-2">
                            {dataLapangan.map((x)=> 
                            <div>
                                <img src={x.imageSrc} alt="lapangan" style={{width:"120px", height:"100px", objectFit:"cover", border:"1px solid transparent", borderRadius:"10px"}} />  
                                <div className="d-flex flex-column text-start justify-content-between">
                                    <div>
                                        <span className="badge bg-success">Lapangan {x.nomorLapangan}</span>
                                        <p className="m-0">{x.namaLapangan}</p>
                                    </div>
                                    <p className="m-0">{x.countBola} bola</p>
                                </div> 
                            </div>
                        )} 
                    </div>
                    <hr/>
                    <div className="text-start mb-3">
                        <h4>Price details</h4>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="m-0">Rp{props.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p className="m-0">{props.durasi} jam</p>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <p className="m-0"><b>Total</b></p>
                        <p className="m-0"><b>Rp{props.totalHarga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></p>
                    </div>
                </div>
            </div>
        </>
    );
}