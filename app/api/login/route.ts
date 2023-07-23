import { api } from '@/app/libs/axios-api';
import { errorMessage } from '@/app/libs/utils/serializers';
import { NextRequest, NextResponse } from 'next/server';

const path = '/api/login';
export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const loginRes = await api('api', 'POST', '/auth/login', null, body);

      return NextResponse.json(loginRes.accessToken);
   } catch (error) {
      const formatedError = errorMessage(error, path, 'POST');
      if (process.env.NODE_ENV === 'development') console.log(formatedError);

      return NextResponse.json(formatedError);
   }
}
