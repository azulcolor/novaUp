'use client';

import React, { useEffect } from 'react';
import { IPost } from '@/interfaces';

interface Props {
   post: IPost;
}

export default function FormPost({ post }: Props) {
   useEffect(() => {
        console.log(post);
    }, []);

   return (
      <div className="form__post">
        <div className="container__text">
            <div className="container__subtitle">
                <h3>Regresar</h3>
            </div>
        </div>
        <div className="container__multimedia">
            <div className="container__subtitle">
                <h3>Multimedia</h3>
            </div>
        </div>
      </div>
   );
}
