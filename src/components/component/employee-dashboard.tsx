"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Briefcase, Calendar, GraduationCap, Users } from 'lucide-react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


export default function employeeDashboard() {
  const [userData, setUserData] = useState<any>(null);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
            console.log("User data fetched:", data.user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [status, session]);

  if (status === "loading") {
    return <div>Loading...</div>
  }

  function InfoItem({ icon: Icon, label, value }: { icon?: React.ElementType, label: string, value: string | undefined }) {
    if (!value) return null
    return (
      <div className="flex items-center mb-2">
        {Icon && <Icon className="w-4 h-4 mr-2 text-muted-foreground" />}
        <span className="text-sm font-medium mr-2">{label}:</span>
        <span className="text-sm">{value}</span>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={userData?.image || undefined} alt={userData?.name || 'utilisateur'} />
          {/* <AvatarFallback>{userData?.name?.split(' ').map((n: any[]) => n[0]).join('') || 'E'}</AvatarFallback> */}
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{userData?.name || 'Utilisateur inconnu'}</h2>
          <p className="text-sm text-muted-foreground">{userData?.job_title || 'Pas de titre de poste'}</p>
          <Badge variant="outline" className="mt-1">{userData?.cin || 'Pas de CIN'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Informations personnelles</h3>
          <InfoItem icon={Mail} label="Email" value={userData?.email} />
          <InfoItem icon={Phone} label="Téléphone" value={userData?.phone_number} />
          <InfoItem icon={Phone} label="Contact d'urgence" value={userData?.emergency_contact} />
          <InfoItem icon={MapPin} label="Adresse" value={userData?.address} />
          <InfoItem icon={Calendar} label="Date de naissance" value={userData?.date_of_birth ? new Date(userData.date_of_birth).toLocaleDateString() : "N/A"} />
          <InfoItem icon={MapPin} label="Lieu de naissance" value={userData?.place_of_birth} />
          <InfoItem icon={Users} label="Statut marital" value={userData?.marital_status} />
          <InfoItem label="Genre" value={userData?.gender} />
          <InfoItem label="Dépendants" value={userData?.dependents_count?.toString()} />
          <InfoItem label="Statut de handicap" value={userData?.disability_status ? 'Oui' : 'Non'} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Informations professionnelles</h3>
          <InfoItem icon={GraduationCap} label="Éducation" value={userData?.education} />
          <InfoItem icon={Briefcase} label="Poste" value={userData?.job_title} />
          <InfoItem icon={Calendar} label="Date d'embauche" value={userData?.hire_date ? new Date(userData.hire_date).toLocaleDateString() : "N/A"} />
          <InfoItem label="Salaire" value={userData?.salary ? `${userData?.salary.toFixed(2)} €` : undefined} />
          <InfoItem label="Grade" value={userData?.grade} />
          <InfoItem label="Solde de congés total" value={userData?.total_leave_balance?.toString()} />
          <InfoItem label="Solde de congés restant" value={userData?.remaining_leave_balance?.toString()} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between mt-4">
        <a href="/Formulaire" className="no-underline">
          <Button variant="outline">Modifier les informations</Button>
        </a>
        <a href="/Admin/Document" className="no-underline">
          <Button variant="outline">Demander un document</Button>
        </a>
        <a href="/Holiday/Demande" className="no-underline">
          <Button variant="outline">Demander un congé</Button>
        </a>
      </CardFooter>
    </Card >

  )
}
