import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import './App.css'
import { useEffect,useReducer,useState } from "react";
import ReportComponent from "./components/ReportComponent";
import DataContext from "./data/DataContext";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

function App() {
  const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}
  const initData = [
    {id :"1",title:"test",amount:3000},
    {id :"2",title:"test2",amount:-1500}
  ]
  
  const [items,setItems] = useState(initData)
  // const [items,setItems] = useState([])

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem)=>{
      setItems((prevItem)=>{
        return [newItem,...prevItem]
      })
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    console.log(amounts)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    console.log("ยอดรายได้ = ",income)
    // console.log("รายได้ = ",income)
    console.log("ยอดรายจ่าย = ",expense)
    setReportIncome(income)
    setReportExpense(expense)
},[items,reportIncome,reportExpense])

  // reducer
  const [showReport,setshowReport]=useState(true)
  const reducerShowReport = (state,action)=>{
    switch(action.type){
      case "SHOW" :
        return setshowReport(true)
      case "HIDE" :
        return setshowReport(false)
      default:
        return setshowReport(true)
    }
  }
  const [,dispatchShowReport] = useReducer(reducerShowReport,showReport)
  // console.log(resultShowReport)
  // reducer
  const [count]=useState(0)
  const reducer = (state,action)=>{
    switch(action.type){
      case "ADD" :
        return state+action.payload
      case "SUB" :
        return state-action.payload
      case "CLEAR" :
        return 0
      default:
        return 0
    }
  }
  const [result,dispatch] = useReducer(reducer,count)
  
  return (
    <DataContext.Provider value={{income : reportIncome, expense: reportExpense}
    } >
      <Router>
        <div>
          <ul className="horizontal-menu" >
            <li>
              {/* <a href="#" >test</a> */}
              <Link to="/" >
              บัญชีรายรับ - รายจ่าย
              </Link>
            </li>
            <li>
              <Link to="/count" >
              Count
              </Link>
            </li>
          </ul>
        </div>
        
        <Routes>
          <Route path="/" element={
            <div className="container" >
              <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
              {showReport && <ReportComponent/>}
              <div align="center" >
                {/* <h1>{result}</h1> */}
                <button onClick={()=>dispatchShowReport({type:"SHOW"})} >แสดง</button>
                <button onClick={()=>dispatchShowReport({type:"HIDE"})}>ซ่อน</button>
              </div>
              <FormComponent onAddItem={onAddNewItem}/>
              <Transaction items = {items}/>
            </div>} />
        
          <Route path="/count" element={
            <div className="container" >
            <h1 style={design}>Count</h1><div align="center" >
              <h1>{result}</h1>
              <button onClick={()=>dispatch({type:"ADD",payload:1})} >เพิ่ม</button>
              <button onClick={()=>dispatch({type:"SUB",payload:1})}>ลด</button>
              <button onClick={()=>dispatch({type:"CLEAR"})}>ล้าง</button>
            </div>
            </div>
            }
             />

        </Routes>
      </Router>
      </DataContext.Provider>  

  );
}

export default App;
