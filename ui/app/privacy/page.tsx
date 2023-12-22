export default function Privacy() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 text-sm">Last Updated: December 22nd, 2023</p>
      <div className="p-12 w-1/2">
        <section className="my-6">
          <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
          <p className="text-sm text-gray-300">
            Thank you for choosing HobbitLink, the URL shortening service
            provided by Hobbitlink (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). This Privacy Policy is designed to help you
            understand how we collect, use, and safeguard your personal
            information when you use our HobbitLink URL shortener service (the
            &quot;Service&quot;).
          </p>
        </section>

        <section className="my-6">
          <h2 className="text-xl font-bold mb-2">2. Collection</h2>
          <p className="text-sm text-gray-300">
            User Account Information: When you create a user account, we may
            collect personal information such as your name, email address, and
            any other information you provide during the account creation
            process. Link Information: When you use our Service to create
            shortened links, we may collect information related to those links,
            including the original URL, the shortened URL, and related analytics
            data.
          </p>
        </section>

        <section className="my-6">
          <h2 className="text-xl font-bold mb-2">3. Usage</h2>
          <p className="text-sm text-gray-300">
            How We Use Your Information Providing the Service: We use the
            information collected to provide, maintain, and improve the
            functionality of the HobbitLink URL shortener service.
            Communication: We may use your email address to communicate with you
            about the Service, including account-related notifications and
            updates. Analytics: We may aggregate and anonymize data for
            analytical purposes to better understand how users interact with our
            Service and to improve its performance.
          </p>
        </section>

        <section className="my-6">
          <h2 className="text-xl font-bold mb-2">4. Security</h2>
          <p className="text-sm text-gray-300">
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, and
            destruction.
          </p>
        </section>

        <section className="my-6">
          <h2 className="text-xl font-bold mb-2">5. Changes</h2>
          <p className="text-sm text-gray-300">
            We reserve the right to update this Privacy Policy to reflect
            changes in our practices and the Service. We will notify you of any
            significant changes through the Service or via email.
          </p>
        </section>
      </div>
    </main>
  );
}
