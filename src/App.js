// *lib
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// *css
import './App.css';

function App() {
  // *var
  const phoneRegex = /^\+62\d{10,11}$/;
  // *state
  const [radio, radioSet] = useState(true);
  const [error, errorSet] = useState([]);
  // const [formData, formDataSet] = useState([]);

  // *yup schema
  const schema = yup.object().shape({
    nama: yup.string().required("Nama lengkap harus diisi").min(6, "Nama lengkap min 6 karakter").max(30, "Nama Lengkap harus < 30 karakter"),
    email: yup.string().required("Email harus diisi").min(10, "Email minimal 10 karakter").max(30, "email harus < 30 karakter"),
    nohp: yup.string().required("No handphone harus diisi").matches(phoneRegex,"No handphone tidak valid"),
    pilihanKelas: yup.string().oneOf(['golang', 'react', 'fullstack'], "Kelas coding belum dipilih"),
    file: yup.mixed().required("Surat kesungguhan wajib diisi").test('fileType', 'Jenis file tidak valid', value => {
      if (!value) return false;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      return allowedTypes.includes(value[0]?.type);
    }),
  });
  // *form
  const {register, handleSubmit,setValue, formState:{errors}}= useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });
  // *handler
  const submitHandler = (event) => {
    alert("data berhasil diterima")
    resetHandler();
  }

  const resetHandler = (e) => {
    e?.preventDefault();
    window.location.reload();
    // awalnya untuk reset form saya ingin menggunakan state, namun validasi jadi sedikit aneh dan blm menemukan solusi.(validasi perlu diklik di sembarang tampat terlibih dahulu baru bekerja dan saya kurang suka)
  }
  // *useEffect
  useEffect(() => {
    errorSet(errors);
  },[errors])

  
  return (
    <div className="container">
       <form onSubmit={handleSubmit(submitHandler)}>
          <label>Pendaftaran Peserta Bootcamp</label>
          <input {...register("nama")} autoComplete="off" type="text" placeholder="Nama Lengkap" />
          <small style={{ display: error?.nama ? '':'none' }}>*{error?.nama?.message}</small>
          <input {...register("email")} type="email" placeholder="Email" autoComplete="off" />
          <small style={{ display: error?.email ? '':'none' }}>*{error?.email?.message}</small>
          <input {...register('nohp')} type="text" placeholder="No Handphone" autoComplete="off" />
          <small style={{ display: error?.nohp ? '':'none' }}>*{error?.nohp?.message}</small>
          <span style={{ display:'flex', margin: '10px 130px', justifyContent:'left', color:'#fff' }}>Latar Belakang Pendidikan</span>
          <div style={{ display: 'flex', width: "50px",height:'30px' , margin: '0px 115px' }} >
            <input type="radio" onChange={(e)=> radioSet(!radio)} checked={radio} />
            <p>IT</p>
            <input type="radio" onChange={(e)=> radioSet(!radio)} checked={!radio}/>
            <p>NonIT</p>
          </div>
          <span style={{ display:'flex', margin: '10px 130px', justifyContent:'left', color:'#fff' }}>Kelas Coding yang Dipilih</span>
          <select {...register("pilihanKelas")} onChange={(e)=> setValue('pilihanKelas', e.target.value)}>
            <option value="">Pilih Salah Satu Program</option>
            <option value="golang">Coding Backend with Golang</option>
            <option value="react">Coding Frontend with ReactJs</option>
            <option value="fullstack">Fullstact Developer</option>
          </select>
          <small style={{ display: error?.pilihanKelas ? '':'none' }}>*{error?.pilihanKelas?.message}</small>
          <span style={{ display:'flex', margin: '10px 130px', justifyContent:'left', color:'#fff' }}>Foto Surat Kesungguhan</span>
          <input {...register("file")} type='file' className='file' />
          <small style={{ display: error?.file ? '':'none' }}>*{error?.file?.message}</small>
          <textarea placeholder='Harapan Untuk Coding Bootcamp Ini' autoComplete="off"/>
          <div style={{ display: "flex", marginLeft: "125px"}}>
            <button type='submit'>Submit</button>
            <button className="reset" onClick={resetHandler} >Reset</button>
          </div>
       </form>
    </div>
  );
}

export default App;
