import { IPost } from '@/app/interfaces';
import { api } from '@/app/libs/axios-api';
import { errorMessage } from '@/app/libs/utils/serializers';
import { NextRequest, NextResponse } from 'next/server';

const path = '/api/posts/[id]';
// [id] /id, /latest?limit=5, /pinned
export async function GET(
   req: NextRequest,
   context: {
      params: {
         id: string;
      };
   }
) {
   try {
      const url = new URL(req.url);
      const id = context.params.id;
      const limit = url.searchParams.get('limit');

      const posts = await api(
         'api',
         'GET',
         `/posts/${id}${limit ? '?limit=' + limit : ''}`
      );

      return NextResponse.json(posts);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'GET');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
   try {
      const id = context.params.id;
      const headersList = req.headers;

      if (!headersList.has('authorization')) {
         throw new Error('Access denied, Token not provided.');
      }

      const authToken = headersList.get('autorization');

      await api('api', 'DELETE', `/posts/${id}`, {
         Authorization: authToken,
      });
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'DELETE');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}
