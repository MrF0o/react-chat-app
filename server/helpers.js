const users = [];

const createUser = ({ id, userName, room }) => {
    const name = userName.trim();
    room = room.trim();

    const userExists = users.find(user => user.id === id);

    if (userExists) return { error: "ERROR: User already exists" };

    const user = {id, name, room};
    users.push(user);

    return { user };
}

const findUsersRoom = (roomCode) => {
   const usersFound = users.filter(user => user.room == roomCode);

   return usersFound;
}

const findUserbyName = (userName) => {
    
}

const findUserbyId = (id, app) => {
    
}

const removeUser = (userName) => {
    const i = users.findIndex((user) => user.name == userName);

    if (i > 0) return users.splice(i, 1);

    return null;
}

module.exports = {
    createUser,
    findUsersRoom,
    removeUser
}