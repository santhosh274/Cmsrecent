import { useState } from 'react';
import { FileText, Download, Lock, Unlock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

const reports = [
  {
    id: '1',
    name: 'Blood Test Report',
    date: 'January 2, 2026',
    type: 'Laboratory',
    status: 'ready',
    locked: true,
  },
  {
    id: '2',
    name: 'X-Ray Chest',
    date: 'December 28, 2025',
    type: 'Radiology',
    status: 'ready',
    locked: true,
  },
  {
    id: '3',
    name: 'ECG Report',
    date: 'December 20, 2025',
    type: 'Cardiology',
    status: 'ready',
    locked: false,
  },
  {
    id: '4',
    name: 'Complete Checkup',
    date: 'January 5, 2026',
    type: 'Laboratory',
    status: 'pending',
    locked: true,
  },
];

export default function ReportDownload() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleGenerateSecureLink = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setOtpSent(false);
    setOtp('');
    setUnlocked(false);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setUnlocked(true);
    }
  };

  const handleDownload = () => {
    // Simulate download
    setSelectedReport(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">My Reports</h1>
        <p className="text-gray-600 mt-2">View and download your medical reports securely</p>
      </div>

      {/* Security Info */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900">Secure Access</p>
              <p className="text-sm text-gray-600 mt-1">
                For your privacy, reports require OTP verification via WhatsApp before downloading
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                  </div>
                  <CardDescription>{report.type} • {report.date}</CardDescription>
                </div>
                {report.status === 'ready' ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Ready
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {report.locked && report.status === 'ready' && (
                  <Button onClick={() => handleGenerateSecureLink(report)} className="gap-2">
                    <Lock className="h-4 w-4" />
                    Generate Secure Link
                  </Button>
                )}
                {!report.locked && report.status === 'ready' && (
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                )}
                {report.status === 'pending' && (
                  <Button disabled variant="secondary">
                    Report Not Ready
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* OTP Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Secure Report Access</DialogTitle>
            <DialogDescription>
              {selectedReport?.name}
            </DialogDescription>
          </DialogHeader>

          {!unlocked ? (
            <div className="space-y-6 py-4">
              {!otpSent ? (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>A secure OTP will be sent to your WhatsApp</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This ensures that only you can access your medical reports
                    </p>
                  </div>
                  <Button onClick={handleSendOtp} className="w-full">
                    Send OTP via WhatsApp
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      Enter the 6-digit code sent to your WhatsApp
                    </p>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <Button 
                      onClick={handleVerifyOtp} 
                      disabled={otp.length !== 6}
                      className="w-full"
                    >
                      Verify OTP
                    </Button>
                    <Button variant="ghost" onClick={handleSendOtp} className="w-full text-sm">
                      Resend Code
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Unlock className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-sm text-green-600">Report Unlocked Successfully!</p>
                <p className="text-sm text-gray-600">
                  You can now download your report securely
                </p>
              </div>
              <Button onClick={handleDownload} className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
