import React from 'react';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { apiRequest } from '@/libs/axios-api';
import { InputSearch } from '@/components/CustomInputs/InputSearch';

interface Props {
   children: React.ReactNode;
   params: { [key: string]: string | string[] };
   searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PostLayout({ children, params, searchParams }: Props) {
   return <>{children}</>;
}
