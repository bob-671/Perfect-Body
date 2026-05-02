import logo from '../assets/brandlogo.png';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Nav() {

    const navItems = [
        { id: 1, label: 'Features', path: '/features' },
        { id: 2, label: 'Pricing', path: '/pricing' },
        { id: 3, label: 'Blog', path: '/blog' },
        { id: 4, label: 'About', path: '/about' },
    ];

    return (
        <nav className="nav">

            <div className="nav_left">
                <img src={logo} alt="brand logo" className="logo" />
                <h2>Perfect Body</h2>
            </div>

            <ul className="nav_ul">
                {navItems.map(item => (
                    <li key={item.id} className="nav_li">
                        <Link to={item.path}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div>
                <Link to="/login">
                    <Button name="Login" type="default" link="/login"/>
                </Link>

                <Link to="/signup">
                    <Button name="Sign up" type="primary" link="/signup"/>
                </Link>
            </div>

        </nav>
    );
}

export default Nav;