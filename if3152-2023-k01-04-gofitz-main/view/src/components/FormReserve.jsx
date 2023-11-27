import React from "react";
import database from "../models/database";
import {Form, Card, Image} from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function FormReserve(props){
    const navigate = useNavigate();

    const[reservasi, setReservasi] = React.useState(
        { namaPemesan: "", lapanganId: props.lapangan, scheduleBookingStart: props.scheduleBookingStart, scheduleBookingEnd: props.scheduleBookingEnd, totalHarga: props.totalHarga, ssPayment: ""
    });
    const [image, setImage] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [error2, setError2] = React.useState(false);

    const handleChange2 = (event) => {
      setSelectedFile(event.target.files[0]);
      
    };

    function handlerChange(event){
          setReservasi(prevFormData=>{
            return{
              ...prevFormData,
              [event.target.name]:event.target.value
            }
          })
    }

    // function handlerSubmit(event){
    //     event.preventDefault();
    //     console.log("submit masuk");
    //     createReservasi();
    // }

    async function createReservasi(){
        let dummy = reservasi;
        if(props.online){
        dummy.ssPayment =  "https://rrdwyabynnlseyxhwqqx.supabase.co/storage/v1/object/public/SSpayment/images/"+ selectedFile.name;}
        await database.createReservasi(dummy);
    }

    async function cekUsername(){
      console.log(reservasi.namaPemesan);
      let data = await database.getusername( reservasi.namaPemesan);
      return data;
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();
        let a  = await cekUsername();
        console.log(a);
        if(reservasi.namaPemesan === "" ){
          setError(true);
        }
        else if(a ==  0){
          setError2(true);
        }
        else{
          if(! props.online){
              createReservasi();
              navigate("/");
          }
          else{
           // Check if a file is selected
            if (selectedFile) {
              console.log(selectedFile);
              try {
                // Upload the file to Supabase storage
                const { data, error } = await database.supabase
                .storage
                .from('SSpayment')
                .upload(`images/${selectedFile.name}`, selectedFile);
                reservasi.ssPayment =  selectedFile.name;
                createReservasi();
                navigate("/");
                if (error) {
                  console.error('Error uploading image:', error.message);
                } else {
                  console.log('Image uploaded successfully:', data);
                }
              } catch (error) {
                console.log("gagal ke bucket");
                console.error('Error uploading image:', error.message);
              }
            } else {
              // Handle the case where no file is selected
              console.warn('No file selected for upload');
              setError(true);
            };
          }
        }
    
        
        
      };

    function File(props){
        
        if (props === true){
            return (
                <div className="col-12">
                <Form.Group className="mb-3" style={{maxWidth: "500px"}}>
                    <p><b>Masukkan Bukti Pembayaran</b></p>
                    <Form.Control type="file" accept="image/png, image/jpeg" onChange={handleChange2}/>
                </Form.Group>
                {selectedFile && (
        <div>
          <strong></strong>
          <Image src={URL.createObjectURL(selectedFile)} alt="Selected" fluid />
        </div>
      )}

                </div>
              );
        }
        else{
            return(
                <></>
            );
        }
    }


    let d = reservasi.scheduleBookingStart.toTimeString().split(" ")[0]+"-"+reservasi.scheduleBookingEnd.toTimeString().split(" ")[0];

    return(
        <div data-testid="FormReserve" className="container-fluid px-5 px-lg-2 mt-4 mx-0 text-start">
            <hr className="d-none d-lg-block" />
            <h4 className="mb-3">Pesananmu</h4>
            <div className="d-flex justify-content-between">
                <p><b>Tanggal</b></p>
                <p>{reservasi.scheduleBookingStart.toLocaleDateString('id', {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="mb-0"><b>Jam</b></p>
                <p className="mb-0">{d}</p>
            </div>
            <hr/>
            <h4 className="mb-3">Masukkan data diri</h4>
            <form onSubmit={handlerSubmit}>
                <div className="form-floating mb-3" >
                    <input type="text" className="form-control rounded-3" id="nama" name="namaPemesan" placeholder="Nama"  onChange={handlerChange} />
                    <label htmlFor="nama" >Nama</label>
                </div>
                {error2 ?<div>
               <label className="text-danger">Isi sesuai username </label></div>:""}
                {File(props.online)}
                <small className="text-body-secondary">By clicking Pesan, you agree to the terms of use.</small>
                {error ?<div>
               <label className="text-danger">Isi semua data </label></div>:""}
                <button className="w-100 mt-3 btn btn-lg rounded-3 btn-success" type="submit" >Pesan</button>
            </form>
        </div>
    );
}

export default FormReserve;