"use client";

import { z } from "zod";

const formSchema = z.object({
  jobDescription: z.string().min(1),
});

type FormData = {
  jobDescription: string; // This matches the field name in your form
};

import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { useJobDescriptionTranslate } from "@/hooks/job-description-hooks";

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });
  const { mutate, isPending, isSuccess, data } = useJobDescriptionTranslate();
  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const jobDescription = formData.jobDescription;
    mutate(jobDescription);
  };

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Hunting profiles</h2>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job description</FormLabel>
                  <FormDescription>Insira um job description </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Inserir job description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              loading={isPending}
            >
              Buscar tags
            </Button>
          </form>
        </Form>
        {isSuccess && <p>{data}</p>}
      </div>
    </div>
  );
}
