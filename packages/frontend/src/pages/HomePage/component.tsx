import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import GraphqlError from '../../components/GraphqlError';
import Loader from '../../components/Loader';
import { useHomePageQuery } from '../../graphql/codegen';

import CreateLobby from './components/CreateLobby';
import GoBackToLobby from './components/GoToLobby';
import { Wrapper } from './styles';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const { data, loading, error } = useHomePageQuery();

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }

  const { viewer } = data;
  const { lobby } = viewer;

  return (
    <Wrapper>
      <Helmet>
        <title>{t('metadata.HomePage.title')}</title>
      </Helmet>

      {!!lobby ? <GoBackToLobby lobby={lobby} /> : <CreateLobby />}
    </Wrapper>
  );
};

export default HomePage;
