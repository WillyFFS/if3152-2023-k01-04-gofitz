import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'
import Calendar from '../components/Calendar';
import CalendarSatuan from '../components/CalendarSatuan';
import DeskripsiLapangan from '../components/DeskripsiLapangan';
import DropdownItem from '../components/DropdownItem';
import Footer from '../components/Footer';
import FormReserve from '../components/FormReserve';
import KonfirmasiReservasi from '../components/KonfirmasiReservasi';
import ListReservasi from '../components/ListReservasi';
import Navbar from '../components/Navbar';
import PilihLapangan from '../components/PilihLapangan';
import PilihWaktu from '../components/PilihWaktu';
import Tanggal from '../components/Tanggal';
import WaktuTersedia from '../components/WaktuTersedia';
import Home from '../pages/Home';
import Ketersediaan from '../pages/Ketersediaan';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardOwner from '../pages/DashboardOwner';
import ReservasiOngoing from '../pages/ReservasiOngoing';


describe('fetchLapangan', () => {


  // Kita hanya me render komponen yang renderingnya tidak membutuhkan data. karena mock data supabase yang selalu gagal
    test('render calendar', async () => {
      render(
        <Router>
        <Calendar />
      </Router>);
      expect(screen.getByText('Pilih tanggal reservasi')).toBeInTheDocument();
    });



      test('render dropdrown item', async () => {
        render(
          <Router>
          <DropdownItem />
        </Router>);
        const Element = screen.getAllByTestId("DropdownItem")
        expect(Element).toBeDefined() 
      });

      test('render footer', async () => {
        render(
          <Router>
          <Footer />
        </Router>);
        const Element = screen.getAllByTestId("Footer")
        expect(Element).toBeDefined() 
      });


      test('list reservasi', async () => {
        render(
          <Router>
          <ListReservasi />
        </Router>);
        const Element = screen.getAllByTestId("ListReservasi")
        expect(Element).toBeDefined() 
      });

      test('render navbar', async () => {
        render(
          <Router>
          <Navbar />
        </Router>);
        const Element = screen.getAllByTestId("Navbar")
        expect(Element).toBeDefined() 
      });


      test('render waktu ketersediaan', async () => {
        render(
          <Router>
          <WaktuTersedia />
        </Router>);
        const Element = screen.getAllByTestId("WaktuTersedia")
        expect(Element).toBeDefined() 
      });

      test('render home', async () => {
        render(
          <Router>
          <Home />
        </Router>);
        const Element = screen.getAllByTestId("Home")
        expect(Element).toBeDefined() 
      });

      test('render ketersediaan', async () => {
        render(
          <Router>
          <Ketersediaan />
        </Router>);
        const Element = screen.getAllByTestId("Ketersediaan")
        expect(Element).toBeDefined() 
      });

      test('render login', async () => {
        render(
          <Router>
          <Login />
        </Router>);
        const Element = screen.getAllByTestId("Login")
        expect(Element).toBeDefined() 
      });
      test('render register', async () => {
        render(
          <Router>
          <Register />
        </Router>);
        const Element = screen.getAllByTestId("Register")
        expect(Element).toBeDefined() 
      });

  

      test('render Reservasi ongoing', async () => {
        render(
          <Router>
          <ReservasiOngoing />
        </Router>);
        const Element = screen.getAllByTestId("ReservasiOngoing")
        expect(Element).toBeDefined() 
      });
  });
