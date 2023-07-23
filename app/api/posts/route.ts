import { api } from '../../libs/axios-api';
import { IPostRequest } from '../../interfaces/posts';
import { IUser } from '../../interfaces/user';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import {
   errorMessage,
   serializedNewPost,
   serializedPostUpdate,
} from '../../libs/utils/serializers';

const path = '/api/posts';

export async function GET(req: NextRequest) {
   try {
      const headersList = req.headers;
      const url = new URL(req.url);
      const approved = url.searchParams.get('approved');

      let isAuth: any = '';

      if (headersList.has('authorization')) {
         const authorization = headersList.get('authorization');

         isAuth =
            authorization?.length && authorization?.length > 8
               ? { Authorization: authorization }
               : '';
      }

      if (isAuth !== '' && !approved) {
         try {
            const user = jwt.decode(
               (isAuth?.Authorization || '').replace('Bearer ', '')
            ) as IUser;

            if (user && user?.role?.id === 3) {
               const posts = await api('api', 'GET', '/posts/user', isAuth);

               return NextResponse.json(posts);
            } else {
               const posts = await api('api', 'GET', '/posts', isAuth);

               return NextResponse.json(posts);
            }
         } catch {
            throw new Error('Error Al obtener los posts');
         }
      }

      const posts = await api('api', 'GET', `/posts${approved ? '?approved=true' : ''}`);

      return NextResponse.json(posts);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'GET');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}

export async function POST(req: NextRequest) {
   try {
      const headersList = headers();
      const authorization = headersList.get('authorization');

      const data = await req.json();
      const newPost = serializedNewPost(data);

      const newPostApi = await api(
         'api',
         'POST',
         '/posts',
         { Authorization: authorization },
         newPost
      );

      return NextResponse.json(newPostApi);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'POST');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}

export async function PUT(req: NextRequest) {
   try {
      const headersList = headers();
      const authorization = headersList.get('authorization');
      const data = await req.json();

      const updatedPost = serializedPostUpdate(data);
      const updatedPostApi = await api(
         'api',
         'PUT',
         '/posts',
         { Authorization: authorization },
         updatedPost
      );

      return NextResponse.json(updatedPost);
   } catch (error: any) {
      const formatedError = errorMessage(error, path, 'PUT');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}