import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import StatusBar from "./components/status-bar";
import InputBar from "./components/input-bar";

function App() {
  return (
    <box 
      alignItems="center"
      justifyContent="center"
      gap={2}
      backgroundColor="#0d0d12"
      width="100%" height="100%">

        <Header />
        <box maxWidth={78} paddingX={2} >
           <InputBar onSubmit={() => {}} />
        </box>
       
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
