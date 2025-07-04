import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from '@/components/pages/HomePage'
import { ThemeProvider } from '@/hooks/useTheme'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <HomePage />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="z-[9999]"
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App