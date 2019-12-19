import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  SelectInput,
  Text
} from 'blockchain-info-components'
import { flex, spacing } from 'services/StyleService'
import { FormattedMessage } from 'react-intl'
import { utils } from 'blockchain-wallet-v4/src'
import CoinDisplay from 'components/Display/CoinDisplay'
import QRCodeWrapper from 'components/QRCodeWrapper'
import React from 'react'
import styled from 'styled-components'

const DropdownWrapper = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  background-color: ${props => props.theme['white']};
`

const DetailTable = styled.div`
  min-width: 0;
  > div {
    word-break: break-word;
  }
  > div:not(:first-child) {
    margin-top: 10px;
  }
`
const DetailRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`
const DetailRowText = styled(Text)`
  white-space: nowrap;
`
const KeyText = styled(Text)`
  min-width: 0;
  word-wrap: break-word;
`

const KeySelectInput = styled(SelectInput)`
  flex: 1;
`
const FirstStep = () => (
  <div>
    <Text size='13px' color='error' weight={500} uppercase>
      <FormattedMessage
        id='modals.bch.showpriv.warning'
        defaultMessage='Warning'
      />
    </Text>
    <Text size='14px' style={spacing('mt-10')} weight={400}>
      <FormattedMessage
        id='modals.showpriv.warning.message'
        defaultMessage="Don't share your private key with anyone. This may result in a loss of funds."
      />
    </Text>
  </div>
)

const SecondStep = ({
  addr,
  bchAddr,
  balance,
  priv,
  format,
  formats,
  onChangeFormat
}) => (
  <div style={flex('row')}>
    <div style={spacing('mr-25')}>
      <QRCodeWrapper value={privKeyString(priv, format, addr)} size={120} />
    </div>
    <DetailTable>
      <DetailRow>
        <DetailRowText size='14px' weight={500}>
          <FormattedMessage
            id='modals.bch.showpriv.balance'
            defaultMessage='Balance'
          />
        </DetailRowText>
        {':'}
        &nbsp;
        <CoinDisplay coin='BCH' size='14px'>
          {balance}
        </CoinDisplay>
      </DetailRow>
      <DetailRow>
        <DetailRowText size='14px' weight={500}>
          <FormattedMessage
            id='modals.bch.showpriv.address'
            defaultMessage='Address'
          />
        </DetailRowText>
        {':'}
        &nbsp;
        <Text size='14px' weight={400} data-e2e='bchAddressValue'>
          {bchAddr}
        </Text>
      </DetailRow>
      <DetailRow>
        <DetailRowText size='14px' weight={500}>
          <FormattedMessage
            id='modals.bch.showpriv.priv_key'
            defaultMessage='Private Key'
          />
        </DetailRowText>
        {':'}
        &nbsp;
        {utils.btc.formatPrivateKeyString(priv, format, addr).fold(
          error => (
            <Text size='14px' weight={400} color='error'>
              {error.message}
            </Text>
          ),
          keyString => (
            <KeyText size='14px' weight={400} data-e2e='bchPrivateKeyValue'>
              {keyString}
            </KeyText>
          )
        )}
      </DetailRow>
      <DetailRow>
        <DetailRowText size='14px' weight={500}>
          <FormattedMessage
            id='modals.bch.showpriv.priv_key_format'
            defaultMessage='Private Key Format'
          />
        </DetailRowText>
        {':'}
        &nbsp;
        <DropdownWrapper data-e2e='bchDropdownSelect'>
          <KeySelectInput
            label='Export Format'
            value={format}
            searchEnabled={false}
            onChange={onChangeFormat}
            elements={formats}
          />
        </DropdownWrapper>
      </DetailRow>
    </DetailTable>
  </div>
)

const ShowBchPrivateKeyTemplate = ({
  position,
  total,
  close,
  step,
  onContinue,
  ...rest
}) => (
  <Modal size='large' position={position} total={total}>
    <ModalHeader icon='lock' closeButton={false}>
      <FormattedMessage
        id='modals.bch.showpriv.title'
        defaultMessage='Private Key'
      />
    </ModalHeader>
    <ModalBody>
      {step === 0 ? <FirstStep /> : <SecondStep {...rest} />}
    </ModalBody>
    <ModalFooter align='right'>
      <Text
        cursor='pointer'
        size='small'
        weight={400}
        style={spacing('mr-15')}
        onClick={close}
        data-e2e='bchPrivateKeyCloseButton'
      >
        <FormattedMessage
          id='modals.bch.showpriv.close'
          defaultMessage='Close'
        />
      </Text>
      {step === 0 && (
        <Button
          nature='primary'
          onClick={onContinue}
          data-e2e='bchPrivateKeyContinueButton'
        >
          <FormattedMessage
            id='modals.bch.showpriv.continue'
            defaultMessage='Continue'
          />
        </Button>
      )}
    </ModalFooter>
  </Modal>
)

const privKeyString = (priv, format, addr) =>
  utils.btc
    .formatPrivateKeyString(priv, format, addr)
    .fold(error => error.message, keyString => keyString)

export default ShowBchPrivateKeyTemplate