
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TrashIcon } from "@/components/ui/trachIcon"
import { MoveHorizontalIcon } from "@/components/ui/moveHorizental"
import { FilePenIcon } from "@/components/ui/filePenIcon"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function Edit() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex items-center justify-between px-6 py-4 ">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" alt="Employee Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full">
                <MoveHorizontalIcon className="w-5 h-5" />
                <span className="sr-only">Open options menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FilePenIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value="Engineering" disabled />
            </div>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" value="Software Engineer" disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value="john.doe@example.com" disabled />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value="+1 (555) 555-5555" disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" value="123 Main St, Anytown USA" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 px-6 py-4 bg-muted">
          <Dialog>
            <DialogTrigger asChild>
              <Button >Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your personal information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="col-span-3" />
                </div>
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" defaultValue="+1 (555) 555-5555" className="col-span-3" />
                </div>
                <div className="grid items-start grid-cols-4 gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Textarea id="address" defaultValue="123 Main St, Anytown USA" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

