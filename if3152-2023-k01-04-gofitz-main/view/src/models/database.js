const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rrdwyabynnlseyxhwqqx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHd5YWJ5bm5sc2V5eGh3cXF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMzY4NSwiZXhwIjoyMDE1Njk5Njg1fQ.0Zr2CpFSv0oKVj_0YE5OuNsIkgykZEJdH6I7aVhVJgA";


const supabase = createClient(supabaseUrl, supabaseKey);

async function getReservasi(prompt){
    try{
        const {data, error} = await supabase
        .from('reservasi')
        .select()
        .eq('id',prompt.id)
        .gte('scheduleBookingStart',prompt.date);
        console.log(data);
        return data;
    }
    catch(error){
        console.log("gagal");
    }
};

async function untungOwner(){
    try {
        const { data, error} = await supabase
        .from("totalpendapatan")
        .select();
        console.log(data);
        return data;
    } catch (error){
        console.log("gagal");
    }
};

async function countjumlahReservasi(){
    try {
        const { data, error} = await supabase
        .from("jumlahpelanggan")
        .select();
        console.log(data);
        return data;
    } catch (error){
        console.log("gagal");
    }
};

async function getDataLapangan (idLapangan){
    try {
        const { data, error} = await supabase
        .from("lapangan")
        .select()
        .eq("nomorLapangan",idLapangan);
        return data;
    } catch (error){
        console.log("gagal");
    }
};

async function getKetersediaan(props){
    try{
        props.date = props.date.getFullYear()+"-"+(props.date.getMonth()+1)+"-"+props.date.getDate()+"T00:00:00";
        props.dateTomorrow = props.dateTomorrow.getFullYear()+"-"+(props.dateTomorrow.getMonth()+1)+"-"+props.dateTomorrow.getDate()+"T00:00:00";
        const { data , error } = await supabase
        .from("reservasi")
        .select()
        .gte('scheduleBookingStart',props.date)
        .lte('scheduleBookingStart',props.dateTomorrow);
        return data;
    } catch (error){
        console.log("gagal");
    }
}

async function imageLapangan(props){
    const {data, error} = await supabase
    .storage
    .from('Lapangan gambar')
    .getPublicUrl(`lapangan-${props}.jpg`)
    if(error){
        console.log("gagal");
    }
    else{
        return data;
    }
}

async function tes(){
    const { data , error } = await supabase
    .from("reservasi")
    .select()
    .eq("id",4) 
    return data;
}
async function getAllLapangan(){
    try {
        const {data,error} = await supabase
        .from("lapangan")
        .select()
        .order("nomorLapangan");
        return data;
    } catch (error) {
        console.log("gagal");
    }
}

async function getNomorLapangan(){
    try {
        const{data,error} = await supabase
        .from("lapangan")
        .select("nomorLapangan")
        .order("nomorLapangan");
        return data;
    } catch (error) {
        console.log("gagal");
    }
}

async function createReservasi(props){
    try {
        props.scheduleBookingStart = props.scheduleBookingStart.getFullYear()+"-"+(props.scheduleBookingStart.getMonth()+1)+"-"+props.scheduleBookingStart.getDate()+"T"+props.scheduleBookingStart.getHours()+":"+props.scheduleBookingStart.getMinutes()+":"+props.scheduleBookingStart.getSeconds();
        props.scheduleBookingEnd = props.scheduleBookingEnd.getFullYear()+"-"+(props.scheduleBookingEnd.getMonth()+1)+"-"+props.scheduleBookingEnd.getDate()+"T"+props.scheduleBookingEnd.getHours()+":"+props.scheduleBookingEnd.getMinutes()+":"+props.scheduleBookingEnd.getSeconds();
        const{data, error} = await supabase
            .from('reservasi')
            .insert({"namaPemesan": props.namaPemesan, "lapanganId": props.lapanganId, "scheduleBookingStart": props.scheduleBookingStart, "scheduleBookingEnd": props.scheduleBookingEnd, "totalHarga": props.totalHarga, "ssPayment":props.ssPayment });
    } catch (error) {
      console.log("gagal");
    }
}

