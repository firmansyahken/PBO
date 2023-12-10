import React from 'react'
import Routers from './routes'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Routers/>
    </AuthProvider>
  )
}

export default App