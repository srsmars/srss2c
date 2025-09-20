'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/user-auth'
import Link from 'next/link'
import { Loader2 } from 'lucide-react' // Spinner icon

export default function LoginPage() {
  const {
    signInForm,
    handleSignIn,
    isLoading,
    signInWithGoogle,
    signInWithMicrosoft,
  } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = signInForm

  return (
    <section className="flex min-h-screen bg-zinc-950 px-4 py-16 md:py-32">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-card m-auto h-fit w-full max-w-sm overflow-hidden rounded-xl border border-zinc-800 shadow-md"
      >
        <div className="p-8 pb-6">
          <div className="text-center">
            <h1 className="mb-1 mt-2 text-xl font-semibold text-white">
              Sign In to S2C
            </h1>
            <p className="text-sm text-zinc-400">
              Welcome back! Sign in to continue
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm text-zinc-300">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm text-zinc-300">
                  Password
                </Label>
                <Link href="#" className="text-sm text-blue-400 hover:underline">
                  Forgot your Password?
                </Link>
              </div>
              <Input
                type="password"
                id="password"
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <p className="text-xs text-destructive text-center">{errors.root.message}</p>
            )}

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-zinc-700" />
            <span className="text-zinc-500 text-xs">Or continue with</span>
            <hr className="border-zinc-700" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={signInWithGoogle}
            >
              {/* Google SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                className="h-4 w-4"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.5h146.9c-6.3 34-25.3 62.8-54.1 82v68h87.4c51.1-47 80.3-116.3 80.3-195.1z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c73.7 0 135.6-24.4 180.8-66.3l-87.4-68c-24.3 16.3-55.4 26-93.4 26-71.7 0-132.5-48.4-154.3-113.4H28.6v70.9c45.1 89.1 137.3 150.8 243.4 150.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M117.7 323.6c-10.7-31.7-10.7-65.9 0-97.6v-70.9H28.6c-38.6 75.3-38.6 164.7 0 240l89.1-71.5z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.7c39.9 0 75.7 13.7 103.9 40.6l77.9-77.9C405.7 24.4 343.8 0 272 0 165.9 0 73.7 61.7 28.6 150.8l89.1 70.9c21.8-65 82.6-113.4 154.3-113.4z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
              onClick={signInWithMicrosoft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z" />
                <path fill="#80cc28" d="M256 121.666H134.335V0H256z" />
                <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z" />
                <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z" />
              </svg>
              <span className="ml-2">Microsoft</span>
            </Button>
          </div>
        </div>

        <div className="p-3 bg-zinc-900 border-t border-zinc-800">
          <p className="text-zinc-400 text-center text-sm">
            Don’t have an account?{' '}
            <Button asChild variant="link" className="px-2 text-blue-400">
              <Link href="/auth/sign-up">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  )
}
