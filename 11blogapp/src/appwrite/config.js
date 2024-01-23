import conf from "../conf/conf"



import { Client, Databases, ID, Storage, Query} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('<PROJECT_ID>');

const databases = new Databases(client);