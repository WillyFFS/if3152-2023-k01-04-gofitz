import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import background from "../assets/background-home.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faClock, faUserShield } from "@fortawesome/free-solid-svg-icons";
import parking from "../assets/parking.jpg"
import foodCourt from "../assets/food-court.jpg"
import lockerRoom from "../assets/locker-room.jpg"


function Home() {
    return(
        <>
            <Navbar />
            <div  data-testid="Home" className="container-fluid d-flex flex-column justify-content-center align-items-center p-0">
                <div className="d-flex flex-column gap-4 justify-content-center align-items-center p-0 m-0 w-100" style={{backgroundColor: "#cccccc",backgroundPosition:"center",backgroundRepeat: "no-repeat", backgroundSize:"cover",height:"90vh", backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${background})` }}>
                    <h1 className="text-white w-50 text-center" style={{fontSize:"3rem"}}>Kemudahan Pemesanan, Sensasi Bermain yang Tak Terlupakan.</h1>
                    <Link reloadDocument to="ketersediaan">
                        <button className="px-3 btn btn-success rounded-pill btn-lg">Pesan sekarang!</button>
                    </Link>
                </div>
                <div className="mt-4 border-bottom d-flex flex-column flex-md-row justify-content-around align-items-start p-0 py-5" style={{minHeight:"40vh", gap:"75px", width:"85vw"}}>
                    <div>
                        <FontAwesomeIcon className="me-2" icon={faTruckFast} /><h5 className="d-inline"><b>Mudah dan Cepat</b></h5>
                        <p className="text-secondary mt-2" style={{textAlign:"justify"}}>
                            Nikmati kemudahan dalam memesan lapangan futsal favorit Anda hanya dalam beberapa klik. Proses cepat dan intuitif untuk memastikan waktu bermain Anda lebih banyak daripada waktu mengurus pemesanan.
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="me-2" icon={faClock} /><h5 className="d-inline"><b>Jadwal Real-time</b></h5>
                        <p className="text-secondary mt-2" style={{textAlign:"justify"}}>
                            Pantau ketersediaan lapangan secara real-time. Dengan pembaruan jadwal yang langsung terintegrasi pada lapangan on-site, Anda dapat memilih waktu yang paling sesuai untuk tim Anda tanpa perlu konfirmasi tambahan.
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="me-2" icon={faUserShield} /><h5 className="d-inline"><b>Sistem Pembayaran Aman</b></h5>
                        <p className="text-secondary mt-2" style={{textAlign:"justify"}}>
                            Pembayaran online yang aman dan nyaman. Gunakan berbagai opsi pembayaran untuk menyesuaikan dengan preferensi Anda, sehingga Anda dapat fokus pada permainan tanpa khawatir tentang pembayaran.
                        </p>
                    </div>
                </div>
                <div className="w-75 my-5">
                    <h1 className="text-center"><b>Fasilitas Terlengkap untuk Serunya Bermain Futsal</b></h1>
                    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center p-0 py-5 gap-4">
                        <div>
                            <img src={lockerRoom} alt="locker room" style={{borderRadius:"15px",width:"275px", height:"275px", objectFit:"cover"}} />
                            <p className="text-center m-0 p-0 mt-1" style={{fontSize:"0.9rem"}}><b>Ruang Ganti</b></p>
                        </div>
                        <div>
                            <img src={parking} alt="parking" style={{borderRadius:"15px",width:"275px", height:"275px", objectFit:"cover"}} />
                            <p className="text-center m-0 p-0 mt-1" style={{fontSize:"0.9rem"}}><b>Tempat Parkir</b></p>
                        </div>
                        <div>
                            <img src={foodCourt} alt="food court" style={{borderRadius:"15px",width:"275px", height:"275px", objectFit:"cover"}} />
                            <p className="text-center m-0 p-0 mt-1" style={{fontSize:"0.9rem"}}><b>Food Court</b></p>
                        </div>
                    </div>
                    <h4 className="text-secondary px-5 text-center" style={{fontWeight:"normal"}}>Fokus pada permainan Anda tanpa khawatir tentang kenyamanan dan kebersihan. Lapangan-lapangan kami secara rutin dipelihara dan dibersihkan untuk lingkungan bermain yang aman dan menyenangkan</h4>
                </div>
            </div>

            <Footer />
        </>
    )
};

export default Home;