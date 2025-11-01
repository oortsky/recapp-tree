import { Client } from 'appwrite'

const REGION = process.env.NEXT_PUBLIC_REGION!;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;

export const client = new Client()
  .setEndpoint(`https://${REGION}.cloud.appwrite.io/v1`)
  .setProject(PROJECT_ID);