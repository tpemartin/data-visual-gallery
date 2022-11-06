import SideNav, { SideNavButton } from "./sidenav"
import config from "./config.json"
import useFetch from "react-fetch-hook"
export function Navbar(){

  return <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <div className="navbar-brand">
        <div>經濟資料視覺化展示@NTPU.ECON</div>
        <div><Dropdown /></div>
      </div>
      <SideNavButton />
    </div>
  </nav>
}

function Dropdown(){
  var { isLoading, data } = useFetch(config.appScript + '?menu=true')
  if (isLoading) {
    return <select id="homeworkMenu" className="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
    </select>
  } else {
    let menu = data.menu
    return <select id="homeworkMenu" className="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      {
        menu ? menu.map((e, i) => { return <option value={e === "homeworkId" ? "Sheet3" : e} key={i}>{e}</option> }) : <></>
      }
    </select>
  }
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