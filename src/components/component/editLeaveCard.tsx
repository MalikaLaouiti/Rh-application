import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'react-toastify'; // Optional for toast notifications

interface EditLeaveRequestProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
  };
  onUpdate: (id: string, formData: { leaveType: string; startDate: string; endDate: string; reason: string }) => Promise<void>;
}

// Constants
const CONSTANTS = {
  DEBOUNCE_DELAY: 500,
  LEAVE_TYPES: {
    VACATION: 'Vacances',
    SICK: 'Maladie',
    TRAINING: 'Formation',
  },
};

const EditLeaveRequest: React.FC<EditLeaveRequestProps> = ({ isOpen, onClose, request, onUpdate }) => {
  const [formData, setFormData] = useState({
    leaveType: request?.leaveType || '',
    startDate: request?.startDate ? new Date(request.startDate).toISOString().split('T')[0] : '',
    endDate: request?.endDate ? new Date(request.endDate).toISOString().split('T')[0] : '',
    reason: request?.reason || '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  // Validate that the date is in ISO-8601 format (YYYY-MM-DD)
  const isValidDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  // Validation function for form inputs
  const validateForm = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      setStatus({ type: 'error', message: 'Tous les champs sont requis.' });
      return false;
    }
    if (!isValidDate(formData.startDate) || !isValidDate(formData.endDate)) {
      setStatus({ type: 'error', message: 'Les dates doivent être au format ISO-8601 (YYYY-MM-DD).' });
      return false;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setStatus({ type: 'error', message: 'La date de début ne peut pas être après la date de fin.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    try {
      await onUpdate(request.id, formData);
      setStatus({ type: 'success', message: 'Demande de congé mise à jour avec succès' });
      toast.success('Demande de congé mise à jour avec succès'); // Optional: show toast on success
      setTimeout(() => {
        onClose();
        setStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Update error:', error);
      setStatus({ type: 'error', message: 'Erreur lors de la mise à jour de la demande' });
      toast.error('Erreur lors de la mise à jour de la demande'); // Optional: show toast on error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Modifier la demande de congé</DialogTitle>
        </DialogHeader>

        {status.message && (
          <Alert className={`mb-4 ${status.type === 'success' ? 'bg-green-50' : 'bg-red-50'} border-l-4 ${status.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <AlertDescription>
              {status.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leaveType">Type de congé</Label>
            <Select
              value={formData.leaveType}
              onValueChange={(value) => setFormData({ ...formData, leaveType: value })}

            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de congé" />
              </SelectTrigger>
              <SelectValue placeholder="Choisir un type de congé" />
              <SelectContent>
                {Object.values(CONSTANTS.LEAVE_TYPES).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Raison</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full"
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Annuler
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Mettre à jour
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeaveRequest;
