import logo from '../assets/brandlogo.png';
import Button from '../components/Button';
function Nav() {

    const navItems = [
        { id: 1, label: 'Features' },
        { id: 2, label: 'Pricing' },
        { id: 3, label: 'Blog' },
        { id: 4, label: 'About' },
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
                        <a href={`${item.label.toLowerCase()}`}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div >
                <Button name="Login" type="default"/>

                <Button name="Sign up" type="primary"/>
            </div>
           
        </nav>
    );
}

export default Nav;