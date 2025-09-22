export interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface UserClaim {
  id: string;
  userId: string;
  claimType: string;
  claimValue: string;
}

export interface RoleClaim {
  id: string;
  roleId: string;
  claimType: string;
  claimValue: string;
}

export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  category: string;
  stock: number;
  minStock: number;
  supplierId: string;
  supplier?: Supplier;
  isActive: boolean;
  createdAt: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplier?: Supplier;
  orderDate: string;
  expectedDate: string;
  status: 'Pending' | 'Approved' | 'Received' | 'Cancelled';
  totalAmount: number;
  notes: string;
  details: PurchaseOrderDetail[];
  createdBy: string;
  createdAt: string;
}

export interface PurchaseOrderDetail {
  id: string;
  purchaseOrderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}