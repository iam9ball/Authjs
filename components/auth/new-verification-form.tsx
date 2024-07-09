

'use client'
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect, useState } from "react";
import {BeatLoader} from "react-spinners"
import { useSearchParams } from "next/navigation";
import {FormError} from "@/components/form-error";
import { FormSuccess } from "../form-success";
import { newVerification } from "@/actions/new-verification";
export const NewVerificationForm =() => {

    const [error, setError] = useState<string |undefined>();
    const [success, setSucess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
      if (success || error) return;
      if(!token) {
        setError("Missing Token!");
        return;
      }

      newVerification(token)
      .then((data) => {
        setSucess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("something went wrong!")
      })
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
       
           <CardWrapper
           headerLabel="Confirming your verification"
           backButtonLabel="Back to login"
           backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
              {!success && !error && (
                <BeatLoader size={10} color="#00BFFF"/> 
    )}
              
              <FormSuccess message={success}/> 
              {!success && (
                 <FormError message={error}/> 
              )}
             
            </div>
           </CardWrapper>
       
    )
}

export default NewVerificationForm;