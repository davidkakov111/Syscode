import { Component, OnInit } from '@angular/core';
import { Address, ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class AddressComponent implements OnInit {
  address: Address | null = null;
  isUpdated: boolean = false;

  constructor(private serverSrv: ServerService) {}

  ngOnInit() {
    this.loadAddress();
  }

  // Get a random address from address service
  async loadAddress() {
    const address = await this.serverSrv.getAddress();
    if (address && typeof address === 'object') {
      this.address = address;

      this.isUpdated = false; // Reset animation trigger
      setTimeout(() => this.isUpdated = true, 50);
    } else {
      console.error(`Failed to load address: ${address}`);
    }
  }
}
