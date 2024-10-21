import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import '../assets/styles/Home.css';

const FeatureCard = ({ icon, title, description, linkTo, linkText }) => (
  <div className="feature-card bg-white p-6 rounded-lg shadow-md">
    <div className="mb-4">
      <div className="h-10 w-10 text-blue-500 mb-2">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="mb-4">{description}</p>
    <Button as={Link} to={linkTo} variant="outline">
      {linkText} <span className="ml-2">→</span>
    </Button>
  </div>
)

const TestimonialCard = ({ quote, author, role, rating }) => (
  <div className="testimonial-card bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{author}</h3>
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-4">{role}</p>
    <p className="italic">"{quote}"</p>
  </div>
)

const Home = () => {
  const [currentExchangeRates, setCurrentExchangeRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.21,
  })

  useEffect(() => {
    // Simulating real-time exchange rate updates
    const interval = setInterval(() => {
      setCurrentExchangeRates(prev => ({
        USD: 1,
        EUR: prev.EUR + (Math.random() - 0.5) * 0.01,
        GBP: prev.GBP + (Math.random() - 0.5) * 0.01,
        JPY: prev.JPY + (Math.random() - 0.5) * 0.1,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home bg-gray-100 text-gray-900">
      <main className="container mx-auto px-4">
        <section className="hero py-20 text-center">
          <h1 className="text-6xl font-bold mb-4 text-blue-600">
            Welcome to VaultCash
          </h1>
          <p className="text-2xl mb-8 text-gray-600">
            Secure, Fast, and Reliable Financial Solutions for the Digital Age
          </p>
          <div className="space-x-4">
            <Button as={Link} to="/signup" size="lg">
              Get Started <span className="ml-2">→</span>
            </Button>
            <Button as={Link} to="/learn-more" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        <section className="features py-16">
          <h2 className="text-4xl font-semibold mb-8 text-center">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🛡️"
              title="Secure Digital Wallets"
              description="Store your funds safely with our state-of-the-art digital wallets, protected by advanced encryption and multi-factor authentication."
              linkTo="/wallets"
              linkText="Explore Wallets"
            />
            <FeatureCard
              icon="🌐"
              title="Instant Global Transfers"
              description="Send and receive money instantly across borders, with competitive exchange rates and low fees."
              linkTo="/transfers"
              linkText="Learn About Transfers"
            />
            <FeatureCard
              icon="🧠"
              title="AI-Powered Financial Insights"
              description="Gain valuable insights into your spending and saving habits with our advanced AI algorithms."
              linkTo="/insights"
              linkText="View Demo"
            />
          </div>
        </section>

        <section className="exchange-rates py-16 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Real-Time Exchange Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(currentExchangeRates).map(([currency, rate]) => (
              <div key={currency} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{currency}</h3>
                <p className="text-2xl font-bold">{rate.toFixed(4)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            * Rates updated every 5 seconds for demonstration purposes.
          </p>
        </section>

        <section className="about py-16 bg-blue-50 rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-semibold mb-6">About VaultCash</h2>
          <p className="mb-6">
            VaultCash is a cutting-edge financial platform designed to empower users with secure, efficient, and innovative financial services. Our mission is to revolutionize the way you manage your money in the digital era.
          </p>
          <p className="mb-6">
            Founded in 2023, VaultCash combines the latest in blockchain technology, artificial intelligence, and cybersecurity to provide a comprehensive suite of financial tools for individuals and businesses alike.
          </p>
          <Button as={Link} to="/about">
            Learn Our Story
          </Button>
        </section>

        <section className="how-it-works py-16">
          <h2 className="text-4xl font-semibold mb-8 text-center">How VaultCash Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Simple Steps to Get Started</h3>
              <ol className="space-y-4">
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</span>
                  <span>Sign up for a free account in just 2 minutes</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</span>
                  <span>Verify your identity with our secure, AI-powered system</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</span>
                  <span>Link your existing bank accounts or add funds via multiple methods</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">4</span>
                  <span>Start managing your money with our intuitive dashboard</span>
                </li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Why Choose VaultCash?</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🛡️</span>
                  Bank-grade security with additional layers of protection
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🕒</span>
                  24/7 access to your funds and real-time transactions
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">💰</span>
                  Competitive fees and excellent exchange rates
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">👥</span>
                  Dedicated customer support team
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">➡️</span>
                  Regular updates and new features based on user feedback
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonials py-16 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-4xl font-semibold mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="VaultCash has completely transformed how I manage my finances. The insights feature is like having a personal financial advisor!"
              author="Sarah T."
              role="Entrepreneur"
              rating={5}
            />
            <TestimonialCard
              quote="As someone who frequently travels for business, VaultCash's global transfer feature has been a game-changer. Fast, reliable, and cost-effective."
              author="Michael R."
              role="Business Consultant"
              rating={5}
            />
            <TestimonialCard
              quote="The security features of VaultCash give me peace of mind. I feel confident managing my finances digitally."
              author="Emily L."
              role="Cybersecurity Specialist"
              rating={5}
            />
          </div>
        </section>

        <section className="cta py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Join thousands of satisfied users who have revolutionized their financial management with VaultCash.
          </p>
          <div className="space-x-4">
            <Button as={Link} to="/signup" size="lg">
              Create Your Free Account
            </Button>
            <Button as={Link} to="/contact" variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </section>

        <section className="features-highlight py-16">
          <h2 className="text-4xl font-semibold mb-8 text-center">Powerful Features for Modern Finance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Multi-Currency Support</h3>
              <p className="mb-4">Manage accounts in multiple currencies with real-time conversion rates.</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Coming Soon</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Automated Savings</h3>
              <p className="mb-4">Set up rules to automatically save money based on your spending habits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Bill Splitting</h3>
              <p className="mb-4">Easily split bills with friends and family for shared expenses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Investment Tracking</h3>
              <p className="mb-4">Monitor your investments across various asset classes in one place.</p>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Premium</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home