import React from 'react'
import {FiFacebook, AiOutlineHeart, AiOutlineInstagram,} from 'react-icons/all';
import {IoLogoYoutube} from 'react-icons/io'
import { Input,Stack } from '@chakra-ui/react'
import './Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>

                <div className="footerNews">
                    <h1>Newsletter</h1>
                    <ul>
                        <li>
                            <Stack spacing={3}>
                            <Input variant="flushed" placeholder="email@example.com" size="10" width="200px"/>
                            </Stack>
                        </li>
                        <li>
                            <button className="footerBtn">Subscribe</button>
                        </li>
                    </ul>
                </div>

                <div className="creditsIcons">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" className="img1"/></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png" className="img2" /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png" className="img3" /></li>
                        <li><img src="https://i.imgur.com/IDHC2iv.png" className="img4" /></li>
                    </ul>
                    
                </div>
                
                <div className="paragraphFooter"><p>Copyright ©2025 All rights reserved | This Website is made with ♡ by Az Developer</p>
                <Link to = '' >Babalola Abdulazeez</Link>
                <Link to = ''  >Azbab Design Hub</Link>
                <Link to = ''  >@alltech</Link>
                </div>



            </footer>

        </div>
    )
}

export default Footer;
