import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     <Toaster />
     </QueryClientProvider>
     </Provider>
  </React.StrictMode>,
)
