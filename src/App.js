import logo from './logo.svg';
import './App.css';
import {Card, Img, Thumbnail, DisplayImg} from './displaycard.js';
import { Navbar } from './navbar';
import  {useFetch} from 'usehooks-ts';
import config from "./config.json";
import { useEffect, useState } from 'react';
import SideNav from './sidenav';
import Markdown from "markdown-to-jsx"

export default function App() {
  var [homeworkSelect, setHomeworkSelect] = useState(window.location.hash.replace("#",""))

  useEffect(()=>{
    window.selectmenu = document.getElementById("homeworkMenu")
    window.selectmenu.onchange=()=>{
    console.log(window.selectmenu.value)
    window.location.hash=window.selectmenu.value
    setHomeworkSelect(window.selectmenu.value)
  }

  })

  return (
    <div className="App">
      <Navbar select={homeworkSelect}/>
      {/* <SideNav/> */}
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
  var url = `${config.appScript}${query}`
  console.log(url)
  const { data, loading, error }=useFetch(url)
  console.log(data)
  console.log(data?1:0)
  var tag = (data?(<Gallery data={getData(data)}/>):<div className="text-light">Loading...</div>)
  // if(loading){
  //   return <div className="text-light">Loading...</div>
  // } else {
  //   console.log(data)
  //   return <Gallery data={getData(data)}/>
  // }
  return tag
}
function getData(data){
  var dataArray = data.data.filter((e,i)=>i>0)
  //console.log(dataArray)
  return dataArray
}

function Gallery({data}){
  // if(data.length===0) return <div style={{color: 'white'}}>There is no graph in this category.</div>
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
    console.log(data[activeThumbnail].pick1)
  }       

  if(data.length===0){
    return <div style={{color: 'white'}}>There is no graph in this category.</div>
  } else {
    var thumbnails = data.map((e, i) => {
      return (i === activeThumbnail) ? (
        <Thumbnail number={i + 1} chosen imgSrc={e.resizeGraphImgSrc} key={i}
          clickHandler={handlerThumbnailClick} resizeGraphId={e.resizeGraphId}/>
      ) : (
        <Thumbnail number={i + 1} imgSrc={e.resizeGraphImgSrc} key={i} clickHandler={handlerThumbnailClick} resizeGraphId={e.resizeGraphId}/>
      )
    })
    
    return <>
      <DisplayImg number={activeThumbnail + 1} 
      teacherPick = {data[activeThumbnail].pick2==="teacher"}
      studentPick = {data[activeThumbnail].pick1==="students"}
      imgSrcOriginal={data[activeThumbnail].graphPath}
      imgSrc={data[activeThumbnail].resizeGraphImgSrc} github={data[activeThumbnail].codePath} story={data[activeThumbnail].story}/>
      <div className="thumbnail-footer position-fixed start-0 bottom-0">
        {thumbnails}
      </div>
    </>

  }
  

}