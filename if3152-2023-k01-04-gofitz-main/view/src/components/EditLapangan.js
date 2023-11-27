


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";
import { Container, Form, Button, Row, Image, Card } from 'react-bootstrap';
import Footer from "./Footer";
const supabaseUrl = "https://rrdwyabynnlseyxhwqqx.supabase.co"


const supabase = createClient(supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHd5YWJ5bm5sc2V5eGh3cXF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMzY4NSwiZXhwIjoyMDE1Njk5Njg1fQ.0Zr2CpFSv0oKVj_0YE5OuNsIkgykZEJdH6I7aVhVJgA")



const EditLapangan = () => {
  const [lapangan1, setLapangan1] = useState({
    tipe: '', bola: '', size: '', weekend: '', weekday: '', image: '', nomor: ''
  })
  const [image, setImage] = useState("");
  const [lapangan, setLapangan] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  async function fetchLapangan(Id) {


    try {
      const { data, error } = await supabase
        .from('lapangan')
        .select()


      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setLapangan(data)
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);

    }




  }

  useEffect(() => {
    fetchLapangan(id);

  }, [])


  console.log(useParams())

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange2 = (event) => {
    setSelectedFile(event.target.files[0]);

    console.log(image.name)
  };
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (lapangan1.tipe==0, lapangan1.bola==0||lapangan1.size==0 ||lapangan1.weekend== 0 ||lapangan1.weekday==0 || selectedFile==null||lapangan1.nomor== 0){
      setError(true)
      console.log("asdasdasdads")
      console.log(lapangan1)
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

  async function displayUser(Id) {

    const data = await lapangan.map((x) => {

      if (x.id == Id) {
        setLapangan1({ tipe: x.namaLapangan, bola: x.countBola, size: x.sizeLapangan, weekday: x.priceLapanganWeekday, weekend: x.priceLapanganWeekend, image: x.imageSrc, nomor: x.nomorLapangan })
        const fetchImage = async (url) => {
    
          try {
            const response = await fetch(url);
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const stringArray = x.imageSrc.split('/');

            // Mengambil elemen terakhir dari array
            const lastElement = stringArray[stringArray.length - 1];
            const blob = await response.blob();
            const file = new File([blob], lastElement, { type: 'image/jpeg' });
            setSelectedFile(file);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
        fetchImage(x.imageSrc)
      }

      





    })

  }


  async function createLapangan() {
    try {
      const { data, error } = await supabase
        .from('lapangan')
        .update({ namaLapangan: lapangan1.tipe, countBola: lapangan1.bola, sizeLapangan: lapangan1.size, priceLapanganWeekend: lapangan1.weekend, priceLapanganWeekday: lapangan1.weekday, imageSrc: 'https://rrdwyabynnlseyxhwqqx.supabase.co/storage/v1/object/public/Lapangan%20gambar/images/' + selectedFile.name, nomorLapangan: lapangan1.nomor })
        .eq('id', id)
      console.log("asd", id, lapangan1)
      if (error) {
        console.error('Supabase insert error:', error.message);

      } else {
        console.log('Data inserted successfully:', data);


      }
    } catch (error) {
      console.error('Error during Supabase insert:', error.message);
    }
    console.log("asd", id, lapangan1)






  }

  async function save(e) {
    createLapangan()
    handleSubmit(e)


  }


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    displayUser(id)

    console.log(selectedFile)
  };
  return (
    <>
    <Navbar />
    <div className="containter-fluid p-0">
      <h1 className="text-center mt-4">EDIT LAPANGAN</h1>
      <div className="container w-75 text-start mt-5 mb-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                  defaultValue={lapangan1.nomor}
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
                  defaultValue={lapangan1.tipe}
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
                  placeholder="Jumlah bola"
                  defaultValue={lapangan1.bola}
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
                  defaultValue={lapangan1.size}
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
                  defaultValue={lapangan1.weekend}
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
                  placeholder="Jumlah bola"
                  defaultValue={lapangan1.weekday}
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
            <Card.Img variant="top" src={image.src} />
            <Form.Check
              type="checkbox"
              label="Ambil data lapangan sebelumnya"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
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

        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EditLapangan;