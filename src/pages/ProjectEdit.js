import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
function ProjectEdit() {
    const [id, setId] = useState(useParams().id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [photo, setPhoto] = useState('');
    const [isSaving, setIsSaving] = useState(false)
  
      
    useEffect(() => {
        axios.get(`/contact/${id}`)
        .then(function (response) {
            let contact = response.data.data
            setFirstName(contact.firstName);
            setLastName(contact.lastName);
            setAge(contact.age);
            setPhoto(contact.photo);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/contact/${id}`, {
            firstName: firstName,
            lastName : lastName,
            age : parseInt(age)
            // lastName: lastName,
            // age: parseInt( age),
            // photo: photo
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Contact updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
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
                <h2 className="text-center mt-5 mb-3">Edit Contact</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Contact
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
                                className="btn btn-outline-success mt-3">
                                Update Contact
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectEdit;