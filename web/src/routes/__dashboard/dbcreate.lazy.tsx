import React, { useState, useMemo } from 'react'
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Database, Server, Key, HardDrive } from 'lucide-react'
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@web/components/ui/tooltip'

const DatabaseForm = () => {
  const [formData, setFormData] = useState({
    dbType: 'postgresql',
    dbName: '',
    dbVersion: '14',
    hostname: 'localhost',
    port: '5432',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const dbConfigs = useMemo(
    () => ({
      postgresql: {
        versions: ['15', '14', '13'],
        defaultPort: '5432',
        versionNames: (v) => `PostgreSQL ${v}`,
      },
      mysql: {
        versions: ['8.0', '5.7'],
        defaultPort: '3306',
        versionNames: (v) => `MySQL ${v}`,
      },
      mariadb: {
        versions: ['10.11', '10.6'],
        defaultPort: '3306',
        versionNames: (v) => `MariaDB ${v}`,
      },
    }),
    [],
  )

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }

      if (field === 'dbType') {
        newData.port = dbConfigs[value].defaultPort
        newData.dbVersion = dbConfigs[value].versions[0]
      }

      return newData
    })
  }

  const sidebarContent = (
    <div className="space-y-6 pt-16">

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Configuration Summary</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">
                {formData.dbType.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">{formData.dbVersion}</span>
            </div>

            <div className="border-t my-4" />
            <Button className="w-full">
              <Database className="mr-2 h-4 w-4" />
              Create Database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="grid grid-cols-[1fr_320px] gap-8 p-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-8">Create New Database</h2>

        {/* Basic Configuration */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Basic Configuration</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Database Type</label>
                <Select
                  value={formData.dbType}
                  onValueChange={(value) => handleInputChange('dbType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mariadb">MariaDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Database Name</label>
                <Input
                  placeholder="my_database"
                  value={formData.dbName}
                  onChange={(e) => handleInputChange('dbName', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Version</label>
                <Select
                  value={formData.dbVersion}
                  onValueChange={(value) =>
                    handleInputChange('dbVersion', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dbConfigs[formData.dbType].versions.map((version) => (
                      <SelectItem key={version} value={version}>
                        {dbConfigs[formData.dbType].versionNames(version)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Server className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Connection Settings</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Hostname</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="localhost"
                    value={formData.hostname}
                    onChange={(e) =>
                      handleInputChange('hostname', e.target.value)
                    }
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <span className="h-4 w-4">?</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          The hostname where your database will be accessible
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Port</label>
                <Input
                  type="number"
                  value={formData.port}
                  onChange={(e) => handleInputChange('port', e.target.value)}
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Key className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Authentication</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Username</label>
                <Input
                  placeholder="admin_user"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange('username', e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {sidebarContent}
    </div>
  )
}

const DBCreate = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <DatabaseForm />
      </main>
    </div>
  );
};

export default DBCreate

export const Route = createLazyFileRoute('/__dashboard/dbcreate')({
  component: DBCreate
})