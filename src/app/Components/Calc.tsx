"use client";
import React from 'react'
import { useGlobalContext } from '../Context/GlobalProvider'
import styled from 'styled-components';
import Image from 'next/image'
import { MdRefresh } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GoCheck } from "react-icons/go";
import Summery from './Summery';
import Test from './Test';
import {Earning, Deduction} from '@/types/types'


function Calc() {

    const {basicSalary, setBasicSalary, Colors, isOpen, setIsOpen, setMode, setMethod,
        earnings, deductions, input1,setInput1,input2,
        setInput2, isCheckd, setIsChecked,setAmountId,setDeductions,
        setEarnings,
    } = useGlobalContext();

    const handleEdit = ({id,name,amount,EPF_ETF}:Earning)=>{
        setAmountId(id)
        setInput1(name)
        setInput2(amount)
        setIsChecked(EPF_ETF)

        


    }

    const handleDelete = (mode: string, id: number) => {
        if (mode === 'Earnings') {
            setEarnings((prevEarnings: Earning[]) =>
                prevEarnings.filter((earning) => earning.id !== id)
            );
        } else if (mode === 'Deductions') {
            setDeductions((prevDeductions: Deduction[]) =>
                prevDeductions.filter((deduction) => deduction.id !== id)
            );
        }
    };

    const handleReset = ()=>{
        setBasicSalary(0)
        setEarnings([])
        setDeductions([])
    }
    


  return (
    <CalcStyles theme={Colors}>

        
        
        <div className='section-one bg-[#FAFAFA]  p-5 rounded-lg  '>
            <div className='flex justify-between font-bold'>
                <h1 className='text-xl/[32px]' >Calculate Your Salary</h1>
                <button
                onClick={handleReset}
                 className='flex gap-1 cursor-pointer items-center'>

                    <MdRefresh style={{color : Colors.Colorblue}} className=' w-6 h-6 ' />

                    {/* <Image

                    src='/icon color.png'
                    width={25}
                    height={5}
                    alt='reset-image'
                    
                    /> */}
                    <span className='reset-link'>Reset</span>

                </button>
            </div>
            <div className='basic-earnings'>
               <div>       
                <h4>Basic Salary</h4>

                <input
                 value={basicSalary || ""}
                 type='number'
                 placeholder='Basic Salary here ...'
                 onChange={(e)=> setBasicSalary(Number(e.target.value))}
                 />
               </div> 
               <div className='earnings-deductions'>
                <h4 className='font'>Earnings</h4>
                
                <span>Allownce,Fixed Allowance, Bonus and etc</span>

                <ul>
                    {earnings.map((earning: Earning)=>{
                        return(
                            <li key={earning.id}>
                                <div className='divider'>{earning.name} : {earning.amount}</div>
                                {earning.EPF_ETF && <div><GoCheck style={{color: Colors.Colorblue}} /> <span>EPF/ETF</span></div>}
                                <div className='flex gap-2'><MdModeEdit className='cl-ed-icons' onClick={()=> {
                                    setIsOpen(true)
                                    setMode('Earnings')
                                    setMethod('Edit')
                                    handleEdit({id:earning.id,name: earning.name, amount: earning.amount, EPF_ETF: earning.EPF_ETF})
                                    }} /> <IoMdClose 
                                    className='cl-ed-icons' 
                                    onClick={
                                        ()=> handleDelete('Earnings',earning.id)
                                    }
                                    /></div>
                                </li>
                        )
                    })}
                </ul>
                <button onClick={()=>{
                    setIsOpen(true)
                    setMode('Earnings')
                    setMethod('Add')
                    }}>+ Add New Allowance</button>

               </div> 

               {/**Deductions */}

               <div className='earnings-deductions !border-none'>
                <h4>Deductions</h4>
                <span>Insurance, Tax, Loan and etc</span>
                <ul>
                    {deductions.map((deduction:Deduction)=>{
                        return(
                            <li key={deduction.id}>
                                <div className='divider'>{deduction.name} : {deduction.amount}</div>
                                {deduction.EPF_ETF && <div><GoCheck style={{color: Colors.Colorblue}} /> <span>EPF/ETF</span></div>}
                                <div className='flex gap-2'><MdModeEdit className='cl-ed-icons' onClick={()=>{
                                    setIsOpen(true)
                                    setMode('Deductions')
                                    setMethod('Edit')
                                    handleEdit({id:deduction.id,name: deduction.name, amount: deduction.amount, EPF_ETF: deduction.EPF_ETF})
                                }}/> <IoMdClose

                                onClick={
                                    ()=> handleDelete('Deductions',deduction.id)
                                }

                                 className='cl-ed-icons'
                                  /></div>
                                </li>
                        )
                    })}
                </ul>
                <button onClick={()=> {
                    setIsOpen(true)
                    setMode('Deductions')
                    setMethod('Add')
                    }}>+ Add New Deduction</button>
               </div>


            </div>

        </div>

        <div className='section-two p-5 rounded-lg'>

            <Summery/>
            
        </div>

        <Test/>



    </CalcStyles>
    
  )
}

const CalcStyles = styled.main`

    display: flex;
    flex-direction: row ;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap : 20px;

   


    .cl-ed-icons{
     
     background-color : ${props => props.theme.iconsBackground};
     font-size : 27px;
     border-radius : 50%;
     padding : 5px;
     cursor : pointer;
     
    }
    

    .earnings-deductions{
        margin-top: 20px;
        display : flex; 
        flex-direction: column;
        padding-bottom : 20px;
        border-bottom : 1px solid #E0E0E0;

        ul{
            margin-top : 20px;
            display :flex;
            flex-direction: column;
            gap : 10px;
            max-height : 70px;
            overflow-y: auto;

            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap : 10px;

                div{
                    display: flex;
                }
            }
            .divider{
                padding-right : 5px;
                border-right : 1px solid #E0E0E0;
            }

        }
        
        
        h4{
            font-weight: 600;
            font-size : 16px;
            line-height: 24px;

        }
        span{
        font-weight : 400;
        font-size : 12px;
        font-height : 20px;
        color: #757575;
        }
        button{
            color: ${props => props.theme.Colorblue};
            width: 200px;
            text-align: left;
            margin-top : 20px;

        }
    }

    .section-one{

        width: 100%;
        max-width: 450px;
        height: 580px;
        border : 1px solid #E0E0E0;
    
    }
    .section-two{
    width : 100%;
    max-width : 400px;
    height : 580px;
    border : 1px solid ${props => props.theme.borderColors}

    }
    
    

    .reset-link {
    font-weight : 500;
    font-size : 14px;
    line-height : 20px;
    color : #0052EA;
    }
    .basic-earnings{
     
        margin-top: 20px;

        h4{
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            
        }

        input{
         
            width: 300px;
            height: 48px;
            border: 1px solid #E0E0E0;
            border-radius: 4px;
            padding: 12px 15px;
            margin-top: 8px;

        }
    }

     @media screen and (max-width: 750px) {
        flex-direction: column;
        gap : 20px;
        margin-top : 70px;

        .section-two{
            
            max-width : 446px;
            width : 446px;
            margin-bottom : 70px;
            

        }
    }
    
    
    
    



    `

export default Calc