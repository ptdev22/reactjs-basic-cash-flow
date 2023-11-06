
import DataContext from '../data/DataContext'
import { useContext } from 'react'
import "./ReportComponent.css" 
import { FormatNumber } from "../function/Function.js";


const ReportComponent = ()=>{
    const {income,expense} = useContext(DataContext)
    return(
        <div>
           <h4>ยอดคงเหลือ (บาท)</h4>
           <h1>฿{FormatNumber(income-expense)}</h1>
           <div className='report-container' >
                <div>
                    <h4>ยอดรายรับ</h4>
                    <p className='report plus' >฿{FormatNumber(income)}</p>
                </div>
                <div>
                    <h4>ยอดรายจ่าย</h4>
                    <p className='report minus' >฿{FormatNumber(expense)}</p>
                </div>
           </div>
        </div>
    )
}

export default ReportComponent