import React from 'react';
import * as Styled from './styles'
import Image from 'next/image';
import iconSuccess from '../../assets/icon-complete.svg'
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  setMessageSuccess: (value:boolean) => void
}

export default function SuccessMessage({setMessageSuccess}:SuccessMessageProps) {
  return(
    <motion.div
    initial={{y: "50%", opacity:0, scale: 0.5}}
    animate={{y:"0",  opacity:1, scale:1}}
    transition={{duration: 0.4, ease: 'easeIn'}}
    className="mainMotion flex items-center justify-center"
    >
      <Styled.boxMessageValidate className='flex items-center justify-center'>
          <div className="boxAll">
            <div className="headerIcon mx-auto flex justify-center my-2">
              <Image src={iconSuccess} alt='Success'/>
            </div>
            <div className="boxMessage text-center">
              <div className="title mt-10 mb-8">
                <h5 className='uppercase font-bold text-2xl'>Thank You</h5>
              </div>
              <div className="subtitle mb-8">
                <h6 className='text-[#9D9A9F] font-semibold text-xl'>Your credit card information has been sent</h6>
              </div>
              <button className='bg-[#22092F] text-white font-normal w-80 p-2 rounded-lg'
              onClick={() => setMessageSuccess(false)}
              >
                Send Again
              </button>
            </div>
          </div>
      </Styled.boxMessageValidate>
      </motion.div>

  )
}
