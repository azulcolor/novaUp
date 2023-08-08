import { NextRequest, NextResponse } from 'next/server';

import { errorMessage } from '@/libs/utils/serializers';
import { headers } from 'next/headers';
import { api } from '@/libs/axios-api';

const path = '/api/posts/[id]/assets';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
   try {
      const id = context.params.id;
      const data = await req.formData();
      const headersList = headers();
      const authorization = headersList.get('authorization');

      const newAssets = await api(
         'api',
         'POST',
         `/posts/${id}/assets`,
         { Authorization: authorization, 'Content-Type': 'multipart/form-data' },
         data
      );

      return NextResponse.json(newAssets);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'POST');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}
