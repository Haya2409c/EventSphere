import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-background text-textMain">
      
      {/* Temporary Navbar */}
      <nav className="bg-navbar text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface">Event<span className="text-accent">Sphere</span></h1>
        <button className="bg-primary hover:bg-secondary transition-colors px-4 py-2 rounded-md font-medium">
          Login / Register
        </button>
      </nav>

      {/* Pages / Routes */}
      <main className="p-8">
        <Routes>
          <Route path="/" element={
            <div className="bg-surface p-8 rounded-lg shadow-sm border border-border mt-10">
              <h2 className="text-4xl font-bold text-primary mb-4">Welcome to EventSphere! 🚀</h2>
              <p className="text-textSecondary text-lg">
                Aapka Frontend Setup aur Routing bilkul perfect kaam kar raha hai. 
                Ab hum yahan apna 3D Grand Exhibition Hall banayenge.
              </p>
            </div>
          } />
        </Routes>
      </main>

    </div>
  );
}

export default App;