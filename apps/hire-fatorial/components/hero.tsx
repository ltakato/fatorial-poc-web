import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <svg
        aria-hidden="true"
        className="absolute animate-fade inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="animate-fade-down sm:animate-fade-left w-full pb-24 pt-12 sm:pb-32 lg:flex lg:py-40 min-h-[70svh] flex items-center">
        <div className="mx-auto max-w-2xl md:mx-0 lg:shrink-0 ">
          <h1 className=" text-center sm:text-left text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            HireAI
            <span className="hidden sm:inline">
              {""}, a nova forma de contratar.
            </span>
          </h1>
          <p className="mt-8 text-center sm:text-left text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Simplifique a busca. Maximize o talento.
          </p>
          <div className="mt-10 flex items-center justify-center sm:justify-start gap-x-6">
            <Link
              href="#form"
              className="rounded-md w-full sm:w-fit text-center sm:text-left text-sm font-semibold text-white shadow-sm"
            >
              <Button variant="default">Buscar talentos</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
