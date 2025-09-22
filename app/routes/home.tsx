import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { motion } from "framer-motion";
import NavBar from "~/components/NavBar";
import { resumes } from "constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume.AI" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate(); //in order to redirect to the previous location
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);
  return (
    <div className="relative min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-no-repeat bg-center">
      <NavBar />
      <main className="main-section">
        <div className="page-heading text-center mb-12 ">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => {
              return (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center"
                >
                  <ResumeCard resume={resume} />;{/* <hr className="my-1" /> */}
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
