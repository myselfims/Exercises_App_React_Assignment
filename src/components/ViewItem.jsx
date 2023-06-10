import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';

const ViewItem = (props) => {
    const {id} = useParams()
    const [excercise, setExcercise] = useState({steps:[],videoURL:[],target:[]})
    const [video,setVideo] = useState('')

    useEffect(()=>{
        async function fetchData(){
            const url = `https://musclewiki.p.rapidapi.com/exercises/${id}`;
            const options = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': '92a745b94emsh0cb338c535b85eap183d4ajsn2e683d429da5',
                'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
              }
            };
      
            try {
              const response = await fetch(url, options);
              const result = await response.json();
              setExcercise(result);
            } catch (error) {
              console.error(error);
            }
        }
        fetchData();
    },[])

    const playVideo = (url)=>{
        setVideo(url)
    }
    
  return (
    <div className='container'>
        <Link to='/' className='btn my-2 btn-outline-primary'>Back</Link>
      <div className="card p-4">
        {video.length>0? <VideoPlayer url={video} setVideo={setVideo}/>:''}
        <div className="d-flex justify-content-between header ">
            <h2>{excercise.exercise_name!==undefined?excercise.exercise_name:'Fetching...'}</h2>
            <div className='d-flex align-items-center'>
                <h5>Category</h5>
                <span className="badge text-bg-primary mx-2">{excercise.Category}</span>
            </div>
            <div className='d-flex align-items-center'>
                <h5>Difficulty</h5>
                <span className="badge text-bg-primary mx-2">{excercise.Difficulty}</span>
            </div>
        </div>
        <hr />
        <div className="card-body my-4">
            <div className="d-flex justify-content-between">

                <div className='d-flex align-items-center'>
                    <h5>Force</h5>
                    <span className="badge text-bg-primary mx-2">{excercise.Force}</span>
                </div>

                <div className='d-flex align-items-center'>
                    <h5>Grips</h5>
                    <span className="badge text-bg-primary mx-2">{excercise.Grips}</span>
                </div>


                <div className='d-flex align-items-center'>
                    <h5>Videos({excercise.videoURL.length})</h5>
                    {excercise.videoURL.map((url)=>{return(<button onClick={()=>playVideo(url)} className='btn mx-1 btn-outline-primary '>Watch</button>)})}
                    
                </div>
            </div>
            <div className="steps my-4">
                <h4>How to do?</h4>
                <div className="accordion" id="accordionExample">
                    {excercise.steps.map((step,index)=>{
                        return(
                            <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Step {index+1}
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>{step}</strong>
                        </div>
                        </div>
                    </div>
                        )
                    })}
                    
                </div>
            </div>
            {excercise.details!==undefined?<div className="card">
            <div className="desc my-3">
                    <div className="card-header">
                        Description
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                        <p>{excercise.details}</p>
                        </blockquote>
                    </div>
                </div>
            </div>:''}
        </div>
      </div>
    </div>
  )
}

export default ViewItem
