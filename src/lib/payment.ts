// Payment status management
const PAYMENT_KEY = 'pdf-payment-verified';

export function isPdfPurchased(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data = localStorage.getItem(PAYMENT_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    // Check if payment token exists and hasn't expired (30 days)
    if (parsed.verified && parsed.timestamp) {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      return Date.now() - parsed.timestamp < thirtyDays;
    }
    return false;
  } catch {
    return false;
  }
}

export function setPdfPurchased(orderId: string): void {
  localStorage.setItem(PAYMENT_KEY, JSON.stringify({
    verified: true,
    orderId,
    timestamp: Date.now(),
  }));
}

export function getPurchasedOrderId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(PAYMENT_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (parsed.verified && parsed.orderId && parsed.timestamp) {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < thirtyDays) {
        return parsed.orderId;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function generateOrderId(): string {
  return `RPT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
