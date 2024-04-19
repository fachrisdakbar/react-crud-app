import React,{ useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
  
function ProjectList() {
    // const  [projectList, setProjectList] = useState([])
    const  [contactList, setContactList] = useState([])
  
    useEffect(() => {
        fetchContactList()
    }, [])
  
    const fetchContactList = () => {
        axios.get('/contact')
        .then(function (response) {
            setContactList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/contact/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Contact deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchContactList()
                })
                .catch(function (error) {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">List Contact</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-primary"
                            to="/create">Create New Contact
                        </Link>
                    </div>
                    <div className="card-body">
              
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Photo</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactList.map((data, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{data.id}</td>
                                            <td>{data.firstName}</td>
                                            <td>{data.lastName}</td>
                                            <td>{data.age}</td>
                                            <td> <img src={data.photo} width={50}/> </td>
                                            <td>
                                                <Link
                                                    to={`/show/${data.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${data.id}`}>
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={()=>handleDelete(data.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectList;