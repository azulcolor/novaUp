import { IPost } from '@/interfaces';
import { api } from '@/libs/axios-api';
import { errorMessage } from '@/libs/utils/serializers';
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

      if (posts.error) {
         throw new Error(posts.error);
      }

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

      const authToken = headersList.get('authorization');

      const res = await api('api', 'DELETE', `/posts/${id}`, {
         Authorization: authToken,
      });
      console.log(res);
      return NextResponse.json(true);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'DELETE');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}
