import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Sidebar } from '@web/components/sidebar'
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import {
  PlusCircle,
  Database,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  FileDown,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@web/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@web/components/ui/dropdown-menu'
import { Button } from '@web/components/ui/button'
import { Input } from '@web/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select'
import { Checkbox } from '@web/components/ui/checkbox'

const databases = [
  {
    id: 1,
    name: 'production_db',
    type: 'PostgreSQL',
    host: 'localhost',
    user: 'admin',
    status: 'Active',
    createdAt: '2024-02-11',
    size: '1.2 GB',
  },
]

const DatabaseList = () => {
  const navigate = useNavigate()
  const [selectedDbs, setSelectedDbs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredDatabases = databases.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || db.type === filterType
    return matchesSearch && matchesType
  })

  const handleDatabaseClick = (dbId: number) => {
    navigate({ to: '/databases/$databaseId', params: { databaseId: dbId.toString() } })
  }

  const handleCreateDatabase = () => {
    navigate({ to: '/dbcreate' })
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Databases</h2>
          <p className="text-muted-foreground">
            Manage your database instances
          </p>
        </div>
        <Button onClick={handleCreateDatabase}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Database
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search databases..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Database Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
              <SelectItem value="MySQL">MySQL</SelectItem>
            </SelectContent>
          </Select>

          {selectedDbs.length > 0 && (
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export ({selectedDbs.length})
            </Button>
          )}
        </div>
      </div>

      {/* Database Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedDbs.length === databases.length}
                  onCheckedChange={() => {
                    if (selectedDbs.length === databases.length) {
                      setSelectedDbs([])
                    } else {
                      setSelectedDbs(databases.map(db => db.id))
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDatabases.map((db) => (
              <TableRow 
                key={db.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleDatabaseClick(db.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedDbs.includes(db.id)}
                    onCheckedChange={() => {
                      if (selectedDbs.includes(db.id)) {
                        setSelectedDbs(selectedDbs.filter(id => id !== db.id))
                      } else {
                        setSelectedDbs([...selectedDbs, db.id])
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">{db.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    {db.type}
                  </div>
                </TableCell>
                <TableCell>{db.host}</TableCell>
                <TableCell>{db.user}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      db.status === 'Active'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {db.status}
                  </span>
                </TableCell>
                <TableCell>{db.size}</TableCell>
                <TableCell>{db.createdAt}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="flex items-center"
                        onClick={() => handleDatabaseClick(db.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Database
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Database
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const DBList = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <DatabaseList />
      </main>
    </div>
  );
};

export default DBList

export const Route = createLazyFileRoute('/__dashboard/dblist')({
  component: DBList
})