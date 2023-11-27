import React, { useState } from "react";
import { supabase } from '../models/database';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  
  const [formData,setFormData] = useState({
    username:"",email:"",password:"",
  })

  async function handleChange(event){
    if (event.target.id === "floatingUsername") {
      setFormData({username:event.target.value, email:formData.email, password: formData.password})
    } else if (event.target.id === "floatingEmail") {
      setFormData({username:formData.username, email:event.target.value, password: formData.password})
    } else {
      setFormData({username:formData.username, email:formData.email, password: event.target.value})
    }

  }

  async function handleSubmit(e){
    e.preventDefault()
    if(formData.username !== "" && formData.email  !== "" && formData.password !== ""){
      const {data, error} = await supabase
      .from("user")
      .select("username")
      .eq("username", formData.username);
      if(data.length !== 0){
        alert("Username sudah terpakai, silahkan pilih yang lain!");
      }
      else{
        try {
          const { data, error } = await supabase.auth.signUp(
            {
              email: formData.email,
              password: formData.password,
              options: {
                data: {
                  username: formData.username, 
                }
              }
            }
          )
          if (error) throw error
          alert("Silahkan cek email kamu untuk verifikasi");
          
          const {data1, error2} = await supabase
          .from("user")
          .update({"username": formData.username})
          .eq("email", formData.email);
          window.location.reload(false);
        } catch (error) {
          alert(error)
        }
      }
    }
    else{
      alert("Silahkan isi semua data!");
    }
  }

  return (
    // modal-sheet fade position-static d-block bg-body-secondary p-4 py-md-5
    <div  data-testid="Register" className="modal fade" tabIndex="-1" role="dialog" id="modalSignIn">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Sign-up</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="username" className="form-control rounded-3" id="floatingUsername" placeholder="Username" value={formData.username} onChange={handleChange}/>
                <label htmlFor="floatingUsername">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control rounded-3" id="floatingEmail" placeholder="name@example.com" value={formData.email} onChange={handleChange}/>
                <label htmlFor="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-success" type="submit">Sign-up</button>
              <small className="text-body-secondary">Klik Sign-up untuk membuat akun GOFITZ</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;