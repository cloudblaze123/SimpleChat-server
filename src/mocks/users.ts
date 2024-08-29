import { User } from "@/models/User";

export const users = [
  new User("1", 
    "John Doe",
    "johndoe@example.com",
    'To be, or not to be, that is the question.',
    'male',
    18,
    '1999-01-01',
    'earth'
    ),
  new User("2", 
    "Jane Smith", 
    "janesmith@example.com",
    'The only way to do great work is to love what you do.',
    'female',
    22,
    '1996-02-12',
    'moon'
    ),
  new User("3", 
    "Bob Johnson", 
    "bobjohnson@example.com",
    'Success is not final, failure is not fatal; it is the courage to continue that counts.',
    'male',
    25,
    '1985-06-15',
    'mars'
    ),
  new User("4",
    "Alice Williams",
    "alicewilliams@example.com",
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    ),
];
