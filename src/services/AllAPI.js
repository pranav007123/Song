import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"

// upload Song to http://localhost:3000/songs
export const uploadSongAPI =async(song)=>{ 

   return await commonAPI("POST",`${SERVER_URL}/songs`,song)

}

// get video api called by view
export const getAllSongAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/songs`,"") 
}

// store watch history to localhost 
export const saveHistoryAPI = async(songdetails)=>{
    return await commonAPI("POST",`${SERVER_URL}/history`,songdetails)
}

// get history from localhost to history component
export const getHistoryAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/history`,"")
}

// remove history from history compont

export const removeHistoryAPI = async (songid)=>{
    return await  commonAPI("DELETE",`${SERVER_URL}/history/${songid}`,{})
}

// remove song 
export const removeSongAPI = async (songid)=>{
    return await  commonAPI("DELETE",`${SERVER_URL}/songs/${songid}`,{})
}

// save playlist to localhost

export const addPlaylistAPI = async (playlistDetails)=>{
return await commonAPI("POST",`${SERVER_URL}/lists`,playlistDetails)
}
// get playlist in view
export const getPlaylistAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/lists`,"")
}

// remove Playlist
export const removePlaylistAPI = async(playlistid)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/lists/${playlistid}`,{})
}
// get single song api for drag and drop
export const getASongAPI = async (songId)=>{
    return await commonAPI("GET",`${SERVER_URL}/songs/${songId}`,"") 
}

// update category Api
export const updatePlaylistAPI = async(playlistid,updatedPlaylistDetails)=>{
    return await commonAPI("PUT",`${SERVER_URL}/lists/${playlistid}`,updatedPlaylistDetails)
}

// get single catetegory
export const getSingleCategoryAPI = async (playlistId)=>{
    return await commonAPI("GET",`${SERVER_URL}/lists/${playlistId}`,"")
}