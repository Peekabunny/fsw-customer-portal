import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-submit-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-ticket.html',
  styleUrl: './submit-ticket.scss'
})
export class SubmitTicket implements OnInit {

  products: any[] = [];
  isLoadingProducts = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  newTicket = {
    title: '',
    description: '',
    productId: 0
  };

  constructor(
    private productService: ProductService,
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
      console.log('SubmitTicket component constructed');
  }

  ngOnInit() {
    this.loadMyProducts();
  }

  loadMyProducts() {
    console.log('loadMyProducts called');
    this.isLoadingProducts = true;
    this.productService.getMyProducts().subscribe({
      next: (response) => {
        console.log('Products received:', response);
        this.products = response.data;
        this.isLoadingProducts = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error loading products:', err);
        this.errorMessage = 'Failed to load your products';
        this.isLoadingProducts = false;
        this.cdr.detectChanges();
      }
    });
  }

  submitTicket() {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.ticketService.createTicket(this.newTicket).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Ticket submitted successfully!';
        this.newTicket = { title: '', description: '', productId: 0 };
        setTimeout(() => this.router.navigate(['/my-tickets']), 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.detail || err.error || 'Failed to submit ticket. Please try again.';
      }
    });
  }
}