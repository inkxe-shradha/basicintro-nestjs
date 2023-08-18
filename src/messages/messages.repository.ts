import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export class MessagesRepository {
    filePath(fileName = '../../src/messages/db/messages.json'): string {
        const filePath = join(__dirname, fileName);
        return filePath;
    }

    async findOne(id: string) {
        const contents = await readFile(this.filePath(), 'utf8');
        try {
            const messages = JSON.parse(contents);
            return messages[id];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findAll() {
        const contents = await readFile(this.filePath(), 'utf8');
        try {
            const messages = JSON.parse(contents);
            return messages;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(message: string) {
        const content = await readFile(this.filePath(), 'utf8');
        try {
            const messages = JSON.parse(content);
            const id = Math.floor(Math.random() * 999);
            messages[id] = { id, content: message };
            return await writeFile(this.filePath(), JSON.stringify(messages), 'utf8');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}