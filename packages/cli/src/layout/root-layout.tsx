import React from 'react'
import { Outlet } from 'react-router'
import { KeyboardLayerProvider } from '../providers/keyboard-layer'
import { DialogProvider } from '../providers/dialog'
import { ThemeProvider } from '../theme'
import { ToastProvider } from '../providers/toast'
import { ThemedRoot } from './theme-root'

const RootLayout = () => {
  return (
<ThemeProvider>
        <KeyboardLayerProvider>
         
           <DialogProvider>
          <ToastProvider>
           <ThemedRoot>
             <Outlet />
           </ThemedRoot>
         </ToastProvider>
         </DialogProvider>
        
        </KeyboardLayerProvider>
         </ThemeProvider>
  )
}

export default RootLayout