import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faInstagram, faTwitter, faFacebook} from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    height: 50px;
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .copyright{
        padding: 5px;
        font-size: 11px;
    }
    .icons a{
        color: black;
        padding: 10px;

    }
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <div className='copyright'>
                ©2023 by create_react_app.com, Inc.
            </div>
            <div className='icons'>
                <NavLink to="https://www.tiktok.com/"><FontAwesomeIcon icon={faTiktok} /></NavLink>
                <NavLink to="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></NavLink>
                <NavLink to="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></NavLink>
                <NavLink to="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></NavLink>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;