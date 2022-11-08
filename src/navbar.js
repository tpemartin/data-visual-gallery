import SideNav, { SideNavButton } from "./sidenav"
import config from "./config.json"
import useFetch from "react-fetch-hook"
export function Navbar({select}){

  return <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <div className="navbar-brand">
        <div>DataV @ NTPU.ECON</div>
        
      </div>
      <div><Dropdown select={select}/></div>
      {/* <SideNavButton /> */}
    </div>
  </nav>
}

function Dropdown({select}){
  var { data, loading, error } = useFetch(config.appScript + '?menu=true')
  var tag
  if(data){
    let menu = data.menu
    tag = <select id="homeworkMenu" className="form-select" aria-label="Default select example">
      <Option selected={select===""} value=""/>
       { menu ? menu.map((e, i) => { return <Option selected={select===e} value={e === "homeworkId" ? "Sheet3" : e} key={i} /> }):<></>}
    </select>
  } else {
    tag = <select id="homeworkMenu" className="form-select" aria-label="Default select example">
    <option selected value="">選擇展示</option>
  </select>
  }
  return tag
}
function Option({selected, value}){
  let context = (value==="")?"選擇展示":value
  let tag= (selected)?(<option selected value={value}>{context}</option>):(<option value={value}>{context}</option>)
  return tag
}
function Sidebar(props){
  return  <>
    <div>
  <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div className="offcanvas-body">
      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        
      </ul>
      <form className="d-flex mt-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</div>
</>
}