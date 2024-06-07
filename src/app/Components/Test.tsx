import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
import { useGlobalContext } from '../Context/GlobalProvider'
import { IoMdClose } from "react-icons/io";
import {Earning, Deduction} from '@/types/types'

export default function MyModal() {

    const {isOpen, setIsOpen, mode, method, input1,setInput1,input2,
        setInput2, isCheckd, setIsChecked, earnings,
        deductions,setDeductions,setEarnings,amountId
    } = useGlobalContext();

    
    
    

    function updateState({name, value}: {name: string, value: string }) {
      switch (name) {
          case 'input1':
              setInput1(value);
              break;
          case 'input2':
              setInput2(Number(value));
              break;
          default:
              break;
      }
  }

  function addFunction (){

    if (mode === 'Earnings') {
      setEarnings((prevEarnings: Earning[]) => [
        ...prevEarnings,
        { id: Date.now(), name: input1, amount: input2, EPF_ETF: isCheckd },
    ]);
  } else if (mode === 'Deductions') {
    setDeductions((prevDeductions: Deduction[]) => [
      ...prevDeductions,
      { id: Date.now(), name: input1, amount: input2, EPF_ETF: isCheckd },
  ]);
  }
   setInput1('');
    setInput2('');
    setIsChecked(false);
     
  }

  function updateFunction() {
    if (mode === 'Earnings') {
        setEarnings((prevEarnings: Earning[]) =>
            prevEarnings.map((earning) =>
                earning.id === amountId
                    ? { ...earning, name: input1, amount: input2, EPF_ETF: isCheckd }
                    : earning
            )
        );
    } else if (mode === 'Deductions') {
        setDeductions((prevDeductions: Deduction[]) =>
            prevDeductions.map((deduction) =>
                deduction.id === amountId
                    ? { ...deduction, name: input1, amount: input2, EPF_ETF: isCheckd }
                    : deduction
            )
        );
    }
    setInput1('');
    setInput2('');
    setIsChecked(false);
}

  function updateCheckbox() {
      setIsChecked(!isCheckd);
  }


  

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none " onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded bg-white  backdrop-blur-2xl">

                    <div className='flex items-start justify-between  h-[40px] px-4 pt-6 pb-12 border-b-2 border-sky-600'>
                        <DialogTitle className="text-base font-semibold">
                          {method === 'Add' ? 'Add ' : 'Edit'}
                          {method === 'Add' ? ' New ' : ' '}
                          {mode === 'Earnings' ? 'Earnings' : 'Deductions'}
                           </DialogTitle>

                        <IoMdClose className='text-2xl cursor-pointer hover:text-red-600'
                            onClick={close}
                        />

                        

                    </div>

                    <form
                      onSubmit={(e)=>{
                        e.preventDefault();
                        if(method === 'Add'){
                            addFunction();
                        }else{
                            updateFunction();
                        
                        }
                      }}
                    >

                        <div className='mt-8 mx-6 '>
                            <h4 className='font-semibold text-sm text-[#00318C] mb-2'>{mode === 'Earnings' ? 'Earning' :'Deduction'} Name</h4>
                            <input 
                            className='w-full font-normal text-sm px-4 py-1.5 rounded border-[1px] border-[#E0E0E0]'
                                type='text'
                                placeholder='Eg: Travel'
                                value={input1}
                                onChange={(e) => updateState({name: 'input1', value: e.target.value})}
                            
                            />


                            

                        </div>

                        <div className='mx-6 mt-6'>
                            <h4 className='font-semibold text-sm text-[#00318C] mb-2'>Amount</h4>
                            <input 
                            className='w-full font-normal text-sm px-4 py-1.5 rounded border-[1px] border-[#E0E0E0]'
                                type='number'
                                placeholder='Eg: 10,000'
                                value={input2 || ''}
                                onChange={(e) => updateState({name: 'input2', value: e.target.value})}
                            
                            />
                        </div>

                        <div className='mt-6 mx-6 flex gap-2'>
                            <input
                                className='w-6 h-6'
                                type='checkbox'
                                checked={isCheckd}
                                value={isCheckd.toString()}
                                onChange={updateCheckbox}
                            />
                            <span className='text-sm font-normal'>EPF/ETF</span>
                        </div>

                        <div className=' rounded mt-6 bg-[#FAFAFA] flex justify-end px-6 py-4 '>

                            <div className='flex gap-8'>

                                <Button
                                    onClick={close}
                                 className='text-[#0052EA] font-medium text-sm'>
                                    Cancel
                                </Button>

                                <Button
                                   type='submit'
                                    className='   bg-[#0052EA] text-white font-semibold text-sm  rounded px-2.5 py-4'
                                    onClick={close}
                                >
                                    {method === 'Add' ? 'Add' : 'Update'}
                                </Button>
                            </div>

                        </div>

                    </form>
                    


                  
                  
                  
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}