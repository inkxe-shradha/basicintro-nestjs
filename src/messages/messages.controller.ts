import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from 'src/shared/models/crate-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages') // Class decorator
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {

    }
    @Get() // Meta data decorator
    listMessages() {
        return this.messageService.findAll();
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messageService.create(body.content);
    }

    @Get(':id')
    async getMessage(@Param('id') id: string) {
        const messages = await this.messageService.findOne(id);
        if (!messages) {
            throw new NotFoundException('Message not found');
        }
        return messages;
    }
}
