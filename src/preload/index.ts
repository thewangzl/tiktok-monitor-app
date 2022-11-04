import { shell, clipboard, ipcRenderer, contextBridge, Dialog } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

console.log('hello world 1st preload!')

const api = {
  shell,
  clipboard,
  ...electronAPI,
  dialog: {
    showCertificateTrustDialog(...options: any[]) {
      return ipcRenderer.invoke('dialog:showCertificateTrustDialog', ...options)
    },
    showErrorBox(...options: any[]) {
      return ipcRenderer.invoke('dialog:showErrorBox', ...options)
    },
    showMessageBox(...options: any[]) {
      return ipcRenderer.invoke('dialog:showMessageBox', ...options)
    },
    showOpenDialog(...options: any[]) {
      return ipcRenderer.invoke('dialog:showOpenDialog', ...options)
    },
    showSaveDialog(...options: any[]) {
      return ipcRenderer.invoke('dialog:showSaveDialog', ...options)
    }
  } as Pick<Dialog, 'showCertificateTrustDialog' | 'showErrorBox' | 'showMessageBox' | 'showOpenDialog' | 'showSaveDialog'>
}

try {
  contextBridge.exposeInMainWorld('electron', api)
} catch {
  (window as any).electron = api
}
