import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { Col, Row } from 'react-bootstrap'
import { getAllSongAPI, getSingleCategoryAPI, updatePlaylistAPI } from '../services/AllAPI'


function View({uploadSongResponse,setRemovePlaylistSongResponse}) {

  const [allSongs, setAllSongs] = useState([])
  const [deleteSongResponse,setDeleteSongResponse]= useState("")

  const getAllSongs = async () => {
    const result = await getAllSongAPI()
    // console.log(result);
    if (result?.status == 200) 
    {
      setAllSongs(result?.data);
    }
    //  console.log(allSongs);
  }
  useEffect(() => {
    getAllSongs()
  }, [uploadSongResponse,deleteSongResponse])

  const dragOverView = (e)=>{
    e.preventDefault()
  }
  const handlePlaylistSong = async(e)=>{
    const {songId,playlistId} =JSON.parse(e.dataTransfer.getData("removeSongDetails"))
    // console.log(`${songId}${playlistId}`);
    const {data} = await getSingleCategoryAPI(playlistId)
    const updatedSongList = data.allSongs.filter(item=>item.id!=songId)
    console.log(updatedSongList);
    const {id,playlistName}= data
  const result =  await updatePlaylistAPI(playlistId,{id,playlistName,allSongs:updatedSongList})
  setRemovePlaylistSongResponse(result.data)
    // console.log(data);
  }

  return (
    <>
      <Row droppable="true" onDragOver={e=>dragOverView(e)} onDrop={e=>handlePlaylistSong(e)} >
        {allSongs?.length > 0 ? allSongs?.map((song, index) => (
          <Col key={index} sm={12} md={6} lg={4} className='mb-4' >
            <VideoCard displayData={song} setDeleteSongResponse={setDeleteSongResponse} />
          </Col>
        ))
          :
          <div className='fw-bolder'>No songs are uploaded yet!!!</div>
        }
      </Row>
    </>
  )
}

export default View