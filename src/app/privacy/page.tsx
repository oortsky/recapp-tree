export default function Page() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-card shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <p className="text-sm mb-4">
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
              1. Information We Collect
            </h2>
            <p className="mb-3">
              When you sign in with Google, we collect and store the following
              information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your email address from your Google Account</li>
              <li>
                Your basic profile information (name, profile picture) that
                you've made publicly available on Google
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Authenticate and identify you when you use our service</li>
              <li>Provide and maintain our services</li>
              <li>Communicate with you about your account</li>
              <li>Improve and personalize your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Data Storage and Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, disclosure, or destruction. Your data is
              stored securely and we do not share your information with third
              parties except as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Google OAuth</h2>
            <p className="mb-3">
              We use Google OAuth for authentication. The permissions we request
              are:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>userinfo.email</strong> - To see your primary Google
                Account email address
              </li>
              <li>
                <strong>userinfo.profile</strong> - To see your personal info,
                including any personal info you've made publicly available
              </li>
            </ul>
            <p className="mt-3">
              You can revoke our access to your Google account at any time
              through your Google Account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active
              or as needed to provide you services. If you wish to delete your
              account, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Revoke access to your Google account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:axara.dev@proton.me"
                className="hover:underline"
              >
                axara.dev@proton.me
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
