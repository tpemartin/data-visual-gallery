import github from './logo-github-black.svg'

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
    return <div className={`thumbnail ${chosen}`} style={{backgroundImage: `url(${props.imgSrc})`}}>
        <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger ${opacity}`}>
            {props.number}
        </span>
        
    </div>
}
//<DisplayImg number={1}  href={"https://getbootstrap.com/docs/5.2/forms/form-control/"} imgSrc={"https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png"}/>
export function DisplayImg(props){
    // <DisplayImg number href imgSrc/>
    return  (
        <div className="text-center display-container">
            <h1><span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {props.number}
            </span></h1>
            <a href={props.href}>
                <img className="position-absolute top-0 end-0 me-5" src={github} width={24} />
            </a>
            <div className="display-img" style={{ backgroundImage: `url(${props.imgSrc})` }} />
        </div>
  )
}
