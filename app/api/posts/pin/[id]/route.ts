import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/libs/axios-api';
import { errorMessage } from '@/libs/utils/serializers';
import { headers } from 'next/headers';

const path = '/api/posts/pin/[id]';

export async function PATCH(
   req: NextRequest,
   context: {
      params: {
         id: string;
      };
   }
) {
   try {
      const headersList = headers();
      const id = context.params.id;

      let isAuth: any = '';

      if (headersList.has('authorization')) {
         const authorization = headersList.get('authorization');

         isAuth =
            authorization?.length && authorization?.length > 8
               ? { Authorization: authorization }
               : '';
      }

      const post = await api('api', 'PATCH', `/posts/pin/${id}`, isAuth);

      return NextResponse.json(post);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'PATCH');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError, { status: formatedError.status });
   }
}
