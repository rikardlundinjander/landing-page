import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = 'specs'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = formData.get('password') as string

  if (password === PASSWORD) {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.set('specs-auth', 'granted', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  }

  return NextResponse.redirect(new URL('/login?error=1', request.url))
}
