import React from "react";
import PilihLapangan from "../components/PilihLapangan";
import Navbar from "../components/Navbar";
import KonfirmasiReservasi from "../components/KonfirmasiReservasi";
import Footer from "../components/Footer";
import Calendar from "../components/Calendar";
import database from "../models/database";
import CardPlaceholder from "../components/CardPlaceholder";
import { useLocation } from "react-router-dom";

function Ketersediaan(props) {
  const [lapangan, setLapangan] = React.useState([]);
  const [tanggal, setTanggal] = React.useState(props.kondisi !== "onSite" ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000) : new Date());
  const [harga, setHarga] = React.useState(" -");
  const [hargaTotal, setHargaTotal] = React.useState("-");
  const [reservasi, setReservasi] = React.useState("Pilih lapangan");
  const [jam, setJam] = React.useState(1);
  const [ketersediaan, setKetersediaan] = React.useState([]);
  const [waktuKosong, setWaktuKosong] = React.useState([]);
  const [time, setTime] = React.useState({"mulai" : 7, "selesai" : 8});
  const [canPesan, setCanPesan] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  let {state} = useLocation();

  React.useEffect(() => { 
    // getLapangan();
    getAllKetersediaan(props.kondisi !== "onSite" ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000) : new Date(), props.kondisi !== "onSite" ? new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    // isReserved(ketersediaan, waktuKosong, lapangan);
    // if (lapangan.length !== 0) {
    //   for (let i; i < lapangan.length; i++) {
    //     setWaktuKosong(waktuKosong.push([[7, false], [8, false], [9, false], [10, false], [11, false],
    //       [12, false], [13, false], [14, false], [15, false], [16, false],
    //       [17, false], [18, false], [19, false], [20, false]]));
    //   }
    // }
  }, []);

  async function getAllKetersediaan(awal, dua){
    setIsLoading(true);
    let data = await database.getAllLapangan();
    setLapangan(data);
    let output = await database.getKetersediaan({date: awal, dateTomorrow: dua});
    setKetersediaan(output);
    // if (ketersediaan !== []) {
    // if (lapangan.length != 0)
    // setWaktuKosong(isReserved(output, data));
    // let array = []
    let array = (ubahWaktuKosong(data.length));
    
      
      // array[0][1][1] = true;
      
    for (let i = 0; i < output.length; i++) {
    let index = output[i].lapanganId;
      for (let j=0; j < data.length; j++) {
        if (data[j].nomorLapangan === index) {
          index = j;
          break;
        }
      }
      
      let start = new Date(output[i].scheduleBookingStart).getHours();
      let end = new Date(output[i].scheduleBookingEnd).getHours();
      for (let j = start; j < end; j++) {
          array[index][j-7][1] = true;
          // array[0][1][1] = true;
          // console.log("tes");
      }
    }
    
    // console.log(output);
    if (props.kondisi === "ubahReservasi") {
      let index2 = state.idLapangan;
      for (let i = 0; i < data.length; i++) {
        if (data[i].nomorLapangan === index2) {
          index2 = i;
          break;
        }
      }
      for (let i = new Date(state.scheduleBookingStart).getHours(); i < new Date(state.scheduleBookingEnd).getHours(); i++) {
        array[index2][i-7][1] = false;
      }
    }
    checkKetersediaan(reservasi, time, array, data, setCanPesan);
    // }

    setWaktuKosong(array);
    setIsLoading(false);
    
    // setWaktuKosong(isReserved(ketersediaan, lapangan));
    // setWaktuKosong("uhu")
    // setWaktuKosong(output.length);
    // console.log(lapangan.length)
    // }
    
  } 

  function ubahWaktuKosong(num) {
    let array =[]
    for (let i = 0; i < num; i++) {
      array.push([[7, false], [8, false], [9, false], [10, false], [11, false],
        [12, false], [13, false], [14, false], [15, false], [16, false],
        [17, false], [18, false], [19, false], [20, false]])
    }
    return array;
  }

  function isReserved(ketersediaan, lapangan) {
    // let array = (ubahWaktuKosong(lapangan.length));
    // for (let i = 0; i < ketersediaan.length; i++) {
    //     let index = ketersediaan[i].lapanganId;
    //     for (let j=0; j < lapangan.length; j++) {
    //       if (lapangan[j].nomorLapangan === index) {
    //         index = j;
    //       }
    //     }
    //     let start = new Date(ketersediaan[i].scheduleBookingStart).getHours();
    //     let end = new Date(ketersediaan[i].scheduleBookingEnd).getHours();
    //     for (let j = parseInt(start); j < parseInt(end); j++) {
    //         array[index][j-7][1] = true;
    //     }
    // }
    return(ketersediaan.length + lapangan.length);

    // return ketersediaan;
    // return [[7, false], [8, false], [9, false], [10, false], [11, false],
    // [12, false], [13, false], [14, false], [15, false], [16, false],
    // [17, false], [18, false], [19, false], [20, false]];
}
  
  // console.log(waktuKosong);
  // console.log(ketersediaan);
  // console.log(lapangan);
  // console.log(waktuKosong)

  function checkKetersediaan(reservasi, time, waktuKosong, lapangan, setCanPesan) {
    if (reservasi !== "Pilih lapangan") {
      let check = true;
      let index;
      for (let i = 0; i < lapangan.length; i++) {
        if(lapangan[i].nomorLapangan === parseInt(reservasi.split(" ")[1])) {
          index = i;
          break;
        }
      }
      for (let i = time.mulai - 7; i < time.selesai-7 ;i++) {
        if (waktuKosong[index][i][1]) {
          check = false;
        }
      }
      if (check) {
        setCanPesan(true);
      } else {
        setCanPesan(false);
      }
      // console.log()
    }
  }

  return (
    <div data-testid="Ketersediaan" >
      <Navbar />
      <div className="container w-75">
        <div className="row">
          <div className="col-lg-8 col-12 d-flex flex-column gap-4 mt-4">
            {props.kondisi !== "onSite" ? <Calendar ubahTanggal={setTanggal} ubahHarga={setHarga} ubahHargaTotal={setHargaTotal} reservasi={reservasi} jam={jam} lapangan={lapangan} ketersediaan={ketersediaan} waktuKosong={waktuKosong} getKetersediaan={getAllKetersediaan} setWaktuKosong={setWaktuKosong} ubahWaktuKosong={ubahWaktuKosong} isReserved={isReserved} time={time} setCanPesan={setCanPesan} checkKetersediaan={checkKetersediaan} /> : <></>}
            <h3 className="text-start m-0">Cek ketersediaan lapangan</h3>
            {waktuKosong.length !== 0 ? (isLoading ? <CardPlaceholder/> : lapangan.map((x,index) => <PilihLapangan key={x.id} lapangan={x} waktuKosong={waktuKosong[index]} />)) : <CardPlaceholder/>}
            {/* {lapangan.map(daftarLapangan)} */}
          </div>
          <div className="col-4">
            <KonfirmasiReservasi kondisi={props.kondisi} state={state} lapangan={lapangan} pilihTanggal={tanggal} harga={harga} ubahHarga={setHarga} hargaTotal={hargaTotal} ubahHargaTotal={setHargaTotal} reservasi={reservasi} ubahReservasi={setReservasi} jam={jam} ubahJam={setJam} waktuKosong={waktuKosong} time={time} setTime={setTime} setCanPesan={setCanPesan} checkKetersediaan={checkKetersediaan} canPesan={canPesan} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ketersediaan;