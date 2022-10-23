export default function SideNav({formUrl}){
  formUrl="https://docs.google.com/forms/d/e/1FAIpQLSdAafb_cpwH1J5DbLajpUYMm2avs2tkdT2287xWM-adfgszZQ/viewform"
  return <div>
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
    </div>
    <div className="offcanvas-body">
      <iframe src={`${formUrl}?embedded=true`} width={"100%"} height={"100%"} frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
    </div>
  </div>
</div>
}

export function SideNavButton(){
  return <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">評分單</button>
}