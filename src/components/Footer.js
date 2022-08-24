import React from 'react';


function Footer(props) { 

    return(
        <footer className=" text-light" >
          <section
            className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
          >
            <div className="me-5 d-none d-lg-block">
              <span>Green Garden</span>
            </div>
          </section>
          
    
          <section className="">
            <div className="container text-left mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>About Site
                  </h6>
                  <p>
                  This website is powered by the programming language of Javascript. 
                  with the framework React for the frontend and NodeJs as the backend, this is a mern stack app. 
                  </p>
                </div>
                
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  
                  <h6 className="text-uppercase fw-bold mb-4">
                    Contact Me
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">linkedin</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Email</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Github</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Help</a>
                  </p>
                </div>
               
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    sites purpose
                  </h6>
                 <p>to connect everyone around the world with the wonderful nature of our planet, and realize we are a part of it. Post your adventures and gardens here, or just look at the beautiful findings by other users.</p>
                </div>
              </div>
            </div>
          </section>
        
          <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
             devoloped by :
            <a className="text-reset fw-bold" > Tielor Tomlinson</a>
          </div>
        </footer>
    )

}

// const footerStyle = {
//     paddingTop: '10px',
//     width:'100%', 
//     borderTop: '1px solid #28A745',
// }

export default Footer;