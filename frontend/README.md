This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with pre-configured tools for Octree.

## Install

```bash
git clone https://git.octree.ch/p/next-octree.git frontend
cd frontend
rm -rf .git
yarn
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Tools

This template lies on a few tools:

- [Typescript](https://www.typescriptlang.org/): Set Javascript as a typed language
- [Apollo Client](https://www.apollographql.com/docs/react/): Used for GraphQL communications with the server
- [Material UI](https://material-ui.com/): Design template for Material interfaces
- [Zustand](https://github.com/pmndrs/zustand): Global state manager
- [GraphQL Codegen](https://graphql-code-generator.com/): Generate Apollo hooks and Typescript types from GraphQL schemas

## Organization

Some folders are created to propose the following organization:

```
components/ 			# Atomic recurring components
	DatePicker/
		index.tsx
	...
containers/				# UI area composed of components
	Menu/
		index.tsx
	...
graphql/				# GraphQL files used by GraphQL codegen to generate Apollo hooks
	orders.graphql
	...
hooks/					# React hooks
	useLoginForm.tsx
	...
layouts/				# Meta-components used by pages
	default.tsx
	...
lib/					# Logic bricks
	apolloClient.tsx	# Apollo Client configuration
	...
pages/					# Page (NextJS routes)
	_app.tsx			# Main React component
	_document.tsx		# Configuration for every pages
	index.tsx			# Index page, entrypoint for the app
	login.tsx			# Login page
public/					# Static assets
	favicon.ico
	...
stores/					# Global states managed with Zustand
	useAuth.tsx
	...
codegen.yml				# GraphQL Codegen configuration
next-env.d.ts			# Global Typescript types
next.config.js			# NextJS configuration (with proxy for GraphQL endpoint)
theme.js				# Material UI custom theme definition
tsconfig.json			# Typescript configuration
.gitignore
package.json
package-lock.json
README.md
```

## Standalone

This is pre-configured to be installed in a repo with a backend code as parent with React and React DOM (Strapi). If you want to install it out of a Strapi installation, you need to remove `peerDependencies` in `package.json` and add `react` and `react-dom` to `dependencies` modules.

## Add new language

- Add JSON file with locales in `frontend/locales`
- Import corresponding moment locales in `frontend/hooks/useLocale.ts`
- Add language key to `locales` field in `frontend/next-i18next.config.js`
- Add language key to `lang` field in `backend/src/api/event/content-types/event/schema.json`
- Add language key to `lang` field in `backend/src/extensions/users-permissions/content-types/user/schema.json`
- Add `PROTECTED.languages.<lang>: <Lang label>` in `frontend/locales/en.json` (See existing keys)
- (Re)start backend and run `yarn gql` from frontend directory