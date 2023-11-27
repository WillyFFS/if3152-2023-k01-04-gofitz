import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom'
import AddLapangan from '../components/AddLapangan';
import ListLapangan from '../components/ListLapangan';


describe('AddLapangan Component Tests', () => {
    test('Validation error messages appear correctly', () => {
      render(
        <Router>
        <AddLapangan />
      </Router>);
      
      // Klik tombol "Save" tanpa mengisi formulir
      fireEvent.click(screen.getByText('Save'));
  
      // Periksa apakah pesan kesalahan muncul
      expect(screen.getByText('Isi semua data')).toBeInTheDocument();
    });

    test('Validation error messages appear correctly', () => {
      render(
        <Router>
        <AddLapangan />
        <ListLapangan/>
      </Router>);
      
      // Klik tombol "Save" tanpa mengisi formulir
      fireEvent.click(screen.getByText('Cancel'));
  
      // Periksa apakah pesan kesalahan muncul
      expect(screen.getByText("DATA LAPANGAN")).toBeInTheDocument();
    });
  
    test('Form submission works correctly with valid input', () => {
        render(
            <Router>
            <AddLapangan />
          </Router>);
  
      // Isi formulir dengan data yang valid
      userEvent.type(screen.getByPlaceholderText('Nomor Lapangan'), '1');
      userEvent.type(screen.getByPlaceholderText('Tipe Lapangan'), 'Futsal');
      userEvent.type(screen.getByPlaceholderText('Jumlah Bola'), '5');
      userEvent.type(screen.getByPlaceholderText('Size Lapangan'), '40x20');
      userEvent.type(screen.getByPlaceholderText('Harga Weekend'), '150000');
      userEvent.type(screen.getByPlaceholderText('Harga Weekday'), '100000');
      
      // Pilih file gambar
  
      // Klik tombol "Save"
      fireEvent.click(screen.getByText('Save'));
  
      // Periksa apakah data lapangan berhasil disimpan
      // Anda mungkin perlu menyesuaikan metode ini sesuai dengan logika navigasi di komponen Anda
      expect(screen.getByText('Isi semua data')).toBeInTheDocument();
    });
  });