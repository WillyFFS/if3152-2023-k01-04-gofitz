import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";
import {  Form,  Image } from 'react-bootstrap';
import Footer from "./Footer";
const supabaseUrl = "https://rrdwyabynnlseyxhwqqx.supabase.co"


const supabase = createClient(supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHd5YWJ5bm5sc2V5eGh3cXF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMzY4NSwiZXhwIjoyMDE1Njk5Njg1fQ.0Zr2CpFSv0oKVj_0YE5OuNsIkgykZEJdH6I7aVhVJgA")



const AddLapangan = () => {
  const [lapangan1, setLapangan1] = useState({
    tipe: '', bola: '', size: '', weekend: '', weekday: '', image: '', nomor: ''
  })
  const [image, setImage] = useState("");

 
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const handleChange2 = (event) => {
    setSelectedFile(event.target.files[0]);
  
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (lapangan1.tipe==0, lapangan1.bola==0||lapangan1.size==0 ||lapangan1.weekend== 0 ||lapangan1.weekday==0 || selectedFile==null||lapangan1.nomor== 0){
      setError(true)

    }
    else{
      if (selectedFile) {
        try {
          // Upload the file to Supabase storage
          const { data, error } = await supabase
            .storage
            .from('Lapangan gambar')
            .upload(`images/${selectedFile.name}`, selectedFile);
  
          if (error) {
            console.error('Error uploading image:', error.message);
            createLapangan()
            navigate(-1)
          } else {
            console.log('Image uploaded successfully:', data);
            createLapangan()
            navigate(-1)
          }
        } catch (error) {
          console.error('Error uploading image:', error.message);

        }
      } else {
        // Handle the case where no file is selected
        console.warn('No file selected for upload');
      }
    }
    // Check if a file is selected
   
  };




  function handleChange(event) {

    setLapangan1(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }



  async function createLapangan() {


    try {
      const { data, error } = await supabase
        .from('lapangan')
        .insert({ namaLapangan: lapangan1.tipe, countBola: lapangan1.bola, sizeLapangan: lapangan1.size, priceLapanganWeekend: lapangan1.weekend, priceLapanganWeekday: lapangan1.weekday, imageSrc: 'https://rrdwyabynnlseyxhwqqx.supabase.co/storage/v1/object/public/Lapangan%20gambar/images/' + selectedFile.name, nomorLapangan: lapangan1.nomor })

      if (error) {
        console.error('Supabase insert error:', error.message);

      } else {
        console.log('Data inserted successfully:', data);
        
      }
    } catch (error) {
      console.error('Error during Supabase insert:', error.message);
    }






  }

  async function save(e) {
    handleSubmit(e)

  }

  return (
    <>
    <Navbar />
    <div className="containter-fluid p-0">
      
      <h1 className="text-center mt-4">EDIT LAPANGAN</h1>
      <div className="container w-75 text-start mt-5 mb-4">
        <form onSubmit={save}>
          <div className="mb-3">
            <label className="form-label">Nomor Lapangan</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name="nomor"
                onChange={handleChange}
                placeholder="Nomor Lapangan"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Tipe Lapangan</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name="tipe"
                onChange={handleChange}
                placeholder="Tipe Lapangan"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Jumlah Bola</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name='bola'
                onChange={handleChange}
                placeholder="Jumlah Bola"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Size Lapangan</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name="size"
                onChange={handleChange}
                placeholder="Size Lapangan"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Harga Weekend</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name="weekend"
                onChange={handleChange}
                placeholder="Harga Weekend"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Harga Weekday</label>
            <div className="control">
              <input
                type="text"
                className="form-control"
                name="weekday"
                onChange={handleChange}
                placeholder="Harga Weekday"
              />
            </div>
          </div>
          <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
            <Form.Control type="file" accept="image/png, image/jpeg" onChange={handleChange2} />
          </Form.Group>

          {selectedFile && (
        <div>
          <strong></strong>
          <Image src={URL.createObjectURL(selectedFile)} alt="Selected" fluid />
        </div>
      )}
          {error?
               <label className="text-danger">Isi semua data</label>:""}
          <div className="mt-4 gap-2">
            <button onClick={() => navigate(-1)} className="btn me-3 btn-danger">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AddLapangan;