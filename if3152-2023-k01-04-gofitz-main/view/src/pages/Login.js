import React, { useState } from "react";
import { supabase } from '../models/database';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email:"",password:"",
  })

  function handleChange(event){
    if (event.target.id === "floatingEmail") {
      setFormData({email:event.target.value, password: formData.password})
    } else {
      setFormData({email:formData.email, password: event.target.value})
    }

  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if (error) throw error
      // console.log(data)
      alert('Login Berhasil')
      // ('#modalLogin').modal('hide');
      window.location.reload(false);
    } catch (error) {
      alert('Akun tidak tersedia! atau belum verifikasi email!')
    }
  }

  return (
    <div  data-testid="Login" className="modal fade" tabIndex="-1" role="dialog" id="modalLogin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Log-in</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control rounded-3" id="floatingEmail" placeholder="name@example.com" value={formData.email} onChange={handleChange}/>
                <label htmlName="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-success" type="submit">Log-in</button>
              <small className="text-body-secondary">Jika Anda belum memiliki akun, silahkan melakukan Sign-Up</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;