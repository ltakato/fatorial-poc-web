"use client";

import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaLinkedin } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Label } from "@workspace/ui/components/label";
import { MultiSelect } from "@workspace/ui/components/multiselect";
import { useProfilesFind } from "@/hooks/profiles-hooks";
import { useJobDescriptionTranslate } from "@/hooks/job-description-hooks";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Linkedin, LinkedinIcon } from "lucide-react";

type FormData = {
  jobDescription: string;
};

const formSchema = z.object({
  jobDescription: z.string().min(1),
});

const formSchema2 = z.object({
  tags: z.array(z.string()).nonempty(),
});

type FormData2 = {
  tags: string[];
};

export default function Page() {
  const [step, setStep] = useState<number>(1);

  const form1 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      tags: [],
    },
  });
  const onSubmit1: SubmitHandler<FormData> = (formData) => {
    const jobDescription = formData.jobDescription;
    mutate1(jobDescription);
  };
  const onSuccess1 = () => setStep(2);
  const onSubmit2: SubmitHandler<FormData2> = (formData) => {
    const tags = formData.tags;
    mutate2(tags);
  };
  const onSuccess2 = () => setStep(3);

  const {
    mutate: mutate1,
    isPending: isPending1,
    data = [],
  } = useJobDescriptionTranslate(onSuccess1);
  const {
    mutate: mutate2,
    isPending: isPending2,
    data: data2 = [],
  } = useProfilesFind(onSuccess2);

  return (
    <div className="flex flex-col items-center gap-12 min-h-svh p-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hunting profiles</h2>
      </div>
      <div className="flex flex-col justify-center gap-4 w-3/5">
        {step === 1 && (
          <Form {...form1}>
            <form
              className="space-y-4"
              onSubmit={form1.handleSubmit(onSubmit1)}
            >
              <FormField
                control={form1.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job description</FormLabel>
                    <FormDescription>Insira um job description</FormDescription>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[240]"
                        placeholder="Inserir job description..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isPending1}
                loading={isPending1}
              >
                Buscar tags
              </Button>
            </form>
          </Form>
        )}
        {step > 1 && (
          <>
            <div>
              <Label>Job Description</Label>
              <Textarea
                className="min-h-[240]"
                value={form1.watch("jobDescription")}
                disabled={true}
              />
            </div>
            {step > 2 && (
              <div>
                <Label>Tags para a busca</Label>
                <MultiSelect
                  variant="inverted"
                  placeholder="Selecione tags"
                  options={data.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  defaultValue={form2.watch("tags")}
                  onValueChange={() => {}}
                  maxCount={100}
                  disabled={true}
                />
              </div>
            )}
          </>
        )}
        {step === 2 && (
          <Form {...form2}>
            <form
              className="space-y-8"
              onSubmit={form2.handleSubmit(onSubmit2)}
            >
              <FormField
                control={form2.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags para a busca</FormLabel>
                    <FormDescription>
                      Selecione as tags para a busca
                    </FormDescription>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        variant="inverted"
                        placeholder="Selecione tags"
                        maxCount={100}
                        options={data.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isPending2}
                loading={isPending2}
              >
                Encontrar perfis
              </Button>
            </form>
          </Form>
        )}
        {step === 3 && (
          <div className="mt-16">
            {data2.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row gap-10">
                  <Avatar className="size-24">
                    <AvatarImage
                      src={item.pictureUrl}
                      alt="imagem do candidato"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <a href={item.linkedinUrl} target="_blank">
                    <p className="text-3xl">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <FaLinkedin size={18} />
                      <span>linkedin</span>
                    </div>
                  </a>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Job title</p>
                    <p className="text-sm font-medium leading-none">
                      {item.currentJobTitle}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Empresa atual
                    </p>
                    <p className="text-sm font-medium leading-none">
                      {item.currentCompany}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tags compatíveis
                    </p>
                    <MultiSelect
                      variant="inverted"
                      placeholder="Selecione tags"
                      options={data.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      defaultValue={item.matchedTags}
                      onValueChange={() => {}}
                      maxCount={100}
                      disabled={true}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
