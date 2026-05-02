import { Link } from "react-router-dom";

function Btn(props){
  return(
    <Link to={props.link}>
      <button className={`button ${props.type || ""}`}>
        {props.name}
      </button>
    </Link>
  );
}

export default Btn;