import media from 'services/ResponsiveService'
import React from 'react'
import styled from 'styled-components'
import Table from './Table'
import Tabs from './Tabs'
import TotalRow from './TotalRow'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px;
  padding-bottom: 0px;
  border: 1px solid ${props => props.theme['gray-1']};

  ${media.mobile`
    padding: 12px;
  `}
`

const BalancesTable = props => {
  const { currentTab } = props
  return (
    <Wrapper>
      <TotalRow {...props} />
      <Tabs {...props} />
      {currentTab === 'total' && <Table viewType='Total' />}
      {currentTab === 'wallet' && <Table viewType='Wallet' />}
      {currentTab === 'lockbox' && <Table viewType='Hardware' />}
    </Wrapper>
  )
}

export default BalancesTable
