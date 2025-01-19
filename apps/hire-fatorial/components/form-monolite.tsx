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
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";

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

export const FormMonolite = () => {
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
    data: data1 = [],
  } = useJobDescriptionTranslate(onSuccess1);
  const {
    mutate: mutate2,
    isPending: isPending2,
    data: data2 = [],
  } = useProfilesFind(onSuccess2);

  return (
    <div className="py-12 w-full animate-fade-down">
      <div>
        <h2 className="text-3xl font-bold tracking-tight" id="form">
          Hunting profiles
        </h2>
      </div>
      <div className="flex flex-col justify-center gap-4 mt-16 ">
        {step === 1 && (
          <Form {...form1}>
            <form
              className="space-y-4 animate-fade"
              onSubmit={form1.handleSubmit(onSubmit1)}
            >
              <FormField
                control={form1.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[240px]"
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
            <div className="animate-fade">
              <Label>Job Description</Label>
              <Textarea
                className="min-h-[240px]"
                value={form1.watch("jobDescription")}
                disabled={true}
              />
            </div>
            {step > 2 && (
              <div className="animate-fade">
                <Label>Tags para a busca</Label>
                <MultiSelect
                  variant="inverted"
                  placeholder="Selecione tags"
                  options={data1.map((item) => ({
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
              className="space-y-8 animate-fade-up"
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
                        options={data1.map((item) => ({
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
          <div className="mt-16 animate-fade-down flex flex-col gap-4">
            {data2.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-col items-center md:flex-row md:gap-4">
                  <Avatar className="size-24">
                    <AvatarImage
                      src={item.pictureUrl}
                      alt="imagem do candidato"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Link
                    href={item.linkedinUrl}
                    target="_blank"
                    className="flex items-center justify-center md:justify-start flex-col md:flex-row w-full"
                  >
                    <div className="text-center flex flex-col items-center md:items-start justify-center">
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-medium text-gray-900">
                          {item.name}
                        </p>
                        <FaLinkedin size={14} className="mt-1" />
                      </div>
                      <span className="font-normal text-muted-foreground text-sm">
                        {item.currentJobTitle}
                      </span>
                      <span className="font-light text-sm text-gray-600">
                        {item.currentCompany}
                      </span>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="flex gap-4 flex-col items-center justify-center ">
                  <div className="flex flex-col gap-4 w-full">
                    <p className="text-sm text-muted-foreground text-center">
                      Tags compatíveis
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
                      {item.matchedTags.map((item, index) => {
                        return (
                          <Badge
                            className="hover:bg-transparent text-foreground/80 bg-transparent border border-muted-foreground/50 w-full text-center flex items-center justify-center"
                            key={`${item}:${index}`}
                          >
                            {item}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
