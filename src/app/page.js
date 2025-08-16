"use client";
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useEffect, useState } from "react";
import { Shield, Download, CheckCircle } from "lucide-react";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { APP_NAME } from "@/lib/constants";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
const steps = [
  {
    label: "Sign in with your registered email",
    description:
      "Use the same email you signed up with on our website to connect your account securely.",
    icon: <Shield size={20} />,
  },
  {
    label: "Install the VS Code extension",
    description:
      "Download and enable the extension to integrate real-time security checks into your editor.",
    icon: <Download size={20} />,
  },
  {
    label: "Build confidently as your app is secured in real time",
    description:
      "As you code, the extension will automatically flag vulnerabilities so your paywall stays locked.",
    icon: <CheckCircle size={20} />,
  },
];

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll("[data-animate]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const name = form.get("name");
      const email = form.get("email");
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again."
        );
      }
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(249,250,251)] text-[rgb(17,24,39)]">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="font-semibold tracking-tight text-[rgb(23,37,84)] text-lg sm:text-xl">
            {APP_NAME}
          </div>
          <nav className="hidden md:flex items-center gap-8 text-m">
            <a className="hover:opacity-70 transition" href="#features">
              Features
            </a>
            <a className="hover:opacity-70 transition" href="#how">
              How it works
            </a>
          </nav>
          <a
            href="#cta"
            className="rounded-full bg-[rgb(16,44,112)] text-white px-5 py-2.5 text-sm font-medium shadow hover:shadow-md transition hover:-translate-y-0.5"
          >
            Get Early Access
          </a>
        </div>
      </header>
      {/* Hero + Form */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[rgb(240,244,248)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div
            data-animate
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[1.05] font-extrabold tracking-tight text-[rgb(16,44,112)] text-center lg:text-left">
              Don’t Let Someone Walk Through Your Paywall.
            </h1>
            <p className="mt-6 text-xl text-[rgb(55,65,81)] text-center lg:text-left">
              Catch broken authentication in your Supabase + Next.js app before
              launch — so your paid content stays paid.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <a
                href="#cta"
                className="group inline-flex items-center rounded-full bg-[rgb(245,158,11)] text-[rgb(23,37,84)] px-6 py-3 font-semibold shadow-md hover:shadow-lg transition hover:-translate-y-0.5"
              >
                Get Early Access
                <span className="ml-2 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>

          <div
            id="cta"
            data-animate
            className="opacity-0 translate-y-6 transition-all duration-700 lg:justify-self-end w-full"
          >
            <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
              {submitted ? (
                <div className="text-center">
                  <CheckCircleIcon className="mx-auto size-12 text-[rgb(16,112,70)]" />
                  <h3 className="mt-4 text-xl font-semibold">You're in!</h3>
                  <p className="mt-2 text-[rgb(75,85,99)]">
                    Thanks for joining early access. We'll email you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="space-y-4"
                  aria-label="Early access form"
                >
                  <h3 className="text-3xl font-bold text-center text-[rgb(23,37,84)]">
                    Stop Paywall Bypasses Before They Happen.
                  </h3>
                  <p className="text-center text-[rgb(75,85,99)]">
                    Join early access now. Get 2 months free when we launch.
                  </p>
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name (optional)"
                      className="w-full rounded-xl border border-black/10 bg-[rgb(249,250,251)] px-4 py-3.5 outline-none focus:ring-2 focus:ring-[rgb(245,158,11)] transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      className="w-full rounded-xl border border-black/10 bg-[rgb(249,250,251)] px-4 py-3.5 outline-none focus:ring-2 focus:ring-[rgb(245,158,11)] transition"
                    />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-red-600">
                      {error}
                    </p>
                  )}
                  <button
                    disabled={submitting}
                    className={cx(
                      "w-full rounded-xl px-5 py-3.5 font-semibold shadow-md transition hover:shadow-lg",
                      "bg-[rgb(245,158,11)] text-[rgb(23,37,84)] hover:-translate-y-0.5",
                      submitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {submitting ? "Submitting…" : "Get Early Access"}
                  </button>
                  <p className="text-xs text-center text-[rgb(107,114,128)]">
                    Secure your app, protect your revenue, and keep your vibe
                    intact.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Problem */}
      <section className="mx-auto max-w-5xl px-6 py-24" data-animate>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[rgb(16,44,112)]">
          Your app’s biggest risk isn’t a hacker — it’s a clever user.
        </h2>
        <h2 className="mt-6 text-lg sm:text-xl text-center text-[rgb(55,65,81)]">
          Most paywalls aren’t hacked — they’re bypassed. One missing server
          check, one weak Supabase RLS rule, one exposed API route… and:
        </h2>
        <ul className="mt-8 grid gap-4 text-lg sm:text-xl text-center text-[rgb(31,41,55)]">
          <li>• Free users see premium content.</li>
          <li>• Non-paying accounts access paid features.</li>
          <li>• Your revenue quietly slips away.</li>
        </ul>
        <p className="mt-6 text-lg sm:text-xl text-center text-[rgb(75,85,99)]">
          It’s not “if” someone tries — it’s when.
        </p>
      </section>

      {/* Risk */}
      <section
        className="mx-auto max-w-6xl px-6 py-14 grid md:grid-cols-2 gap-14 items-center"
        data-animate
      >
        <div>
          <h3 className="text-2xl font-semibold text-[rgb(23,37,84)]">
            A paywall bypass is an open door to your product.
          </h3>
          <ul className="mt-4 space-y-3 text-[rgb(55,65,81)] text-lg">
            <li>
              • Paying customers notice non-payers getting the same features for
              free.
            </li>
            <li>• You spend days patching instead of building.</li>
            <li>• Trust erodes — and for a small dev, that’s game over.</li>
          </ul>
          <p className="mt-4 text-[rgb(31,41,55)] text-lg">
            Hiring a security consultant for this? $5,000+ per audit. And you’d
            need them after every major update.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="size-8 text-[rgb(16,44,112)]" />
            <div>
              <div className="font-semibold text-lg">
                Built for Supabase + Next.js
              </div>
              <p className="text-[rgb(75,85,99)] text-base">
                Framework-aware checks that understand RLS and API routes.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <LockClosedIcon className="size-8 text-[rgb(16,44,112)]" />
            <div>
              <div className="font-semibold text-lg">Ship with confidence</div>
              <p className="text-[rgb(75,85,99)] text-base">
                Only release when every route is locked down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution + Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
        data-animate
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-[rgb(16,44,112)]">
          Automatic Auth & Paywall Testing — Every Time You Ship.
        </h2>
        <p className="mt-4 text-center text-[rgb(55,65,81)] text-lg sm:text-xl">
          No setup. No jargon. Just clear “this is vulnerable” messages in your
          workflow.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Detect broken auth routes",
              desc: "Find endpoints that leak or bypass auth checks.",
            },
            {
              title: "RLS + roles sanity checks",
              desc: "Flag missing RLS and weak role handling in Supabase.",
            },
            {
              title: "Simulate bad users",
              desc: "Automated attempts to access premium content.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-[rgb(245,158,11)] font-bold text-lg">★</div>
              <h3 className="mt-2 text-xl font-semibold text-[rgb(23,37,84)]">
                {f.title}
              </h3>
              <p className="mt-1 text-[rgb(75,85,99)] text-base sm:text-lg">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline / How it works */}
      <Box sx={{ width: "80%", mx: "auto", mb: 6 }}>
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 8, mx: "auto", textAlign: "center" }}>
          {steps.map((step, i) => (
            <Box key={i} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
                }}
              >
                {step.label}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
                  fontSize: "1.125rem", // approx text-lg
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 sm:grid-cols-2 items-center">
          <div className="text-sm sm:text-base text-[rgb(75,85,99)]">
            © 2025 Your Company. Auth & paywall protection for Next.js +
            Supabase vibe-coders.
          </div>
          <nav className="flex justify-center sm:justify-end gap-8 text-sm sm:text-base">
            <a className="hover:text-[rgb(16,44,112)] transition" href="#">
              About
            </a>
            <a className="hover:text-[rgb(16,44,112)] transition" href="#">
              Docs
            </a>
            <a className="hover:text-[rgb(16,44,112)] transition" href="#">
              Contact
            </a>
            <a className="hover:text-[rgb(16,44,112)] transition" href="#">
              Privacy Policy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
