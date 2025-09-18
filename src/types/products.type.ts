export interface ProductType {
  sold: number;
  images: string[];
  subcategory: Brand[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  priceAfterDiscount?: number;
  reviews?: ReviewType[];
  returnPolicy?: string;
  shippingInfo?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}

export interface ReviewType {
  id: string;
  customer: {
    _id?: string;
    display_name: string;
    avatar_url?: string;
  };
  heading?: string;
  rating: number;
  body: string;
  media: ReviewMedia[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewMedia {
  id: string;
  url: string;
}