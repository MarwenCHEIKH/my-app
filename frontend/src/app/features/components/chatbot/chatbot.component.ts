import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRouterService } from '../../services/open-router/open-router.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  userMessage = '';
  response = '';
  error = '';
  isLoading = false;

  constructor(private openRouterService: OpenRouterService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.isLoading = true;
    this.error = '';

    this.openRouterService.sendMessage(this.userMessage).subscribe({
      next: (response) => {
        this.response = response.choices[0].message.content;
        this.userMessage = '';
      },
      error: (error) => {
        this.error = 'Error sending message: ' + error.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
