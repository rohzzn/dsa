import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return
  const { userId } = await auth()
  if (!userId) {
    return (await auth()).redirectToSignIn({ returnBackUrl: req.url })
  }
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/(api|trpc)(.*)'
  ],
}


