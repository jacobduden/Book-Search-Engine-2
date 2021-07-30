const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) =>{
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books')
                return userData;
            }
            throw new AuthenticationError('You are not logged in!')
        },
    },

    Mutation: {

addUser: async (parent, args) => {
    const user = await User.create(args)
    const token = signToken(user)
    return {token, user}
},

login: async (parent, { email, password }) => {
const user = await User.findOne({ email })
if(!user){
    throw new AuthenticationError('Invalid email address');
}
const correctpw = await user.isCorrectPassword(password)
if(!correctpw){
    throw new AuthenticationError('Invalid password');
}
const token = signToken(user);
return {token, user}
},

saveBook: async (parent, {bookData}, context)=>{
    if(context.user){
        const updateUser = await User.findByIdAndUpdate(
            {_id: context.user._id},
            {$push:{ savedBooks: bookData}},
            {new: true}
        );
        return updateUser
    }
    throw new AuthenticationError('You have to be logged in to save a book! Please sign in, or register a free account.')
},

removeBook: async (parent, args, context)=>{
    if(context.user){
        const updateUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$pull:{bookId: args.bookId}},
            {new:true}
        );
        return updateUser;
    }
    throw new AuthenticationError('You have to be logged in to save a book! Please sign in, or register a free account.')
}

}
    }

    module.exports = resolvers;