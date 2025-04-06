import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PencilLine, UserX, CheckCircle, XCircle, UserCheck } from "lucide-react";
import { User } from "@/types";
import { useUsers } from "@/hooks/use-database";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  totalUsers: number;
  admins: number;
  operators: number;
  activeUsers: number;
  pendingUsers: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    admins: 0,
    operators: 0,
    activeUsers: 0,
    pendingUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "operator" as "admin" | "operator",
    assignedBelt: "",
    status: "active" as "active" | "inactive",
    approvalStatus: "approved" as "pending" | "approved" | "rejected"
  });
  
  const [filter, setFilter] = useState("all"); // "all", "pending", "approved", "rejected"
  
  const { loading, getUsers, addUser, updateUser } = useUsers();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setStats(calculateStats(fetchedUsers));
      setIsLoading(false);
    };
    
    loadUsers();
  }, [getUsers]);
  
  const calculateStats = (userList: User[]): UserStats => {
    return {
      totalUsers: userList.length,
      admins: userList.filter(user => user.role === 'admin').length,
      operators: userList.filter(user => user.role === 'operator').length,
      activeUsers: userList.filter(user => user.status === 'active').length,
      pendingUsers: userList.filter(user => user.approvalStatus === 'pending').length,
    };
  };
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addUser({
      ...newUser,
      assignedBelt: newUser.assignedBelt || null,
    });
    
    if (success) {
      setNewUser({
        username: "",
        email: "",
        role: "operator",
        assignedBelt: "",
        status: "active",
        approvalStatus: "approved"
      });
      
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setStats(calculateStats(fetchedUsers));
    }
  };
  
  const approveUser = async (userId: string) => {
    const success = await updateUser(userId, { approvalStatus: 'approved' });
    if (success) {
      toast({
        title: "User Approved",
        description: "User has been approved successfully",
      });
      
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setStats(calculateStats(fetchedUsers));
    }
  };
  
  const rejectUser = async (userId: string) => {
    const success = await updateUser(userId, { approvalStatus: 'rejected' });
    if (success) {
      toast({
        title: "User Rejected",
        description: "User has been rejected successfully",
      });
      
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setStats(calculateStats(fetchedUsers));
    }
  };
  
  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.approvalStatus === filter);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">User Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.admins}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Operators</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.operators}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingUsers}</div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Select value={filter} onValueChange={(value) => setFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Assigned Belt</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">Loading users...</TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">No users found</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map(user => (
                      <TableRow key={user.id} className={user.approvalStatus === 'pending' ? 'bg-yellow-50' : ''}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <UserX size={16} />
                          </Button>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <PencilLine size={16} className="mr-2 text-blue-600" />
                            {user.assignedBelt || 'Not assigned'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <PencilLine size={16} className="mr-2 text-blue-600" />
                            {formatDate(user.lastLogin)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          >
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.approvalStatus === 'pending' ? (
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-green-600 hover:text-green-500 hover:bg-green-50"
                                onClick={() => approveUser(user.id)}
                                title="Approve User"
                              >
                                <CheckCircle size={18} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600 hover:text-red-500 hover:bg-red-50"
                                onClick={() => rejectUser(user.id)}
                                title="Reject User"
                              >
                                <XCircle size={18} />
                              </Button>
                            </div>
                          ) : (
                            <Badge
                              variant="outline"
                              className={
                                user.approvalStatus === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }
                            >
                              {user.approvalStatus === 'approved' ? 'Approved' : 'Rejected'}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleAddUser}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter username" 
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Enter email" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value: "admin" | "operator") => setNewUser({...newUser, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="operator">Operator</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="belt">Assigned Belt</Label>
                    <Input 
                      id="belt" 
                      placeholder="Example Belt A2" 
                      value={newUser.assignedBelt}
                      onChange={(e) => setNewUser({...newUser, assignedBelt: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newUser.status} 
                      onValueChange={(value: "active" | "inactive") => setNewUser({...newUser, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add User"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
