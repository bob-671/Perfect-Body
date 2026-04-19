function Plan(props){
    const handleclick = () =>{
    };
   return(

       <div className="Plan">
            <h1 className="planName">{props.name}</h1>
            <h2 className="price">{props.price}$</h2>
            <p className="planP">{props.desc}</p>
            <button onClick={handleclick}> choose plan</button>
       </div>);
  
   }
Plan.defaultprops={
    name:"plane name",
    price: 0,
    desc:"description"
}
export default Plan