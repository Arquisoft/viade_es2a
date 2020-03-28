import React, { Component } from 'react';
import { Dropdown } from '@util-components';
import { toast } from 'react-toastify';

const languages = {
  en: {
    id: 'en',
    icon: 'us'
  },
  es: {
    id: 'es',
    icon: 'es'
  }
};

type Props = {
  i18n: Object,
  t: Function
};

const toolbarBtStyle = {
  width: '1.75em',
  lineHeight: '1.75em',
  fontSize: '1.15em',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#5361FD'
};

class LanguageDropdown extends Component<Props> {
  constructor() {
    super();
    this.state = { language: this.getLanguage() };
  }

  getLanguage = () => localStorage.getItem('i18nextLng') || 'en';

  onLanguageSelect = nextLanguage => {
    const { i18n } = this.props;
    toast.dismiss();
    i18n.changeLanguage(nextLanguage);
    this.setState({
      language: this.getLanguage()
    });
  };

  render() {
    const { t } = this.props;
    const { language } = this.state;
    const profileOpts = [
      {
        label: t('navBar.languages.en'),
        onClick: () => this.onLanguageSelect('en'),
        customIcon: false
      },
      {
        label: t('navBar.languages.es'),
        onClick: () => this.onLanguageSelect('es'),
        customIcon: false
      }
    ];
    return (
      <Dropdown actions={profileOpts} hover>
        <span style={toolbarBtStyle}>{(language && languages[language] ? languages[language].id : 'en').toUpperCase()}</span>
      </Dropdown>
    );
  }
}

export default LanguageDropdown;
