"use client";

import { ShieldCheck, Lock, Cpu, EyeOff } from "lucide-react";

export function TrustSignals() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "100% Secure & Private",
      description: "Processing is completed entirely within your browser. No files, calculations, or data are ever uploaded to any servers.",
      iconColor: "text-indigo-500 bg-indigo-500/10",
    },
    {
      icon: Lock,
      title: "No Server Storage",
      description: "Since there is no backend database for processing, your sensitive data remains completely in your control.",
      iconColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: Cpu,
      title: "Local Hardware Speed",
      description: "Leverages your local computer's processing power. No queuing, no server lag—instant results.",
      iconColor: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: EyeOff,
      title: "Zero-Tracking Guarantee",
      description: "We do not track your input data. Your calculations, passwords, and photos are strictly yours.",
      iconColor: "text-rose-500 bg-rose-500/10",
    },
  ];

  return (
    <div className="mt-12 border-t pt-10">
      <div className="text-left mb-8 space-y-2">
        <h3 className="text-xl font-bold tracking-tight">Trust & Security Signals</h3>
        <p className="text-sm text-muted-foreground">
          Why millions of users trust Tooli for safe, local-first utility tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="p-5 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-md transition-all duration-200 flex flex-col gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
