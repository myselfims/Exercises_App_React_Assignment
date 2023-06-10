import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

const Listing = () => {
  const [excercises,setExcercises] = useState([])
  const [allexcercises,setAllExcercises] = useState([])
  const [attributes,setAttributes] = useState({categories:[],difficulties:[],forces:[],muscles:[]})
  const [category,setCategory] = useState(false)
  const [difficulty,setDifficulty] = useState(false)
  const [force,setForce] = useState(false)

  useEffect(()=>{
    async function fetchData(){
      const url = 'https://musclewiki.p.rapidapi.com/exercises';
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
        setExcercises(result);
        setAllExcercises(result)
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchAttributes(){
      const url = 'https://musclewiki.p.rapidapi.com/exercises/attributes';
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
        setAttributes(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAttributes();
    fetchData();
  },[])

  const handleCategory = (e)=>{
    setCategory(e.target.value)
    setCategory(true)
    let result = excercises.filter((excercise)=>excercise.Category===e.target.value)
    setExcercises(result)
  }

  const handleDifficulty = (e)=>{
    setExcercises(allexcercises)
    setDifficulty(e.target.value)
    let result = excercises.filter((excercise)=>excercise.Difficulty===e.target.value)
    setExcercises(result)
  }

  const handleForce = (e)=>{

    setForce(true)
    let result = excercises.filter((excercise)=>excercise.Force===e.target.value)
    setExcercises(result)
  }


  const clearFilters = ()=>{
    setExcercises(allexcercises)
    setCategory(false)
    setDifficulty(false)
    setForce(false)
    setMuscle(false)
  }

  return (
    <div className='container listing-div'>
      <div className="card py-2 listing-header">
        <div className="container d-flex flex-row filters">
            
        <select disabled={category} onChange={handleCategory} className="form-select mx-2" aria-label="Default select example">
            <option disabled defaultValue>Category</option>
            {attributes.categories.map((category)=>{return(
              <option defaultValue="1">{category}</option>
            )})}
        </select>
            
        <select disabled={difficulty} onChange={handleDifficulty} className="form-select mx-2" aria-label="Default select example">
            <option disabled defaultValue>Difficulties</option>
            {attributes.difficulties.map((category)=>{return(
              <option defaultValue="1">{category}</option>
            )})}
        </select>
            
        <select disabled={force} onChange={handleForce} className="form-select mx-2" aria-label="Default select example">
            <option disabled defaultValue>Forces</option>
            {attributes.forces.map((category)=>{return(
              <option defaultValue="1">{category}</option>
            )})}
        </select>
            

        <button onClick={clearFilters} className='btn btn-outline-primary'>Clear</button>
        </div>
        <div className="container my-4 px-4">
          {excercises.length>0?<h3>{excercises.length} Excersices</h3>:<label>Fetching...</label>}
          {excercises.map((excercise)=>{
            return(<ListItem key={excercise.id} excercise={excercise} />)
          })}
        </div>
      </div>
    </div>
  )
}

export default Listing
