import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  createdDate: string;
  lastModifiedDate: string;
}

@Component({
  selector: 'app-my-tickets',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-tickets.html',
  styleUrl: './my-tickets.scss',
})
export class MyTickets implements OnInit {

  private ticketService = inject(TicketService);

  tickets = signal<Ticket[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.loadMyTickets();
  }

  loadMyTickets() {
    this.isLoading.set(true);
    this.ticketService.getMyTickets().subscribe({
      next: (response) => {
        this.tickets.set(response.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load your tickets');
        this.isLoading.set(false);
      }
    });
  }

  getStatusLabel(status: number): string {
    switch(status) {
      case 0: return 'Open';
      case 1: return 'In Progress';
      case 2: return 'Resolved';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch(status) {
      case 0: return 'status-open';
      case 1: return 'status-inprogress';
      case 2: return 'status-resolved';
      default: return '';
    }
  }
}