"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Select from 'react-select'
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PrinterIcon, EyeIcon, FileIcon } from "lucide-react"
import { jsPDF } from "jspdf"

type DocumentType = {
  id: string;
  name: string;
}

const documentTypes: DocumentType[] = [
  { id: "contrat", name: "Contrat de travail" },
  { id: "conge", name: "Demande de congé" },
  { id: "note", name: "Note de service" },
  { id: "evaluation", name: "Évaluation de performance" },
]

export default function Doc() {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null)
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    content: "",
  })
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleSelectDocument = (selectedOption: DocumentType | null) => {
    setSelectedDocument(selectedOption)
    setFormData({
      employeeName: "",
      employeeId: "",
      startDate: "",
      endDate: "",
      reason: "",
      content: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const docType = selectedDocument?.name || "Document"

    doc.setFontSize(18)
    doc.text(docType, 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.text(`Nom de l'employé: ${formData.employeeName}`, 20, 40)
    doc.text(`ID de l'employé: ${formData.employeeId}`, 20, 50)

    if (selectedDocument?.id === "conge" || selectedDocument?.id === "evaluation") {
      doc.text(`Date de début: ${formData.startDate}`, 20, 60)
      doc.text(`Date de fin: ${formData.endDate}`, 20, 70)
    }

    if (selectedDocument?.id === "conge") {
      doc.text(`Motif du congé: ${formData.reason}`, 20, 80)
    }

    doc.text("Contenu du document:", 20, 90)
    const splitContent = doc.splitTextToSize(formData.content, 170)
    doc.text(splitContent, 20, 100)

    doc.save(`${docType}_${formData.employeeName}.pdf`)
  }

  const renderPreview = () => (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">{selectedDocument?.name}</h2>
      <p><strong>Nom de l'employé:</strong> {formData.employeeName}</p>
      <p><strong>ID de l'employé:</strong> {formData.employeeId}</p>
      {(selectedDocument?.id === "conge" || selectedDocument?.id === "evaluation") && (
        <>
          <p><strong>Date de début:</strong> {formData.startDate}</p>
          <p><strong>Date de fin:</strong> {formData.endDate}</p>
        </>
      )}
      {selectedDocument?.id === "conge" && (
        <p><strong>Motif du congé:</strong> {formData.reason}</p>
      )}
      <div>
        <strong>Contenu du document:</strong>
        <p className="mt-2 whitespace-pre-wrap">{formData.content}</p>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Demander des documents administratifs</CardTitle>
        <CardDescription>Demander, prévisualisez et générez des documents administratifs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="documentType">Type de document</Label>
          <Select
            options={documentTypes}
            onChange={(option) => handleSelectDocument(option as DocumentType)}
            placeholder="Sélectionnez un type de document"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            value={selectedDocument}
          />
        </div>

        {selectedDocument && (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Nom de l'employé</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">ID de l'employé</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {(selectedDocument.id === "conge" || selectedDocument.id === "evaluation") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {selectedDocument.id === "conge" && (
              <div className="space-y-2">
                <Label htmlFor="reason">Motif du congé</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Contenu du document</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-16 justify-center ml-12">
            <Button onClick={() => setSelectedDocument(null)} variant="outline">
            Réinitialiser
            </Button>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={!selectedDocument}>
                <EyeIcon className="mr-2 h-4 w-4" />
                Prévisualiser
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                <DialogTitle>Prévisualisation</DialogTitle>
                <DialogDescription>
                    Vérifiez les informations avant de générer le document PDF.
                </DialogDescription>
                </DialogHeader>
                {renderPreview()}
            </DialogContent>
            </Dialog>
            <Button onClick={generatePDF} disabled={!selectedDocument}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            Générer le PDF
            </Button>
        </div>
        </CardFooter>

    </Card>
  )
}
