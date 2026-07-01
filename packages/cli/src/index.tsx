import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import StatusBar from "./components/status-bar";
import { InputBar } from "./components/input-bar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";
import { DialogProvider } from "./providers/dialog";
import { ThemeProvider, useTheme } from "./theme";
import { ThemedRoot } from "./layout/theme-root";
import { createMemoryRouter, createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/root-layout";
import Home from "./pages/home";
import NewSession from "./pages/new-session";
import Session from "./pages/session";



const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "sessions/new", element: <NewSession /> },
      { path: "sessions/:sessionId", element: <Session /> },
    ]
  }
])

function App() {
  return(
    <RouterProvider router={router} />
  )
}


const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false 
});
createRoot(renderer).render(<App />);
