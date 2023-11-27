
import { Container, Row, Col, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const MonthDropdown = () => {
  const supabaseUrl = "https://rrdwyabynnlseyxhwqqx.supabase.co"


  const supabase = createClient(supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHd5YWJ5bm5sc2V5eGh3cXF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMzY4NSwiZXhwIjoyMDE1Njk5Njg1fQ.0Zr2CpFSv0oKVj_0YE5OuNsIkgykZEJdH6I7aVhVJgA")

  const [bulan, setBulan] = useState('1'); // Bulan default

  const handleBulanChange = (event) => {
    setBulan(event.target.value);
    // Lakukan sesuatu dengan bulan yang dipilih, misalnya, muat data dari API
    fetchData(event.target.value);
  };

  const fetchData = (selectedBulan) => {
    // Lakukan logika pemanggilan data dari API berdasarkan bulan yang dipilih
    console.log(`Mengambil data untuk Bulan: ${selectedBulan}`);
    // Anda dapat menyesuaikan logika ini sesuai dengan kebutuhan Anda
  };

  const [userOrders, setLapanganReservasis] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: reservasiData, error: reservasiError } = await supabase
          .from("reservasi")
          .select(
            "id, namaPemesan, lapanganId, scheduleBookingStart, scheduleBookingEnd, totalHarga, ssPayment"
          );
  
        if (reservasiError) {
          throw reservasiError;
        }
  
        const lapanganIds = reservasiData.map((item) => item.lapanganId);
  
        const { data: lapanganData, error: lapanganError } = await supabase
          .from("lapangan")
          .select("nomorLapangan, imageSrc, namaLapangan")
          .in("id", lapanganIds);
  
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
        return combinedData;
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    }
  
    fetchData();

  }); // Fetch data when the component mounts

  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Form>
            <Form.Group controlId="selectBulan">
              <Form.Control as="select" value={bulan} onChange={handleBulanChange} style={{ backgroundColor: '#198754', color: '#fff' }}>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MonthDropdown;
