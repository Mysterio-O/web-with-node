import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/data/users.json");

export function readUsers() {
    const data = fs.readFileSync(filePath, "utf-8");
    if (data) return JSON.parse(data);
    return [];
}

export function writeUsers(users: any) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export function deleteUser(userId: string) {
    if (!userId) return null;

    try {
        const users = readUsers();

        const filteredUsers = users.filter((user: any) => user.id !== userId)

        writeUsers(filteredUsers);
        return { success: true, message: 'user deleted' }
    } catch (err) {
        console.error('error deleting user', err);
        return { success: false, error: err };
    }

}