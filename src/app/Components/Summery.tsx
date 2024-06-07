import React from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../Context/GlobalProvider'

function Summery() {

    const {basicSalary, Colors, grossEarnings, grossDeductions,
        employeeEPF, APIT, netSalary, employerEPF, employerETF,
        CTC
    } = useGlobalContext();

  return (

    <StyledSummery theme={Colors}>
        <div>
            <h1 className='text-xl/[32px] font-bold' >Your Salary</h1>
        </div>
        <div className='items-section'>

            <table>
                <thead>
                    <tr className='table-head-row'>
                        <th>Items</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tr>
                    {/* <td style={{ height: '16px' }} colSpan={2}></td> */}
                </tr>
                <tbody>
                    <tr>
                        <td>Basic Salary</td>
                        <td>{basicSalary}</td>
                    </tr>
                    <tr>
                        <td>Gross Earnings</td>
                        <td>{grossEarnings}</td>
                    </tr>
                    <tr>
                        <td>Gross Deductions</td>
                        <td>{grossDeductions}</td>
                    </tr>
                    <tr>
                        <td>Employee EPF (8%)</td>
                        <td>{employeeEPF}</td>
                    </tr>
                    <tr>
                        <td>APIT</td>
                        <td>{APIT}</td>
                    </tr>

                </tbody>

            </table>
            <div className='net-salary-section'>

                <span>Net Salary (Take Home)</span>
                <span>{netSalary}</span>

            </div>
            <div className='contribution-section'>

                <h4>Contribution from the employer</h4>

                <div>
                    <span>Employer EPF (12%)</span>
                    <span>{employerEPF}</span>
                </div>

                <div>
                    <span>Employer ETF (3%)</span>
                    <span>{employerETF}</span>
                </div>

            </div>
            <div className='ctc-div'>
                <span>Cost to Company (CTC)</span>
                <span>{CTC}</span>
            </div>

        </div>
    </StyledSummery>
  )
}

const StyledSummery = styled.div`

    .items-section{
        margin-top : 20px;

        .ctc-div{
                margin-top : 32px;
                display : flex;
                justify-content : space-between;
            }

        .contribution-section{
            margin-top : 24px;

            h4{
             font-size : 14px;
             line-height : 20px;
             font-weight : 600;
             color : ${props => props.theme.tbHeader}
            }

            div{
                display : flex;
                justify-content : space-between;
            }
            
            div:first-of-type{
                margin-top : 12px;
                
            }
            div:nth-of-type(2){
                margin-top : 8px;
            }
            
            
            
            


        }

        .net-salary-section{
            display : flex;
            justify-content : space-between;
            margin-top : 24px;
            border : 2px solid ${props => props.theme.borderColors};
            border-radius : 4px;
            padding : 16px;
            font-weight : 600;
        }

        table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 10px;
        }
        thead{
            margin-bottom : 50px;
        }


        .table-head-row th:first-child,
        .table-head-row th:last-child {
            font-weight : 600;
            font-size : 14px;
            line-height : 20px;
            color : ${props => props.theme.tbHeader}
            
        }
        .table-head-row th:first-child {
            text-align: left;
        }

        .table-head-row th:last-child {
            text-align: right;
        }
        td:first-child {
            text-align: left;
        }
        td:last-child {
            text-align: right;
        }
        
        

        

       
        
    }
    


`;

export default Summery