import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Error } from '@/components/alerts/Error';

interface Props {
   name: string;
   label?: string;
   accept?: 'image/*' | 'application/pdf' | string;
   error: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFileInput = (props: Props) => {
   const { name, label, accept, error, onChange } = props;
   return (
      <div className="flex items-center w-full">
         <label htmlFor={name} className="cursor-pointer p-4">
            <AttachFileIcon className="mr-5" />
            {label && <span>{label}</span>}
         </label>
         <input
            type="file"
            id={name}
            accept={accept}
            name={name}
            multiple
            className="hidden"
            onChange={onChange}
         />
         <Error message={error} />
      </div>
   );
};

export default CustomFileInput;
