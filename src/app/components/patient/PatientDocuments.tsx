import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, FileText, Image as ImageIcon, X, Eye, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from '../shared/ConfirmationModal';
import BackButton from '../shared/BackButton';

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

export default function PatientDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Blood_Test_Report_Jan2024.pdf',
      type: 'pdf',
      category: 'lab-result',
      size: '2.4 MB',
      uploadDate: '2024-01-10T14:30:00',
      uploadedBy: 'staff',
      uploaderName: 'Lab Technician',
    },
    {
      id: '2',
      name: 'X_Ray_Chest.jpg',
      type: 'image',
      category: 'medical-report',
      size: '1.8 MB',
      uploadDate: '2024-01-12T10:15:00',
      uploadedBy: 'doctor',
      uploaderName: 'Dr. Sarah Johnson',
    },
    {
      id: '3',
      name: 'Prescription_Antibiotics.pdf',
      type: 'pdf',
      category: 'prescription',
      size: '450 KB',
      uploadDate: '2024-01-15T16:45:00',
      uploadedBy: 'doctor',
      uploaderName: 'Dr. Michael Chen',
    },
    {
      id: '4',
      name: 'Insurance_Card.jpg',
      type: 'image',
      category: 'other',
      size: '1.2 MB',
      uploadDate: '2024-01-08T09:20:00',
      uploadedBy: 'patient',
      uploaderName: 'John Patient',
    },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categoryLabels: Record<string, string> = {
    all: 'All Documents',
    'medical-report': 'Medical Reports',
    prescription: 'Prescriptions',
    'lab-result': 'Lab Results',
    other: 'Other Documents',
  };

  const categoryColors: Record<string, string> = {
    'medical-report': 'bg-blue-100 text-blue-800',
    prescription: 'bg-green-100 text-green-800',
    'lab-result': 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800',
  };

  const uploaderColors: Record<string, string> = {
    patient: 'text-blue-600',
    doctor: 'text-green-600',
    staff: 'text-purple-600',
  };

  const filteredDocuments = filterCategory === 'all'
    ? documents
    : documents.filter((doc) => doc.category === filterCategory);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF and image files are allowed');
      return;
    }

    // Create new document
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type === 'application/pdf' ? 'pdf' : 'image',
      category: 'other',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadDate: new Date().toISOString(),
      uploadedBy: 'patient',
      uploaderName: 'John Patient',
    };

    setDocuments([newDocument, ...documents]);
    toast.success('Document uploaded successfully');

    // Reset input
    event.target.value = '';
  };

  const handleDeleteClick = (document: Document) => {
    setSelectedDocument(document);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDocument) return;

    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setDocuments(documents.filter((doc) => doc.id !== selectedDocument.id));
      toast.success('Document removed successfully');
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedDocument(null);
    }, 1000);
  };

  const handlePreview = (document: Document) => {
    toast.info(`Preview feature for "${document.name}" coming soon`);
  };

  const handleDownload = (document: Document) => {
    toast.success(`Downloading "${document.name}"...`);
    // In real app, trigger actual download
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackButton to="/patient" />
        <h1 className="text-3xl text-gray-900 mt-4">My Documents</h1>
        <p className="text-gray-600 mt-2">Manage your medical documents and reports</p>
      </div>

      {/* Upload Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Upload New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Click to upload document</p>
                  <p className="text-xs text-gray-600">PDF, JPG, PNG (max 5MB)</p>
                </div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={filterCategory === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory(key)}
            className={filterCategory === key ? 'bg-blue-600 text-white' : ''}
          >
            {label}
            {key !== 'all' && (
              <Badge variant="secondary" className="ml-2">
                {documents.filter((d) => d.category === key).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {categoryLabels[filterCategory]} ({filteredDocuments.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No documents found in this category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* File Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        document.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'
                      }`}
                    >
                      {document.type === 'pdf' ? (
                        <FileText className="w-6 h-6 text-red-600" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{document.name}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge className={categoryColors[document.category]} variant="secondary">
                          {categoryLabels[document.category].replace('s', '')}
                        </Badge>
                        <span className="text-xs text-gray-600">{document.size}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600">{formatDate(document.uploadDate)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Uploaded by:{' '}
                        <span className={`font-medium ${uploaderColors[document.uploadedBy]}`}>
                          {document.uploaderName}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Preview Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePreview(document)}
                      title="Preview document"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>

                    {/* Download Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(document)}
                      title="Download document"
                    >
                      <Download className="w-4 h-4 text-blue-600" />
                    </Button>

                    {/* Remove Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteClick(document)}
                      className="hover:bg-red-50"
                      title="Remove document"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Document Guidelines:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Accepted formats: PDF, JPG, PNG</li>
          <li>• Maximum file size: 5MB per document</li>
          <li>• You can remove documents you uploaded</li>
          <li>• Documents uploaded by doctors/staff are part of your medical record</li>
          <li>• All document actions are logged for audit purposes</li>
        </ul>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedDocument(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Remove Document"
        message={`Are you sure you want to remove "${selectedDocument?.name}"? This action cannot be undone.`}
        confirmText="Yes, Remove"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
