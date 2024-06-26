"use client";

import React, { useContext, useState ,createContext, useEffect} from "react";
import {Colors} from "../Context/Colors"
import { type } from "os";


const GlobalContext = createContext();
const updateGlobalContext = createContext();


export function GlobalProvider({children}){

    const [basicSalary, setBasicSalary] = useState(Number(localStorage.getItem('basicSalary')) || 0);
    const [TotalEarnings, setTotalEarnings] = useState(Number(localStorage.getItem('TotalEarnings')) || 0);
    const [grossEarnings, setGrossEarnings] = useState(Number(localStorage.getItem('grossEarnings')) || 0);
    const [TotalEarningsForEPF, setTotalEarningsForEPF] = useState(Number(localStorage.getItem('TotalEarningsForEPF')) || 0);

    const [grossSalaryforEPF, setGrossSalaryForEPF] = useState(Number(localStorage.getItem('grossSalaryforEPF')) || 0);
    const [grossDeductions, setGrossDeductions] = useState(Number(localStorage.getItem('grossDeductions')) || 0);
    const [employeeEPF, setEmployeeEPF] = useState(Number(localStorage.getItem('employeeEPF')) || 0);


    const [APIT, setAPIT] = useState(Number(localStorage.getItem('APIT')) || 0);
    const [netSalary, setNetSalary] = useState(Number(localStorage.getItem('netSalary')) || 0);
    const [employerEPF, setEmployerEPF] = useState(Number(localStorage.getItem('employerEPF')) || 0);
    const [employerETF, setEmployerETF] = useState(Number(localStorage.getItem('employerETF')) || 0);


    const [CTC, setCTC] = useState(Number(localStorage.getItem('CTC')) || 0);
    const [isOpen, setIsOpen] = useState(localStorage.getItem('isOpen') === 'true');
    const [mode, setMode] = useState(localStorage.getItem('mode') || "Earnings");


    const [method, setMethod] = useState(localStorage.getItem('method') || "Add");
    const [input1, setInput1] = useState(localStorage.getItem('input1') || "");
    const [input2, setInput2] = useState(Number(localStorage.getItem('input2')) || 0);


    const [isCheckd, setIsChecked] = useState(localStorage.getItem('isCheckd') === 'true');
    const [earnings, setEarnings] = useState(JSON.parse(localStorage.getItem('earnings')) || []);
    const [deductions, setDeductions] = useState(JSON.parse(localStorage.getItem('deductions')) || []);
    const [amountId, setAmountId] = useState(Number(localStorage.getItem('amountId')) || 0);

     console.log(earnings)
    //Calculations

    useEffect(() => {

        //Total Earnings
        const totalEarningsFromEarningsArray = earnings.reduce((total, earning) => total + earning.amount, 0);
        const TtlEarnings = basicSalary + totalEarningsFromEarningsArray;
        setTotalEarnings(TtlEarnings);

        //Total Earnings for EPF
        const earningsForEPF = earnings.filter(earning => earning.EPF_ETF);
        

        const totalEarningsFromEarningsArrayForEPF = earningsForEPF.reduce((total, earning) => total + earning.amount, 0);
        

        const TEFEPF = basicSalary + totalEarningsFromEarningsArrayForEPF;

        setTotalEarningsForEPF(TEFEPF);
        

    }, [earnings, basicSalary]);

    useEffect(() => {
        //Gross Deductions
        const totalDeductions = deductions.reduce((total, deduction) => total + deduction.amount, 0);
        setGrossDeductions(totalDeductions);


    }, [deductions]);

    useEffect(() => {
        //Gross Earnings
        const GrossEarnings = TotalEarnings - grossDeductions;
        setGrossEarnings(GrossEarnings);
    }, [TotalEarnings, grossDeductions]);

    useEffect(() => {
        //Gross Salary for EPF
        const grossSalaryforEPF_var = TotalEarningsForEPF - grossDeductions;
        setGrossSalaryForEPF(grossSalaryforEPF_var);
    }, [grossEarnings]);

    useEffect(()=>{
        //Employee EPF
        const employeeEPF_var = grossSalaryforEPF * 0.08;
        setEmployeeEPF(employeeEPF_var);

        //Employer EPF
        const employerEPF_var =  grossSalaryforEPF * 0.12;
        setEmployerEPF(employerEPF_var);

        //Employer ETF
        const employerETF_var = grossSalaryforEPF * 0.03;
        setEmployerETF(employerETF_var);



    },[grossSalaryforEPF])

    function calculateAPIT(grossEarnings){

        let taxpercentage = 0;
        let constant = 0;

        if(grossEarnings <= 100000 ){
            return 0;

        }else if(grossEarnings <= 141667 ){

            taxpercentage = 0.06;
            constant = 6000;

        }else if (grossEarnings <= 183333){

            taxpercentage = 0.12;
            constant = 14500;

        }else if(grossEarnings <= 225000){

            taxpercentage = 0.18;
            constant = 25500;

        }else if(grossEarnings <= 266667){

            taxpercentage = 0.24;
            constant = 39000;

        }else if(grossEarnings <=308333){

            taxpercentage = 0.3;
            constant = 55000;

        }else{
            taxpercentage = 0.36;
            constant = 73500;
        }

        return (grossEarnings * taxpercentage) - constant;
        
    }


    useEffect(()=>{
        //APIT
        const APIT_var = calculateAPIT(grossEarnings);
        setAPIT(APIT_var)

    },[grossEarnings])

    useEffect(()=>{

        //Net Salary

        const netSalary_var = grossEarnings - employeeEPF - APIT;
        setNetSalary(netSalary_var);


    },[grossEarnings,employeeEPF,APIT])

    useEffect(()=>{
        //CTC
        const CTC_var = grossEarnings + employerEPF + employerETF;
        setCTC(CTC_var);

    },[grossEarnings,employerEPF,employerETF])


    useEffect(() => {
        localStorage.setItem('basicSalary', basicSalary);
        localStorage.setItem('TotalEarnings', TotalEarnings);
        localStorage.setItem('grossEarnings', grossEarnings);
        localStorage.setItem('TotalEarningsForEPF', TotalEarningsForEPF);
        localStorage.setItem('grossSalaryforEPF', grossSalaryforEPF);
        localStorage.setItem('grossDeductions', grossDeductions);
        localStorage.setItem('employeeEPF', employeeEPF);
        localStorage.setItem('APIT', APIT);
        localStorage.setItem('netSalary', netSalary);
        localStorage.setItem('employerEPF', employerEPF);
        localStorage.setItem('employerETF', employerETF);
        localStorage.setItem('CTC', CTC);
        localStorage.setItem('isOpen', isOpen);
        localStorage.setItem('mode', mode);
        localStorage.setItem('method', method);
        localStorage.setItem('input1', input1);
        localStorage.setItem('input2', input2);
        localStorage.setItem('isCheckd', isCheckd);
        localStorage.setItem('earnings', JSON.stringify(earnings));
        localStorage.setItem('deductions', JSON.stringify(deductions));
        localStorage.setItem('amountId', amountId);
    }, [basicSalary, TotalEarnings, grossEarnings, TotalEarningsForEPF, 
        grossSalaryforEPF, grossDeductions, employeeEPF, APIT, 
        netSalary, employerEPF, employerETF, CTC, isOpen, mode, 
        method, input1, input2, isCheckd, earnings, 
        deductions, amountId]);


    

    
    
   
   


    return(
        <GlobalContext.Provider value={{
            basicSalary, 
            setBasicSalary, 
            Colors,
            grossEarnings,
            setGrossEarnings,
            grossDeductions,
            setGrossDeductions,
            employeeEPF,
            setEmployeeEPF,
            APIT,
            setAPIT,
            netSalary,
            setNetSalary,
            employerEPF,
            setEmployerEPF,
            employerETF,
            setEmployerETF,
            CTC,
            setCTC,
            isOpen,
            setIsOpen,
            mode,
            setMode,
            method,
            setMethod,
            earnings,
            deductions,
            setDeductions,
            setEarnings,
            input1,
            setInput1,
            input2,
            setInput2,
            isCheckd,
            setIsChecked,
            amountId,
            setAmountId,
            }}>
            <updateGlobalContext.Provider value={{}}>
                {children}
            </updateGlobalContext.Provider>
           
        </GlobalContext.Provider>

    )

    
}

export const  useGlobalContext = () => useContext(GlobalContext);
export const useUpdateGlobalContext = () => useContext(updateGlobalContext)