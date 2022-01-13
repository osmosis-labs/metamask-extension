import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { util } from '@metamask/controllers';
import { useI18nContext } from '../../hooks/useI18nContext';
import { DEFAULT_ROUTE } from '../../helpers/constants/routes';

import Box from '../../components/ui/box';
import TextField from '../../components/ui/text-field';
import PageContainer from '../../components/ui/page-container';
import {
  addCollectibleVerifyOwnership,
  setNewCollectibleAddedMessage,
} from '../../store/actions';
import FormField from '../../components/ui/form-field';

export default function AddCollectible() {
  const t = useI18nContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleAddCollectible = async () => {
    try {
      await dispatch(addCollectibleVerifyOwnership(address, tokenId));
    } catch (error) {
      const { message } = error;
      dispatch(setNewCollectibleAddedMessage(message));
      history.push(DEFAULT_ROUTE);
      return;
    }
    dispatch(setNewCollectibleAddedMessage('success'));
    history.push(DEFAULT_ROUTE);
  };

  const validateAndSetAddress = (val) => {
    setDisabled(!util.isValidHexAddress(val) || !tokenId);
    setAddress(val);
  };

  const validateAndSetTokenId = (val) => {
    setDisabled(!util.isValidHexAddress(address) || !val);
    setTokenId(val);
  };

  return (
    <PageContainer
      title={t('addNFT')}
      onSubmit={() => {
        handleAddCollectible();
      }}
      submitText={t('add')}
      onCancel={() => {
        history.push(DEFAULT_ROUTE);
      }}
      onClose={() => {
        history.push(DEFAULT_ROUTE);
      }}
      disabled={disabled}
      contentComponent={
        <Box padding={4}>
          <Box>
            <FormField
              id="address"
              titleText={t('address')}
              placeholder="0x..."
              value={address}
              onChange={(val) => validateAndSetAddress(val)}
              autoFocus
            />
          </Box>
          <Box>
            <FormField
              id="token-id"
              titleText={t('tokenId')}
              placeholder={t('nftTokenIdPlaceholder')}
              value={tokenId}
              onChange={(val) => {
                validateAndSetTokenId(val);
              }}
              tooltipText="Each NFT has a Token ID which corresponds with a specific asset in its contract"
              numeric
            />
          </Box>
        </Box>
      }
    />
  );
}
