import './App.css';
import FormInsert from "./Components/FormInsert";

const Title = ()=> {
  const Design = {color:'#2E86C1',textAlign:"center",fontSize:'2rem',}
  return (
    <h1 style={Design}>กรอกเลขเอกสารดักลดหนี้</h1>
  )
}

function App(){
  return(
    <div className="container">
      <Title/>
      <FormInsert/>
    </div>
  )
}

export default App;
