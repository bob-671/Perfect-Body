import logo from '../assets/brandlogo.png';


function Footer(){
const footerItems =[
    {id:1,  label:'Privacy'},
    {id:2, label:'Terms'},
    {id:3, label:'Contact'},
];
return(
 <footer className="footer">

    <div className='footerLeft'>
        <img src={logo} alt="" className='logo' />
    </div>
    
        <ul className="footerRight">
            {footerItems.map(item => (<li key={item.id} >
                <a className="link" href="">{item.label}</a>
            </li>))}
            
           
        </ul>
        <p>Made with Ai powered device</p>
       </footer>
       
        
);
}
export default Footer