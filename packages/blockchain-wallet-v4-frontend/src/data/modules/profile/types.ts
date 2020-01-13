import * as AT from './actionTypes'
import { CampaignsType } from 'data/components/types'
import { RemoteData } from 'blockchain-wallet-v4/src/remote/types'

// Types

export type AddressType = {
  city: string
  country: string
  line1: string
  line2?: string
  postCode: string
  state?: string
}

export type CampaignState = 'NONE' | 'STARTED' | 'ENDED'

export type CampaignAttributeType = {
  'x-campaign-address': string
  'x-campaign-code'?: string
  'x-campaign-email'?: string
}

export type CampaignInfoType = {
  attributes: CampaignAttributeType
  campaignEndDate: string
  campaignName: CampaignsType
  campaignState: CampaignState
  updatedAt: string
  userCampaignState: UserCampaignState
  userCampaignTransactionResponseList: Array<
    UserCampaignTransactionResponseType
  >
}

export type KycStateType =
  | 'NONE'
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'REJECTED'
  | 'VERIFIED'
  | 'EXPIRED'

export type LimitType = {
  annual: string
  currency: string
  daily: string
  type: 'CRYPTO' | 'FIAT'
}

export type TagsType = {
  [key in CampaignsType]?: CampaignAttributeType
}

export type TierStateType =
  | 'none'
  | 'pending'
  | 'under_review'
  | 'rejected'
  | 'verified'
  | 'expired'

export type UserCampaignTransactionResponseType = {
  fiatCurrency: string
  fiatValue: number
  userCampaignTransactionState: string
  withdrawalAt: string
  withdrawalCurrency: string
  withdrawalQuantity: number
}

export type UserActivationStateType = 'NONE' | 'CREATED' | 'ACTIVE' | 'BLOCKED'

export type UserCampaignState =
  | 'FAILED'
  | 'REWARD_RECEIVED'
  | 'TASK_FINISHED'
  | 'REWARD_SEND'
  | 'REGISTERED'
  | 'NONE'

export type UserCampaignsType = {
  userCampaignsInfoResponseList: Array<CampaignInfoType>
}

export type UserDataType = {
  address?: AddressType
  dob: string
  email: string
  emailVerified: boolean
  firstName: string
  id: string
  kycState: KycStateType
  lastName: string
  limits: Array<LimitType>
  mobile: string
  mobileVerified: boolean
  resubmission: null
  settings: null
  state: UserActivationStateType
  tags: Array<TagsType>
  userName?: string
  walletAddresses: {}
  walletGuid: string
}

export type UserTierType = {
  annual: string
  currency: string
  daily: string
  index: 1 | 2
  name: 'Tier 1' | 'Tier 2'
  state: TierStateType
  type: 'CRYPTO' | 'FIAT'
}

export type UserTiersType = Array<UserTierType>

// State
export interface ProfileState {
  apiToken: RemoteData<string, string>
  campaign: {}
  exchangeOnboarding: {
    linkFromExchangeAccountStatus: RemoteData<string, string>
    linkToExchangeAccountDeeplink: string | null
    linkToExchangeAccountStatus: RemoteData<string, string>
    shareWalletAddressesWithExchange: RemoteData<string, string>
  }
  userCampaigns: RemoteData<string, UserCampaignsType>
  userData: RemoteData<string, UserDataType>
  userTiers: RemoteData<any, UserTiersType>
}

