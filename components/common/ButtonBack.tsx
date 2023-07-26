'use client';

import { CustomButton } from '../CustomInputs/CustomButton';
import { useRouter } from 'next/navigation';

export default function ButtonBack() {
   const router = useRouter();
   return (
      <div className="flex">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="22"
            viewBox="0 0 19 22"
            fill="none"
         >
            <path
               d="M0.104718 10.9995L18.1947 0.764713L18.0133 21.5485L0.104718 10.9995Z"
               fill="#607EE9"
            />
         </svg>
         <CustomButton
            title="Regresar"
            handleClick={() => router.back()}
            containerStyles="p-0 pl-1 text-orange-400 font-roboto font-bold"
         />
      </div>
   );
}
