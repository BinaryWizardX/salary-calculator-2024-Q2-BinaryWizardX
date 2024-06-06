"use client";
import React from 'react'
import { useGlobalContext } from '../Context/GlobalProvider'
import styled from 'styled-components';
import Image from 'next/image'
import { MdRefresh } from "react-icons/md";

function Calc() {

    const {salary} = useGlobalContext();


  return (
    <CalcStyles>

        
        
        <div className='section-one bg-[#FAFAFA]  p-5 rounded-lg  '>
            <div className='flex justify-between font-bold'>
                <h1 className='text-xl/[32px]' >Calculate Your Salary</h1>
                <span className='flex gap-1 cursor-pointer items-center'>

                    <MdRefresh className=' w-6 h-6 text-[#0052EA]' />

                    {/* <Image

                    src='/icon color.png'
                    width={25}
                    height={5}
                    alt='reset-image'
                    
                    /> */}
                    <span className='reset-link'>Reset</span>

                </span>
            </div>
            <div className='basic-earnings'>
               <div>       
                <h4>Basic Salary</h4>

                <input
                 value={salary}
                 type='number'
                 placeholder='Basic Salary here ...'
                 />
               </div> 
               <div className='earnings'>
                <h4 className='font'>Earnings</h4>
                <span>Allownce,Fixed Allowance, Bonus and etc</span>
                <button>+ Add New Allowance</button>

               </div> 


            </div>

        </div>

        <div className='section-two'>
            <h1>Allowances</h1>
            <input type='number' placeholder='Allowances here ...' />
        </div>

    </CalcStyles>
    
  )
}

const CalcStyles = styled.main`

    display: flex;
    flex-direction: column ;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap : 20px;

    .earnings{
        margin-top: 20px;
        display : flex; 
        flex-direction: column;
        
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
            color: #0052EA;
            width: 200px;

        }
    }

    .section-one{

        min-width: 100px; 
        width: 600px;
        height:616px;
        border : 1px solid #E0E0E0;
    
    }
    .section-two{
    width : 300px;
    height : 616px;
    background-color : red;
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
    
    
    
    



    `

export default Calc