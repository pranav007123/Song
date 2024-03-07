import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Landing from './Landing'
import { getHistoryAPI, removeHistoryAPI } from '../services/AllAPI'

function History() {
  const [history,setHistory] = useState([])
 const  getAllHistory = async()=>{
    const result = await getHistoryAPI()
    if(result.status>=200 && result.status<300 ){
    setHistory(result.data)
    }
  }

  useEffect(()=>{
    getAllHistory()
  },[])
  const deleteHistory = async(sId)=>{
    await removeHistoryAPI(sId)
    getAllHistory()
  }
  
  
  return (
    <>
    <div className='m-1 mb-5'>
      <div className="d-flex justify-content-between">
        <h3>History</h3>
     <Link to={'/'} element={<Landing/>} > <button className='btn'>Home</button></Link>
      </div> 

      <table className='table'>
       <thead>
          <tr>
            <th>#</th>
            <th>song name</th>
            <th>song link</th>
            <th>time</th>
            <th>:</th>
          </tr>
       </thead>
       <tbody>
      {history?.length>0? history?.map((song,index)=>(
       <tr key={index}>
          <td>{index+1}</td>
          <td>{song?.caption}</td>
          <td>{song?.youtubelink}</td>
          <td>{song?.timeStamp}</td>
          <td><i style={{cursor:'pointer'}} className='text-danger bg-info p-1' onClick={()=>deleteHistory(song.id)}>delete</i></td>

        </tr>
      ))
        :
        <tr className='fw-bolder' >Your watch History is Empty</tr>
        }
       </tbody>
      </table>
    </div>
    </>
  )
}

export default History