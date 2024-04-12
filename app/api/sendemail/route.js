import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    console.log(request)
    const response = await req.json
    try {
        const data = await resend.emails.send({
            from: 'mdq4all@gmail.com',
            to: [response.data.email],
            subject: 'Appointment Booking Confirmation',
            react: EmailTemplate({response}),
          });
        return NextResponse.json({data:'Email sent'})
    } catch (error) {
        return NextResponse.json({error})
    }
}