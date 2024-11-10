import logo from './logo.svg';
import './App.css';
import Head from './layout/Header';
import Footer from './layout/Footer';
import MenuLeft from './layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import MenuAcc from './layout/MenuAcc';
import { useState } from 'react';
import Provider from './store/Provider';

function App(props) {
    let params1 = useLocation();
    const showMenu = () => {
    
      if (params1['pathname'].includes("account")) {
        return (
          <MenuAcc/>
        )
      }
     
      if (params1['pathname'].includes("/login") || params1['pathname'].includes("/cart")) {
        return (
          <>
          </>
        )
      }
      return (
        <MenuLeft/>
      )
    }

    const showSlider = () => {
      if (params1['pathname'] == "/") {
        return (
          <>
          <section id="slider">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                      <li data-target="#slider-carousel" data-slide-to="1"></li>
                      <li data-target="#slider-carousel" data-slide-to="2"></li>
                    </ol>
                    
                    <div className="carousel-inner">
                      <div className="item active">
                        <div className="col-sm-6">
                          <h1><span>E</span>-SHOPPER</h1>
                          <h2>Free E-Commerce Template</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                          <button type="button" className="btn btn-default get">Get it now</button>
                        </div>
                        <div className="col-sm-6">
                          <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                          <img src="images/home/pricing.png"  className="pricing" alt="" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="col-sm-6">
                          <h1><span>E</span>-SHOPPER</h1>
                          <h2>100% Responsive Design</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                          <button type="button" className="btn btn-default get">Get it now</button>
                        </div>
                        <div className="col-sm-6">
                          <img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
                          <img src="images/home/pricing.png"  className="pricing" alt="" />
                        </div>
                      </div>
                      
                      <div className="item">
                        <div className="col-sm-6">
                          <h1><span>E</span>-SHOPPER</h1>
                          <h2>Free Ecommerce Template</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                          <button type="button" className="btn btn-default get">Get it now</button>
                        </div>
                        <div className="col-sm-6">
                          <img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
                          <img src="images/home/pricing.png" className="pricing" alt="" />
                        </div>
                      </div>
                      
                    </div>
                    
                    <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                      <i className="fa fa-angle-left"></i>
                    </a>
                    <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
          
          </>
        )
      }
    }
  return (
    <>
      <Provider>
        <Head/>
            <section>
                {showSlider()}
                <div className='container'>
                    <div className='row'>
                        {showMenu()}
                        {props.children}
                    </div>
                </div>
            </section>
            {/* {(params1['pathname'] == "/cart") && props.Cart} */}
          <Footer/>
      </Provider>
    </>
  );
}

export default App;