import React, { useEffect } from "react";
import ListReservasi from "../components/ListReservasi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Calendar from "../components/CalendarUbah";
import database from "../models/database"


function ReservasiOngoing(){
    // async function loopingReservasi (){
    //     let date = Date.now();
    //     // let detail = {
    //     //     "id": 1,
    //     //     "date": date
    //     // };
    //     // const data = await database.getReservasi(detail);
    //     // console.log(data);
    //     // // data.map((el) => <ListReservasi reservasi = {el} />);
    // }  
    // let lapanganAwal = "Lapangan";     
    const [nama, setNama] = React.useState({nama:""});
    const [tanggal, setTanggal] = React.useState("Pilih Tanggal Reservasi");
    const [lapangan, setLapangan] = React.useState("Pilih lapangan");
    const [listLapangan , setListLapangan ] = React.useState([]);
    const [ListReservasiDb, setListReservasi] = React.useState([]);
    const [dateData,setDate] = React.useState(new Date(new Date().getTime() + 24*3600*1000))
    let list = ListReservasiDb;
    // const [input, setInput] = React.useState({
    //     "nama": "",
    //     "tanggal":"Pilih Tanggal Reservasi" ,
    //     "lapangan": "Lapangan"
    // });


    useEffect (()=>{
        getDataListLapangan();
        fetchData();
    }, []);

    async function getDatareservasibyDate(){
        let data = await database.getReservasibyTanggal(new Date(tanggal));
        setListReservasi(data);
    }

    async function getDataListLapangan(){
        let data = await database.getNomorLapangan();
        setListLapangan(data);
    }    

    async function getDataListReservasiAwal(){
        let data = await database.getAllReservasi();
        setListReservasi(data);
    }

    async function fetchData() {
        try {
            let a= dateData.getFullYear()+"-"+(dateData.getMonth()+1)+"-"+dateData.getDate()+"T00:00:00";
            const { data: reservasiData, error: reservasiError } = await database.supabase
            .from("reservasi")
            .select(
              "id, namaPemesan, lapanganId, scheduleBookingStart, scheduleBookingEnd, totalHarga, ssPayment"
            )
            .gte("scheduleBookingStart",a)
            .order("scheduleBookingStart");
    
          if (reservasiError) {
            throw reservasiError;
          }
    
          const lapanganIds = reservasiData.map((item) => item.lapanganId);
    
          const { data: lapanganData, error: lapanganError } = await database.supabase
            .from("lapangan")
            .select("nomorLapangan, imageSrc, namaLapangan")
            .in("nomorLapangan", lapanganIds);

    
          if (lapanganError) {
            throw lapanganError;
          }

    
          const combinedData = reservasiData.map((reservasiItem) => {
            const matchingLapangan = lapanganData.find(
              (lapanganItem) => lapanganItem.nomorLapangan === reservasiItem.lapanganId
            );
    
            return {
              ...reservasiItem,
              lapangan: matchingLapangan,
            };
          });
    
          console.log(combinedData);
          const mappedArray = combinedData?.map((x) => ({
            id: x.id,
            namaPemesan: x.namaPemesan,
            nomorLapangan: x.lapangan?.nomorLapangan,
            scheduleBookingStart: x.scheduleBookingStart,
            scheduleBookingEnd: x.scheduleBookingEnd,
            totalHarga: x.totalHarga,
            ssPayment: x.ssPayment,
            imageSrc: x.lapangan?.imageSrc,
          }));
          console.log(mappedArray);
          setListReservasi( mappedArray);
        } catch (error) {
          console.log("Error fetching data:", error.message);
        }
      }


    function clickLapangan(event) {
        setLapangan(event.target.innerHTML);
        // setLapangan(prevFormData=>{
        //     return{
        //       ...prevFormData,
        //       [event.target.name]:event.target.value
        //     }
        //   });
        // getDataListReservasi(input);
        console.log(lapangan);
    }

    function ubahNama(event) {
        // setNama(event.target.innerHTML);
        setNama(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
        });
        // getDataListReservasi(input);
    }

    function settanggalHandler(){

    }


    return(
        <>
            <Navbar />
            <div  data-testid="ReservasiOngoing" className="container w-75" style={{minHeight:"78vh"}}>
                <div className="container shadow border rounded my-3 px-3 pt-3 pb-2">
                    <div className="container mb-3">
                        <div className="row justify-content-between">
                            <div className="col-6 p-1 border rounded text-start d-flex align-items-center">
                                <FontAwesomeIcon className="text-secondary mx-3" icon={faMagnifyingGlass} />
                                <input onChange={ubahNama}  className="border-0 d-block w-100" type="word" name="nama" placeholder="Nama" style={{outline:"none"}} />                        
                            </div>
                            <div className="col-5">
                                <button className="px-3 style-dropdown text-start btn w-100 border rounded" type="button" data-bs-toggle="dropdown" >
                                    <div className="m-0 p-0 d-flex justify-content-between align-items-center">
                                        <p className="m-0">{lapangan}</p>
                                        <FontAwesomeIcon className="icon-size" icon={faChevronDown} />
                                    </div>
                                </button>
                                <ul className="dropdown-menu">
                                    {/* {listLapangan.length === 0 ? <li></li> : listLapangan.map((x)=>
                                            <li><button onClick={clickLapangan} className="remove-button dropdown-item">Lapangan {x.nomorLapangan}</button></li>
                                    )} */}
                                    {listLapangan.map((x)=>
                                            <li><button onClick={clickLapangan} className="remove-button dropdown-item">Lapangan {x.nomorLapangan}</button></li>
                                    )}
                                    </ul>
                            </div>
                            {/* <div className="col-3 p-0">
                                <button className="text-start style-dropdown btn w-100 border rounded px-3" type="button" data-bs-toggle="dropdown" >
                                    <div className="m-0 p-0 d-flex align-items-center">
                                        <FontAwesomeIcon className="icon-size me-3" icon={faCalendar} />
                                        <p className="m-0">{tanggal === "Pilih Tanggal Reservasi" ? tanggal 
                                        : 
                                        (tanggal.toLocaleDateString('id', {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})
                                        )}</p>
                                    </div>
                                </button>
                                <ul className="dropdown-menu text-center p-4">
                                    <Calendar ubahTanggal={setTanggal} />
                                </ul>
                            </div> */}
                        </div>
                    </div>
                        {/* {list = ListReservasiDb}
                        {list.map((x)=>{
                            
                        })
                        } */}
                        {console.log(tanggal)}
                        {
                        ((lapangan === "Pilih lapangan" ) ? 
                        (ListReservasiDb
                        .filter((x)=>{
                            return (nama.nama === "" || nama.nama === " ") ? x : x.namaPemesan.includes(nama.nama);
                        }) ==0 ?
                            <p className="text-center">not found.</p>
                            :
                            ListReservasiDb
                            .filter((x)=>{
                                return (nama.nama === "" || nama.nama === " ") ? x : x.namaPemesan.includes(nama.nama);
                            }).map((x) => 
                                <ListReservasi id={x.id} imageSrc={x.imageSrc} lapangan= {x.nomorLapangan} harga = {x.totalHarga} nama ={x.namaPemesan} namaLapangan={x.namaLapangan} scheduleBookingStart={x.scheduleBookingStart} scheduleBookingEnd={x.scheduleBookingEnd}/> )) 
                        :
                        (ListReservasiDb
                        .filter((x)=> x.nomorLapangan === parseInt(lapangan.split(" ")[1]))
                        .filter((x)=>{
                            return (nama.nama === "" || nama.nama === " ") ? x : x.namaPemesan.includes(nama.nama);
                        }) == 0 ?
                        <p className="text-center">not found.</p>                          
                        :
                        ListReservasiDb
                        .filter((x)=> x.nomorLapangan === parseInt(lapangan.split(" ")[1]))
                        .filter((x)=>{
                            return (nama.nama === "" || nama.nama === " ") ? x : x.namaPemesan.includes(nama.nama);
                        }).map((x) => 
                        <ListReservasi id={x.id} imageSrc={x.imageSrc} lapangan= {x.nomorLapangan} harga = {x.totalHarga} nama ={x.namaPemesan} namaLapangan={x.namaLapangan} scheduleBookingStart={x.scheduleBookingStart} scheduleBookingEnd={x.scheduleBookingEnd}/> ) ))
                        }


                        {/* {ListReservasiDb
                        .filter((x)=>{
                            return (nama.nama === "" || nama.nama === " ") ? x : x.namaPemesan.includes(nama.nama);
                        })
                        .map((x) => 
                        <ListReservasi id={x.id} imageSrc={x.imageSrc} lapangan= {x.nomorLapangan} harga = {x.totalHarga} nama ={x.namaPemesan} namaLapangan={x.namaLapangan} scheduleBookingStart={x.scheduleBookingStart} scheduleBookingEnd={x.scheduleBookingEnd}/> )} */}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ReservasiOngoing;


// .filter((x)=>{
//     return  lapangan === lapanganAwal ? x : ( x.nomorLapangan ==