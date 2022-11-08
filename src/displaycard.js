import github from './logo-github-black.svg'
import Markdown from 'markdown-to-jsx'

export function Card(props){

    return <div className="card" >
        <h5 className="card-title">Card title</h5>
  <img src={props.imgSrc} className="card-img-top" alt="..." />
  <div className="card-body">
    <a href="#" ><img src={github} width={"24px"}></img></a>
  </div>
</div>

}
export function Img(props){
    return <img src={props.imgSrc} className="img-thumbnail" alt="..." />

}
export function Thumbnail(props){
    const chosen = props.chosen?"chosen":""
    const opacity = props.chosen?"":"opacity-25"
    return <div className={`thumbnail ${chosen}`} style={{backgroundImage: `url(${props.imgSrc})`}}
     onClick={props.clickHandler} aria-label={props.resizeGraphId}>
        <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger ${opacity}`}>
            {props.number}
        </span>
        
    </div>
}
export function DisplayImg(props){
    var classNameImage = (props.story && props.story!="")?("col-12 col-md-6 display-img"):("col display-img")
    var storyTag = (props.story && props.story!="")?(
        <div className="col-12 col-md-6 story"><Markdown>{props.story}</Markdown> </div>):(<></>)
    return  (
        <div className="text-center display-container">
            <h1><span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {props.number}
            </span></h1>
            <a href={props.github}>
                <img className="position-absolute top-0 end-0 me-5" src={github} width={24} />
            </a>

            <div className="row img-holder">
                <div className={classNameImage}>
                    <img src={props.imgSrc} className="img-fluid" alt="..." />
                </div>
                {/* <div className={classNameImage} style={{ backgroundImage: `url(${props.imgSrc})` }} /> */}
                {storyTag}
            </div>
        </div>
  )
}