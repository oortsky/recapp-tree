export default function Page() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-card shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <p className="text-sm text-gray-500 mb-4">
              Last updated:{" "}
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this service, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Description of Service
            </h2>
            <p>
              We provide a web-based application that uses Google OAuth for
              authentication. By using Google Sign-In, you authorize us to
              access your email address and basic profile information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="mb-3">
              When you create an account with us through Google OAuth:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must provide accurate and complete information</li>
              <li>
                You are responsible for maintaining the security of your account
              </li>
              <li>You must be at least 13 years old to use this service</li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. User Responsibilities
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the service for any illegal purposes</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe on the rights of others</li>
              <li>Transmit any harmful code or malware</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Interfere with or disrupt the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Privacy</h2>
            <p>
              Your use of this service is also governed by our Privacy Policy.
              Please review our{" "}
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>{" "}
              to understand how we collect and use your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality
              are owned by us and are protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the service immediately, without prior notice or
              liability, for any reason, including without limitation if you
              breach these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Disclaimer of Warranties
            </h2>
            <p>
              The service is provided on an "AS IS" and "AS AVAILABLE" basis. We
              make no warranties, expressed or implied, regarding the service,
              including but not limited to warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              In no event shall we be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or
              relating to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these terms at any time.
              We will provide notice of any changes by posting the new Terms of
              Service on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:axara.dev@proton.me"
                className="hover:underline"
              >
                axara.dev@proton.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t">
          <a href="/" className="hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
