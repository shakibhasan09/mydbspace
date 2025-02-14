/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as publicIndexImport } from './routes/__public/index'
import { Route as dashboardDatabasesIndexImport } from './routes/__dashboard/databases/index'
import { Route as dashboardDatabasesNewIndexImport } from './routes/__dashboard/databases/new/index'

// Create Virtual Routes

const dashboardRouteLazyImport = createFileRoute('/__dashboard')()
const dashboardDbmanageLazyImport = createFileRoute('/__dashboard/dbmanage')()
const dashboardDblistLazyImport = createFileRoute('/__dashboard/dblist')()
const dashboardDbcreateLazyImport = createFileRoute('/__dashboard/dbcreate')()
const dashboardVolumesIndexLazyImport = createFileRoute(
  '/__dashboard/volumes/',
)()
const dashboardSettingsIndexLazyImport = createFileRoute(
  '/__dashboard/settings/',
)()
const dashboardDatabasesDatabaseIndexLazyImport = createFileRoute(
  '/__dashboard/databases/$database/',
)()

// Create/Update Routes

const dashboardRouteLazyRoute = dashboardRouteLazyImport
  .update({
    id: '/__dashboard',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/__dashboard/route.lazy').then((d) => d.Route))

const publicIndexRoute = publicIndexImport.update({
  id: '/__public/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const dashboardDbmanageLazyRoute = dashboardDbmanageLazyImport
  .update({
    id: '/dbmanage',
    path: '/dbmanage',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() => import('./routes/__dashboard/dbmanage.lazy').then((d) => d.Route))

const dashboardDblistLazyRoute = dashboardDblistLazyImport
  .update({
    id: '/dblist',
    path: '/dblist',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() => import('./routes/__dashboard/dblist.lazy').then((d) => d.Route))

const dashboardDbcreateLazyRoute = dashboardDbcreateLazyImport
  .update({
    id: '/dbcreate',
    path: '/dbcreate',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() => import('./routes/__dashboard/dbcreate.lazy').then((d) => d.Route))

const dashboardVolumesIndexLazyRoute = dashboardVolumesIndexLazyImport
  .update({
    id: '/volumes/',
    path: '/volumes/',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__dashboard/volumes/index.lazy').then((d) => d.Route),
  )

const dashboardSettingsIndexLazyRoute = dashboardSettingsIndexLazyImport
  .update({
    id: '/settings/',
    path: '/settings/',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__dashboard/settings/index.lazy').then((d) => d.Route),
  )

const dashboardDatabasesIndexRoute = dashboardDatabasesIndexImport
  .update({
    id: '/databases/',
    path: '/databases/',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__dashboard/databases/index.lazy').then((d) => d.Route),
  )

const dashboardDatabasesDatabaseIndexLazyRoute =
  dashboardDatabasesDatabaseIndexLazyImport
    .update({
      id: '/databases/$database/',
      path: '/databases/$database/',
      getParentRoute: () => dashboardRouteLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__dashboard/databases/$database/index.lazy').then(
        (d) => d.Route,
      ),
    )

const dashboardDatabasesNewIndexRoute = dashboardDatabasesNewIndexImport
  .update({
    id: '/databases/new/',
    path: '/databases/new/',
    getParentRoute: () => dashboardRouteLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__dashboard/databases/new/index.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/__dashboard': {
      id: '/__dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof dashboardRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/__dashboard/dbcreate': {
      id: '/__dashboard/dbcreate'
      path: '/dbcreate'
      fullPath: '/dbcreate'
      preLoaderRoute: typeof dashboardDbcreateLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/dblist': {
      id: '/__dashboard/dblist'
      path: '/dblist'
      fullPath: '/dblist'
      preLoaderRoute: typeof dashboardDblistLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/dbmanage': {
      id: '/__dashboard/dbmanage'
      path: '/dbmanage'
      fullPath: '/dbmanage'
      preLoaderRoute: typeof dashboardDbmanageLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__public/': {
      id: '/__public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof publicIndexImport
      parentRoute: typeof rootRoute
    }
    '/__dashboard/databases/': {
      id: '/__dashboard/databases/'
      path: '/databases'
      fullPath: '/databases'
      preLoaderRoute: typeof dashboardDatabasesIndexImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/settings/': {
      id: '/__dashboard/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof dashboardSettingsIndexLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/volumes/': {
      id: '/__dashboard/volumes/'
      path: '/volumes'
      fullPath: '/volumes'
      preLoaderRoute: typeof dashboardVolumesIndexLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/databases/new/': {
      id: '/__dashboard/databases/new/'
      path: '/databases/new'
      fullPath: '/databases/new'
      preLoaderRoute: typeof dashboardDatabasesNewIndexImport
      parentRoute: typeof dashboardRouteLazyImport
    }
    '/__dashboard/databases/$database/': {
      id: '/__dashboard/databases/$database/'
      path: '/databases/$database'
      fullPath: '/databases/$database'
      preLoaderRoute: typeof dashboardDatabasesDatabaseIndexLazyImport
      parentRoute: typeof dashboardRouteLazyImport
    }
  }
}

// Create and export the route tree

interface dashboardRouteLazyRouteChildren {
  dashboardDbcreateLazyRoute: typeof dashboardDbcreateLazyRoute
  dashboardDblistLazyRoute: typeof dashboardDblistLazyRoute
  dashboardDbmanageLazyRoute: typeof dashboardDbmanageLazyRoute
  dashboardDatabasesIndexRoute: typeof dashboardDatabasesIndexRoute
  dashboardSettingsIndexLazyRoute: typeof dashboardSettingsIndexLazyRoute
  dashboardVolumesIndexLazyRoute: typeof dashboardVolumesIndexLazyRoute
  dashboardDatabasesNewIndexRoute: typeof dashboardDatabasesNewIndexRoute
  dashboardDatabasesDatabaseIndexLazyRoute: typeof dashboardDatabasesDatabaseIndexLazyRoute
}

const dashboardRouteLazyRouteChildren: dashboardRouteLazyRouteChildren = {
  dashboardDbcreateLazyRoute: dashboardDbcreateLazyRoute,
  dashboardDblistLazyRoute: dashboardDblistLazyRoute,
  dashboardDbmanageLazyRoute: dashboardDbmanageLazyRoute,
  dashboardDatabasesIndexRoute: dashboardDatabasesIndexRoute,
  dashboardSettingsIndexLazyRoute: dashboardSettingsIndexLazyRoute,
  dashboardVolumesIndexLazyRoute: dashboardVolumesIndexLazyRoute,
  dashboardDatabasesNewIndexRoute: dashboardDatabasesNewIndexRoute,
  dashboardDatabasesDatabaseIndexLazyRoute:
    dashboardDatabasesDatabaseIndexLazyRoute,
}

const dashboardRouteLazyRouteWithChildren =
  dashboardRouteLazyRoute._addFileChildren(dashboardRouteLazyRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof dashboardRouteLazyRouteWithChildren
  '/dbcreate': typeof dashboardDbcreateLazyRoute
  '/dblist': typeof dashboardDblistLazyRoute
  '/dbmanage': typeof dashboardDbmanageLazyRoute
  '/': typeof publicIndexRoute
  '/databases': typeof dashboardDatabasesIndexRoute
  '/settings': typeof dashboardSettingsIndexLazyRoute
  '/volumes': typeof dashboardVolumesIndexLazyRoute
  '/databases/new': typeof dashboardDatabasesNewIndexRoute
  '/databases/$database': typeof dashboardDatabasesDatabaseIndexLazyRoute
}

export interface FileRoutesByTo {
  '': typeof dashboardRouteLazyRouteWithChildren
  '/dbcreate': typeof dashboardDbcreateLazyRoute
  '/dblist': typeof dashboardDblistLazyRoute
  '/dbmanage': typeof dashboardDbmanageLazyRoute
  '/': typeof publicIndexRoute
  '/databases': typeof dashboardDatabasesIndexRoute
  '/settings': typeof dashboardSettingsIndexLazyRoute
  '/volumes': typeof dashboardVolumesIndexLazyRoute
  '/databases/new': typeof dashboardDatabasesNewIndexRoute
  '/databases/$database': typeof dashboardDatabasesDatabaseIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/__dashboard': typeof dashboardRouteLazyRouteWithChildren
  '/__dashboard/dbcreate': typeof dashboardDbcreateLazyRoute
  '/__dashboard/dblist': typeof dashboardDblistLazyRoute
  '/__dashboard/dbmanage': typeof dashboardDbmanageLazyRoute
  '/__public/': typeof publicIndexRoute
  '/__dashboard/databases/': typeof dashboardDatabasesIndexRoute
  '/__dashboard/settings/': typeof dashboardSettingsIndexLazyRoute
  '/__dashboard/volumes/': typeof dashboardVolumesIndexLazyRoute
  '/__dashboard/databases/new/': typeof dashboardDatabasesNewIndexRoute
  '/__dashboard/databases/$database/': typeof dashboardDatabasesDatabaseIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/dbcreate'
    | '/dblist'
    | '/dbmanage'
    | '/'
    | '/databases'
    | '/settings'
    | '/volumes'
    | '/databases/new'
    | '/databases/$database'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/dbcreate'
    | '/dblist'
    | '/dbmanage'
    | '/'
    | '/databases'
    | '/settings'
    | '/volumes'
    | '/databases/new'
    | '/databases/$database'
  id:
    | '__root__'
    | '/__dashboard'
    | '/__dashboard/dbcreate'
    | '/__dashboard/dblist'
    | '/__dashboard/dbmanage'
    | '/__public/'
    | '/__dashboard/databases/'
    | '/__dashboard/settings/'
    | '/__dashboard/volumes/'
    | '/__dashboard/databases/new/'
    | '/__dashboard/databases/$database/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  dashboardRouteLazyRoute: typeof dashboardRouteLazyRouteWithChildren
  publicIndexRoute: typeof publicIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  dashboardRouteLazyRoute: dashboardRouteLazyRouteWithChildren,
  publicIndexRoute: publicIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/__dashboard",
        "/__public/"
      ]
    },
    "/__dashboard": {
      "filePath": "__dashboard/route.lazy.tsx",
      "children": [
        "/__dashboard/dbcreate",
        "/__dashboard/dblist",
        "/__dashboard/dbmanage",
        "/__dashboard/databases/",
        "/__dashboard/settings/",
        "/__dashboard/volumes/",
        "/__dashboard/databases/new/",
        "/__dashboard/databases/$database/"
      ]
    },
    "/__dashboard/dbcreate": {
      "filePath": "__dashboard/dbcreate.lazy.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/dblist": {
      "filePath": "__dashboard/dblist.lazy.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/dbmanage": {
      "filePath": "__dashboard/dbmanage.lazy.tsx",
      "parent": "/__dashboard"
    },
    "/__public/": {
      "filePath": "__public/index.tsx"
    },
    "/__dashboard/databases/": {
      "filePath": "__dashboard/databases/index.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/settings/": {
      "filePath": "__dashboard/settings/index.lazy.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/volumes/": {
      "filePath": "__dashboard/volumes/index.lazy.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/databases/new/": {
      "filePath": "__dashboard/databases/new/index.tsx",
      "parent": "/__dashboard"
    },
    "/__dashboard/databases/$database/": {
      "filePath": "__dashboard/databases/$database/index.lazy.tsx",
      "parent": "/__dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
