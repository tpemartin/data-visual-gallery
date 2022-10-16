
export function Form(props){
   return <>  
   <div>
    <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
    </div>
    </div>
   </> 
}
// src JSX => complie => build js
export function Image(props){
    
    // Within JSX, 
    // inside {...} is program that executes in the function execution environment
    return <img src={props.imgSrc} className="img-thumbnail" alt="..." />

}

