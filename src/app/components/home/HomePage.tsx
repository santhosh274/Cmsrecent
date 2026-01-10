import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Heart, 
  Stethoscope, 
  Clipboard, 
  Shield, 
  Activity, 
  Microscope, 
  Pill, 
  Ambulance, 
  Calendar, 
  Lock,
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation Bar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthCare CMS</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-900 hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link to="/register">
                <Button variant="outline">New User</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-b from-blue-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl text-gray-900">
                Smart Clinic Management Made Simple
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                A secure and efficient platform to manage appointments, patients, staff, and healthcare services. Experience modern healthcare management built for the future.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Login to Portal
                  </Button>
                </Link>
                <a href="#services">
                  <Button size="lg" variant="outline">
                    View Services
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-3xl opacity-10 blur-3xl"></div>
                <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-sm text-gray-600">Appointment Scheduling</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <Activity className="w-8 h-8 text-green-600 mb-2" />
                      <p className="text-sm text-gray-600">Patient Records</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <Microscope className="w-8 h-8 text-purple-600 mb-2" />
                      <p className="text-sm text-gray-600">Lab Results</p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-xl">
                      <Pill className="w-8 h-8 text-amber-600 mb-2" />
                      <p className="text-sm text-gray-600">Pharmacy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Login Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-3">Access Portal by Role</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your role to access the appropriate portal with tailored features and workflows
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Patient Login Card */}
            <Link to="/login?role=patient">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Patient Portal</CardTitle>
                  <CardDescription>
                    Book appointments, view medical records, and download reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Patient Login
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Doctor Login Card */}
            <Link to="/login?role=doctor">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Doctor Portal</CardTitle>
                  <CardDescription>
                    Manage appointments, create prescriptions, and access patient data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Doctor Login
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Staff Login Card */}
            <Link to="/login?role=staff">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clipboard className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle>Staff Portal</CardTitle>
                  <CardDescription>
                    Handle reception, queue management, and patient registration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Staff Login
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Admin Login Card */}
            <Link to="/login?role=admin">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gray-700" />
                  </div>
                  <CardTitle>Admin Portal</CardTitle>
                  <CardDescription>
                    Manage users, roles, system settings, and overall clinic operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white">
                    Admin Login
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Service 1 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                  <Stethoscope className="w-7 h-7 text-blue-600" />
                </div>
                <CardTitle className="text-lg">General Consultation</CardTitle>
                <CardDescription>
                  Expert medical consultations for general health concerns and routine checkups
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Service 2 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
                  <Microscope className="w-7 h-7 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Diagnostics & Lab Tests</CardTitle>
                <CardDescription>
                  Comprehensive laboratory testing with fast, accurate results and digital reports
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Service 3 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
                  <Pill className="w-7 h-7 text-amber-600" />
                </div>
                <CardTitle className="text-lg">Pharmacy Services</CardTitle>
                <CardDescription>
                  In-house pharmacy with prescription management and medication delivery
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Service 4 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-5">
                  <Ambulance className="w-7 h-7 text-red-600" />
                </div>
                <CardTitle className="text-lg">Emergency Care</CardTitle>
                <CardDescription>
                  24/7 emergency medical services with rapid response and critical care
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Service 5 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                  <User className="w-7 h-7 text-green-600" />
                </div>
                <CardTitle className="text-lg">Specialist Doctors</CardTitle>
                <CardDescription>
                  Access to specialized medical professionals across various departments
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Service 6 */}
            <Card className="border-gray-200 min-h-[280px] transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-8 flex flex-col justify-center h-full">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-5">
                  <Activity className="w-7 h-7 text-teal-600" />
                </div>
                <CardTitle className="text-lg">Health Checkups</CardTitle>
                <CardDescription>
                  Comprehensive health screening packages and preventive care programs
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

        </div>
      </section>

      {/* Trust Section - Why Choose Our Clinic */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-3">Why Choose Our Clinic</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of patients for quality care and modern healthcare management
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Trust Item 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-base text-gray-900 mb-2">Secure Medical Records</h3>
              <p className="text-sm text-gray-600">End-to-end encrypted patient data</p>
            </div>

            {/* Trust Item 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-base text-gray-900 mb-2">Experienced Doctors</h3>
              <p className="text-sm text-gray-600">Board-certified specialists</p>
            </div>

            {/* Trust Item 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-base text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-sm text-gray-600">Efficient appointment management</p>
            </div>

            {/* Trust Item 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-base text-gray-900 mb-2">Data Privacy</h3>
              <p className="text-sm text-gray-600">HIPAA compliant security</p>
            </div>

            {/* Trust Item 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-base text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-sm text-gray-600">Always accessible system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg">HealthCare CMS</span>
              </div>
              <p className="text-sm text-gray-400">
                Modern clinic management for better healthcare delivery
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm text-gray-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm text-gray-400 mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm">
                <li>General Consultation</li>
                <li>Lab Tests</li>
                <li>Pharmacy</li>
                <li>Emergency Care</li>
                <li>Health Checkups</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm text-gray-400 mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>contact@healthcare-cms.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span>123 Medical Center Dr.<br />Healthcare City, HC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 HealthCare CMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}