import "./SideImage.css";

function SideImage({ children }) {
  return (
    <div className="sideImage-container container-fluid h-100">
      <div className="row h-100">
        <div className="sideImage-div col-12"></div>
        <div className="content d-flex flex-column justify-content-center align-items-center">
          <div className="glass-card p-4">
            <div className="d-flex flex-column justify-content-center align-items-center mb-4">
              <img
                src="/img/logo-white.png"
                alt="Logo"
                className="img-fluid mb-2"
              />
              <span className="text-white text-uppercase">Admin Access</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideImage;
