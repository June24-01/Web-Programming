
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsFillArrowUpCircleFill, BsGeoAltFill, BsFillTelephoneFill, BsEnvelopeFill, BsTwitter, BsInstagram, BsFillSuitHeartFill } from "react-icons/bs";
import { FaFacebook } from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';

import Home from './components/Home/Home';
import Job from './components/Job/Job';
import Cart from './components/Cart/Cart';
import Shop from './components/Shop/Shop';
import User from './components/User/User';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import YourJob from './components/Job/YourJob';
import CreatedJob from './components/Job/CreatedJob';
import JobDetail from './components/Job/JobDetail';
import Header from './components/Layout/Header'
import axios from 'axios';
import Payment from './components/Cart/Payment';

function App() {
    // const navigate = useNavigate();

    //create aos effect (fade up) when scroll

    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const [cart, setCart] = useState([]);


    useEffect(() => {

        AOS.init();
    });
    const base_url = "http://localhost:8080/api/v1";

    useEffect(async () => {
        if (authenticated != null) {
            let headers = {
                'Authorization': 'Bearer ' + authenticated.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            await axios.get(base_url + "/cart", headers = { headers })
                .then(res => res.data)
                .then(data => {
                    setCart(data.data);
                });
        }
    },[])

    //scroll to top
    // const [visible, setVisible] = useState(false)

    let visible = false;
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            // setVisible(true)
            visible = true;
        }
        else if (scrolled <= 300) {
            //  setVisible(false)
            visible = false;
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        setAuthenticated(null);
        setCart(null);
        // navigate("/login");
    }

    const onLogined = (newAuth) => {
        setAuthenticated(newAuth);
    }
    const handleIncreaseCart = async () => {
        let headers = {
            'Authorization': 'Bearer ' + authenticated.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        await axios.get(base_url + "/cart", headers = { headers })
            .then(res => res.data)
            .then(data => {
                setCart(data.data);
            });
    }
    window.addEventListener('scroll', toggleVisible);

    // handle increase cart

    return (
        <Router >
            <Header cart={cart} authenticated={authenticated} handleLogout={handleLogout} />
            {/* </div> */}
            <div className="content">
                <Routes>
                    <Route path=""
                        element={<Home handleIncreaseCart={handleIncreaseCart} />}
                    />
                    <Route path="/home"
                        element={<Home handleIncreaseCart={handleIncreaseCart} />}
                    />
                    <Route path="/shop"
                        element={<Shop handleIncreaseCart={handleIncreaseCart} />}
                    />
                    <Route path="/job"
                        element={<Job />}
                    />
                    <Route path="job-detail/:id"
                        element={<JobDetail />}
                    />
                    <Route path="/cart"
                        element={<Cart cart={cart} setCart={setCart} />}
                    />
                    <Route path="/cart/payment"
                        element={<Payment />}
                    />
                    <Route path="/user"
                        element={<User authenticated={authenticated} />}
                    />
                    <Route path="/login"
                        element={<Login action={onLogined} />}
                    />
                    <Route path="/register"
                        element={<Register />}
                    />
                    <Route path="/user/yourJobs"
                        element={<YourJob />}
                    />
                    <Route path="user/createdJob/:id"
                        element={<CreatedJob />}
                    />
                    <Route path="/cart/payment"
                        element={<Payment setCart={setCart}/>}
                    />


                </Routes>
            </div>

            {/* footer */}
            <footer className="footer">
                <Container>
                    <div className="mouse text-center">
                        <div className="mouse-icon">
                            <BsFillArrowUpCircleFill onClick={scrollToTop}
                                style={{ display: visible ? 'inline' : 'none' }}
                            />
                        </div>
                    </div>
                    <div className="footer-content row">
                        <div className="footer-vegefoods col-sm-6 col-md-3">
                            <h3>Happy Farmers</h3>
                            R???i xa ???n ??o ph??? th???, tr??? v??? v???i v??ng qu?? y??n t??nh. Ng???i tr??n m??i nh?? ng???m ho??ng h??n bu???i t???i th???t d??? ch???u bi???t bao.
                            <div className='media-icon'>
                                <BsTwitter /> &nbsp;
                                <FaFacebook /> &nbsp;
                                <BsInstagram />
                            </div>
                        </div>
                        <div className="footer-menu col-sm-6 col-md-3">
                            <h3>Menu</h3>
                            <ul>
                                <li><a href="/shop">C???a h??ng</a></li>
                                <li><a href="/job">C??ng vi???c</a></li>
                                <li><a href="/user/yourjobs">Qu???n l?? c??ng vi???c</a></li>
                                <li><a href="/user">Trang c?? nh??n</a></li>
                            </ul>
                        </div>
                        <div className="footer-help col-sm-6 col-md-3">
                            <h3>Th??nh vi??n nh??m</h3>
                            <ul>
                                <li>Ph??ng Xu??n Qu??n</li>
                                <li>L??u V??n ????ng</li>
                                <li>Nguy???n Duy Kh??nh</li>
                                <li>Tr???n Ho??ng Vi???t</li>
                            </ul>
                        </div>
                        <div className="footer-contact col-sm-6 col-md-3">
                            <h3>Li??n h???</h3>
                            <ul>
                                {/* <li><BsGeoAltFill />?????i h???c B??ch Khoa H?? N???i</li> */}
                                <li><BsEnvelopeFill /> quanbka00@gmail.com</li>
                                <li><BsEnvelopeFill /> luudong271@gmail.com</li>
                                <li><BsEnvelopeFill /> duykhanhctb@gmail.com</li>
                                <li><BsEnvelopeFill /> hoangviet15ht@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copyright row mt-2">
                        <div className='col-md-12 text-center'>
                            <div><BsFillSuitHeartFill /> Copyright ??2021 Trang web ???????c t???o b???i nh??m 7 <BsFillSuitHeartFill /></div>
                            <div><BsFillSuitHeartFill /> B??? m??n: Th???c h??nh L???p tr??nh web <BsFillSuitHeartFill /></div>
                            <div><BsFillSuitHeartFill /> Gi???ng vi??n: Tr???nh Tu???n ?????t <BsFillSuitHeartFill /></div>
                        </div>
                    </div>
                </ Container>
            </footer>
        </Router>
    );
}

export default React.memo(App);
