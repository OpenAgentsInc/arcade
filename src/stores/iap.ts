interface CustomerInfo {
  activeSubscriptions: any[]
  allExpirationDates: object
  allPurchaseDates: object
  allPurchasedProductIdentifiers: any[]
  entitlements: {
    active: any
    all: any
  }
  // The date this user was first seen in RevenueCat. This is the install date in most cases
  firstSeen?: string
  firstSeenMillis?: number
  latestExpirationDate: any
  // URL to manage the active subscription of the user. If the user has an active iOS subscription, this will point to the App Store, if the user has an active Play Store subscription it will point there. For Stripe subscriptions, there is no Management URL.
  managementURL: any
  nonSubscriptionTransactions: any[]
  originalAppUserId?: string
  // OS only. The version number for the first version of the app this user downloaded. Will be nil unless a receipt has been recorded for the user through a purchase, restore, or import.
  originalApplicationVersion?: string | null
  // iOS only. The date that the app was first purchased/downloaded by the user. Will be nil if no receipt is recorded for the user.
  originalPurchaseDate?: string | null
  originalPurchaseDateMillis?: number
  // The server date when the current CustomerInfo object was fetched. This should be used for date comparison operators instead of relying on the device time.
  requestDate?: string
  requestDateMillis?: number
}

const initialCustomerInfo: CustomerInfo = {
  activeSubscriptions: [],
  allExpirationDates: {},
  allPurchaseDates: {},
  allPurchasedProductIdentifiers: [],
  entitlements: {
    active: {},
    all: {},
  },
  firstSeen: undefined,
  firstSeenMillis: undefined,
  latestExpirationDate: undefined,
  managementURL: undefined,
  nonSubscriptionTransactions: [],
  originalAppUserId: undefined,
  originalApplicationVersion: undefined,
  originalPurchaseDate: undefined,
  originalPurchaseDateMillis: undefined,
  requestDate: undefined,
  requestDateMillis: undefined,
}

export interface IapState {
  customerInfo: CustomerInfo
}

const initialIapState: IapState = {
  customerInfo: initialCustomerInfo,
}

export const createIapStore = (set: any) => ({
  customerInfo: initialIapState.customerInfo,
  setCustomerInfo: (customerInfo: CustomerInfo) => set({ customerInfo }),
})
