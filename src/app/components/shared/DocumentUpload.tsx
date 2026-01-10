import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, FileText, Image as ImageIcon, X, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  size: string;
  uploadDate: string;
  url?: string;
}

interface DocumentUploadProps {
  title?: string;
  canRemove?: boolean;
  onUpload?: (file: File) => void;
  onRemove?: (fileId: string) => void;
}

export default function DocumentUpload({ 
  title = 'Upload Documents',
  canRemove = true,
  onUpload,
  onRemove
}: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Lab_Report_Blood_Test.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-10',
    },
    {
      id: '2',
      name: 'X_Ray_Chest.jpg',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-12',
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

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

    // Create file object
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type === 'application/pdf' ? 'pdf' : 'image',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    toast.success('File uploaded successfully');

    if (onUpload) {
      onUpload(file);
    }

    // Reset input
    event.target.value = '';
  };

  const handleRemoveFile = (fileId: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to remove "${fileName}"?`)) {
      setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
      toast.success('File removed successfully');

      if (onRemove) {
        onRemove(fileId);
      }
    }
  };

  const handlePreviewFile = (fileId: string) => {
    setSelectedFile(fileId);
    toast.info('Preview feature coming soon');
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
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
                <p className="text-sm font-medium text-gray-900">Click to upload</p>
                <p className="text-xs text-gray-600">PDF, JPG, PNG (max 5MB)</p>
              </div>
            </div>
          </label>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* File Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    file.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                    {file.type === 'pdf' ? (
                      <FileText className={`w-5 h-5 text-red-600`} />
                    ) : (
                      <ImageIcon className={`w-5 h-5 text-blue-600`} />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-600">
                      {file.size} • Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Preview Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handlePreviewFile(file.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </Button>

                  {/* Remove Button */}
                  {canRemove && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFile(file.id, file.name)}
                      className="h-8 w-8 p-0 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Files Message */}
        {uploadedFiles.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-500">
            No documents uploaded yet
          </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
          <p className="font-medium mb-1">Document Guidelines:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Accepted formats: PDF, JPG, PNG</li>
            <li>Maximum file size: 5MB</li>
            <li>Ensure documents are clear and readable</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
