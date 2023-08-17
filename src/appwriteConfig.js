import { Client, Databases, Account } from 'appwrite'

export const PROJECT_ID = '64da4495eefcf60c2e47'
export const DATABASE_ID = '64da45fb1767c5650be2'
export const COLLECTION_ID_MESSAGES = '64da460b9ab52d39d602'

const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64da4495eefcf60c2e47')

export const databases = new Databases(client)
export const account = new Account(client)

export default client
