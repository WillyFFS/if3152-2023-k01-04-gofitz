
import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { createClient } from '@supabase/supabase-js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import Footer from "../components/Footer";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function Cart() {
  const supabaseUrl = "https://rrdwyabynnlseyxhwqqx.supabase.co"


  const supabase = createClient(supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHd5YWJ5bm5sc2V5eGh3cXF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMzY4NSwiZXhwIjoyMDE1Njk5Njg1fQ.0Zr2CpFSv0oKVj_0YE5OuNsIkgykZEJdH6I7aVhVJgA")

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [monthlySales, setMonthlySales] = useState([]);
  const [diagramData, setDiagramData] = useState([]);
  const [monthlyPesanan, setMonthlyPesanan] = useState([]);
  const [bulan, setBulan] = useState('1'); 
  const [loading , setLoading] = useState(true);
  const fetchMonthlySales = async () => {
    try {
      const { data, error } = await supabase
        .from('reservasi')
        .select('scheduleBookingStart, totalHarga');

      if (error) {
        throw error;
      }


      const groupedData = data.reduce((acc, entry) => {
        const date = new Date(entry.scheduleBookingStart);
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = {
            bulan: month,
            tahun: year,
            total_harga_bulan: 0,
          };
        }

        acc[key].total_harga_bulan += entry.totalHarga;

        return acc;
      }, {});


      const resultArray = Object.values(groupedData);

      setMonthlySales(resultArray);
    } catch (error) {
      console.error('Error fetching monthly sales:', error.message);
    }
  };



  const handleBulanChange = (event) => {
    setBulan(event.target.value);


  };

  const updateMonthlySales = (tahun, data) => {
    const filteredData = data.filter((entry) => entry.tahun === tahun);

    // Initialize array with zeros for each month
    const monthlySalesArray = Array(12).fill(0);

    filteredData.forEach((entry) => {
      const { bulan, total_harga_bulan } = entry;
      monthlySalesArray[bulan - 1] = total_harga_bulan;
    });

    setDiagramData(monthlySalesArray);
  };
  //---------------
  const countOrdersPerMonth = async(tahun) => {

    const { data, error } = await supabase
    .from('reservasi')
    .select('scheduleBookingStart, totalHarga');
    const orderCounts = new Map();
if (orderCounts!=null){
    data.forEach((order) => {
      const timestampDate = new Date(order.scheduleBookingStart);
  
      if (timestampDate.getFullYear() === tahun) {
        const month = timestampDate.getMonth();
  
        orderCounts.set(month, (orderCounts.get(month) || 0) + 1);
      }
    });
  
    const orderCountsArray = Array.from({ length: 12 }, (_, index) => orderCounts.get(index) || 0);
    setLoading(false)
    setMonthlyPesanan(orderCountsArray)}
    
  };



  useEffect(() => {
    fetchMonthlySales()
    countOrdersPerMonth(2023)
  },[])
  useEffect(() => {
    updateMonthlySales(2023, monthlySales)
  
  },[monthlySales])
  
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: diagramData

    }]
  };

  const options = {
    plugins: {
      legend: true
    }
  };

  console.log(monthlySales, diagramData, monthlyPesanan)

  return (
    <>
    <Navbar />
    <div  data-testid="DashboardOwner" className='container mb-5'>
      
      <div class="container w-75 px-10 mt-5">
        <div class="row gx-20" >
          <div class="col">
            <div class="p-4 border rounded-3 bg-primary text-white text-start">
              <div class="row">
                <div class="col">
                  <div className='fw-light fs-6'>Total Pendapatan</div>
                  <div className='fw-bold fs-5'>{diagramData[bulan-1]}</div>
                </div>
                <div class="col-4 text-end">
                  {<FontAwesomeIcon icon={faMoneyBillWave} style={{ color: "#ffffff", }} size="2xl" />}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="p-4 border rounded-3 bg-danger text-white text-start">
              <div class="row">
                <div class="col">
                  <div className='fw-light fs-6'>Total Pesanan</div>
                  <div className='fw-bold fs-5'>{monthlyPesanan[bulan-1]}</div>
                </div>
                <div class="col text-end">
                  {<FontAwesomeIcon icon={faNewspaper} style={{ color: "#ffffff", }} size="2xl" />}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="text-white">
            <Container className="">
      <Row>
        <Col md={12}>
          <Form>
            <Form.Group controlId="selectBulan">
              <Form.Control as="select" value={bulan} onChange={handleBulanChange} style={{ backgroundColor: '#6c757d', color: '#fff' }}>
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
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-light w-75 mt-5 text-start text-primary fw-bold fs-6 px-4 py-4 rounded-4">
        Grafik Penjualan Tahunan

        <Line data={data} options={options}></Line>
      </div>

    </div>
    <Footer />
    </>
  );
}
export default Cart;