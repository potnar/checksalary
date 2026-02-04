"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Briefcase,
  FileText,
  ArrowRight,
  RotateCcw,
  Check,
  Info,
  Banknote,
} from "lucide-react";

type ContractType = "uop" | "b2b" | "uz" | null;

interface CalculationResult {
  net: number;
}

const STEPS = {
  SELECTION: 1,
  INPUT: 2,
  LOADING: 3,
  RESULT: 4,
};

export default function SalaryWizard() {
  const [step, setStep] = useState(1);
  const [contractType, setContractType] = useState<ContractType>(null);
  const [grossAmount, setGrossAmount] = useState<string>("");
  const [isReliefStart, setIsReliefStart] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  const handleContractSelect = (type: ContractType) => {
    setContractType(type);
    setStep(STEPS.INPUT);
  };

  const startCalculation = () => {
    if (!grossAmount) return;
    setStep(STEPS.LOADING);

    // Faster, cleaner transition
    setTimeout(() => {
      performCalculation();
      setStep(STEPS.RESULT);
    }, 1200);
  };

  const performCalculation = () => {
    const gross = parseFloat(grossAmount);
    let net = 0;

    if (contractType === "uop") {
      net = gross * 0.71;
    } else if (contractType === "b2b") {
      const zus = isReliefStart ? 380 : 1600;
      const incomeTax = (gross - zus) * 0.19;
      net = gross - incomeTax - zus;
      if (!isReliefStart) net = gross * 0.76;
      else net = gross * 0.82;
    } else if (contractType === "uz") {
      net = gross * 0.75;
    }

    setResult({ net: Math.round(net) });
  };

  const resetWizard = () => {
    setStep(STEPS.SELECTION);
    setContractType(null);
    setGrossAmount("");
    setResult(null);
  };

  const renderStep = () => {
    switch (step) {
      case STEPS.SELECTION:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div className="text-center space-y-1 mb-8">
              <h2 className="text-lg font-bold text-slate-900">
                Select Your Contract Type
              </h2>
              <p className="text-sm text-slate-500">
                Choose the option that best fits your current situation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContractCard
                title="B2B"
                subtitle="Ideal for contractors & freelancers working with diverse clients."
                icon={<Briefcase />}
                onClick={() => handleContractSelect("b2b")}
                active={contractType === "b2b"}
              />
              <ContractCard
                title="B2B (Small ZUS)"
                subtitle="Discounted ZUS for first 24 months of your project."
                icon={<Briefcase />}
                // Just a visual variant for filling grid, logic maps to same b2b but could use param
                onClick={() => handleContractSelect("b2b")}
                active={false} // Demo state
              />
              <ContractCard
                title="UoP"
                subtitle="Standard full-time roles with standard employment rights."
                icon={<Building2 />}
                onClick={() => handleContractSelect("uop")}
                active={contractType === "uop"}
              />
              <ContractCard
                title="UoP (Student)"
                subtitle="Best for students under 26 & part-time contributors."
                icon={<FileText />}
                onClick={() => handleContractSelect("uz")}
                active={contractType === "uz"}
              />
            </div>
          </motion.div>
        );

      case STEPS.INPUT:
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-start">
              <button
                onClick={() => setStep(STEPS.SELECTION)}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-600 transition-colors py-2 px-3 -ml-3 rounded-lg hover:bg-green-50"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Change Contract Type
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Gross Salary (PLN)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={grossAmount}
                    onChange={(e) => setGrossAmount(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-4 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g. 12000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    PLN
                  </span>
                </div>
              </div>
            </div>

            {contractType === "b2b" && (
              <div
                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer hover:border-green-200 transition-colors"
                onClick={() => setIsReliefStart(!isReliefStart)}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isReliefStart ? "bg-green-500 border-green-500" : "border-slate-300 bg-white"}`}
                >
                  {isReliefStart && (
                    <Check className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-700">
                    Ulga na start (Relief)
                  </p>
                  <p className="text-xs text-slate-400">
                    First 6 months of business activity
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={startCalculation}
              disabled={!grossAmount}
              className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              <Banknote className="w-5 h-5" />
              Calculate My Net Salary
            </button>
          </motion.div>
        );

      case STEPS.LOADING:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 space-y-6"
          >
            <div className="w-12 h-12 border-4 border-slate-100 border-t-green-500 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">
              Crunching the numbers...
            </p>
          </motion.div>
        );

      case STEPS.RESULT:
        if (!result) return null;
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-2"
          >
            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl space-y-2">
              <p className="text-xs text-green-600 font-bold uppercase tracking-widest">
                Estimated Net Monthly
              </p>
              <div className="flex items-baseline justify-center gap-2 text-green-700">
                <span className="text-5xl font-extrabold tracking-tight">
                  {result.net.toLocaleString("pl-PL")}
                </span>
                <span className="text-xl font-medium opacity-60">PLN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Gross Income
                </p>
                <p className="font-semibold text-slate-700 text-lg">
                  {parseFloat(grossAmount || "0").toLocaleString("pl-PL")} PLN
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Taxes & ZUS
                </p>
                <p className="font-semibold text-slate-700 text-lg">
                  ~
                  {(parseFloat(grossAmount || "0") - result.net).toLocaleString(
                    "pl-PL",
                  )}{" "}
                  PLN
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setStep(STEPS.INPUT)}
                className="w-full py-3 text-sm font-bold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Edit Amount
              </button>

              <button
                onClick={resetWizard}
                className="w-full py-3 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start New Calculation
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 relative overflow-hidden"
    >
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
}

function ContractCard({
  title,
  subtitle,
  icon,
  onClick,
  active = false,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col p-6 rounded-xl cursor-pointer transition-all duration-200 border text-left
        ${
          active
            ? "bg-green-50 border-green-500 ring-1 ring-green-500 shadow-sm"
            : "bg-white border-slate-200 hover:border-green-300 hover:shadow-md"
        }
      `}
    >
      {active && (
        <div className="absolute top-4 right-4 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors
         ${active ? "bg-white text-green-600" : "bg-slate-50 text-slate-900 group-hover:bg-green-100 group-hover:text-green-700"}
      `}
      >
        {icon}
      </div>

      <h3
        className={`font-bold text-sm mb-1 ${active ? "text-green-900" : "text-slate-900"}`}
      >
        {title}
      </h3>
      <p
        className={`text-xs leading-relaxed ${active ? "text-green-700/80" : "text-slate-500"}`}
      >
        {subtitle}
      </p>

      <div
        className={`mt-4 flex items-center text-[10px] font-bold uppercase tracking-wider
        ${active ? "text-green-600" : "text-slate-300 group-hover:text-green-600"}
      `}
      >
        <Info className="w-3 h-3 mr-1" />
        More Info
      </div>
    </div>
  );
}
