# 🚀 Patient Portal - Quick Implementation Guide

## 📦 Component Imports

### Force Password Change
```tsx
import ForcePasswordChange from './components/patient/ForcePasswordChange';

<ForcePasswordChange 
  userName="John Patient"
  onPasswordChanged={() => grantAccess()}
/>
```

### Patient Documents
```tsx
import PatientDocuments from './components/patient/PatientDocuments';

<Route path="/documents" element={<PatientDocuments />} />
```

### Confirmation Modal
```tsx
import ConfirmationModal from './components/shared/ConfirmationModal';

<ConfirmationModal
  isOpen={show}
  onClose={() => setShow(false)}
  onConfirm={handleDelete}
  title="Remove Document"
  message="Are you sure?"
  variant="danger"
/>
```

---

## 🔐 Force Password Change Flow

### Quick Setup
```tsx
// In PatientPortal.tsx
const [passwordChanged, setPasswordChanged] = useState(!isFirstLogin);

if (!passwordChanged) {
  return <ForcePasswordChange 
    userName={userName} 
    onPasswordChanged={() => setPasswordChanged(true)} 
  />;
}
```

### Password Requirements
```
✓ At least 8 characters
✓ One uppercase letter (A-Z)
✓ One lowercase letter (a-z)  
✓ One number (0-9)
✓ One special character (!@#$%^&*)
```

### Test Scenarios
```
Valid:     MyPass123!
Invalid:   password      (no uppercase, number, special)
Invalid:   PASSWORD123!  (no lowercase)
Invalid:   MyPass!       (no number)
Invalid:   Short1!       (less than 8 chars)
```

---

## 📄 Document Management

### Document Object Structure
```typescript
interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  category: 'medical-report' | 'prescription' | 'lab-result' | 'other';
  size: string;
  uploadDate: string;
  uploadedBy: 'patient' | 'doctor' | 'staff';
  uploaderName: string;
}
```

### Upload Validation
```typescript
// Max size: 5MB
if (file.size > 5 * 1024 * 1024) {
  toast.error('File too large');
}

// Allowed types
const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
if (!allowed.includes(file.type)) {
  toast.error('Invalid file type');
}
```

### Remove Document Flow
```
1. Click trash icon (🗑️)
   ↓
2. Confirmation modal opens
   ↓
3. Click "Yes, Remove"
   ↓
4. API call to delete
   ↓
5. Update local state
   ↓
6. Success toast
```

---

## 🎨 UI Components

### Action Buttons
```tsx
// Preview
<Button variant="ghost" onClick={handlePreview}>
  <Eye className="w-4 h-4 text-gray-600" />
</Button>

// Download
<Button variant="ghost" onClick={handleDownload}>
  <Download className="w-4 h-4 text-blue-600" />
</Button>

// Remove
<Button variant="ghost" onClick={handleRemove} className="hover:bg-red-50">
  <Trash2 className="w-4 h-4 text-red-600" />
</Button>
```

### Category Badges
```tsx
const categoryColors = {
  'medical-report': 'bg-blue-100 text-blue-800',
  'prescription': 'bg-green-100 text-green-800',
  'lab-result': 'bg-purple-100 text-purple-800',
  'other': 'bg-gray-100 text-gray-800',
};

<Badge className={categoryColors[document.category]}>
  {categoryLabel}
</Badge>
```

---

## 🔧 Common Patterns

### Check First Login
```tsx
// In App.tsx or authentication logic
const user = {
  name: 'John Patient',
  role: 'patient',
  isFirstLogin: true  // Set from backend
};

<PatientPortal 
  userName={user.name}
  isFirstLogin={user.isFirstLogin}
  onLogout={handleLogout}
/>
```

### Handle Password Change Success
```tsx
const handlePasswordChanged = () => {
  // Update backend
  await updateUserPasswordChangedStatus(userId);
  
  // Update local state
  setPasswordChanged(true);
  
  // Log event
  logSecurityEvent('password_changed', userId);
  
  // Notify user
  toast.success('Password changed successfully!');
};
```

