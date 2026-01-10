# 🚀 Quick Implementation Guide

## 📦 Component Import Reference

### BackButton
```tsx
import BackButton from './components/shared/BackButton';

// Usage
<BackButton />
<BackButton to="/dashboard" label="Back to Dashboard" />
```

### Payment Flow
```tsx
import Payment from './components/payment/Payment';
import PaymentSuccess from './components/payment/PaymentSuccess';

// Payment
<Payment
  consultationFee={500}
  appointmentDetails={{
    doctor: 'Dr. Smith',
    date: '2024-01-15',
    time: '10:00 AM'
  }}
  onPaymentSuccess={(txnId, tempId) => {}}
  onBack={() => {}}
  isNewUser={false}
/>

// Success
<PaymentSuccess
  transactionId="TXN123456"
  tempPatientId="TMP789"
  appointmentDetails={{...}}
  amount={520}
  isNewUser={true}
/>
```

### Document Upload
```tsx
import DocumentUpload from './components/shared/DocumentUpload';

<DocumentUpload
  title="Medical Records"
  canRemove={true}
  onUpload={(file) => console.log(file)}
  onRemove={(id) => console.log(id)}
/>
```

### Login with Role Selection
```tsx
import LoginScreen from './components/auth/LoginScreen';

<LoginScreen 
  onLogin={(role, name) => {
    // Handle login
  }} 
/>
```

---

## 🎯 Demo Credentials

```
Patient:  patient@demo.com  | 9876543210 | demo123
Doctor:   doctor@demo.com   | 9876543211 | demo123
Staff:    staff@demo.com    | 9876543212 | demo123
Lab:      lab@demo.com      | 9876543213 | demo123
Pharmacy: pharmacy@demo.com | 9876543214 | demo123
Admin:    admin@demo.com    | 9876543215 | admin123
```

---

## 💡 Common Patterns

### Adding Back Button to a Page
```tsx
function MyPage() {
  return (
    <div className="p-4">
      <BackButton />
      <h1>Page Title</h1>
      {/* Content */}
    </div>
  );
}
```

### Appointment with Payment Flow
```tsx
// Step 1: User books appointment
// Step 2: Automatically shows Payment screen
// Step 3: After payment → PaymentSuccess screen

<AppointmentBooking isNewUser={false} />
```

### Document Upload with Remove
```tsx
function DocumentSection() {
  const handleRemove = (fileId: string) => {
    // API call to delete file
    console.log('Removing file:', fileId);
  };

  return (
    <DocumentUpload
      title="Upload Reports"
      canRemove={true}
      onRemove={handleRemove}
    />
  );
}
```

---

## 🔧 Customization

### BackButton Styling
```tsx
<BackButton 
  className="mb-4 text-blue-600" 
  label="Go Back"
/>
```

### Payment Method Selection
```typescript
// In Payment component
type PaymentMethod = 'upi' | 'card' | 'netbanking';

// UPI: requires upiId
// Card: requires cardNumber, expiry, CVV
// Net Banking: requires bankName
```

### Document File Types
```typescript
// Accepted formats
accept=".pdf,.jpg,.jpeg,.png"

// Max size
5MB (5 * 1024 * 1024 bytes)
```

---

## 🐛 Common Issues & Fixes

### Issue: Back button not working
**Solution:** Check if `react-router-dom` is imported
```tsx
import { useNavigate } from 'react-router-dom';
```

### Issue: Payment form not submitting
**Solution:** Ensure payment method is selected and all fields filled
```typescript
if (!paymentMethod) {
  toast.error('Please select a payment method');
  return;
}
```

### Issue: Login button disabled
**Solution:** Select a role first, then enter valid credentials
```typescript
// Form valid when:
✓ Role selected
✓ Valid email/mobile
✓ Password entered
```

### Issue: File upload fails
**Solution:** Check file size and type
```typescript
// Size check
if (file.size > 5 * 1024 * 1024) {
  toast.error('File too large');
}

// Type check
const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
if (!allowed.includes(file.type)) {
  toast.error('Invalid file type');
}
```

---

## 📱 Mobile Responsive Tips

### Stack Buttons on Mobile
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</div>
```

### Grid Responsiveness
```tsx
// 1 column mobile, 2 desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Touch Targets
```tsx
// Minimum 44×44px for mobile
<Button className="h-11 px-4">Tap Me</Button>
```

---

## ✅ Testing Checklist

### Before Deployment
- [ ] All back buttons navigate correctly
- [ ] Payment flow completes successfully
- [ ] Documents can be uploaded and removed
- [ ] Login works for all roles
- [ ] Mobile view renders properly
- [ ] Toast notifications appear
- [ ] Forms validate correctly
- [ ] Error messages display

---

## 🎨 Styling Reference

### Colors
```tsx
Primary:   bg-blue-600 hover:bg-blue-700
Success:   text-green-600 bg-green-100
Error:     text-red-600 hover:bg-red-50
Warning:   text-amber-900 bg-amber-50
Disabled:  bg-gray-100 text-gray-400
```

### Common Classes
```tsx
// Card
<Card className="border-gray-200">

// Button Primary
<Button className="bg-blue-600 hover:bg-blue-700 text-white">

// Button Outline
<Button variant="outline">

// Icon Button
<Button variant="ghost" className="h-8 w-8 p-0">

// Toast
toast.success('Message')
toast.error('Error')
toast.info('Info')
```

---

## 📦 Installation (if needed)

### Required Packages
```bash
npm install sonner  # Toast notifications
npm install lucide-react  # Icons
npm install react-router-dom  # Routing
```

### Already Included
- Button, Card, Input, Label (UI components)
- Calendar, RadioGroup (Form components)
- Select (Dropdown component)

---

## 🔄 Workflow Examples

### Complete Appointment Booking
```
1. User clicks "Book Appointment"
2. Select Doctor (with fee displayed)
3. Select Visit Type
4. Select Date
5. Select Time Slot
6. Review Summary
7. Proceed to Payment (mandatory)
8. Enter payment details
9. Submit payment
10. See success page with:
    - Transaction ID
    - Temp Patient ID (if new user)
    - Download receipt option
    - Go to Dashboard button
```

### Document Management
```
1. Navigate to Documents section
2. Click upload area or drag file
3. File validates (size + type)
4. File appears in list
5. Hover over file → see icons
6. Click Eye icon → Preview
7. Click X icon → Confirm removal
8. File removed from list
```

### Role-Based Login
```
1. Open login page
2. See "Login As" dropdown
3. Fields are disabled
4. Select role (e.g., Patient)
5. Helper text appears
6. Fields become enabled
7. Enter email/mobile
8. Enter password
9. Click Sign In
10. Redirect to /patient dashboard
```

---

## 💻 Code Snippets

### Toast Notifications
```tsx
import { toast } from 'sonner';

toast.success('Operation successful!');
toast.error('Something went wrong');
toast.info('Information message');
```

### Form Validation
```tsx
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^[0-9]{10}$/.test(phone);
};
```

### Confirmation Dialog
```tsx
if (window.confirm('Are you sure?')) {
  // Proceed with action
}
```

---

**Quick Reference Version:** 1.0.0  
**Last Updated:** January 5, 2026  
**Keep this handy for rapid development!** 📌
