import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Inbox from './pages/Inbox'
import Leads from './pages/Leads'
import Agenda from './pages/Agenda'
import Config from './pages/Config'

function Sidebar(){
  return (
    <div className='w-48 bg-zinc-950 h-screen p-4 space-y-4'>
      <h1 className='text-xl font-bold text-pixel-blue mb-6'>PixelUp CRM</h1>
      <nav className='space-y-2'>
        <Link className='block hover:text-pixel-blue' to='/inbox'>📨 Inbox</Link>
        <Link className='block hover:text-pixel-blue' to='/leads'>👥 Leads</Link>
        <Link className='block hover:text-pixel-blue' to='/agenda'>📅 Agenda</Link>
        <Link className='block hover:text-pixel-blue' to='/config'>⚙️ Config</Link>
      </nav>
    </div>
  )
}

export default function App(){
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <Routes>
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/leads' element={<Leads />} />
          <Route path='/agenda' element={<Agenda />} />
          <Route path='/config' element={<Config />} />
          <Route path='*' element={<Inbox />} />
        </Routes>
      </div>
    </div>
  )
}
