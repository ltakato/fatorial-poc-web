import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Textarea placeholder="Insert the qualifica" />
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
