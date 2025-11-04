// Layout.jsx
import React from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import Nav from '../Nav/Nav'

export default function Layout() {
  // غيّر '/start' إلى المسار الحقيقي لبدء التطبيق
  const isStart = Boolean(useMatch({ path: '/', end: true }))

  return (
    <>
      {!isStart && <Nav />}
      <Outlet />
    </>
  )
}
