# SmartPark Server

## Requirements
- Node >= v21.7
- npm >= 10.5
- Wrangler >= 3.41

## Setup
Run `npm i` to install all dependencies.    

Install `wrangler` globally using `npm install -g wrangler`.
Log into your Cloudflare account using `wrangler login`.

In the root directory, create one file: `.env.local`. These
store the environment variables to setup the application.

`.env.local` requires:
- `DATABASE_URL`
    - Available in Notion
- `CLERK_PUBLIC`
    - Available in Notion
- `CLERK_SECRET_KEY`
    - Can find this on the Clerk website
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    - Can find this on the Clerk website

Here's an example `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXX
CLERK_SECRET_KEY=sk_test_XXXXX
CLERK_PUBLIC="-----BEGIN PUBLIC KEY-----\nXXXXX\n-----END PUBLIC KEY-----"
DATABASE_URL="mongodb+srv://XXXXX"
```

## Running
Run `npx prisma generate` to generate the Prisma client. 

There are two ways to run the server locally. The first way is the simplest—run
`npm run start`. However, there are caveats. If we want to test out how
Cloudflare specific runtime environments work (such as connecting to an R2
bucket), using this command won't work. If you're not testing anything with
Cloudflare, don't worry about this.

We can create a "mini-flare" setup that emulates a Cloudflare production
environment locally. Using `npm run test` to do that. Make sure you have
`wrangler` installed and logged in. 

## Database
We use Prisma as a layer between our application and our database (as of right
now, MongoDB). In order to update the database schema globally, use `npm run
pushschema`. Note: ***under no circumstances should anyone run this command
without explicit permission from all developers. Modifying the schema
serendipidously could break others' development environments and/or the
production environment itself.***

## Deployment
Deployment is automatic on push. Pushing to the master branch deploys directly
to `trysmartpark.com`. Pushing to any other branch also deploys to Cloudflare,
but on a different URL. Refer to the Cloudflare dashboard to find it. 