// Actions
// Keep these sorted alphabetically
interface FetchTiersFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.FETCH_TIERS_FAILURE
}
interface FetchTiersLoadingAction {
  type: typeof AT.FETCH_TIERS_LOADING
}
interface FetchTiersSuccessAction {
  payload: {
    userTiers: UserTiersType
  }
  type: typeof AT.FETCH_TIERS_SUCCESS
}
interface FetchUser {
  type: typeof AT.FETCH_USER
}
interface FetchUserCampaignsFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.FETCH_USER_CAMPAIGNS_FAILURE
}
interface FetchUserCampaignsLoadingAction {
  type: typeof AT.FETCH_USER_CAMPAIGNS_LOADING
}
interface FetchUserCampaignsSuccessAction {
  payload: {
    userCampaigns: UserCampaignsType
  }
  type: typeof AT.FETCH_USER_CAMPAIGNS_SUCCESS
}
interface FetchUserDataFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.FETCH_USER_DATA_FAILURE
}
interface FetchUserDataLoadingAction {
  type: typeof AT.FETCH_USER_DATA_LOADING
}
interface FetchUserDataSuccessAction {
  payload: {
    userData: UserDataType
  }
  type: typeof AT.FETCH_USER_DATA_SUCCESS
}
interface LinkFromExchangeAccountAction {
  payload: {
    linkId: string
  }
  type: typeof AT.LINK_FROM_EXCHANGE_ACCOUNT
}
interface LinkFromExchangeAccountFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.LINK_FROM_EXCHANGE_ACCOUNT_FAILURE
}
interface LinkFromExchangeAccountLoadingAction {
  type: typeof AT.LINK_FROM_EXCHANGE_ACCOUNT_LOADING
}
interface LinkFromExchangeAccountSuccessAction {
  payload: {
    data: any
  }
  type: typeof AT.LINK_FROM_EXCHANGE_ACCOUNT_SUCCESS
}
interface LinkToExchangeAccountAction {
  payload: {
    utmCampaign: string
  }
  type: typeof AT.LINK_TO_EXCHANGE_ACCOUNT
}
interface LinkToExchangeAccountFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.LINK_TO_EXCHANGE_ACCOUNT_FAILURE
}
interface LinkToExchangeAccountLoadingAction {
  type: typeof AT.LINK_TO_EXCHANGE_ACCOUNT_LOADING
}
interface LinkToExchangeAccountResetAction {
  type: typeof AT.LINK_TO_EXCHANGE_ACCOUNT_RESET
}
interface LinkToExchangeAccountSuccessAction {
  type: typeof AT.LINK_TO_EXCHANGE_ACCOUNT_SUCCESS
}
interface SetApiTokenFailureAction {
  // FIXME: TypeScript error: Error?
  payload: {
    error: string
  }
  type: typeof AT.SET_API_TOKEN_FAILURE
}
interface SetApiTokenNotAskedAction {
  type: typeof AT.SET_API_TOKEN_NOT_ASKED
}
interface SetApiTokenLoadingAction {
  type: typeof AT.SET_API_TOKEN_LOADING
}
interface SetApiTokenSuccessAction {
  payload: {
    token: string
  }
  type: typeof AT.SET_API_TOKEN_SUCCESS
}
interface SetCampaignAction {
  payload: {
    campaign: CampaignsType
  }
  type: typeof AT.SET_CAMPAIGN
}
interface SetLinkToExchangeAccountDeeplinkAction {
  payload: {
    deeplink: string
  }
  type: typeof AT.SET_LINK_TO_EXCHANGE_ACCOUNT_DEEPLINK
}
interface ShareWalletAddressesWithExchange {
  type: typeof AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE
}
interface ShareWalletAddressWithExchangeFailureAction {
  // FIXME: TypeScript e: Error?
  payload: {
    error: string
  }
  type: typeof AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_FAILURE
}
interface ShareWalletAddressWithExchangeLoadingAction {
  type: typeof AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_LOADING
}
interface ShareWalletAddressWithExchangeSuccessAction {
  // FIXME: TypeScript data
  payload: {
    data: any
  }
  type: typeof AT.SHARE_WALLET_ADDRESSES_WITH_EXCHANGE_SUCCESS
}

export type ProfileActionTypes =
  | FetchTiersFailureAction
  | FetchTiersLoadingAction
  | FetchTiersSuccessAction
  | FetchUser
  | FetchUserCampaignsFailureAction
  | FetchUserCampaignsLoadingAction
  | FetchUserCampaignsSuccessAction
  | FetchUserDataFailureAction
  | FetchUserDataLoadingAction
  | FetchUserDataSuccessAction
  | LinkFromExchangeAccountAction
  | LinkFromExchangeAccountFailureAction
  | LinkFromExchangeAccountLoadingAction
  | LinkFromExchangeAccountSuccessAction
  | LinkToExchangeAccountAction
  | LinkToExchangeAccountFailureAction
  | LinkToExchangeAccountResetAction
  | LinkToExchangeAccountLoadingAction
  | LinkToExchangeAccountSuccessAction
  | SetApiTokenFailureAction
  | SetApiTokenNotAskedAction
  | SetApiTokenLoadingAction
  | SetApiTokenSuccessAction
  | SetCampaignAction
  | SetLinkToExchangeAccountDeeplinkAction
  | ShareWalletAddressesWithExchange
  | ShareWalletAddressWithExchangeFailureAction
  | ShareWalletAddressWithExchangeLoadingAction
  | ShareWalletAddressWithExchangeSuccessAction
