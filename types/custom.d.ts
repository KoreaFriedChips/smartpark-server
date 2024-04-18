export {};

declare global {
  var mongoose: any

  interface Waitlist {
    id: string;
    name: string;
    email: string;
    use: string?;
    place: number?;
    createdAt: Date;
    updatedAt: Date;
  }

  interface User {
    id: string;
    name: string;
    clerkId: string;
    description?: string;
    rating: number;
    reviews: number;
    city: string?;
    state: string?;
    profilePicture?: string;
    activeSince: string;
    verified: boolean;
    listings: Listing[];
    Review: Review[];
    Bid: Bid[];
    Transaction: Transaction[];
    Favorite: Favorite[];
    Confirmation: Confirmation[];
  }

  interface Listing {
      id: string;
      thumbnail: string;
      images: string[];
      latitude: number;
      longitude: number;
      distance: number;
      city: string;
      state: string;
      listingType: string;
      price: number;
      duration: string;
      relist: boolean;
      relistDuration?: string;
      description?: string;
      availability: JSON;
      active: boolean;
      rating: number;
      reviews: number;
      date: string;
      ends?: string;
      bids: number;
      capacity: number;
      spotsLeft: number;
      tags: string[];
      amenities: string[];
      seller: User;
      sellerId: string;
      spotReviews: Review[];
      Bid: Bid[];
      Transaction: Transaction[];
      Favorite: Favorite[];
  }

  interface Review {
      id: string;
      rating: number;
      review: string;
      date: string;
      reviewer: User;
      listing: Listing;
      listingId: string;
      userId: string;
  }

  interface Bid {
      id: string;
      amount: number;
      createdAt: string;
      updatedAt: string;
      user: User;
      listing: Listing;
      userId: string;
      listingId: string;
  }

  interface Transaction {
      id: string;
      transactionDate: string;
      amount: number;
      paymentMethod: string?;
      user: User;
      listing: Listing;
      userId: string;
      listingId: string;
      confirmations: Confirmation[];
  }

  interface Favorite {
      id: string;
      user: User;
      listing: Listing;
      userId: string;
      listingId: string;
  }

  interface Confirmation {
      id: string;
      confirmed: string;
      transaction: Transaction;
      user: User;
      transactionId: string;
      userId: string;
  }

}
