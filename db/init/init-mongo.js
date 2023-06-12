db.createUser(
    {
        user: "chat_user",
        pwd: "chat_123",
        roles: [
            {
                role: "readWrite",
                db: "chat_backend"
            }
        ]
    }
);
