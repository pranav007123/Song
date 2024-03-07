import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'



function Landing() {
  const [removePlaylistSongResponse,setRemovePlaylistSongResponse]=useState("")
  const [uploadSongResponse,setUploadSongResponse]= useState("")
  return (
    <>
    <div className="Container d-flex justify-content-between m-5">
        <Add setUploadSongResponse={setUploadSongResponse} />
        <Link to={'/History'}><button className='btn'>Recently played Songs</button></Link>
      </div>
      <div className="row justify-content-center m-5">
        <div className="col-lg-6">
            <h3>All Songs</h3>
            <View uploadSongResponse={uploadSongResponse} setRemovePlaylistSongResponse={setRemovePlaylistSongResponse} />
            
        </div>
        <div className="col-lg-6 ">
           
              <Category removePlaylistSongResponse={removePlaylistSongResponse} />
           
        </div>
      </div>

    </>
  )
}

export default Landing