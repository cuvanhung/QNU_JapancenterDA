/*
 *
 * HomePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { get, isEmpty, upperFirst } from 'lodash';
import cn from 'classnames';

import Block from 'components/HomePageBlock';
import Button from 'components/Button';
import Sub from 'components/Sub';
import Input from 'components/InputText';
import SupportUsCta from 'components/SupportUsCta';
import SupportUsTitle from 'components/SupportUsTitle';

import { selectPlugins } from 'containers/App/selectors';

import auth from 'utils/auth';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import validateInput from 'utils/inputsValidations';

import BlockLink from './BlockLink';
import CommunityContent from './CommunityContent';
import CreateContent from './CreateContent';
import SocialLink from './SocialLink';
import WelcomeContent from './WelcomeContent';

import { getArticles, onChange, submit } from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

const FIRST_BLOCK = [
  {
    title: {
      id: 'app.components.HomePage.welcome',
    },
    content: () => <WelcomeContent />,
  },
  {
    title: {
      id: 'app.components.HomePage.create',
    },
    content: () => <CreateContent />,
  },
];

const FIRST_BLOCK_LINKS = [
  {
    link: 'https://strapi.io/documentation/',
    content: {
      id: 'app.components.BlockLink.documentation.content',
    },
    isDocumentation: true,
    title: {
      id: 'app.components.BlockLink.documentation',
    },
  },
  {
    link: 'https://github.com/strapi/strapi-examples',
    content: {
      id: 'app.components.BlockLink.code.content',
    },
    isDocumentation: false,
    title: {
      id: 'app.components.BlockLink.code',
    },
  },
];

const SECOND_BLOCK = {
  title: {
    id: 'app.components.HomePage.community',
  },
  content: () => <CommunityContent />,
};

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    link: 'https://github.com/strapi/strapi/',
  },
  {
    name: 'Slack',
    link: 'https://slack.strapi.io/',
  },
  {
    name: 'Medium',
    link: 'https://medium.com/@strapi',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/strapijs',
  },
  {
    name: 'Reddit',
    link: 'https://www.reddit.com/r/node/search?q=strapi',
  },
  {
    name: 'Stack Overflow',
    link: 'https://stackoverflow.com/questions/tagged/strapi',
  },
];

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { errors: [] };

  componentDidMount() {
    this.props.getArticles();
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = validateInput(this.props.homePage.body.email, { required: true }, 'email');
    this.setState({ errors });

    if (isEmpty(errors)) {
      return this.props.submit();
    }
  };

  showFirstBlock = () =>
    get(this.props.plugins.toJS(), 'content-manager.leftMenuSections.0.links', []).length === 0;

  renderButton = () => {
    const data = this.showFirstBlock()
      ? {
        className: styles.homePageTutorialButton,
        href: 'https://strapi.io/documentation/getting-started/quick-start.html#create-your-first-api',
        id: 'app.components.HomePage.button.quickStart',
        primary: true,
      }
      : {
        className: styles.homePageBlogButton,
        id: 'app.components.HomePage.button.blog',
        href: 'https://blog.strapi.io/',
        primary: false,
      };

    return (
      <a href={data.href} target="_blank">
        <Button className={data.className} primary={data.primary}>
          <FormattedMessage id={data.id} />
        </Button>
      </a>
    );
  };

  render() {
    const { homePage: { articles, body } } = this.props;
    const WELCOME_AGAIN_BLOCK = [
      {
        title: {
          id: 'app.components.HomePage.welcome.again',
        },
        name: upperFirst(`${get(auth.getUserInfo(), 'username')}!`),
        content: () => <WelcomeContent hasContent />,
      },
    ];

    return (
           <div >
             <br></br>
            
              <h1 className={styles.dong1} align="center"><b><strong>WELCOME TO ADMIN PANEL</strong></b></h1><br></br><br></br>
              <h2 className={styles.dong2} align="center"><b>You can view, create and delete all data in this page</b></h2>
              <h3 className={styles.dong3} align="center">Be careful before to do it!!!</h3>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
               <img className={styles.hinhanh} src="https://lh3.googleusercontent.com/WpmpAdepDdHMoJe4Gm-bbsJtR4xU_aPAhqhwDHT_X7qXZZPNRiGxiVxg5CGlIxfUjOXTszjY-pR15rjrUvG1DfWHqATtO_X2a_9lJ3nsWw8WOloHJgnhcztV_rICrwNWZjOuTcNIMBYeq-jSHEqiUVFwkRqEF8kKms9GPhZNf4CZLIXoOPsvG_7Rd_BPn5P86WABwVebHHj87p3w2-WFriiUL52qXLd6hghTie7wxLZuHsCTpKRa86ljtij-cPgS3rBeXyIvtXJ0KcgAExhGrJEBohSDoaEAaFwRiSRvO_tAuvbm_sQgfFueSk--u4K8rLvwqZhnwPjfJjvDct5T6vycd1R4-jfMctnmHd0QhgLjsi41UgSjuUlyx9Vj_j7vFnaL1mpeQRJLKozheXDiRmbnZBQSpWgaOnJwwjuwRqptHLca3q4Nh600EeXcS-Pqrtl2BYS-E_WkmqmJyHtdESZZpQksd0s-7pdE6XAItGrBMlWsyrQiTBx9qpmZBBB9122ON9IDTYNJ81WE8WkU7UXkM0m4LNtTlGihB36Y4XClWUQ1y5kR_tjdIh-3cMz9J283vEIH7wVb2NCbeA9DcSmlH_Wp9e6SCgsbLRwEF-BkLWd_n0l5vqfkCDCK1KHOKMwPeCczaLw87g9OAd0yCgK144bOEeZaT2OZTfuvCs6Nabwm7Dk4Na9IocEcZtClXIakIuXhda7QEN1wKA=w1170-h500-no" height="350" width="1020"/> <br></br>
               <a href="http://103.199.7.56:4200" align="center"><h2><b className={styles.dong4}> Click here to go to QNU Japan Center home page.</b></h2></a>
              
           </div>
           
    );
  }
}

HomePage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  homePage: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  plugins: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  plugins: selectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getArticles,
      onChange,
      submit,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

// export default connect(mapDispatchToProps)(HomePage);
export default compose(withReducer, withSaga, withConnect)(HomePage);
