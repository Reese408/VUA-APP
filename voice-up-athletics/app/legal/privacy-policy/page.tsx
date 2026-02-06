'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm mb-4 inline-block transition-colors"
            style={{ color: 'var(--dark-blue)' }}
          >
            ← Back to Home
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--dark-blue)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VoiceUp Athletics ("we," "us," or "our") is committed to protecting the privacy and confidentiality of student-athletes seeking mental health support. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand the sensitive nature of mental health information and have designed our platform with privacy and anonymity as core principles, in compliance with HIPAA, FERPA, and other applicable privacy laws.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.1 Account Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When your university provisions your account, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>University email address</li>
              <li>First and last name (for administrative purposes only)</li>
              <li>University and team affiliation</li>
              <li>Account role (athlete, counselor, or administrator)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.2 Anonymous Display Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Athletes can create an anonymous display name that is visible to counselors during conversations. Your real identity is never disclosed to counselors without your explicit consent.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.3 Communication Data
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We store messages exchanged between athletes and counselors in encrypted format. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Message content (encrypted at rest and in transit)</li>
              <li>Timestamps</li>
              <li>Conversation status (active, resolved, flagged)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.4 Technical Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We automatically collect certain technical information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>IP addresses (for security and fraud prevention)</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Login timestamps</li>
              <li>Access logs (for compliance and security auditing)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              3. How We Use Your Information
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We use collected information for the following purposes:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Service Delivery:</strong> Facilitate anonymous communication between athletes and mental health counselors</li>
              <li><strong>Account Management:</strong> Create, maintain, and secure user accounts</li>
              <li><strong>Safety & Crisis Response:</strong> Enable counselors to flag urgent conversations and coordinate appropriate responses</li>
              <li><strong>Platform Improvement:</strong> Analyze aggregate, de-identified usage data to improve our services</li>
              <li><strong>Security & Fraud Prevention:</strong> Protect against unauthorized access and maintain platform integrity</li>
              <li><strong>Legal Compliance:</strong> Meet HIPAA, FERPA, and other regulatory requirements</li>
              <li><strong>University Reporting:</strong> Provide universities with aggregate, non-identifiable usage statistics</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              4. Information Sharing and Disclosure
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.1 No Third-Party Sales
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.2 Within Your University
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Information sharing within your university is strictly limited:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Counselors:</strong> See only anonymous display names and conversation content</li>
              <li><strong>University Administrators:</strong> Can view user lists and aggregate usage statistics but cannot access conversation content or link athletes to their conversations</li>
              <li><strong>Platform Administrators:</strong> Have technical access for system maintenance but cannot view unencrypted message content</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.3 Legal Requirements
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose information when required by law:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>In response to valid legal process (subpoena, court order)</li>
              <li>To protect the safety of individuals or the public</li>
              <li>To report suspected child abuse or neglect as required by law</li>
              <li>To prevent imminent harm or criminal activity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.4 Service Providers
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with trusted service providers who help us operate our platform:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Cloud hosting providers (AWS, Google Cloud, or similar HIPAA-compliant services)</li>
              <li>Email delivery services (for account activation and notifications)</li>
              <li>Analytics providers (using only aggregate, de-identified data)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              All service providers sign Business Associate Agreements (BAAs) and are contractually obligated to protect your information.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              5. Data Security
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication for administrators</li>
              <li><strong>Audit Logging:</strong> All access to sensitive data is logged and monitored</li>
              <li><strong>Regular Security Audits:</strong> Third-party penetration testing and vulnerability assessments</li>
              <li><strong>Data Isolation:</strong> University data is strictly segregated to prevent cross-contamination</li>
              <li><strong>Incident Response:</strong> 24/7 security monitoring with defined breach notification procedures</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              For more details, see our <Link href="/legal/security" className="underline" style={{ color: 'var(--dark-blue)' }}>Security page</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              6. Your Rights and Choices
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.1 Access and Correction
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Access your account information</li>
              <li>Update your anonymous display name</li>
              <li>Change your password and notification preferences</li>
              <li>Request a copy of your conversation history</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.2 Account Deletion
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may request account deletion by contacting your university administrator or our support team at <a href="mailto:privacy@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>privacy@voiceupathletics.com</a>. Please note:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Deletion requests are processed within 30 days</li>
              <li>Some information may be retained for legal compliance (e.g., audit logs)</li>
              <li>Conversation records may be retained in de-identified form for clinical documentation purposes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.3 Opt-Out Options
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can opt out of:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Non-essential email notifications (via account settings)</li>
              <li>Usage analytics (contact support to disable)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibent mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              7. Data Retention
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We retain information for the following periods:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Account Information:</strong> For the duration of your enrollment plus 7 years (FERPA requirement)</li>
              <li><strong>Conversation Records:</strong> 7 years from the date of the conversation (standard clinical documentation retention)</li>
              <li><strong>Audit Logs:</strong> 7 years for compliance purposes</li>
              <li><strong>De-identified Analytics:</strong> Indefinitely for research and platform improvement</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              8. Children's Privacy
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are designed for college and university students aged 18 and older. We do not knowingly collect information from individuals under 18 without parental consent. If we become aware of such collection, we will delete the information promptly.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              9. International Users
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are hosted in the United States. If you access our platform from outside the U.S., your information will be transferred to, stored, and processed in the United States. By using our services, you consent to this transfer.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              10. Changes to This Policy
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Posting the updated policy with a new "Last Updated" date</li>
              <li>Sending an email notification to your university email address</li>
              <li>Displaying a prominent notice on the platform</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the platform after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              11. Contact Us
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
            </p>

            <div
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <p className="mb-2"><strong>VoiceUp Athletics Privacy Team</strong></p>
              <p className="mb-2">Email: <a href="mailto:privacy@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>privacy@voiceupathletics.com</a></p>
              <p className="mb-2">Address: 123 University Ave, Suite 200, College Town, ST 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              For HIPAA-related inquiries, please email our Privacy Officer at <a href="mailto:hipaa@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>hipaa@voiceupathletics.com</a>.
            </p>
          </section>

          {/* Related Links */}
          <div
            className="mt-12 p-6 rounded-xl"
            style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)' }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--dark-blue)' }}>
              Related Legal Documents
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms-of-service" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/hipaa-compliance" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  HIPAA Compliance
                </Link>
              </li>
              <li>
                <Link href="/legal/security" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  Security Practices
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