async function getAllReservasi(){
    try {
        let date = new Date();
        date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .gte('scheduleBookingStart',date);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function getReservasibyName(props){

        // let date = new Date();
        // let dateTomorrow = new Date(props.date.getTime() + 24 * 60 * 60 * 1000);
        // date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        // dateTomorrow = dateTomorrow.getFullYear()+"-"+(dateTomorrow.getMonth()+1)+"-"+dateTomorrow.getDate()+"T00:00:00";
        // let nama = props.namaPemesan;
        const{data , error}  = await supabase
        .from("reservasilapangan")
        .select()
        .like("namaPemesan",props.namaPemesan);
        // // .like("namaPemesan","%"+{nama}+"%")
        // .gte('scheduleBookingStart',date)
        // .lte('scheduleBookingStart',dateTomorrow);
        if(error){
            console.error();
        }
        else {
            return data;
        }
}

async function getReservasibyLapangan(props){
    try {
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .eq("lapanganId",props.lapanganId);
        console.log(data);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function getReservasibyTanggal(props){
    try {
        props.date = props.date.getFullYear()+"-"+(props.date.getMonth()+1)+"-"+props.date.getDate()+"T"+props.date.getHours()+":"+props.date.getMinutes()+":"+props.date.getSeconds();
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .gte('scheduleBookingStart',props.date);
        return data;
    } catch (error) {   
        console.error()
        console.log("gagal");
    }
}

async function getReservasibyNameandLapangan(props){
    try {
        let date = new Date();
        date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .match({
            "namaPemesan": props.namaPemesan,
            "lapanganId":props.lapanganId
        })
        .gte('scheduleBookingStart',date);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function getReservasibyNameandTanggal(props){
    try {
        let dateTomorrow = new Date(props.date.getTime() + 24 * 60 * 60 * 1000);
        props.date = props.date.getFullYear()+"-"+(props.date.getMonth()+1)+"-"+props.date.getDate()+"T"+props.date.getHours()+":"+props.date.getMinutes()+":"+props.date.getSeconds();
        dateTomorrow = dateTomorrow.getFullYear()+"-"+(dateTomorrow.getMonth()+1)+"-"+dateTomorrow.getDate()+"T00:00:00";
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .eq("namaPemesan",props.namaPemesan)
        .gte('scheduleBookingStart',props.date)
        .lte('scheduleBookingStart',dateTomorrow);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function getReservasibyTanggalandLapangan(props){
    try {
        let dateTomorrow = new Date(props.date.getTime() + 24 * 60 * 60 * 1000);
        props.date = props.date.getFullYear()+"-"+(props.date.getMonth()+1)+"-"+props.date.getDate()+"T"+props.date.getHours()+":"+props.date.getMinutes()+":"+props.date.getSeconds();
        dateTomorrow = dateTomorrow.getFullYear()+"-"+(dateTomorrow.getMonth()+1)+"-"+dateTomorrow.getDate()+"T00:00:00";
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .eq("lapanganId",props.lapanganId)
        .gte('scheduleBookingStart',props.date)
        .lte('scheduleBookingStart',dateTomorrow);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function getReservasibynameandTanggalandLapangan(props){
    try {
        let dateTomorrow = new Date(props.date.getTime() + 24 * 60 * 60 * 1000);
        props.date = props.date.getFullYear()+"-"+(props.date.getMonth()+1)+"-"+props.date.getDate()+"T"+props.date.getHours()+":"+props.date.getMinutes()+":"+props.date.getSeconds();
        dateTomorrow = dateTomorrow.getFullYear()+"-"+(dateTomorrow.getMonth()+1)+"-"+dateTomorrow.getDate()+"T00:00:00";
        const{data , error} = await supabase
        .from("reservasilapangan")
        .select()
        .match({
            "namaPemesan": props.namaPemesan,
            "lapanganId":props.lapanganId
        })
        .gte('scheduleBookingStart',props.date)
        .lte('scheduleBookingStart',dateTomorrow);
        return data;
    } catch (error) {   
        console.log("gagal");
    }
}

async function updateReservasi(props){
    try {
        props.scheduleBookingStart = props.scheduleBookingStart.getFullYear()+"-"+(props.scheduleBookingStart.getMonth()+1)+"-"+props.scheduleBookingStart.getDate()+"T"+props.scheduleBookingStart.getHours()+":"+props.scheduleBookingStart.getMinutes()+":"+props.scheduleBookingStart.getSeconds();
        props.scheduleBookingEnd = props.scheduleBookingEnd.getFullYear()+"-"+(props.scheduleBookingEnd.getMonth()+1)+"-"+props.scheduleBookingEnd.getDate()+"T"+props.scheduleBookingEnd.getHours()+":"+props.scheduleBookingEnd.getMinutes()+":"+props.scheduleBookingEnd.getSeconds();
        const [data,error] = await supabase
        .from ("reservasi")
        .update({
            "scheduleBookingStart": props.scheduleBookingStart,
            "scheduleBookingEnd" : props.scheduleBookingEnd,
            "totalHarga": props.totalHarga,
            "lapanganId": props.lapanganId
        })
        .eq("id",props.id);
    } catch (error) {
        console.log("gagal");
    }
}

async function getusername(props){
    try {
        const {data , error} = await supabase
        .from ("user")
        .select("username")
        .eq("username",props);
        return data;
    } catch (error) {
        console.log("gagal");
    } 
}

    async function tes3(){
        try {
            const {data , error} = await supabase
            .from ("reservasi")
            .select(`id,
            namaPemesan,
            lapanganId,
            scheduleBookingStar,
            scheduleBookingEnd, 
            totalHarga,
            ssPayment,
            lapangan(id,imageSrc, namaLapangan)`);
            console.log(data);
            return data;
        } catch (error) {
            console.log("gagal");
        } 
    }

async function getRole(username){
    try {
        const {data, error} =  await supabase
        .from("user")
        .select("role")
        .eq("username",username);
        return data;
    } catch (error) {
        
    }
}


module.exports = {
    supabase,
    getReservasi,
    countjumlahReservasi,
    untungOwner,
    getDataLapangan,
    getKetersediaan,
    tes,
    imageLapangan,
    getAllLapangan,
    getNomorLapangan,
    createReservasi,
    getAllReservasi,
    getReservasibyName,
    getReservasibyLapangan,
    getReservasibyTanggal,
    getReservasibyNameandLapangan,
    getReservasibyNameandTanggal,
    getReservasibyTanggalandLapangan,
    getReservasibynameandTanggalandLapangan,
    updateReservasi,
    getusername,
    tes3,
    getRole
};