import React from 'react'
import { useLocation } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const location = useLocation()
  return (
    <div>
      This is Notfound component <b>{location.pathname}</b>
    </div>
  )
}

export default NotFound
