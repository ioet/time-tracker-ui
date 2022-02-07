import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  
  ws: WebSocket;
  socketIsOpen = 1;

  createObservableSocket(): Observable<any> {
    // Conexión al servidor
    this.ws = new WebSocket('ws://localhost:3000');
    // Suscripción a todos los eventos definidos en el servidor
    return new Observable((observer) => {
      this.ws.onopen = (event) => observer.next('Hola desde Angular');
      this.ws.onmessage = (event) => observer.next(event.data);
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => observer.complete();
      return () => this.ws.close(1000, 'The user disconnected');
    });
  }

  sendMessage(message: string): void {
    // Verificamos que el socket este disponible para el envío
    if (this.ws.readyState === this.socketIsOpen) {
      // Envio del mensaje
      this.ws.send(message);
    }
  }
}
