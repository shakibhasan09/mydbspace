import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@mydbspace/ui/components/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
    return (
        <main>
            Hello, World! <Button>Hello</Button>
        </main>
    );
}
