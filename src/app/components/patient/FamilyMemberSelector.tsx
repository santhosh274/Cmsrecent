import { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Users } from 'lucide-react';
import { toast } from 'sonner';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  relationship: string;
}

interface FamilyMemberSelectorProps {
  onMemberChange?: (memberId: string | null) => void;
}

export default function FamilyMemberSelector({ onMemberChange }: FamilyMemberSelectorProps) {
  const [selectedMember, setSelectedMember] = useState<string>('self');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'fm1',
      name: 'Sarah Patient',
      age: 32,
      gender: 'female',
      bloodGroup: 'A+',
      relationship: 'Spouse',
    },
    {
      id: 'fm2',
      name: 'Tom Patient',
      age: 8,
      gender: 'male',
      bloodGroup: 'O+',
      relationship: 'Son',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    age: undefined,
    gender: 'male',
    bloodGroup: '',
    relationship: '',
  });

  const handleMemberSelect = (value: string) => {
    setSelectedMember(value);
    if (onMemberChange) {
      onMemberChange(value === 'self' ? null : value);
    }
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.age || !newMember.bloodGroup || !newMember.relationship) {
      toast.error('Please fill in all fields');
      return;
    }

    const member: FamilyMember = {
      id: `fm${Date.now()}`,
      name: newMember.name,
      age: newMember.age,
      gender: newMember.gender || 'male',
      bloodGroup: newMember.bloodGroup,
      relationship: newMember.relationship,
    };

    setFamilyMembers([...familyMembers, member]);
    toast.success(`${member.name} added successfully`);
    setIsAddDialogOpen(false);
    setNewMember({
      name: '',
      age: undefined,
      gender: 'male',
      bloodGroup: '',
      relationship: '',
    });
  };

  const selectedMemberData = familyMembers.find((m) => m.id === selectedMember);

  return (
    <div className="flex items-center gap-3">
      {/* Family Member Selector */}
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-gray-600" />
        <Select value={selectedMember} onValueChange={handleMemberSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="self">John Patient (Self)</SelectItem>
            {familyMembers.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name} ({member.relationship})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Member Info Badge */}
      {selectedMember !== 'self' && selectedMemberData && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <span className="text-blue-900">
            {selectedMemberData.age}y, {selectedMemberData.gender}, {selectedMemberData.bloodGroup}
          </span>
        </div>
      )}

      {/* Add Family Member Button */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Add a family member to manage their appointments and records
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Full name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={newMember.age || ''}
                onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) })}
                min="0"
                max="120"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={newMember.gender}
                onValueChange={(value) => setNewMember({ ...newMember, gender: value as 'male' | 'female' | 'other' })}
              >
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Blood Group */}
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group *</Label>
              <Select
                value={newMember.bloodGroup}
                onValueChange={(value) => setNewMember({ ...newMember, bloodGroup: value })}
              >
                <SelectTrigger id="bloodGroup">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship *</Label>
              <Select
                value={newMember.relationship}
                onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
              >
                <SelectTrigger id="relationship">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Son">Son</SelectItem>
                  <SelectItem value="Daughter">Daughter</SelectItem>
                  <SelectItem value="Father">Father</SelectItem>
                  <SelectItem value="Mother">Mother</SelectItem>
                  <SelectItem value="Brother">Brother</SelectItem>
                  <SelectItem value="Sister">Sister</SelectItem>
                  <SelectItem value="Grandfather">Grandfather</SelectItem>
                  <SelectItem value="Grandmother">Grandmother</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}