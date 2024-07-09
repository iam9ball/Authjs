'use client';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error"
import {FormSuccess} from "@/components/form-success"
import {login} from "@/actions/login";
import {  
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { sendVerificationEmail } from "@/lib/mail";
import Link from "next/link";

export default function loginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
  ? "Email already in use with diferent provider" : ""
  
  const [isPending, startTransition] = useTransition(); 
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);



  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
       login(values, callbackUrl).then((data) => {
          if(data?.error) {
            form.reset();
            setError(data.error);
          }

          if(data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if(data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    })
     
     //axios.post("api/route")
  }
  return (


    <CardWrapper
    headerLabel="Welcome back"
    backButtonLabel="Don't have an account?"
    backButtonHref="/auth/register"
    showSocial
    >
       <Form {...form}>
        <form
         onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-6"
         >
          <div className="space-y-4">
            {showTwoFactor && ( <FormField
            control={form.control}
            name="code"
            render={({field}) => (
              <FormItem>
                <FormLabel>2FA Code</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="123456"
                  />
                </FormControl>
                <FormMessage/>
                </FormItem>
            )}
            />)}
            {!showTwoFactor && (
              <>
            <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="john.doe@gmail.com"
                  type="email"
                  />
                </FormControl>
                <FormMessage/>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}

                  {...field}
                  placeholder="******"
                  type="password"
                  />
                </FormControl>
                <Button 
                size="sm"
                variant={"link"}
                asChild
                className="px-0 font-normal"
                >
                  <Link href="/auth/reset">
                  Forgot Password?
                  </Link>
                </Button>
                <FormMessage/>
                </FormItem>
            )}
            />
            </>)
             }
          </div>
          <FormError message={error || urlError}/>
           <FormSuccess message={success}/>
          <Button
           disabled={isPending}
          type="submit"
          className="w-full"
          >
          {showTwoFactor ? "Confirm" : "Login"}
          </Button>
          </form>
       </Form>
    </CardWrapper>
  )
}
 