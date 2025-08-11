import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, ShieldCheck, Target, Timer, TrendingUp, Youtube } from 'lucide-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Structured path for DSA and dev</span>
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Your all‑in‑one path to software engineering excellence
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-2xl">
                From first‑year foundations to FAANG interview prep—DSA, Frontend, Backend, and Full‑Stack, with curated resources and progress tracking.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SignedOut>
                  <Link href="/sign-in"><Button size="lg">Sign in to get started</Button></Link>
                  <Link href="/sign-up"><Button size="lg" variant="outline">Create an account</Button></Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/roadmap"><Button size="lg">Continue learning</Button></Link>
                </SignedIn>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
                {[{ label: 'Curated Videos', icon: Youtube }, { label: 'Handpicked Problems', icon: Target }, { label: 'Time‑boxed Plan', icon: Timer }, { label: 'Career‑ready', icon: ShieldCheck }].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-gray-700">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-white/80 backdrop-blur border-blue-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'DSA Problems', value: '75+', color: 'text-blue-600' },
                      { title: 'Learning Hours', value: '120+', color: 'text-indigo-600' },
                      { title: 'Video Lessons', value: '40+', color: 'text-purple-600' },
                      { title: 'Roadmaps', value: 'DSA · FE · BE · FS', color: 'text-emerald-600' },
                    ].map((s, idx) => (
                      <div key={idx} className="rounded-lg border bg-gray-50 p-4">
                        <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                        <div className="text-sm text-gray-600">{s.title}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-8 border-y bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 opacity-70">
            {['/next.svg', '/vercel.svg', '/globe.svg', '/window.svg', '/file.svg'].map((src, i) => (
              <Image key={i} src={src} alt="logo" width={28} height={28} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything you need to learn effectively</h2>
            <p className="mt-3 text-gray-600">No fluff. Just a clear path and the right resources.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: 'Structured Roadmap',
              desc: 'Step‑by‑step plan with topics, resources, and problems.',
              icon: TrendingUp,
            }, {
              title: 'Curated Resources',
              desc: 'The best videos and articles for each concept.',
              icon: BookOpen,
            }, {
              title: 'Progress Tracking',
              desc: 'Check off items and track completion as you learn.',
              icon: ShieldCheck,
            }, {
              title: 'Practice First',
              desc: 'Interview‑style problems with difficulty labels.',
              icon: Target,
            }, {
              title: 'Time‑boxed Plan',
              desc: 'Suggested time per step to stay consistent.',
              icon: Timer,
            }, {
              title: 'Job‑Ready Focus',
              desc: 'Learn what matters for real interviews.',
              icon: ShieldCheck,
            }].map((f, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <f.icon className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Track Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Choose your path</h2>
              <p className="mt-2 text-gray-600">Start with DSA, then pick Frontend, Backend, or Full‑Stack. Language‑specific paths included (Java, Python, JavaScript).</p>
            </div>
            <SignedOut>
              <Link href="/sign-in"><Button variant="outline">Sign in to view roadmaps</Button></Link>
            </SignedOut>
            <SignedIn>
              <Link href="/roadmap"><Button variant="outline">Open DSA roadmap</Button></Link>
            </SignedIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              title: 'DSA',
              items: ['Basics → Advanced', '75+ curated problems', 'DP, Graphs, Trees']
            }, {
              title: 'Frontend',
              items: ['HTML/CSS/JS', 'React + Next.js', 'Projects & UI/UX']
            }, {
              title: 'Backend',
              items: ['APIs & Databases', 'Auth, Caching, Queues', 'Production best practices']
            }, {
              title: 'Full‑Stack',
              items: ['Integrate FE + BE', 'DevOps basics', 'Real‑world projects']
            }].map((s, i) => (
              <Card key={i} className="border-blue-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
                    {s.items.map((it, idx) => (<li key={idx}>{it}</li>))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learn & Practice CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">Learn smarter. Practice consistently.</h3>
                <p className="mt-2 text-blue-100">Follow the roadmap, use curated resources, and track your progress along the way.</p>
              </div>
              <div className="flex gap-3">
                <SignedOut>
                  <Link href="/sign-in"><Button size="lg" variant="secondary">Sign in</Button></Link>
                  <Link href="/sign-up"><Button size="lg" variant="outline">Create account</Button></Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/learn"><Button size="lg" variant="secondary">Browse Learning</Button></Link>
                  <Link href="/resources"><Button size="lg" variant="outline">See Resources</Button></Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}