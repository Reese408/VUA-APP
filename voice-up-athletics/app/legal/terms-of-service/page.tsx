'use client';

import Link from 'next/link';

export default function TermsOfService() {
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
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using VoiceUp Athletics (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you and VoiceUp Athletics, Inc. ("VoiceUp," "we," "us," or "our"). Your use of the Platform is also governed by our <Link href="/legal/privacy-policy" className="underline" style={{ color: 'var(--dark-blue)' }}>Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              2. Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Platform is designed for college and university student-athletes, counselors, and administrators. To use the Platform, you must:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Be at least 18 years of age</li>
              <li>Be affiliated with a university that has a valid subscription to VoiceUp Athletics</li>
              <li>Receive account credentials from your university administrator</li>
              <li>Provide accurate and complete information during account activation</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              3. Account Registration and Security
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.1 Account Creation
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your university will provision your account. You will receive an activation email with instructions to set your password and complete your profile. You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.2 Account Termination
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your university administrator may suspend or terminate your account at any time. We may also suspend or terminate your account if you violate these Terms or engage in prohibited conduct.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              4. Permitted Use
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Platform is intended to facilitate anonymous communication between student-athletes and mental health counselors. You agree to use the Platform only for its intended purpose and in accordance with these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.1 Acceptable Use
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Use the Platform to seek or provide mental health support</li>
              <li>Communicate respectfully and professionally</li>
              <li>Maintain confidentiality of conversations</li>
              <li>Report urgent safety concerns to counselors or authorities</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              5. Prohibited Conduct
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Impersonation:</strong> Impersonate any person or entity, or falsely represent your affiliation</li>
              <li><strong>Harassment:</strong> Harass, threaten, intimidate, or abuse any person</li>
              <li><strong>Misinformation:</strong> Provide false or misleading information about your identity or medical history</li>
              <li><strong>System Abuse:</strong> Attempt to gain unauthorized access to the Platform or interfere with its operation</li>
              <li><strong>Data Mining:</strong> Use automated tools to scrape, collect, or extract data from the Platform</li>
              <li><strong>Spam:</strong> Send unsolicited messages or advertisements</li>
              <li><strong>Illegal Activity:</strong> Use the Platform for any unlawful purpose or to violate any laws</li>
              <li><strong>Reverse Engineering:</strong> Attempt to decompile, disassemble, or reverse engineer any part of the Platform</li>
              <li><strong>Security Threats:</strong> Introduce viruses, malware, or other harmful code</li>
              <li><strong>Confidentiality Breach:</strong> Share login credentials or attempt to access another user's account</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              6. Mental Health Services and Limitations
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.1 Not Emergency Services
            </h3>
            <div
              className="p-6 rounded-xl mb-6"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.4)'
              }}
            >
              <p className="font-semibold mb-2" style={{ color: '#dc2626' }}>
                ⚠️ IMPORTANT: The Platform is not for emergencies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are experiencing a mental health crisis or have thoughts of harming yourself or others, please call 911, contact the National Suicide Prevention Lifeline at 988, or go to your nearest emergency room immediately.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.2 Counselor Availability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Counselors may not be available 24/7. Response times may vary. For urgent matters, contact your university's counseling center directly or call emergency services.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.3 Not a Substitute for Professional Care
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Platform provides supportive communication and resources but does not replace comprehensive mental health treatment. Users are encouraged to seek in-person professional care when appropriate.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.4 No Medical Advice
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Information provided through the Platform is for educational and support purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding medical questions or concerns.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              7. Mandatory Reporting Obligations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to maintain confidentiality, counselors and administrators are bound by legal and ethical obligations to report:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Imminent threats of harm to self or others</li>
              <li>Suspected child abuse or neglect</li>
              <li>Court-ordered disclosures</li>
              <li>Other situations required by law</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              By using the Platform, you acknowledge and accept these reporting obligations.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              8. Intellectual Property Rights
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.1 Platform Ownership
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Platform, including all software, content, designs, logos, and trademarks, is owned by VoiceUp Athletics or its licensors. All rights not expressly granted to you are reserved.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.2 Limited License
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform solely for its intended purpose, subject to these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.3 User Content
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of the messages and content you submit through the Platform ("User Content"). By submitting User Content, you grant us a license to store, process, and display it as necessary to provide the Platform services.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              9. Disclaimers and Limitations of Liability
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              9.1 Service "As Is"
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              9.2 No Guarantee of Outcomes
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee any specific outcomes from using the Platform. Mental health support effectiveness varies by individual.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              9.3 Limitation of Liability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VOICEUP ATHLETICS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              9.4 Maximum Liability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our total liability to you for any claims arising from or related to these Terms or your use of the Platform shall not exceed the amount paid by your university for your use of the Platform in the twelve (12) months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              10. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless VoiceUp Athletics, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Your use or misuse of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your violation of any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              11. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our <Link href="/legal/privacy-policy" className="underline" style={{ color: 'var(--dark-blue)' }}>Privacy Policy</Link>. By using the Platform, you consent to our data practices as described in the Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to HIPAA and FERPA compliance. For more information, see our <Link href="/legal/hipaa-compliance" className="underline" style={{ color: 'var(--dark-blue)' }}>HIPAA Compliance</Link> page.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              12. Changes to the Platform
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify, suspend, or discontinue the Platform (or any part thereof) at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Platform.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              13. Changes to These Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update these Terms from time to time. If we make material changes, we will notify you by email or through a prominent notice on the Platform at least 30 days before the changes take effect.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the Platform after the effective date of the updated Terms constitutes your acceptance of the changes. If you do not agree to the updated Terms, you must stop using the Platform.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              14. Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              14.1 Informal Resolution
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before filing a formal claim, you agree to contact us at <a href="mailto:legal@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>legal@voiceupathletics.com</a> to attempt to resolve the dispute informally.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              14.2 Arbitration Agreement
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any dispute arising from or relating to these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, rather than in court, except that you may assert claims in small claims court if your claims qualify.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              14.3 Class Action Waiver
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              YOU AGREE THAT DISPUTES WILL BE RESOLVED INDIVIDUALLY AND NOT AS PART OF A CLASS ACTION OR CONSOLIDATED PROCEEDING.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              15. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              16. Severability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              17. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms, please contact us:
            </p>

            <div
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <p className="mb-2"><strong>VoiceUp Athletics Legal Team</strong></p>
              <p className="mb-2">Email: <a href="mailto:legal@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>legal@voiceupathletics.com</a></p>
              <p className="mb-2">Address: 123 University Ave, Suite 200, College Town, ST 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>
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
                <Link href="/legal/privacy-policy" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  Privacy Policy
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
