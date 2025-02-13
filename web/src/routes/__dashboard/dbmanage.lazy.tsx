import React, { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

import {
  Database,
  Shield,
  Activity,
  Users,
  Circle,
  Play,
  Pause,
} from 'lucide-react'
import { Button } from '@web/components/ui/button'
import { Input } from '@web/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select'
import { Card, CardContent } from '@web/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@web/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog'
import { Checkbox } from '@web/components/ui/checkbox'
import { Sidebar } from '@web/components/sidebar'

const DatabaseManagement = () => {
  const [config, setConfig] = useState({
    name: 'production_db',
    type: 'postgresql',
    version: '14',
    hostname: 'localhost',
    port: '5432',
    status: 'running',
  })

  const [users, setUsers] = useState([
    {
      username: 'admin',
      role: 'owner',
      lastAccess: '2 hours ago',
      permissions: ['read', 'write', 'create', 'delete', 'grant'],
    },
    {
      username: 'readonly_user',
      role: 'read',
      lastAccess: '1 day ago',
      permissions: ['read'],
    },
    {
      username: 'app_service',
      role: 'write',
      lastAccess: '5 mins ago',
      permissions: ['read', 'write'],
    },
  ])

  const [selectedUser, setSelectedUser] = useState(null)

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const toggleDatabaseStatus = () => {
    setConfig((prev) => ({
      ...prev,
      status: prev.status === 'running' ? 'stopped' : 'running',
    }))
  }

  const handlePermissionChange = (permission) => {
    if (!selectedUser) return

    setUsers((prev) =>
      prev.map((user) => {
        if (user.username === selectedUser.username) {
          const newPermissions = user.permissions.includes(permission)
            ? user.permissions.filter((p) => p !== permission)
            : [...user.permissions, permission]

          return {
            ...user,
            permissions: newPermissions,
            role: getUpdatedRole(newPermissions),
          }
        }
        return user
      }),
    )
  }

  const getUpdatedRole = (permissions) => {
    if (permissions.includes('grant')) return 'owner'
    if (permissions.includes('write')) return 'write'
    return 'read'
  }

  const sidebarContent = (
    <div className="space-y-6 pt-16">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Database Status</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                <Circle
                  className={`h-3 w-3 ${config.status === 'running' ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`}
                />
                <span className="font-medium">
                  {config.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Active Connections
              </span>
              <span className="font-medium">23/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-medium">15 days</span>
            </div>
            <div className="border-t my-4" />
            <div className="space-y-3">
              <Button
                className="w-full"
                variant={
                  config.status === 'running' ? 'destructive' : 'default'
                }
                onClick={toggleDatabaseStatus}
              >
                {config.status === 'running' ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Stop Database
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Database
                  </>
                )}
              </Button>
              <Button className="w-full" variant="outline">
                Restart Database
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Backup Status</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Backup</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Backup Size</span>
              <span className="font-medium">1.2 GB</span>
            </div>
            <div className="border-t my-4" />
            <Button className="w-full">Backup Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="grid grid-cols-[1fr_320px] gap-8 p-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-8">
          Manage Database: {config.name}
        </h2>

        {/* Connection Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Connection Settings</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Hostname</label>
                <Input
                  value={config.hostname}
                  onChange={(e) =>
                    handleConfigChange('hostname', e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Port</label>
                <Input
                  type="number"
                  value={config.port}
                  onChange={(e) => handleConfigChange('port', e.target.value)}
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Database Users</h3>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add User</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Database User</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Role</label>
                      <Select defaultValue="read">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read Only</SelectItem>
                          <SelectItem value="write">Read & Write</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Create User</Button>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Access</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.lastAccess}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Reset Password
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Reset Password for {user.username}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                  New Password
                                </label>
                                <Input type="password" />
                              </div>
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                  Confirm Password
                                </label>
                                <Input type="password" />
                              </div>
                            </div>
                            <Button className="w-full">Update Password</Button>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              Edit Permissions
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Permissions for {selectedUser?.username}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="read"
                                    checked={selectedUser?.permissions.includes(
                                      'read',
                                    )}
                                    onCheckedChange={() =>
                                      handlePermissionChange('read')
                                    }
                                    disabled={selectedUser?.role === 'owner'}
                                  />
                                  <label
                                    htmlFor="read"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Read (SELECT)
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="write"
                                    checked={selectedUser?.permissions.includes(
                                      'write',
                                    )}
                                    onCheckedChange={() =>
                                      handlePermissionChange('write')
                                    }
                                    disabled={selectedUser?.role === 'owner'}
                                  />
                                  <label
                                    htmlFor="write"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Write (INSERT, UPDATE)
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="create"
                                    checked={selectedUser?.permissions.includes(
                                      'create',
                                    )}
                                    onCheckedChange={() =>
                                      handlePermissionChange('create')
                                    }
                                    disabled={selectedUser?.role === 'owner'}
                                  />
                                  <label
                                    htmlFor="create"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Create (CREATE)
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="delete"
                                    checked={selectedUser?.permissions.includes(
                                      'delete',
                                    )}
                                    onCheckedChange={() =>
                                      handlePermissionChange('delete')
                                    }
                                    disabled={selectedUser?.role === 'owner'}
                                  />
                                  <label
                                    htmlFor="delete"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Delete (DELETE, DROP)
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="grant"
                                    checked={selectedUser?.permissions.includes(
                                      'grant',
                                    )}
                                    onCheckedChange={() =>
                                      handlePermissionChange('grant')
                                    }
                                    disabled={selectedUser?.role === 'owner'}
                                  />
                                  <label
                                    htmlFor="grant"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Grant (GRANT, REVOKE)
                                  </label>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Note: Owner permissions cannot be modified
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogTrigger>
                              <DialogTrigger asChild>
                                <Button>Save Changes</Button>
                              </DialogTrigger>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {user.role !== 'owner' && (
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {sidebarContent}
    </div>
  )
}

const DBManage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <DatabaseManagement />
      </main>
    </div>
  )
}

export default DBManage

export const Route = createLazyFileRoute('/__dashboard/dbmanage')({
  component: DBManage,
})
