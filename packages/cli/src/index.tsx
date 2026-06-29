import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";

function App() {
  return (
    <box 
      alignItems="center"
      justifyContent="center"
      gap={2}
      backgroundColor="#0d0d12"
      width="100%" height="100%">

        <Header />
        <text attributes={TextAttributes.DIM}>What will you build?</text>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
