import { useCallback } from 'react'

import { BrandIcon } from '@/components/icon/brand'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { useRouter } from '@adonisjs/inertia/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Head } from '@inertiajs/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod/mini'

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean(),
})

const formId = 'login-form'

export default function Login() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = useCallback(
    function onSubmit(data: z.infer<typeof loginSchema>) {
      router.visit(
        { route: 'auth.login.store' },
        {
          method: 'post',
          data,
          preserveState: true,
          onError: (errors) => {
            Object.entries(errors).forEach(([field, message]) => {
              setError(field as keyof z.infer<typeof loginSchema>, { message })
            })
          },
        }
      )
    },
    [router, setError]
  )

  return (
    <>
      <Head title="Login" />
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-2">
            <BrandIcon />
            <div className="text-center">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                Sign in
              </h1>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Enter your credentials to continue
              </p>
            </div>
          </div>

          <Card className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs ring-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-${field.name}`}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-${field.name}`}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="you@example.com"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-${field.name}`}>Password</FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-${field.name}`}
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your Password"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                      <Checkbox
                        id={`${formId}-${field.name}`}
                        ref={field.ref}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={field.disabled}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel
                        htmlFor={`${formId}-${field.name}`}
                        className="text-xs font-medium text-slate-600"
                      >
                        Remember Me
                      </FieldLabel>
                    </Field>
                  )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  Sign in
                </Button>
              </FieldGroup>
            </form>
          </Card>
        </div>
      </main>
    </>
  )
}
