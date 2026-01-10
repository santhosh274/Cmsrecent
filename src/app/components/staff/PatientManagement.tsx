import { useState } from 'react';
import { Search, FileUp, History, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const patients = [
  { id: '1', name: 'John Smith', age: 42, phone: '+1 234 567 8900', lastVisit: 'Jan 2, 2026', status: 'active' },
  { id: '2', name: 'Emma Davis', age: 28, phone: '+1 234 567 8901', lastVisit: 'Dec 28, 2025', status: 'active' },
  { id: '3', name: 'Michael Brown', age: 35, phone: '+1 234 567 8902', lastVisit: 'Dec 20, 2025', status: 'active' },
  { id: '4', name: 'Sarah Wilson', age: 51, phone: '+1 234 567 8903', lastVisit: 'Nov 15, 2025', status: 'inactive' },
];

export default function PatientManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">Search and manage patient records</p>
        </div>
        <Button>
          Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or phone number..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>{filteredPatients.length} patients found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="text-gray-900">{patient.name}</TableCell>
                  <TableCell className="text-gray-600">{patient.age}</TableCell>
                  <TableCell className="text-gray-600">{patient.phone}</TableCell>
                  <TableCell className="text-gray-600">{patient.lastVisit}</TableCell>
                  <TableCell>
                    {patient.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <History className="h-4 w-4" />
                        History
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <FileUp className="h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
