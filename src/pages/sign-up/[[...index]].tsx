import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" afterSignInUrl="/roadmap" afterSignUpUrl="/roadmap" />
    </div>
  )
}


