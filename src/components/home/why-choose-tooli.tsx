"use client";

import { Gem, Lock, ShieldCheck, Zap } from "lucide-react";

export function WhyChooseTooli() {
  const features = [
    {
      title: "100% Private",
      description: "Your files never leave your device. All processing happens locally in your browser.",
      icon: Lock,
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Blazing Fast",
      description: "Skip the upload wait. Near-instant processing powered by your own hardware.",
      icon: Zap,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-500",
    },
    {
      title: "Always Free",
      description: "No subscriptions, no hidden costs, and absolutely no intrusive advertisements.",
      icon: Gem,
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Secure by Design",
      description: "No server-side storage or logs. Your sensitive data remains completely sovereign.",
      icon: ShieldCheck,
      gradient: "from-indigo-500/10 to-purple-500/10",
      iconColor: "text-indigo-500",
    },
  ] as const;

  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-5xl md:text-5xl font-bold tracking-tight">
          Why Choose <span className="text-primary">Tooli</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto pb-2">
          The industry&apos;s most private utility platform, rebuilt for the modern web with a focus on speed and security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative p-8 rounded-3xl border bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={[
                  "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                  feature.gradient,
                ].join(" ")}
              />

              <div className="relative space-y-4 text-center">
                <div className={`mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center ${feature.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


