'use client';

import Link from 'next/link';
import { Shield, Lock, Server, Eye, AlertTriangle, CheckCircle2, Database, Network } from 'lucide-react';

export default function Security() {
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
            Security Practices
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
              Security-First Architecture
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At VoiceUp Athletics, security is not an afterthought—it's built into every layer of our platform. We employ enterprise-grade security measures to protect your sensitive mental health information and ensure the confidentiality of all communications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This page provides transparency about our security practices, technologies, and ongoing commitment to protecting your data.
            </p>
          </section>

          {/* Security Features Grid */}
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
                  <Lock className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  End-to-End Encryption
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your conversations are encrypted before storage.
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
                  <Eye className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  24/7 Monitoring
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Continuous security monitoring with automated threat detection and immediate incident response protocols.
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
                  <Server className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  Secure Infrastructure
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                HIPAA-compliant cloud hosting with redundant systems, automated backups, and disaster recovery plans.
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
                  <Shield className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  Access Controls
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Role-based permissions, multi-factor authentication, and principle of least privilege access.
              </p>
            </div>
          </div>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              1. Data Encryption
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.1 Encryption at Rest
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All data stored in our systems is encrypted using industry-standard AES-256 encryption:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Message Content:</strong> All conversations are encrypted before being written to the database</li>
              <li><strong>Personal Information:</strong> User profiles and account details are encrypted</li>
              <li><strong>Database Encryption:</strong> Full database encryption with separate encryption keys per university (data isolation)</li>
              <li><strong>File Storage:</strong> Any uploaded files are encrypted with unique keys</li>
              <li><strong>Backups:</strong> All backup data is encrypted using the same standards</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.2 Encryption in Transit
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All data transmitted between your device and our servers is protected:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>TLS 1.3:</strong> Latest Transport Layer Security protocol for all connections</li>
              <li><strong>Perfect Forward Secrecy:</strong> Each session uses unique encryption keys</li>
              <li><strong>Certificate Pinning:</strong> Protection against man-in-the-middle attacks</li>
              <li><strong>HSTS Enabled:</strong> Browsers automatically use secure connections</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              1.3 Key Management
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Encryption keys stored in hardware security modules (HSMs)</li>
              <li>Regular key rotation following industry best practices</li>
              <li>Multi-party authorization required for key access</li>
              <li>Keys never stored in application code or configuration files</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              2. Access Control and Authentication
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.1 User Authentication
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Strong Passwords:</strong> Minimum requirements (8+ characters, uppercase, lowercase, numbers, special characters)</li>
              <li><strong>Password Hashing:</strong> bcrypt with adaptive cost factor (never stored in plain text)</li>
              <li><strong>Multi-Factor Authentication:</strong> Required for administrative accounts</li>
              <li><strong>Session Management:</strong> Secure, httpOnly cookies with SameSite protection</li>
              <li><strong>Auto-Logout:</strong> Automatic session termination after inactivity</li>
              <li><strong>Account Lockout:</strong> Temporary lockout after failed login attempts</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.2 Role-Based Access Control (RBAC)
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every user is assigned a specific role with precisely defined permissions:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Athletes:</strong> Access only to their own conversations and profile</li>
              <li><strong>Counselors:</strong> Access only to assigned conversations (anonymous athlete IDs only)</li>
              <li><strong>University Admins:</strong> User management for their university; no access to conversation content</li>
              <li><strong>Platform Admins:</strong> System administration; all access logged and audited</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              2.3 Principle of Least Privilege
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users and systems are granted only the minimum access necessary to perform their functions. Access is reviewed quarterly and revoked immediately upon role changes or termination.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              3. Infrastructure Security
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.1 Cloud Hosting
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Provider:</strong> HIPAA-compliant cloud infrastructure (AWS/Google Cloud with BAA)</li>
              <li><strong>Data Centers:</strong> SOC 2 Type II certified facilities</li>
              <li><strong>Geographic Redundancy:</strong> Data replicated across multiple availability zones</li>
              <li><strong>Physical Security:</strong> 24/7 surveillance, biometric access, and security guards</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.2 Network Security
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Firewalls:</strong> Next-generation firewalls with intrusion prevention</li>
              <li><strong>DDoS Protection:</strong> Automated distributed denial-of-service mitigation</li>
              <li><strong>Network Segmentation:</strong> Isolated networks for different security zones</li>
              <li><strong>VPN Access:</strong> Required for administrative access to production systems</li>
              <li><strong>Private Subnets:</strong> Database and sensitive services isolated from public internet</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              3.3 Application Security
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Security Headers:</strong> CSP, HSTS, X-Frame-Options, and other protective headers</li>
              <li><strong>Input Validation:</strong> All user inputs sanitized to prevent injection attacks</li>
              <li><strong>Output Encoding:</strong> Protection against XSS (cross-site scripting)</li>
              <li><strong>CSRF Protection:</strong> Token-based protection for state-changing operations</li>
              <li><strong>Rate Limiting:</strong> Protection against brute force and abuse</li>
              <li><strong>SQL Injection Prevention:</strong> Parameterized queries and ORM usage</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              4. Monitoring and Incident Response
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.1 Security Monitoring
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>24/7 Monitoring:</strong> Automated security information and event management (SIEM)</li>
              <li><strong>Log Aggregation:</strong> Centralized logging of all security-relevant events</li>
              <li><strong>Anomaly Detection:</strong> Machine learning-based detection of unusual patterns</li>
              <li><strong>Vulnerability Scanning:</strong> Continuous automated scanning for vulnerabilities</li>
              <li><strong>Uptime Monitoring:</strong> Real-time availability and performance monitoring</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.2 Audit Logging
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We maintain comprehensive audit logs for compliance and security:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Access Logs:</strong> Every access to sensitive data is logged with user ID, timestamp, and IP address</li>
              <li><strong>Administrative Actions:</strong> All admin actions logged with details and justification</li>
              <li><strong>Authentication Events:</strong> Login attempts, password changes, and account modifications</li>
              <li><strong>System Changes:</strong> Configuration changes and system updates logged</li>
              <li><strong>Retention:</strong> Logs retained for 7 years for compliance purposes</li>
              <li><strong>Tamper-Proof:</strong> Logs stored with integrity verification (cannot be altered)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.3 Incident Response Plan
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We maintain a documented incident response plan with defined procedures:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Detection:</strong> Automated alerts for security incidents</li>
              <li><strong>Triage:</strong> Rapid assessment and prioritization</li>
              <li><strong>Containment:</strong> Immediate isolation of affected systems</li>
              <li><strong>Eradication:</strong> Removal of threats and vulnerabilities</li>
              <li><strong>Recovery:</strong> Restoration of normal operations</li>
              <li><strong>Post-Incident Review:</strong> Analysis and improvement of security controls</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              4.4 Response Times
            </h3>
            <div
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <ul className="space-y-2 text-gray-700">
                <li><strong>Critical Security Incidents:</strong> Response within 1 hour</li>
                <li><strong>High-Priority Issues:</strong> Response within 4 hours</li>
                <li><strong>Medium-Priority Issues:</strong> Response within 24 hours</li>
                <li><strong>Low-Priority Issues:</strong> Response within 72 hours</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              5. Data Protection and Privacy
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              5.1 Data Isolation
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              University data is strictly isolated to prevent cross-contamination:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Logical Separation:</strong> All queries filtered by university_id</li>
              <li><strong>Encryption Keys:</strong> Separate encryption keys per university</li>
              <li><strong>Database Constraints:</strong> Foreign key relationships enforce data boundaries</li>
              <li><strong>Application Logic:</strong> Middleware automatically scopes queries</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              5.2 Anonymity Protection
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Athletes identified only by anonymous display names to counselors</li>
              <li>Conversation metadata does not link to identifiable information</li>
              <li>Real identities protected even from university administrators</li>
              <li>IP addresses and device information not stored in conversation records</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              5.3 Data Retention and Deletion
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Retention Period:</strong> 7 years for clinical records (industry standard)</li>
              <li><strong>Secure Deletion:</strong> Cryptographic erasure for deleted data</li>
              <li><strong>Right to Deletion:</strong> Users can request account deletion (processed within 30 days)</li>
              <li><strong>Backup Purging:</strong> Deleted data removed from backups after retention period</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              6. Security Testing and Audits
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.1 Penetration Testing
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Frequency:</strong> Bi-annual third-party penetration tests</li>
              <li><strong>Scope:</strong> Full application, infrastructure, and network testing</li>
              <li><strong>Methodology:</strong> OWASP Top 10 and custom threat modeling</li>
              <li><strong>Remediation:</strong> Critical findings resolved within 7 days</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.2 Vulnerability Management
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Continuous automated vulnerability scanning</li>
              <li>Dependency scanning for third-party libraries</li>
              <li>Regular patching and updates (critical patches within 48 hours)</li>
              <li>Bug bounty program for responsible disclosure</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              6.3 Compliance Audits
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>HIPAA Compliance:</strong> Annual third-party audit</li>
              <li><strong>SOC 2 Type II:</strong> Annual certification (in progress)</li>
              <li><strong>Internal Audits:</strong> Quarterly security control reviews</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              7. Business Continuity and Disaster Recovery
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              7.1 Backup Strategy
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Frequency:</strong> Continuous replication + daily snapshots</li>
              <li><strong>Encryption:</strong> All backups encrypted with AES-256</li>
              <li><strong>Geographic Distribution:</strong> Backups stored in multiple regions</li>
              <li><strong>Retention:</strong> Daily backups for 30 days, weekly for 1 year</li>
              <li><strong>Testing:</strong> Monthly restore drills to verify integrity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              7.2 Disaster Recovery
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>RTO (Recovery Time Objective):</strong> 4 hours</li>
              <li><strong>RPO (Recovery Point Objective):</strong> 1 hour</li>
              <li><strong>Failover:</strong> Automated failover to standby systems</li>
              <li><strong>DR Drills:</strong> Quarterly disaster recovery exercises</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              7.3 High Availability
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Uptime SLA:</strong> 99.9% availability</li>
              <li><strong>Load Balancing:</strong> Traffic distributed across multiple servers</li>
              <li><strong>Auto-Scaling:</strong> Automatic capacity adjustments based on demand</li>
              <li><strong>Health Checks:</strong> Continuous monitoring with automatic recovery</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              8. Employee Security
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.1 Background Checks
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All employees with access to production systems undergo:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Criminal background checks</li>
              <li>Employment verification</li>
              <li>Reference checks</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.2 Security Training
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Onboarding:</strong> Mandatory security training for all new hires</li>
              <li><strong>Annual Training:</strong> HIPAA, security awareness, and privacy training</li>
              <li><strong>Phishing Simulations:</strong> Quarterly phishing awareness tests</li>
              <li><strong>Incident Response:</strong> Regular tabletop exercises</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--dark-gray)' }}>
              8.3 Access Policies
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Signed confidentiality agreements for all employees</li>
              <li>Immediate access revocation upon termination</li>
              <li>Quarterly access reviews</li>
              <li>Separation of duties for critical functions</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              9. Reporting Security Issues
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take security issues seriously. If you discover a security vulnerability:
            </p>

            <div
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)' }}
            >
              <p className="font-semibold mb-3" style={{ color: '#dc2626' }}>
                <AlertTriangle className="inline h-5 w-5 mr-2" />
                Responsible Disclosure Program
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Email:</strong> <a href="mailto:security@voiceupathletics.com" className="underline" style={{ color: 'var(--dark-blue)' }}>security@voiceupathletics.com</a></li>
                <li><strong>PGP Key:</strong> Available upon request</li>
                <li><strong>Response Time:</strong> We acknowledge reports within 24 hours</li>
                <li><strong>Bug Bounty:</strong> Eligible findings may qualify for rewards</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Please do not publicly disclose vulnerabilities until we've had a chance to address them.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--dark-blue)' }}
            >
              10. Third-Party Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All third-party vendors are carefully vetted:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Security questionnaires and assessments</li>
              <li>SOC 2 certification requirements</li>
              <li>Business Associate Agreements for PHI access</li>
              <li>Regular vendor security reviews</li>
              <li>Contractual security requirements</li>
            </ul>
          </section>

          {/* Security Badge */}
          <div
            className="p-8 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '2px solid rgba(33, 32, 156, 0.2)' }}
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--golden-yellow)' }}
              >
                <CheckCircle2 className="h-12 w-12" style={{ color: 'var(--dark-blue)' }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
              Security is Our Priority
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We continuously invest in security infrastructure, processes, and people to ensure your mental health data remains protected and confidential.
            </p>
          </div>

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
                <Link href="/legal/hipaa-compliance" className="underline" style={{ color: 'var(--dark-blue)' }}>
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
