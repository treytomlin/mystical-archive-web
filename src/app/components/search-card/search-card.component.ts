import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatBadgeModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardComponent {

  search(query: string) {
    console.log('Searching for:', query);
    // Add your search logic here
  }

  isCardInInventory(){
    let copiesInInventory = 0;
    console.log('Searching if card is already in decks, binders, or collections')
  }

}


// // src/app/scryfall-search/scryfall-search.component.ts
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface ScryfallCard {
//   name?: string;
//   image_uris?: {
//     normal?: string;
//     large?: string;
//     small?: string;
//   };
//   card_faces?: Array<{ // For multi-faced cards
//     image_uris?: {
//       normal?: string;
//       large?: string;
//       small?: string;
//     };
//     name?: string;
//   }>;
//   set_name?: string;
//   collector_number?: string;
//   // Add other properties you might need from the Scryfall API
// }

// interface ScryfallError {
//     object: string;
//     code: string;
//     status: number;
//     details: string;
//     warnings?: string[];
// }


// @Component({
//   selector: 'search-card-component',
//   standalone: true, // For Angular 14+ standalone components
//   imports: [CommonModule, FormsModule], // HttpClientModule is typically imported in AppModule or root
//   templateUrl: './search-card.component.html',
//   styleUrls: ['./search-card.component.css'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
// })
// export class SearchCardComponent {
//   searchQuery: string = '';
//   card: ScryfallCard | null = null;
//   isLoading: boolean = false;
  
//   // For the custom modal
//   showInfoModal: boolean = false;
//   infoModalTitle: string = '';
//   infoModalMessage: string = '';

//   // Placeholder image URL
//   readonly placeholderImageUrl = 'https://placehold.co/300x420/E2E8F0/4A5568?text=Card+Image';
//   readonly errorImageUrl = 'https://placehold.co/300x420/E2E8F0/4A5568?text=Error+Loading';
//   cardImageUrl: string = this.placeholderImageUrl;


//   constructor(private http: HttpClient) {}

//   performSearch(): void {
//     if (!this.searchQuery.trim()) {
//       this.displayInfoModal('Input Error', 'Please enter a card code.');
//       return;
//     }

//     this.resetUI();
//     this.isLoading = true;

//     let setCode = '';
//     let cardNumber = '';
//     const query = this.searchQuery.trim();

//     const codePart = query.substring(0, 3);
//     const numberPart = query.substring(3);

//     if (query.length >= 4 && /^[a-zA-Z]{3}$/.test(codePart) && /^[0-9]+$/.test(numberPart)) {
//         setCode = codePart.toLowerCase();
//         cardNumber = numberPart;
//     } else {
//         this.isLoading = false;
//         this.displayInfoModal('Input Error', 'Invalid format. Please use 3 letters for the set code followed by numbers (e.g., dsk200, mom001).');
//         return;
//     }

//     const apiUrl = `https://api.scryfall.com/cards/${setCode}/${cardNumber}`;

//     this.http.get<ScryfallCard>(apiUrl).subscribe({
//       next: (data) => {
//         this.card = data;
//         this.updateCardImageUrl(data);
//         this.isLoading = false;
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Scryfall API error:', err);
//         let displayMessage = 'Failed to fetch card data. Please try again.';
//         if (err.error && typeof err.error === 'object' && 'details' in err.error) {
//             const scryfallError = err.error as ScryfallError;
//             displayMessage = `Error: ${scryfallError.details || err.statusText}`;
//         } else if (err.status === 404) {
//             displayMessage = 'Card not found. Please check the code and number.';
//         } else if (err.message) {
//             displayMessage = err.message;
//         }
//         this.displayInfoModal('API Error', displayMessage);
//         this.cardImageUrl = this.errorImageUrl; // Show error image on API failure
//         this.isLoading = false;
//         this.card = null; // Ensure no stale card data is shown
//       }
//     });
//   }

//   private updateCardImageUrl(cardData: ScryfallCard | null): void {
//     if (!cardData) {
//         this.cardImageUrl = this.placeholderImageUrl;
//         return;
//     }
//     // Prefer normal size, then large, then small.
//     // Check for card_faces (e.g., for flip cards, modal double-faced cards)
//     if (cardData.card_faces && cardData.card_faces[0]?.image_uris) {
//         const faceUris = cardData.card_faces[0].image_uris;
//         this.cardImageUrl = faceUris.normal || faceUris.large || faceUris.small || this.errorImageUrl;
//     } 
//     // Standard card images
//     else if (cardData.image_uris) {
//         this.cardImageUrl = cardData.image_uris.normal || cardData.image_uris.large || cardData.image_uris.small || this.errorImageUrl;
//     } 
//     // Fallback if no image found
//     else {
//         this.cardImageUrl = this.errorImageUrl;
//     }
//   }


//   resetUI(): void {
//     this.card = null;
//     this.isLoading = false;
//     this.hideInfoModal(); // Clear any previous modal messages
//     this.cardImageUrl = this.placeholderImageUrl; // Reset image to placeholder
//   }

//   // --- Info Modal Methods ---
//   displayInfoModal(title: string, message: string): void {
//     this.infoModalTitle = title;
//     this.infoModalMessage = message;
//     this.showInfoModal = true;
//   }

//   hideInfoModal(): void {
//     this.showInfoModal = false;
//     this.infoModalTitle = '';
//     this.infoModalMessage = '';
//   }

//   // Handle image loading error for the main card image
//   onImageError(): void {
//     this.cardImageUrl = this.errorImageUrl;
//   }
// }