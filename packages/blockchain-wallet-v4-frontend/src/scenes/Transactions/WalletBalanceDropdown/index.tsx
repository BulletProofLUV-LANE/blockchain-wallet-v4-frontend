import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { getData } from './selectors'
import { PriceChange } from '../model'
import { RemoteDataType } from 'core/types'
import { Text } from 'blockchain-info-components'
import CoinDisplay from 'components/Display/CoinDisplay'
import FiatDisplay from 'components/Display/FiatDisplay'
import Loading from './template.loading'
import React, { Component } from 'react'
import SelectBox from 'components/Form/SelectBox'
import styled from 'styled-components'

// FIXME: TypeScript use CoinType and SupportedCoinType
export type OwnProps = {
  coin: 'BTC' | 'BCH' | 'ETH' | 'PAX' | 'XLM'
  coinModel: any
}

type LinkStatePropsType = {
  // FIXME: TypeScript use AccountTypes
  data: RemoteDataType<
    string | Error,
    {
      addressData: { data: Array<any> }
      balanceData: number
      currencySymbol: string
      priceChangeFiat: number
      priceChangePercentage: number
    }
  >
}

type Props = OwnProps & LinkStatePropsType

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`

// FIXME: TypeScript use SupportedCoinsType
const DisplayContainer = styled.div<{ coinType: any; isItem?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  height: ${props => (props.isItem ? 'auto' : '100%')};
  padding: ${props => (props.isItem ? '6px 6px 0px 0px' : '15px 4px')};
  > span {
    color: ${props => props.theme[props.coinType.colorCode]} !important;
  }
  background-color: none;
`

const AccountContainer = styled.div<{ isItem?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${props => (props.isItem ? '0px' : '12px')};
  height: ${props => (props.isItem ? 'auto' : '100%')};
  width: 100%;
  cursor: pointer;
  .bc__single-value {
    position: relative;
    top: 0;
    transform: initial;
  }
  input {
    height: 0;
    position: absolute;
  }
`

const AmountContainer = styled.div<{ isItem?: boolean }>`
  display: flex;
  margin-top: ${props => (props.isItem ? '4px' : '0px')};
`

const FiatContainer = styled.div`
  display: flex;
  font-size: 12px;
  color: ${props => props.theme.grey400};
`

const CoinSelect = styled(SelectBox)`
  height: 100%;
  > div {
    height: 100%;
  }
  .bc__control {
    height: 100%;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.grey100};

    & .bc__control--is-focused {
      border: 1px solid ${({ theme }) => theme.blue600};
    }
  }

  .bc__control .bc__value-container {
    padding: 0px;
    height: 100%;
  }

  .bc__indicators {
    align-items: flex-start;
    padding-top: 8px;
    padding-right: 8px;
  }

  .bc__menu {
    border-radius: 8px;
  }
`

export class WalletBalanceDropdown extends Component<Props> {
  state = {}

  isBtcTypeCoin = () => {
    return this.props.coin === 'BTC' || this.props.coin === 'BCH'
  }

  isTotalBalanceType = selectProps => {
    return selectProps.value === 'all' || !this.isBtcTypeCoin()
  }

  coinBalance = selectProps => {
    return this.isTotalBalanceType(selectProps)
      ? this.props.data.getOrElse({ balanceData: 0 }).balanceData
      : selectProps.value
      ? selectProps.value.balance
      : 0
  }

  // FIXME: TypeScript use value: { AccountTypes }
  renderDisplay = (props: { value }, children) => {
    const coinType = this.props.coinModel
    const balance = this.coinBalance(props)

    return (
      <DisplayContainer coinType={coinType}>
        <AccountContainer>
          {children && children.length && children[1]}
          <Text weight={500} color='grey400'>
            {this.isTotalBalanceType(props)
              ? this.props.coinModel.coinTicker
              : props.value
              ? props.value.label
              : ''}{' '}
            <FormattedMessage
              id='scenes.transactions.walletbalancedropdown.balance'
              defaultMessage='Balance'
            />
          </Text>
          <AmountContainer>
            <FiatDisplay
              coin={this.props.coin}
              size='24px'
              weight={500}
              cursor='pointer'
              color='grey800'
            >
              {balance}
            </FiatDisplay>
          </AmountContainer>
          <PriceChange
            {...this.props.data.getOrElse({
              currencySymbol: '$',
              priceChangeFiat: 0,
              priceChangePercentage: 0
            })}
          >
            {' '}
            <FormattedMessage
              id='scenes.transactions.performance.prices.day'
              defaultMessage='today'
            />
          </PriceChange>
        </AccountContainer>
      </DisplayContainer>
    )
  }

  renderItem = (props: { label; value }) => {
    const coinType = this.props.coinModel
    const balance = this.coinBalance(props)

    return (
      <DisplayContainer coinType={coinType} isItem>
        <AccountContainer isItem>
          {this.isTotalBalanceType(props)
            ? props.label
            : props.value
            ? props.value.label
            : ''}
          <AmountContainer isItem>
            <CoinDisplay
              coin={this.props.coin}
              size='12px'
              weight={500}
              cursor='pointer'
              color='grey800'
            >
              {balance}
            </CoinDisplay>
            <div style={{ width: '8px' }} />
            <FiatContainer>
              (
              <FiatDisplay
                coin={this.props.coin}
                size='12px'
                weight={500}
                color='grey400'
                cursor='pointer'
              >
                {balance}
              </FiatDisplay>
              )
            </FiatContainer>
          </AmountContainer>
        </AccountContainer>
      </DisplayContainer>
    )
  }

  render () {
    return this.props.data.cata({
      Success: values => {
        const { addressData } = values
        return (
          <Wrapper>
            <Field
              component={CoinSelect}
              elements={addressData.data}
              grouped
              hideIndicator={addressData.data.length <= 1}
              openMenuOnClick={addressData.data.length > 1}
              options={addressData.data}
              name='source'
              searchEnabled={false}
              templateDisplay={this.renderDisplay}
              templateItem={this.renderItem}
            />
          </Wrapper>
        )
      },
      Failure: e => <Text>{typeof e === 'string' ? e : 'Unknown Error'}</Text>,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state, ownProps): LinkStatePropsType => ({
  data: getData(state, ownProps)
})

export default connect(mapStateToProps)(WalletBalanceDropdown)
