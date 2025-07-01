export interface ProductType {
  product_name: string;
  product_description: string;
  product_price: number;
  product_category: string;
  product_used_for: string;
  product_details: string[];
  seller_id?: string | null;
  product_id?: string | null;
}

export interface SellerType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductDocType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  usedFor: string;
  details: string[];
  status: string;
  seller: SellerType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAllProductsResponse {
  isSuccess: boolean;
  productDocs: ProductDocType[];
  message?: string; // in case error object includes it
}

export interface ManageProductProps {
  setActiveTabKey: (key: string) => void;
  getAllProduct: () => Promise<void>;
  editMode: boolean;
  editProductId: string | null;
}

export interface ProductsPropType {
  products: ProductDocType[];
  setActiveTabKey: (key: string) => void;
  setEditMode: (key: boolean) => void;
  setEditProductId: (id: string) => void;
  getAllProduct: () => Promise<void>;
}
