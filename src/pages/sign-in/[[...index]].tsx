import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <SignIn routing="path" path="/sign-in" afterSignInUrl="/roadmap" afterSignUpUrl="/roadmap" />
    </div>
  )
}


