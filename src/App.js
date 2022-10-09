import logo from './logo.svg';
import './App.css';
import {Card, Img, Thumbnail, DisplayImg} from './displaycard.js';
import { Navbar } from './navbar';

let displaycard =  <Card imgSrc="https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"/>
let displayImg = <div className="text-center">
  <img src="https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png" className="rounded display-img" alt="..." />
</div>
let footerSlide =  <div className="thumbnail-footer position-fixed start-0 bottom-0">
      
<Thumbnail number={1} chosen
imgSrc={"https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"}/>
 <Thumbnail number={2} 
imgSrc={"https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"}/>
<Thumbnail number={3} 
imgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9xhL5kmEHyvKmQO_RYE8eMd8zMGnq8_QSdxH9Np7DyAqsspvZAX53PLyFWUJsTT5O1E&usqp=CAU"}/>
 <Thumbnail number={4} 
imgSrc={"https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"}/>
<Thumbnail number={5} 
imgSrc={"https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"}/>

</div>

function App() {
  return (
    <div className="App">
      <Navbar/>
      <DisplayImg number ={1}imgSrc="https://uploads.toptal.io/blog/image/126377/toptal-blog-image-1528911079271-9ae4277f52fcee6744566cc0d46878ba.png"/>
      {footerSlide}
         
    </div>
  );
}

export default App;
