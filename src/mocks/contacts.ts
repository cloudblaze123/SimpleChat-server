import { Contact } from '@/models/Contact'


const contacts: Record<string, Contact[]> = {
    '1': [
        new Contact('2'),
        new Contact('3'),
    ],
    '2': [
        new Contact('1'),
    ],
    '3': [
        new Contact('1'),
    ],
    '11': [],
}


export { contacts }


