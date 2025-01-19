import { FormMonolite } from "@/components/form-monolite";
import { Hero } from "@/components/hero";

export default function Page() {
  return (
    <main className="lg:px-8 px-6 w-full">
      <Hero />
      <FormMonolite />
    </main>
  );
}
