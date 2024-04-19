import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"
 
  
function ProjectShow() {
    const [id, setId] = useState(useParams().id)
    // const [project, setProject] = useState({name:'', description:''})
    const [contact, setContact] = useState({firstName:'', lastName:'', age:'', photo:''})
 
    useEffect(() => {
        axios.get(`/contact/${id}`)
        .then(function (response) {
          setContact(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Contact</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/"> View All Contacts 
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">First Name:</b>
                        <p>{contact.firstName}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{contact.lastName}</p>
                        <b className="text-muted">Age:</b>
                        <p>{contact.age}</p>
                        <b className="text-muted">Photo:</b>
                        <p>{contact.photo}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectShow; 