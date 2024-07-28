import React from 'react';
import ScriptForm from './components/ScriptForm';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
    <div className='mb-20'>
      <Header />
      <main className='p-6'>
        <h1 className='text-2xl p-6'>Generate Script for Viral Tiktok Videos</h1>
        <ScriptForm />
      </main>
        <Footer />
    </div>
    </>
  );
}

export default App;


