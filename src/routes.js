import React from "react"
import { Routes, Route } from "react-router-dom"

import Main from './pages/Main'
import Repository from "./pages/Repository"


export default function Index() {
  return (
    <>
      <Routes>

      <Route path="/" exact element={<Main />} />
      <Route path="/repository:repository" element={Repository} />

      </Routes>

    </>
  )
}
