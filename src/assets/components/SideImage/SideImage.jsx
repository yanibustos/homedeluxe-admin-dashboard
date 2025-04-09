import "./SideImage.css";

function SideImage({ children }) {
  return (
    <div className="sideImage-container container-fluid bg-white h-100">
      <div className="row h-100 d-flex">
        <div className="d-none d-xl-flex col-xl-9 bg-dark sideImage-div"></div>
        <div className="col-12 col-xl-3 d-flex flex-column justify-content-center align-items-center">
          <div className="vh-100 w-100 d-flex flex-column justify-content-center form-center">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img src="/img/logo_principal.png" alt="Logo" className="img-fluid" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideImage;
