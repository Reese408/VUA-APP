'use client';

import { Check, X, Scale } from "lucide-react";

const comparisonFeatures = [
  { name: "Student-Athletes", basic: "Up to 50", popular: "Unlimited", enterprise: "Unlimited" },
  { name: "Anonymous Messaging", basic: true, popular: true, enterprise: true },
  { name: "Resource Library", basic: "Basic", popular: "Advanced", enterprise: "Custom" },
  { name: "Admin Dashboard", basic: false, popular: true, enterprise: true },
  { name: "Analytics & Reporting", basic: false, popular: "Standard", enterprise: "Advanced" },
  { name: "Counselor Portal", basic: false, popular: true, enterprise: true },
  { name: "Custom Branding", basic: false, popular: true, enterprise: true },
  { name: "Priority Support", basic: false, popular: "24/7", enterprise: "Dedicated Manager" },
  { name: "API Access", basic: false, popular: false, enterprise: true },
  { name: "White-Label Options", basic: false, popular: false, enterprise: true },
  { name: "Training & Onboarding", basic: false, popular: true, enterprise: "Comprehensive" },
  { name: "SLA Guarantee", basic: false, popular: false, enterprise: true },
];

export default function ComparePlans() {
  return (
    <div id='compare-plans' className="mt-24">
        <div className="flex justify-center mb-10">
            <div
                className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold"
                style={{
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: 'var(--dark-gray)',
                }}
            >
                <Scale className="w-4 h-4" />
                Compare Plans
            </div>
        </div>

      <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: 'var(--dark-blue)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--light-gray)' }}>
              <th className="p-6 text-left">Features</th>
              <th className="p-6 text-center">Per-Team</th>
              <th className="p-6 text-center">University-Wide</th>
              <th className="p-6 text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((f) => (
              <tr key={f.name} className="border-t">
                <td className="p-6 font-medium">{f.name}</td>
                {[f.basic, f.popular, f.enterprise].map((val, i) => (
                  <td key={i} className="p-6 text-center">
                    {typeof val === "boolean" ? (
                      val ? <Check className="mx-auto" /> : <X className="mx-auto" />
                    ) : (
                      val
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
