'use client';

import Link from 'next/link';
import { Shield, Lock, FileCheck, UserCheck, Bell, Database } from 'lucide-react';

export default function HIPAACompliance() {
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
            HIPAA Compliance
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
              Our Commitment to HIPAA Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VoiceUp Athletics is committed to protecting the privacy and security of Protected Health Information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996 and its implementing regulations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As a platform facilitating mental health support services, we understand the critical importance of maintaining the confidentiality, integrity, and availability of sensitive health information. This page outlines our HIPAA compliance framework and practices.
            </p>
          </section>

          {/* Compliance Overview Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--golden-yellow)' }}
                >
                  <Shield className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  Privacy Rule
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                We comply with HIPAA Privacy Rule standards for the protection of PHI, ensuring proper use and disclosure practices.
              </p>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--golden-yellow)' }}
                >
                  <Lock className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  Security Rule
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                We implement administrative, physical, and technical safeguards to protect electronic PHI (ePHI).
              </p>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--golden-yellow)' }}
                >
                  <Bell className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  Breach Notification
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                We maintain procedures for detecting, responding to, and reporting breaches of unsecured PHI.
              </p>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--golden-yellow)' }}
                >
                  <FileCheck className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  BAA Agreements
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                All service providers handling PHI sign Business Associate Agreements ensuring compliance.
              </p>
            </div>
          </div>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              1. HIPAA Privacy Rule Compliance
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.1 Minimum Necessary Standard
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We limit access to PHI to the minimum necessary to accomplish the intended purpose:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Counselors:</strong> Access only to conversations assigned to them and anonymous athlete identifiers</li>
              <li><strong>University Administrators:</strong> Access to aggregate statistics only, no conversation content</li>
              <li><strong>Platform Administrators:</strong> Access limited to encrypted data for technical maintenance</li>
              <li><strong>Athletes:</strong> Access only to their own conversations and profile</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.2 Use and Disclosure Limitations
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use and disclose PHI only for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Treatment:</strong> Facilitating mental health counseling and support</li>
              <li><strong>Payment:</strong> Processing university subscription payments (aggregate level only)</li>
              <li><strong>Healthcare Operations:</strong> Quality improvement and platform operations</li>
              <li><strong>Required by Law:</strong> Responding to legal requirements and court orders</li>
              <li><strong>Public Health:</strong> Reporting required by public health authorities</li>
              <li><strong>Preventing Harm:</strong> Disclosures necessary to prevent serious threats to health or safety</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.3 Individual Rights
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We support your HIPAA rights:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Right to Access:</strong> Request copies of your PHI within 30 days</li>
              <li><strong>Right to Amend:</strong> Request corrections to inaccurate PHI</li>
              <li><strong>Right to Accounting:</strong> Receive a list of certain disclosures we've made</li>
              <li><strong>Right to Request Restrictions:</strong> Ask us to limit uses or disclosures of your PHI</li>
              <li><strong>Right to Confidential Communications:</strong> Request alternative means of communication</li>
              <li><strong>Right to Notice:</strong> Receive a copy of our Notice of Privacy Practices</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              2. HIPAA Security Rule Compliance
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.1 Administrative Safeguards
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Security Management:</strong> Risk analysis, risk management, and sanction policies for violations</li>
              <li><strong>Workforce Training:</strong> Annual HIPAA training for all employees and contractors</li>
              <li><strong>Access Controls:</strong> Role-based access with regular access reviews and termination procedures</li>
              <li><strong>Security Officer:</strong> Designated Security Officer responsible for compliance oversight</li>
              <li><strong>Incident Response:</strong> Documented procedures for security incident detection and response</li>
              <li><strong>Contingency Planning:</strong> Data backup, disaster recovery, and emergency mode operations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.2 Physical Safeguards
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Facility Access:</strong> Data centers with 24/7 security, surveillance, and biometric access controls</li>
              <li><strong>Workstation Security:</strong> Encrypted devices, screen locks, and clean desk policies</li>
              <li><strong>Device Controls:</strong> Hardware inventory management and secure disposal procedures</li>
              <li><strong>Physical Data Storage:</strong> Encrypted backups stored in secure, geographically distributed locations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.3 Technical Safeguards
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Access Controls:</strong> Unique user IDs, automatic logoff after inactivity, and encryption/decryption mechanisms</li>
              <li><strong>Audit Controls:</strong> Logging and monitoring of all PHI access and system activity</li>
              <li><strong>Integrity Controls:</strong> Mechanisms to ensure ePHI is not improperly altered or destroyed</li>
              <li><strong>Transmission Security:</strong> TLS 1.3 encryption for all data in transit</li>
              <li><strong>Authentication:</strong> Multi-factor authentication for administrative access</li>
              <li><strong>Encryption:</strong> AES-256 encryption for all data at rest</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              For more technical details, see our <Link href="/legal/security" className="underline" style={{ color: 'var(--dark-blue)' }}>Security page</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              3. Breach Notification Procedures
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.1 Breach Definition
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A breach is an impermissible use or disclosure of PHI that compromises the security or privacy of the PHI. We maintain procedures to detect and respond to breaches promptly.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.2 Notification Timeline
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the event of a breach:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Individual Notification:</strong> Within 60 days of breach discovery via email or mail</li>
              <li><strong>Media Notification:</strong> For breaches affecting 500+ individuals in a state or jurisdiction</li>
              <li><strong>HHS Notification:</strong> Within 60 days for breaches affecting fewer than 500 individuals; immediately for breaches affecting 500+ individuals</li>
              <li><strong>Business Associate Notification:</strong> Immediately upon discovery if breach originated from BA</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.3 Breach Content
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Breach notifications include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Description of the breach and when it occurred</li>
              <li>Types of information involved</li>
              <li>Steps individuals should take to protect themselves</li>
              <li>What we are doing to investigate and mitigate harm</li>
              <li>Contact information for further questions</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              4. Business Associate Agreements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All third-party service providers who have access to PHI sign Business Associate Agreements (BAAs) that require them to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Implement appropriate safeguards to protect PHI</li>
              <li>Report breaches and security incidents</li>
              <li>Ensure subcontractors comply with HIPAA</li>
              <li>Return or destroy PHI upon contract termination</li>
              <li>Allow audits of their compliance practices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.1 Current Business Associates
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Business Associates include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Cloud Infrastructure:</strong> HIPAA-compliant hosting providers (AWS/Google Cloud with BAA)</li>
              <li><strong>Email Services:</strong> Transactional email providers with BAA</li>
              <li><strong>Analytics:</strong> De-identified, aggregate analytics services only</li>
              <li><strong>Security Services:</strong> Penetration testing and security audit providers with BAA</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              5. FERPA Integration
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to HIPAA, we comply with the Family Educational Rights and Privacy Act (FERPA) requirements for educational institutions:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Education Records Protection:</strong> We treat mental health counseling notes as protected education records</li>
              <li><strong>No Disclosure Without Consent:</strong> Except as permitted by FERPA exceptions</li>
              <li><strong>University Access Limitations:</strong> Universities cannot access counseling content without student consent</li>
              <li><strong>Directory Information Exclusion:</strong> Mental health service usage is never considered directory information</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              6. Continuous Compliance Program
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.1 Regular Audits
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Annual third-party HIPAA compliance audits</li>
              <li>Quarterly internal security assessments</li>
              <li>Continuous vulnerability scanning</li>
              <li>Penetration testing every six months</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.2 Staff Training
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Annual HIPAA training for all workforce members</li>
              <li>Role-specific security training</li>
              <li>Incident response drills</li>
              <li>Privacy awareness campaigns</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.3 Policy Updates
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Regular review and update of policies and procedures</li>
              <li>Monitoring of regulatory changes</li>
              <li>Documentation of all policy revisions</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              7. How to Exercise Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise your HIPAA rights or for questions about our compliance practices:
            </p>

            <div
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <p className="mb-2"><strong>HIPAA Privacy Officer</strong></p>
              <p className="mb-2">Email: <a href="mailto:hipaa@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>hipaa@voiceupathletics.com</a></p>
              <p className="mb-2">Phone: (555) 123-4567 ext. 2</p>
              <p className="mb-2">Address: 123 University Ave, Suite 200, College Town, ST 12345</p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Office of Civil Rights (OCR) - For Complaints:</strong><br />
                U.S. Department of Health and Human Services<br />
                200 Independence Avenue, S.W.<br />
                Washington, D.C. 20201<br />
                Phone: 1-877-696-6775<br />
                Website: <a href="https://www.hhs.gov/ocr/privacy/" className="underline" style={{ color: 'var(--dark-blue)' }} target="_blank" rel="noopener noreferrer">www.hhs.gov/ocr/privacy</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              8. Certifications and Attestations
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>HIPAA Compliance:</strong> Verified through third-party audit</li>
              <li><strong>SOC 2 Type II:</strong> Annual certification (in progress)</li>
              <li><strong>HITRUST:</strong> Pursuing certification</li>
            </ul>
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
                <Link href="/legal/terms-of-service" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  Terms of Service
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
