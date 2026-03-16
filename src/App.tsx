import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./lib/views/HomePage/HomePage";
import { TrainingDay } from "./lib/views/TrainingDay/TrainingDay";
import { Layout } from "./lib/layouts/Layout";
import { Excercise } from "./lib/views/Excercise/Excercise";


function App() {

  return (
    <BrowserRouter>
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <HomePage />
            }
          />
          <Route
            path="/training-day"
            element={
              <TrainingDay />
            }
          />
          <Route
            path="/excercise"
            element={
              <Excercise />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