### Handle Document Removal
```tsx
const handleRemoveDocument = async (documentId: string) => {
  try {
    // API call
    await deleteDocument(documentId);
    
    // Update state
    setDocuments(prev => prev.filter(d => d.id !== documentId));
    
    // Log action
    logAuditEvent('document_removed', documentId);
    
    // Notify
    toast.success('Document removed');
  } catch (error) {
    toast.error('Failed to remove document');
  }
};
```

---

## 🐛 Troubleshooting

### Issue: Password change screen doesn't appear
**Solution:** Check `isFirstLogin` prop
```tsx
// Should be true for first-time users
<PatientPortal isFirstLogin={true} />
```

### Issue: Portal accessible without password change
**Solution:** Verify blocking logic
```tsx
if (!passwordChanged) {
  return <ForcePasswordChange />;  // This blocks access
}
```

### Issue: Document remove not working
**Solution:** Check confirmation modal state
```tsx
const [showModal, setShowModal] = useState(false);
const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

// On trash click
setSelectedDoc(document);
setShowModal(true);
```

### Issue: File upload fails
**Solution:** Verify file validation
```typescript
// Check size
console.log('File size:', file.size / (1024 * 1024), 'MB');

// Check type
console.log('File type:', file.type);
```

---

## 📱 Mobile Considerations

### Touch Targets
```tsx
// Minimum 44×44px for mobile
<Button className="h-11 w-11 p-0">
  <Trash2 className="w-5 h-5" />
</Button>
```

### Responsive Layout
```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-3">
  <Button>Cancel</Button>
  <Button>Confirm</Button>
</div>
```

### Category Filters
```tsx
// Horizontal scroll on mobile
<div className="flex gap-2 overflow-x-auto pb-2">
  {categories.map(cat => <Button key={cat}>{cat}</Button>)}
</div>
```

---

## ✅ Testing Checklist

### Password Change
- [ ] Screen appears for first login
- [ ] All requirements validate
- [ ] Passwords must match
- [ ] Submit disabled until valid
- [ ] Success redirects to dashboard
- [ ] Portal access granted

### Documents
- [ ] Upload works (valid files)
- [ ] Upload rejects large files (>5MB)
- [ ] Upload rejects invalid types
- [ ] Documents display correctly
- [ ] Category filter works
- [ ] Remove opens confirmation
- [ ] Confirm deletes document
- [ ] Cancel closes modal
- [ ] Toast notifications appear

---

## 🎯 Quick Commands

### Reset First Login State
```tsx
// For testing - reset to force password change
setPasswordChanged(false);
```

### Add Test Documents
```typescript
const testDocuments: Document[] = [
  {
    id: '1',
    name: 'Test_Report.pdf',
    type: 'pdf',
    category: 'lab-result',
    size: '2.4 MB',
    uploadDate: new Date().toISOString(),
    uploadedBy: 'staff',
    uploaderName: 'Lab Tech'
  }
];
```

### Trigger Confirmation Modal
```tsx
// Manual trigger for testing
setShowDeleteModal(true);
setSelectedDocument(documents[0]);
```

---

## 📊 State Management

### Password Change State
```tsx
const [passwordChanged, setPasswordChanged] = useState(false);
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
```

### Document Management State
```tsx
const [documents, setDocuments] = useState<Document[]>([]);
const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const [filterCategory, setFilterCategory] = useState('all');
```

---

## 🚀 Production Checklist

### Before Deployment

**Password Change:**
- [ ] Remove demo password validation
- [ ] Integrate with real authentication API
- [ ] Add email/SMS notification
- [ ] Implement password history check
- [ ] Add rate limiting
- [ ] Enable session invalidation

**Documents:**
- [ ] Integrate with cloud storage (S3, Azure)
- [ ] Implement real download functionality
- [ ] Add PDF preview library
- [ ] Enable image lightbox
- [ ] Add virus scanning
- [ ] Implement soft delete (keep records)

**Security:**
- [ ] Enable HTTPS/SSL
- [ ] Add CSRF protection
- [ ] Implement audit logging
- [ ] Add input sanitization
- [ ] Enable content security policy
- [ ] Add rate limiting

---

**Quick Guide Version:** 2.0.0  
**Last Updated:** January 5, 2026  
**Keep this handy for rapid development!** 📌
