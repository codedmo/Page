import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Navbar from '@/components/Navbar';
import Footer from "@/components/footer"


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
