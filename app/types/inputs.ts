export type CustomButtonProps = {
   title: string;
   handleClick: () => void;
   containerStyles?: string;
   btnType?: 'button' | 'submit';
   disabled?: boolean;
};
