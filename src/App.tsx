import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { HomePage } from "./lib/views/HomePage/HomePage";
import { TrainingDay } from "./lib/views/TrainingDay/TrainingDay";
import { Layout } from "./lib/layouts/Layout";
import { Exercise } from "./lib/views/Exercise/Exercise";
import { ExerciseBrowser } from "./lib/views/ExerciseBrowser/ExerciseBrowser";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
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
            path="/exercise"
            element={
              <Exercise />
            }
          />
          <Route
            path="/exercise-browser"
            element={
              <ExerciseBrowser />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
