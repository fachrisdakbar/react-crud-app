import React, {useState} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function ProjecCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState('');
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        axios.post('/contact', {
            firstName: firstName,
            lastName: lastName,
            age: age,
            photo: photo
          })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Contact saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setFirstName('')
            setLastName('')
            setAge('')
            setPhoto('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Contact</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                    onChange={(event)=>{setFirstName(event.target.value)}}
                                    value={firstName}
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <textarea 
                                    value={lastName}
                                    onChange={(event)=>{setLastName(event.target.value)}}
                                    className="form-control"
                                    id="lastName"
                                    rows="3"
                                    name="lastName"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input 
                                    onChange={(event)=>{setAge(event.target.value)}}
                                    value={age}
                                    type="text"
                                    className="form-control"
                                    id="age"
                                    name="age"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo">Photo</label>
                                <input 
                                    onChange={(event)=>{setPhoto(event.target.value)}}
                                    value={photo}
                                    type="text"
                                    className="form-control"
                                    id="photo"
                                    name="photo"/>
                                <img src={photo} width={50}/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Contact
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjecCreate;