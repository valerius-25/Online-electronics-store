import React from 'react'
import { zodResolver } from "@hookfrom/resolvers/zod";
import { useForm } from 'react-hook-form';
import { email, z } from "zod"
import { CgPassword } from 'react-icons/cg';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const Contacts = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "PABLO@UGABUG.com",
        },
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "pabloasdasdasdsss"
            })
        }
    }
}


const contacts = () => {
  return (
    <div>contacts</div>
  )
}

export default contacts