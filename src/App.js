import logo from './logo.svg';
import './App.css';
import {Card, Img, Thumbnail, DisplayImg} from './displaycard.js';
import { Navbar } from './navbar';
import  useFetch from 'react-fetch-hook';
import config from "./config.json";
import { useEffect, useState } from 'react';
import SideNav from './sidenav';

export default function App() {
  var [homeworkSelect, setHomeworkSelect] = useState("")

  useEffect(()=>{
    const selectmenu = document.getElementById("homeworkMenu")
    selectmenu.onchange=()=>{
      setHomeworkSelect(selectmenu.value)
    }

  })
  return (
    <div className="App">
      <Navbar/>
      <SideNav/>
      <Content homeworkId={homeworkSelect}/>
    </div>
  );
}

function Content({homeworkId}){
  if(homeworkId===""){
    return <></>
  } else {
    return <FetchData homeworkId={homeworkId}/>
  }
}
function FetchData({homeworkId}){
  var query = `?homeworkId=${homeworkId}`
  var {isLoading, data}=useFetch(`${config.appScript}${query}`)
  if(isLoading){
    return <div className="text-light">Loading...</div>
  } else {
    return <Gallery data={getData(data)}/>
  }
}
function getData(data){
  var dataArray = data.data
  dataArray.splice(0,1) 
  //console.log(dataArray)
  return dataArray
}

function Gallery({data}){
  console.log('this is data in Gallery ',data)
  var [activeThumbnail, setActiveThumbnail] = useState(0)
  
  function handlerThumbnailClick(ev){
    //console.log(ev)
    const newActiveThumbnail = + ev.target.childNodes[0].innerText -1
    //console.log(newActiveThumbnail)
    // const thumbnailsCollection = document.getElementsByClassName("thumbnail")
    // thumbnailsCollection[activeThumbnail].classList.remove("chosen")
    // thumbnailsCollection[newActiveThumbnail].classList.add("chosen")
    setActiveThumbnail(newActiveThumbnail)
    //const thumbnails = document.getElementsByClassName("thumbnail")
    //console.log(activeThumbnail)
  }       

  var thumbnails = data.map((e, i) => {
    return (i === activeThumbnail) ? (
      <Thumbnail number={i + 1} chosen imgSrc={e.resizeGraphImgSrc} key={i}
        clickHandler={handlerThumbnailClick} />
    ) : (
      <Thumbnail number={i + 1} imgSrc={e.resizeGraphImgSrc} key={i} clickHandler={handlerThumbnailClick} />
    )
  })

  return <>
    <DisplayImg number={activeThumbnail + 1} imgSrc={data[activeThumbnail].resizeGraphImgSrc} github={data[activeThumbnail].codePath} />
    <div className="thumbnail-footer position-fixed start-0 bottom-0">
      {thumbnails}
    </div>
  </>

}