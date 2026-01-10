import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, Activity, Ruler, Weight, AlertCircle, Droplet } from 'lucide-react';

interface MedicalOverviewProps {
  patientName: string;
  medicalData: {
    bloodGroup: string;
    bpm: number;
    bloodPressure: string;
    height: number; // in cm
    weight: number; // in kg
    bmi: number;
    allergies: string[];
    existingConditions: string[];
  };
}

export default function MedicalOverview({ patientName, medicalData }: MedicalOverviewProps) {
  const getBMICategory = (bmi: number): { label: string; color: string } => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'bg-blue-100 text-blue-800' };
    if (bmi < 25) return { label: 'Normal', color: 'bg-green-100 text-green-800' };
    if (bmi < 30) return { label: 'Overweight', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Obese', color: 'bg-red-100 text-red-800' };
  };

  const getBPMStatus = (bpm: number): { label: string; color: string } => {
    if (bpm < 60) return { label: 'Low', color: 'text-blue-600' };
    if (bpm <= 100) return { label: 'Normal', color: 'text-green-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const bmiCategory = getBMICategory(medicalData.bmi);
  const bpmStatus = getBPMStatus(medicalData.bpm);

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Medical Overview - {patientName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Vital Signs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Blood Group */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-red-600" />
                <span className="text-xs text-red-800">Blood Group</span>
              </div>
              <p className="text-2xl font-semibold text-red-900">{medicalData.bloodGroup}</p>
            </div>

            {/* Heart Rate (BPM) */}
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-600" />
                <span className="text-xs text-pink-800">Heart Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-pink-900">{medicalData.bpm}</p>
                <span className={`text-xs ${bpmStatus.color}`}>BPM</span>
              </div>
              <p className={`text-xs mt-1 ${bpmStatus.color}`}>{bpmStatus.label}</p>
            </div>

            {/* Blood Pressure */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-800">Blood Pressure</span>
              </div>
              <p className="text-2xl font-semibold text-blue-900">{medicalData.bloodPressure}</p>
              <p className="text-xs text-blue-700 mt-1">mmHg</p>
            </div>

            {/* BMI */}
            <div className={`p-4 rounded-lg border ${bmiCategory.color.replace('text', 'border').replace('bg', 'border')}`}>
              <div className="flex items-center gap-2 mb-2">
                <Weight className="w-4 h-4" />
                <span className="text-xs">BMI</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold">{medicalData.bmi.toFixed(1)}</p>
              </div>
              <Badge className={`mt-1 ${bmiCategory.color}`} variant="secondary">
                {bmiCategory.label}
              </Badge>
            </div>
          </div>

          {/* Physical Measurements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Height</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{medicalData.height} cm</p>
              <p className="text-xs text-gray-600 mt-1">{(medicalData.height / 30.48).toFixed(2)} ft</p>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Weight className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Weight</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{medicalData.weight} kg</p>
              <p className="text-xs text-gray-600 mt-1">{(medicalData.weight * 2.20462).toFixed(1)} lbs</p>
            </div>
          </div>

          {/* Allergies */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">Allergies</span>
            </div>
            {medicalData.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {medicalData.allergies.map((allergy, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-800" variant="secondary">
                    {allergy}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-amber-700">No known allergies</p>
            )}
          </div>

          {/* Existing Conditions */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Existing Conditions</span>
            </div>
            {medicalData.existingConditions.length > 0 ? (
              <div className="space-y-2">
                {medicalData.existingConditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-purple-900">{condition}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-purple-700">No existing conditions</p>
            )}
          </div>

          {/* Last Updated */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
