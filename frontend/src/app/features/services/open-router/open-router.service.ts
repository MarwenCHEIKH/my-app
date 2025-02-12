// src/app/services/openrouter.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
// Interface for the chat message
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Interface for the API response
interface OpenRouterResponse {
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
}

// Interface for the request payload
interface ChatRequestPayload {
  model: string;
  messages: ChatMessage[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenRouterService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly apiKey = environment.openRouterApiKey;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<OpenRouterResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const payload: ChatRequestPayload = {
      model: 'deepseek/deepseek-chat:free',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    };

    return this.http.post<OpenRouterResponse>(this.apiUrl, payload, {
      headers,
    });
  }
}
