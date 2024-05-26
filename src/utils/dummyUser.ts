export type User = {
    id: string,
    username: string,
    password: string,
    role: string,
    name: string,
    email: string,
    phone: string,
    cartId: string,
    historyId: string
}

export const users: Array<User> = [
    {
        id: 'USERID1',
        username: "person1",
        password: "password",
        role: "user",
        name: "Person One",
        email: "person1@example.com",
        phone: "123456789",
        cartId: "1",
        historyId: "1"
    },
    {
        id: 'USERID2',
        username: "person2",
        password: "password",
        role: "user",
        name: "Person Two",
        email: "person2@example.com",
        phone: "987654321",
        cartId: "2",
        historyId: "2"
    },
    {
        id: 'USERID3',
        username: "person3",
        password: "password",
        role: "admin",
        name: "Person Three",
        email: "person3@example.com",
        phone: "111111111",
        cartId: "3",
        historyId: "3"
    },
    {
        id: "USERID4",
        username: "person4",
        password: "password",
        role: "user",
        name: "Person Four",
        email: "person4@example.com",
        phone: "222222222",
        cartId: "4",
        historyId: "4"
    },
]