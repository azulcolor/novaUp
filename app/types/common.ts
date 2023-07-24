import React from 'react';

export type TableProps = {
   data: any[];
   itemsPage: number;
};

export type ConfirmationModalProps = {
   title: string;
   children: React.ReactNode;
   target: number;
};
