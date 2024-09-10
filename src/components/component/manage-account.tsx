"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Edit from '@/components/component/edit';
import Modal from '@/components/ui/modal';


export default function AccountDetail() {
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    console.log("Open Modal clicked"); // Debugging line
    setIsModalOpen(true);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          <Button onClick={openModal}>Edit Profile</Button>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="col-span-1 md:col-span-1">
          <Card>
            <CardHeader>
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-user.jpg" alt="Employee Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Software Engineer</p>
              </div>
              <div>
                <p>john.doe@example.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="Engineering" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" defaultValue="2020-01-01" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={openModal}
              >
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <Edit  />
                </Modal>
                Edit
              </Button>
              
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-3 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Software Engineer</TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>2020-01-01</TableCell>
                    <TableCell>Present</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Intern</TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>2019-06-01</TableCell>
                    <TableCell>2019-12-31</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2022-06-30</TableCell>
                    <TableCell>4.5/5</TableCell>
                    <TableCell>
                      John has been a valuable member of the team, consistently delivering high-quality work and
                      demonstrating strong problem-solving skills.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2021-06-30</TableCell>
                    <TableCell>4/5</TableCell>
                    <TableCell>
                      John has shown great progress in his role, and we are impressed with his ability to take on new
                      challenges and learn quickly.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal for editing the profile */}
      
    </div>
  );
}
