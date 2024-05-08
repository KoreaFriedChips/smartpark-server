import { z } from "zod";
import { BidModel, ConfirmationModel, FavoriteModel, ListingModel, ReviewModel, TransactionModel, UserModel, WaitlistModel, ReservationModel, IntervalModel, ExtendedListingModel } from "@zod-prisma";

export {};

declare global {
  var mongoose: any

  type Bid = z.infer<typeof BidModel>;
  type Confirmation = z.infer<typeof ConfirmationModel>;
  type Favorite = z.infer<typeof FavoriteModel>;
  type Listing = z.infer<typeof ListingModel>;
  type ExtendedListing = z.infer<typeof ExtendedListingModel>;
  type Review = z.infer<typeof ReviewModel>;
  type Transaction = z.infer<typeof TransactionModel>;
  type User = z.infer<typeof UserModel>;
  type Waitlist = z.infer<typeof WaitlistModel>;
  type Reservation = z.infer<typeof ReservationModel>;
  type Interval = z.infer<typeof IntervalModel>;
}
