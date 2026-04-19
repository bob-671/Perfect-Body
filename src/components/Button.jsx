import { useNavigate } from "react-router-dom";

function Btn(props){
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.link) {
      navigate(props.link);
    }
  };

  return(
    <button 
      onClick={handleClick} 
      className={`button ${props.type || ""}`}
    >
      {props.name}
    </button>
  );
}

export default Btn;