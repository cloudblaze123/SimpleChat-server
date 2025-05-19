import { Contact } from '@/models/Contact'


const contacts: Record<string, Contact[]> = {
    '1': [
        new Contact('2'),
        new Contact('3', '分组1'),
        new Contact('4', '分组2'),
    ],
    '2': [
        new Contact('1'),
    ],
    '3': [
        new Contact('1'),
    ],
    '4': [
        new Contact('1'),
    ],
    '11': [],
}


export { contacts }


