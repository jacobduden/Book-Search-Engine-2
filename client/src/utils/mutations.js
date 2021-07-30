import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
            email
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }  
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: bookInput!){
    saveBook(bookData: $bookData){
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        bookInput {
            # _id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}
`;
