"use client";
import Image from 'next/image'
import IconCard from '../assets/card-logo.svg'
import VisaCard from '../assets/visa-logo.png'
import MasterCard from '../assets/mastercard.png'
import Discover from '../assets/discover.png'
import Dinners from '../assets/dinners-club.png'
import styles from './page.module.css'
import SuccessMessage from '../components/successMessage';
import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion';


export default function Home() {
  const [valueNameCard, setValueNameCard] = useState('')
  const [valueNumberCard, setValueNumberCard] = useState('')
  const [valueMonthCard, setValueMonthCard] = useState('')
  const [valueYearCard, setValueYearCard] = useState('')
  const [valueCvc, setvalueCvc] = useState('')
  const [messageSuccess, setMessageSuccess] = useState(false)

  const [errorMessageName, setErrorMessageName] = useState(false)
  const [errorMessageNumber, setErrorMessageNumber] = useState(false)
  const [errorMessageNumberMonth, setErrorMessageNumberMonth] = useState(false)
  const [errorMessageNumberYear, setErrorMessageNumberYear] = useState(false)
  const [errorMessageNumberSecurityCode, setErrorMessageNumberSecurityCode] = useState(false)

  const numberFormatCard = (e:any) => {
    const inputCardNumber = e.target.value
    const newNumberFormat = inputCardNumber
    .split('')
    .map((char:any, index:any) => (index % 4 === 3 ? `${char} ` : char))
    .join('');
    setValueNumberCard(newNumberFormat);
  }

  const identifyCardBrand = (cardNumber:string) => {  
    if (/^4/.test(cardNumber)) {
      return <Image
              src={VisaCard}
              alt='Visa Card'
              className='w-24'
            />;
    } else if (/^5[1-5][0-9]/.test(cardNumber) ||
              /^5[1-5][0-9]|2(22[1-9][0-9]|2[3-9][0-9]|[3-6][0-9]|7[0-1][0-9]|720[0-9])/.test(cardNumber) ||
              /^5[1-5][0-9]|2[2-7][0-9]/.test(cardNumber)) {
      return <Image
            src={MasterCard}
            alt='MasterCard'
            className='w-24'
          />;
    } else if (/^(34|37)/.test(cardNumber)) {
      return <span className='text-white text-lg uppercase font-extrabold tracking-widest-american text-center'>
        American Express
      </span>;
    } else if (/^(6011|622|64|65)/.test(cardNumber)) {
      return <Image
      src={Discover}
      alt='Discover'
      className='w-32'
    />;
    }else if (/^(36|38|30[0-5])/.test(cardNumber)) {
      return <Image
      src={Dinners}
      alt='Dinners Club'
      className='w-32'
    />;
    } 
    else {
      return <Image
      src={IconCard}
      alt='Not Found'
    />;
    }
  };

  // Validation form
  const formValidation = (e:FormEvent) =>{
    e.preventDefault()
    if (!errorMessageName && !errorMessageNumber && !errorMessageNumberMonth && !errorMessageNumberSecurityCode && !errorMessageNumberYear ) {
      setMessageSuccess(true)
    }
    
  }

  const year = new Date().getFullYear().toString().slice(-2);

  return (
    <main className={styles.main}>
        <div className="w-full h-100">
            <div className="flex h-screen max-lg:flex-col">
              <div className="boxCardAbsolute flex items-center justify-end h-screen w-2/5">
                  <div className="boxAllsCard w-full relative">
                    <div className="boxFrontCard">
                      <div className="headerCard pt-4 pl-3">
                        {identifyCardBrand(valueNumberCard)}
                      </div>
                      <div className="boxNumber absolute bottom-16 left-5">
                        <span className='font-semibold text-white tracking-widest text-2xl'>
                        {valueNumberCard ? valueNumberCard : '0000 0000 0000 0000'}
                        </span>
                      </div>
                      <div className="boxNamePerson left-5 bottom-4 absolute">
                          <span className='font-normal text-white tracking-widest text-sm'>
                            {valueNameCard ? valueNameCard : 'Felipe Soares de Godoy Pinho'}
                          </span>
                      </div>
                      <div className="validateData absolute right-16 bottom-4 ">
                          <span className='font-normal text-white tracking-widest text-sm'>
                            {valueMonthCard ? valueMonthCard : '07'} / {valueYearCard ? valueYearCard : '31'}
                          </span>
                      </div>
                    </div>
                    <div className="boxBackCard">
                        <div className="securityNumber absolute right-20">
                          <span className='font-normal text-white tracking-widest text-lg'>
                            {valueCvc ? valueCvc : '000'}
                          </span>
                        </div>
                    </div>
                  </div>
              </div>
              {
                !messageSuccess ?
                <motion.div
                  initial={{y: "50%", opacity:0, scale: 0.5}}
                  animate={{y:"0",  opacity:1, scale:1}}
                  transition={{duration: 0.4, ease: 'easeIn'}}
                  className="flex items-center max-md:justify-center boxMotionRight"
                  >
                <form className='formCard my-auto' onSubmit={formValidation}>
                <div className="boxInput grid gap-2 mt-4">
                  <label className='font-semibold text-sm'>
                    CARDHOLDER NAME
                  </label>
                  <input type="text" id='cardName' className={`w-80 rounded-lg py-2 px-3 border-2 focus:${errorMessageName ? 'border-red-700' : 'border-gray-200'} ${errorMessageName ? 'border-red-700' : 'border-gray-200'}`} name="nameCard" placeholder='Felipe Soares de Godoy Pinho'
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setValueNameCard('');
                    } else{
                      const onlyLetters = /^[a-zA-Z\s]+$/;
                      if (onlyLetters.test(e.target.value)) {
                        setValueNameCard(e.target.value);
                        setErrorMessageName(false)
                      } else{
                        setErrorMessageName(true)
                      } 
                    }          
                  }}
                  maxLength={30}
                  required
                   />
                </div>
                {
                  errorMessageName &&
                  <div className="errorBox mt-2 pl-1">
                      <span className='text-red-700'>This field only accepts letters</span>
                  </div>
                }

                <div className="boxInput grid gap-2 mt-4">
                  <label className='font-semibold text-sm'>
                    CARD NUMBER
                  </label>
                  <input type="text" className={`w-80 rounded-lg py-2 px-3 border-2 focus:${errorMessageNumber ? 'border-red-700' : 'border-gray-200'} ${errorMessageNumber ? 'border-red-700' : 'border-gray-200'}`} name="cardNumber" placeholder='1234 5678 9123 0000' 
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setValueNumberCard('');
                    } else {
                      const onlyNumbers = /^[0-9]+$/;
                      if (onlyNumbers.test(e.target.value)) {
                        numberFormatCard(e);
                        setErrorMessageNumber(false);
                      } else {
                      setErrorMessageNumber(true);
                    }
                  }}}
                  maxLength={16}
                  required
                  />

                {
                  errorMessageNumber &&
                  <div className="errorBox pl-1">
                      <span className='text-red-700'>This field only accepts numbers</span>
                  </div>
                }

                </div>
                <div className="boxDateValidateAndCvc flex gap-4 mt-4">
                  <div className="dateValidate">
                    <label className='font-semibold text-sm'>
                      EXP.DATE (MM/YY)
                    </label>
                      <div className="allInputDate mt-2 flex gap-2">
                        <div className="month">
                        <input type="text" className={`w-24 rounded-lg py-2 px-3 border-2 focus:${errorMessageNumberMonth ? 'border-red-700' : 'border-gray-200'} ${errorMessageNumberMonth ? 'border-red-700' : 'border-gray-200'}`} name="monthCard" placeholder='MM'
                        onChange={(e) => {
                          if (e.target.value === '') {
                            setValueMonthCard('');
                          } else {
                            const onlyNumbers = /^[0-9]+$/;
                            if (onlyNumbers.test(e.target.value) && parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 12) {
                              setValueMonthCard(e.target.value)
                              setErrorMessageNumberMonth(false);
                            } else {
                            setErrorMessageNumberMonth(true);
                          }
                        }}}
                        maxLength={2}
                        required
                        />
                        {
                          errorMessageNumberMonth &&
                          <div className="errorBox monthBox pl-1 mt-1 w-24">
                              <p className='text-red-700 text-xs m-0'>Only numbers 01 to 12</p>
                          </div>
                        }
                      </div>
                      <div className="year">
                        <input type="text" className={`w-24 rounded-lg py-2 px-3 border-2 focus:${errorMessageNumberYear ? 'border-red-700' : 'border-gray-200'} ${errorMessageNumberYear ? 'border-red-700' : 'border-gray-200'}`} name="yearCard" placeholder='YY'
                        onChange={(e) => {
                          if (e.target.value === '') {
                            setValueYearCard('');
                          } else {
                            const onlyNumbers = /^[0-9]+$/;                            
                            if (onlyNumbers.test(e.target.value) && parseInt(e.target.value) >= parseInt(year)) {
                              setValueYearCard(e.target.value)
                              setErrorMessageNumberYear(false);
                            } else {
                            setErrorMessageNumberYear(true);
                          }
                        }}}
                        maxLength={2}
                        required
                        />
                        {
                          errorMessageNumberYear &&
                          <div className="errorBox monthBox pl-1 mt-1 w-24">
                              <p className='text-red-700 text-xs m-0'>Only years from {year}</p>
                          </div>
                        }
                      </div>
                      </div>
                  </div>
                  <div className="cvcCode mt-2">
                    <label className='font-semibold text-sm mb-4'>
                      CVC
                    </label>
                      <div className="cvc">
                        <input type="text" className={`w-24 rounded-lg py-2 px-3 border-2 focus:${errorMessageNumberSecurityCode ? 'border-red-700' : 'border-gray-200'} ${errorMessageNumberSecurityCode ? 'border-red-700' : 'border-gray-200'}`} name="cvcCode" placeholder='123'
                        onChange={(e) => {
                          if (e.target.value === '') {
                            setvalueCvc('');
                          } else {
                            const onlyNumbers = /^[0-9]+$/;
                            if (onlyNumbers.test(e.target.value)) {
                              setvalueCvc(e.target.value)
                              setErrorMessageNumberSecurityCode(false);
                            } else {
                            setErrorMessageNumberSecurityCode(true);
                          }
                        }}}
                        maxLength={3}
                        required
                        />
                       {
                          errorMessageNumberSecurityCode &&
                          <div className="errorBox monthBox pl-1 mt-1 w-24">
                              <p className='text-red-700 text-xs m-0'>Este campo só aceita números</p>
                          </div>
                        }
                      </div>
                  </div>
                </div>
                <div className="btnConfirm mt-5">
                    <button type='submit' className='bg-[#22092F] text-white font-normal w-80 p-2 rounded-lg'>
                      Confirm
                    </button>
                  </div>
              </form> 
              </motion.div> 
              :
                <SuccessMessage setMessageSuccess={setMessageSuccess} />
              }


            </div>
        </div>
    </main>
  )
}
