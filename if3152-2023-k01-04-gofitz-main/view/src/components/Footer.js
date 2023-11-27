import React from "react";

function Footer() {
  return (
      <footer data-testid="Footer" className="px-5 d-flex flex-wrap justify-content-between align-items-center py-3 border-top" style={{height:"10vh"}}>
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            GOFITZ
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">© 2023 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="#">Twitter</a></li>
          <li className="ms-3"><a className="text-body-secondary" href="#">Instagram</a></li>
        </ul>
      </footer>
  );
}

export default Footer;